const express = require('express');
const router = express.Router();
const celebritiesController = require('../../controller/celebritiesController');

router.get('/', celebritiesController.listAll);
router.get('/:id/:name', celebritiesController.show);
router.get('/create', celebritiesController.create); //YA SABE QUE ES CELEBRITIES/CREATE PORQUE SI NO LE HE DICHO QUE / REDIRIJA A /CELEBRITIES
// router.post('/create', celebritiesController.doCreate);

module.exports = router;


