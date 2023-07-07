'use strict'
const Account = require('../account/account.model')
const Cellar = require('../cellar/cellar.model')
const Lease = require('./lease.model')
const Service = require('../additional services/additionalServices.model')

const infoAccount = 'dpi name surname age phone email'
const infoCellar = 'name description location size availability price'
const infoServices = 'name description price'
const infoUser = 'name surname username phone role'

exports.test = (req, res)=>{
    res.send({message: 'Test function is running'});
}

exports.add = async(req, res)=>{
    try{
        let data = req.body
        //verificar si existe los datos
        let existAccount = await Account.findOne({_id: data.account})
        if(!existAccount) return res.status(404).send({message: 'Account not found'})

        //vefificar si la bodega esta disponible 
        let existCellar = await Cellar.findOne({_id: data.cellar})
        if(existCellar.availability === 'not available') return res.status(409).send({message: 'Cellar is already in use'}) 
        // si esta disponible cambiar la disponibilidad 
        await Cellar.findOneAndUpdate({_id: data.cellar}, {availability: 'not available'})

        //agregarlo sumar el precio de la bodega a total 
        data.total = existCellar.price

        //agregar el arrendamiento  
       let lease = new Lease(data)
        await lease.save()
        return res.status(201).send({message: 'Lease saved sucessfully', lease})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to create lease'})
    }
}

exports.delete = async(req, res)=>{
    try{    
        let leaseId = req.params.id
        let deletedLease = await Lease.findOneAndDelete({_id: leaseId})
        //cambiar el estado de la bodega que estaba asignada 
        await Cellar.findOneAndUpdate({_id: deletedLease.cellar},{availability: 'available'})
        if(!deletedLease) return res.status(404).send({message: 'Lease not found and not deleted'})
        return res.send({message: 'Lease deleted sucessfuly'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to deleted lease'})
    }
}

exports.get = async(req, res)=>{
    try{
        let leases = await Lease.find()            
            .populate('account')
            .populate('cellar')
            .populate('user')
        return res.send({message: 'Leases found', leases})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to got leases'})
    }
}

exports.update = async(req, res)=>{
    try{
        let leaseId = req.params.id
        let { cellar } = req.body
        //verificar que los datos existan 
        let existCellar = await Cellar.findOne({_id: cellar})
        if(!existCellar) return res.status(404).send({message: 'Cellar not found'})

        //verificar si es la misma bodega
        let existLease = await Lease.findOne({_id: leaseId}) 
        if(existLease.cellar == cellar) return res.send({message:' Ya tienes asignado la misma bodeba'})

        //verificar si la nueva bodega esta disponible
        if(existCellar.availability === 'not available') return res.status(409).send({message: 'Cellar is already in use'}) 

        // la antigua bodeba se vuelve a habilitar 
        await Cellar.findOneAndUpdate({_id: existLease.cellar},{availability: 'available'})

        // la nueva bodega se desabilita
        await Cellar.findOneAndUpdate({_id: cellar},{availability: 'not available'})
        //actualizar 
        let updatedLease = await Lease.findOneAndUpdate(
            {_id: leaseId},
            {cellar: cellar},
            {new: true}
        )
        if(!updatedLease) return res.send({message: 'Lease not found and not updated'})
        return res.send({message: 'Lease updated', updatedLease})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to updated lease'})
    }
}

//additional Services
exports.addService = async(req, res)=>{
    try{
        let leaseId = req.params.id
        let { service } = req.body
        let total = 0

        //verificar que el servicio existe
        let existService = await Service.findOne({_id: service})
        if(!existService) return res.status(404).send({message: 'Service not found'})

        //verificar que no tenga repetido el servicio
        let existLease = await Lease.findOne({_id: leaseId})

        let totalL = total + existLease.total
        let arrayService = existLease.Services
        console.log(arrayService)
        
        for(let addService of arrayService){
            if(addService._id == service) return res.send({message: 'El servicio ya existe'})
        } 

        //hacer el total 
            let priceService = await Service.findOne({_id: service})
            totalL = totalL+priceService.price
        //agregar
         let updatedLease = await Lease.updateOne(
            {_id: leaseId},
            {$push: {Services: service}},
        )
        await Lease.findOneAndUpdate({_id: leaseId},{total: totalL})

        return res.send({message:'Se guardo', updatedLease})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to agregar service'})
    }
}

exports.deleteService = async(req, res)=>{
    try{
        let leaseId = req.params.id
        let { service } = req.body

        //verificar que tenga el servicio en el arreglo
        let existLease = await Lease.findOne({ _id: leaseId });
        let arrayService = existLease.Services;

        let item = arrayService.find( (objectId) => objectId.toString() === service)
        if (!item) {
          return res.status(404).send({ message: 'El servicio no lo tienes' });
        }
           
        //obtener el valor del total
        let total = existLease.total

        //obtener el valor del servicio
        let existService = await Service.findOne({_id: service})

        //retar el valor del servicio al total 
        total = total - existService.price

        //eliminar el servicio
        await Lease.updateOne(
            {_id: leaseId},
            {$pull: {Services: service}}
        )

        //actualizar el total 
        let updatedLease = await Lease.findOneAndUpdate(
            {_id: leaseId},
            {total: total},
            {new: true}
        )
        if(!updatedLease) return res.send({message: 'no se pudo actualizar el total'})
        return res.send({message: 'hola', updatedLease})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to deleted service'})
    }
}