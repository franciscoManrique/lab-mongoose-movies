const mongoose = require('mongoose');
const DB_NAME = 'ex-movies-celebrities'; // 2. crea db con este nombre
const MONGO_URI = `mongodb://localhost/${DB_NAME}`;

mongoose.connect(MONGO_URI)
.then(()=>{
    console.log(`connected to db: ${MONGO_URI}`);
})
.catch(err=>{
    console.log(`error to connect to db: ${DB_NAME}, error: ${err}`);
});

