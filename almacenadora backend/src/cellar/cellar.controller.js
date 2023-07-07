'use strict'

const Cellar = require('./cellar.model');
const { validateData } = require('../utils/validate')

exports.addCellar = async (req, res) => {
    try {
        let data = req.body;
        let existCellar = await Cellar.findOne({ name: data.name });
        if (existCellar) {
            return res.send({ message: 'Cellar already created' })
        }
        let cellar = new Cellar(data);
        await cellar.save();
        return res.status(201).send({ message: 'Created cellar' })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error saving cellar' });
    }
}

exports.updateCellar = async (req, res) => {
    try {
        let cellarId = req.params.id;
        let data = req.body;
        let existCellar = await Cellar.findOne({ _id: cellarId });
        if (existCellar) {
            let updatedCellar = await Cellar.findOneAndUpdate(
                { _id: cellarId },
                data,
                { new: true }
            )
            return res.send({ message: 'Updating cellar', updatedCellar });
        }
        return res.send({ message: 'Cellar not found or not updating' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating cellar' })
    }
}

exports.getCellar = async (req, res) => {
    try {
        let cellarId = req.params.id;
        let cellar = await Cellar.findOne({ _id: cellarId });
        if (!cellar) return res.status(404).send({ message: 'Cellar not found' });
        return res.send({ message: 'Cellar found', cellar })
    } catch (err) {
        console.error(err);
        return res.statuts(500).send({ message: 'Error getting cellar' });
    }
}

exports.getCellars = async (req, res) => {
    try {
        let cellars = await Cellar.find();
        return res.send({ message: 'Cellars found', cellars })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting cellars' });
    }
}

exports.deleteCellar = async (req, res) => {
    try {
        let cellarId = req.params.id;
        let deletedCellar = await Cellar.findOneAndDelete({ _id: cellarId });
        if (!deletedCellar) return res.status(404).send({ message: 'Error removing cellar or already deleted' });
        return res.send({ message: 'Cellar deleted sucessfully', deletedCellar });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting cellar' })
    }
}

exports.searchCellar = async (req, res) => {
    try {
        let params = {
            name: req.body.name,
        }
        let validate = validateData(params)
        if (validate) return res.status(400).send(validate);
        let cellars = await Cellar.find({
            name: {
                $regex: params.name,
                $options: 'i'
            }
        })
        return res.send({ cellars })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error searching cellar' })
    }
}

exports.searchCellarAvailability = async (req, res) => {
    try {
        let params = {
            name: req.body.name,
        }
        let validate = validateData(params)
        if (validate) return res.status(400).send(validate);
        let cellars = await Cellar.find({
            name: {
                $regex: params.name,
                $options: 'i'
            },
            availability: 'Availability'
        })
        return res.send({ cellars })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Cellars not found' })
    }
}

exports.searchCellarNoAvailability = async (req, res) => {
    try {
        let params = {
            name: req.body.name,
        }
        let validate = validateData(params)
        if (validate) return res.status(400).send(validate);
        let cellars = await Cellar.find({
            name: {
                $regex: params.name,
                $options: 'i'
            },
            availability: 'NoAvailability'
        })
        return res.send({ cellars })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Cellars not found' })
    }
}