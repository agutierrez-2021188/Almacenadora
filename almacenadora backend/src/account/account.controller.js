'use strict'

const Account = require('./account.model')
const { validateData } = require('../utils/validate')

// Funcion test
exports.test = (req, res) => {
    res.send({ message: 'Test function is running' });
}

// Add Account
exports.addAccount = async (req, res) => {
    try {
        let data = req.body;
        let params = {
            dpi: data.dpi,
            name: data.name,
            surname: data.surname,
            phone: data.phone
        }
        let validate = validateData(params);
        if (validate) return res.status(404).send(validate);
        // save
        let account = new Account(data);
        await account.save();
        return res.send({ message: 'Account created sucessfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error Creating Account', error: err.message })
    }
}

// Update Account
exports.updateAccount = async (req, res) => {
    try {
        let accountId = req.params.id;
        //Obtener los datos a actualizar
        let data = req.body;
        //Validar que no lleguen datos no actualizables
        //if (data.dpi || Object.entries(data).length === 0) return res.status(400).send({ message: 'Have submitted some data that cannot be updated' });
        let accountUpdate = await Account.findOneAndUpdate(
            { _id: accountId },
            data,
            { new: true }
        )
        if (!accountUpdate) return res.status(404).send({ message: 'User not found adn not updated' });
        return res.send({ message: 'Account updated', accountUpdate })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error not updated account' });
    }
}

// Delete Account
exports.deleteAccount = async (req, res) => {
    try {
        //Obtener el id a eliminar
        let accountId = req.params.id;
        //Eliminar el usuario
        let accountDeleted = await Account.findOneAndDelete({ _id: accountId });
        if (!accountDeleted) return res.send({ message: 'Account not found and not deleted' });
        return res.send({ message: `Account with username ${accountDeleted.name} deleted sucessfully` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error not deleted' });
    }
}

// Get accounts in BD
exports.getAccounts = async (req, res) => {
    try {
        let accounts = await Account.find()
        return res.send({ message: 'Accounts found', accounts })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting Accounts' });
    }
}



