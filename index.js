const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');

// crear el servidor
const app = express();

// conectar a la base de datos
conectarDB();

// habilitar cors
app.use(cors());

// habilitar express.json
app.use(express.json({ extended: true }));

// puerto de la app
const PORT = process.env.PORT || 4000;

// importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

// arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ PORT }`);
});