const { validationResult } = require('express-validator');

const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');

// crear una nueva tarea
exports.crearTarea = async (req, res) => {

    // revisar si hay errores
    const errores = validationResult(req);
    if ( !errores.isEmpty() ) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        
        const { proyecto } = req.body;

        // verifica que exista el proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        if ( !existeProyecto ) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        // verifica si el proyecto pertenece al usuario autenticado
        if ( existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        // crea la nueva tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }

}

exports.obtenerTareas = async (req, res) => {

    try {

        const { proyecto } = req.query;

        // verifica que exista el proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        if ( !existeProyecto ) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        // verifica si el proyecto pertenece al usuario autenticado
        if ( existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        // obtener las tareas
        const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 });
        res.json({ tareas });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

exports.actualizarTarea = async (req, res) => {

    try {

        const { proyecto, nombre, estado } = req.body;

        // verifica si la tarea existe
        let tarea = await Tarea.findById(req.params.id);
        if ( !tarea ) {
            return res.status(404).json({ msg: 'No existe esa tarea' });
        }

        // extrae el proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // verifica si el proyecto pertenece al usuario autenticado
        if ( existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        // crear objeto con la nueva info
        const nuevaTarea = {};

        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;

        // guarda la tarea
        tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, { new: true });
        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

exports.eliminarTarea = async (req, res) => {

    try {

        const { proyecto } = req.query;

        // verifica si la tarea existe
        let tarea = await Tarea.findById(req.params.id);
        if ( !tarea ) {
            return res.status(404).json({ msg: 'No existe esa tarea' });
        }

        // extrae el proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // verifica si el proyecto pertenece al usuario autenticado
        if ( existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        // elimina la tarea
        await Tarea.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Tarea eliminada'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}