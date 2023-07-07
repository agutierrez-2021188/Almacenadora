'use strict'

const Service = require('./additionalServices.model');

// Funcion test
exports.test = (req, res) => {
    res.send({ message: 'Test function is running Additional Service' });
}

// Add Services
exports.addServices = async (req, res) => {
    try {
        let data = req.body;
        //Validar duplicados
        let existService = await Service.findOne({name: data.name});
        if(existService) return res.status(404).send({message: 'Service already existed'})
        // save
        let service = new Service(data);
        await service.save();
        return res.send({ message: 'Service created sucessfully', service });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error Creating Account' })
    }
}

exports.getServices = async(req, res)=>{
    try{
        //Buscar datos
        let services = await Service.find();
        return res.send({message: 'Services found', services});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting services'});
    }
}

exports.updateService = async(req, res)=>{
    try{
        //obtener el Id del producto
        let serviceId = req.params.id;
        //obtener la data a actualizar
        let data = req.body;
        
        //Actualizar
        let updateService = await Service.findOneAndUpdate(
            {_id: serviceId},
            data,
            {new: true}
        )
        if(!updateService) return res.send({message: 'Service not found and not updated'});
        return res.send({message: 'Service updated:', updateService});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error updating product'});
    }
}

