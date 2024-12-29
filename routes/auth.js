/*
rutas de usuarios auth
host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../public/controllers/auth');
const { validarCampos } = require('../public/middlewares/validar-campos');
const {validarJWT} = require('../public/middlewares/validar-jwt');



router.post('/new',[ //middleware
    check('name', 'nombre es obligatorio').not().isEmpty(),
    check('email', 'email es obligatorio').isEmail(),
    check('password', 'password debe de ser de 6 caracteres').isLength({min: 6}),
    validarCampos
], crearUsuario);

router.post('/', [
    check('email', 'email es obligatorio').isEmail(),
    check('password', 'password debe de ser de 6 caracteres').isLength({min: 6}),
    validarCampos

], loginUsuario);

router.get('/renew', validarJWT, revalidarToken);


module.exports = router;