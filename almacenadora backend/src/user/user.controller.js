'use strict'

const User = require('./user.model');
const { validateData, encrypt, checkPassword } = require('../utils/validate');
const { createToken } = require('../services/jwt');

//Esta función solo va a ser accesible por los usuario logeados
exports.test = (req, res) => {
    res.send({ message: 'Test function is running' });

}

exports.userDefault = async (req, res) => {
    try {
        let data = {
            name: 'Admin',
            surname: 'Masteer',
            username: 'admin',
            password: '123',
            phone: '33941740',
            role: 'ADMIN'
        }
        data.password = await encrypt(data.password)
        let existeUser = await User.findOne({ name: 'Admin' });
        if (existeUser) return console.log('ADMIN YA CREADO ANTERIORMENTE');
        let defUser = new User(data);
        await defUser.save();
        return console.log('ADMIN CREADO EXITOSAMENTE')
    } catch (error) {
        console.error(error)
    }
}

exports.register = async (req, res) => {
    try {
        //Capturar el fomulario de registro (Body)
        let data = req.body;
        let params = {
            password: data.password,
        }
        let validate = validateData(params);
        if (validate) return res.status(400).send(validate);
        //Role predefinido
        data.role = 'WORKER';
        //Encriptar contraseña
        data.password = await encrypt(data.password)
        //Guardar la información
        let user = new User(data);
        await user.save();
        return res.send({ message: 'Account created sucessfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error creating account', error: err.message })
    }
}

exports.getUsers = async (req, res) => {
    try {
        let users = await User.find();
        return res.send({ message: 'Users found', users })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting users' });
    }
}

exports.save = async (req, res) => {
    try {
        //capturar datos
        let data = req.body;
        let params = {
            password: data.password,
        }
        let validate = validateData(params);
        if (validate) return res.status(400).send(validate);
        //Role predefinido5
        data.role = 'WORKER';
        //encriptar la password
        data.password = await encrypt(data.password);
        //guardar
        let user = new User(data);
        await user.save();
        return res.send({ message: 'Account created sucessfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error saving user', error: err.message });
    }
}

exports.login = async (req, res) => {
    try {
        //Obtener la data a validar (username y password)
        let data = req.body;
        let credentials = { //Los datos obligatorios que va a validar la función validateData
            username: data.username,
            password: data.password
        }
        let msg = validateData(credentials);
        if (msg) return res.status(400).send(msg)
        //validar que exista en la BD
        let user = await User.findOne({ username: data.username });
        //Validar la contraseña
        if (user && await checkPassword(data.password, user.password)) {
            let token = await createToken(user)
            return res.send({ message: 'User logged sucessfully', token });
        }
        return res.status(401).send({ message: 'Invalid credentials' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error, not logged' });
    }
}

exports.update = async (req, res) => {
    try {
        let userId = req.params.id;
        let noAdmin = await User.findOne({_id: "644c4d25bb4255b0d7ac0a46"})
        if (noAdmin._id == userId) {
            return res.send({message: 'No tiene permiso'})
        }
        let data = req.body;
        if (data.password || Object.entries(data).length === 0 || data.role) return res.status(400).send({ message: 'Have submitted some data that cannot be updated' });
        let existUser = await User.findOne({ _id: userId });
        if (existUser) {
            let userUp = await User.findOneAndUpdate(
                { _id: userId },
                data,
                { new: true }
            )
            return res.send({ message: 'Updating user', userUp });
        }
        return res.send({ message: 'User not found or not updating' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating user' })
    }
}

exports.delete = async (req, res) => {
    try {
        //Obtener el id a eliminar
        let userId = req.params.id;
        let noAdmin = await User.findOne({_id: "644c4d25bb4255b0d7ac0a46"})
        if (noAdmin._id == userId) {
            return res.send({message: 'No tiene permiso'})
        }
        //Eliminar
        let userDeleted = await User.findOneAndDelete({ _id: userId });
        if (!userDeleted) return res.send({ message: 'Account not found and not deleted' });
        return res.send({ message: `Account with username ${userDeleted.username} deleted sucessfully` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error not deleted' });
    }
}