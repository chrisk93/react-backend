const { response, json } = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async (req, res) => {


    const {email, password} = req.body //name

    try {

        let usuario = await Usuario.findOne({ email });
        //console.log(usuario);

        if(usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'un usuario existe con ese correo'
            });
        }
        
        usuario = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        await usuario.save();

        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch (error) {

        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'hable con el admin perro'

        });

    }
}

const loginUsuario = async(req, res = response) => {
    const { email, password } = req.body

    try {

        const usuario = await Usuario.findOne({ email });
        //console.log(usuario);

        if(!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'un usuario no existe con ese email'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'pass incorrecta'
            });
        }

        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        
    }

    
}

const revalidarToken = async(req, res = response) => {

    const {uid, name} = req;

    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        name,
        uid,
        token: token
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}