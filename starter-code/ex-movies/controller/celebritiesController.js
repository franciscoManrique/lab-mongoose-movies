const mongoose = require("mongoose");
const Celebrity = require("../models/celebrity.model");
const spotifyApi = require('../configs/spotify.config');
const createError = require('http-errors');

//ALL CELEBS
module.exports.listAll = (req, res, next) => {
  var criteria = {};
  
  if (req.query.artist) {
    criteria.name = req.query.artist;
  }
  
  Celebrity.find(criteria)
  .then(celebrities => {
    
    if (celebrities.length === 0) {
      next(createError(404, `Celebrity/Celebrities not found`));
    } else {
      res.render("celebrities/index", { celebrities: celebrities });
    }
  })
  .catch(error => {
    if (error instanceof mongoose.Error.CastError) {
      next(createError(404, `Celebrities not found ${error}`));
    } else {
      next(error);
    }
  });
};

//SHOW
module.exports.show = (req, res, next) => {
  const idCeleb = req.params.id;
  const nameCeleb = req.params.name;
  
  Celebrity.findById(idCeleb)
  .then(celebrity => {
    if (celebrity) {
      spotifyApi
      .searchArtists(nameCeleb)
      .then(name => {
        if (name) {
          var artistsArray = name.body.artists.items;
          
          var idArtistSpoty = artistsArray[0].id;
          
          return spotifyApi.getArtistTopTracks(idArtistSpoty, "ES");
        }
      })
      .then(song => {
        res.render("celebrities/show", {
          celebrity: celebrity,
          song: song.body.tracks
        });
      })
      .catch(err => {
        res.render("celebrities/show", { celebrity: celebrity });
        next(err);
      });
    } else {
      next(
        createError(404, `celebrity ${celebrity.name} with ${id} not found`)
      );
    }
  })
  .catch(error => {
    if (error instanceof mongoose.Error.CastError) {
      next(createError(404, `celebrity with id ${id} not found`));
    } else {
      next(error);
    }
  });
};

module.exports.create = (req, res, next) =>{  
  res.render('celebrities/create', {celebrity: new Celebrity()});
};

// module.exports.doCreate = (req, res, next) =>{  
//   const celebrity = new Celebrity();
//   celebrity.save()
//   .then(data =>{
//     console.log(data.name);
//     res.render('celebrities/index');
//   })
//   .catch(error =>{
//     if (error instanceof mongoose.Error.ValidationError) {
//       res.render('celebrities/new', {
//         celebrity:celebrity,
//         errors:error.errors
//       });            
//     }
//   });
// };

