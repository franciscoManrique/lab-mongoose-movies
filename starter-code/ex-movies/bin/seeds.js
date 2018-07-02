require('../configs/db.config');
const mongoose = require('mongoose');
const Celebrity = require("../models/celebrity.model");
const celebrities = require('../data/celebrities.data');


Celebrity.insertMany(celebrities)
.then(data=>{    
    console.info(`${data.length} celebs inserted in db`); 
})
.catch(error =>{
    if (error instanceof mongoose.Error.ValidationError) {
        console.error(`Error inserting elements: The maximum hobbies are 10`); 
    }
});

