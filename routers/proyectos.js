const express = require('express');
const { check } = require('express-validator');

const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');

const router = express.Router();

// api/proyectos
// crear un proyecto
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);

// obtener todos los proyectos
router.get('/',
    auth,
    proyectoController.obtenerProyectos
);

// editar un proyecto
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);

// eliminar un proyecto
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
);

module.exports = router;