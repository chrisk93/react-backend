const { Router } = require('express');

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../public/controllers/events');
const {validarJWT} = require('../public/middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../public/middlewares/validar-campos');
const router = Router();
const {isDate} = require('../public/helpers/isDate');

//esta linea pasa por todos
router.use(validarJWT);

router.get('/', getEventos);

router.post(
    '/',
    [
        check('title', 'titulo es obligatorio').not().isEmpty(),
        check('start', 'fecha inicio es obligatorio').custom(isDate),
        check('end', 'fecha fin es obligatorio').custom(isDate),
        validarCampos
    ],
    crearEvento);

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento);

module.exports = router;

