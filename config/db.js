require('colors');
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const conectarDB = async() => {

    try {

        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false  --> no soportada en mongoose 6.0
        });

        console.log('Base de datos online'.green);
        
    } catch (error) {
        console.log(error);
        process.exit(1); // si hay un error, detiene la app
    }
}

module.exports = conectarDB;