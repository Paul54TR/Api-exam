const express = require('express');
const routes = express.Router(); 
const Proveedor = require('../models/proveedor');
const Licitación = require('../models/licitacion');

routes.get('/postular/:licitacion/:ruc',(req,res)=>{

    Proveedor.find({ruc: req.params.ruc},(err,proveedor)=>{
        if(err) return res.status(500).send("Error de servidor");
        if(!proveedor) return res.status(404).send("Proveedor no existente");
        
        Licitación.findById(req.params.licitacion,(err,licitacion)=>{
            if(err) return res.status(500).send("Error de servidor");
            if(!licitacion) return res.status(404).send("Licitación no existente");

            var ValidadorSancion = proveedor.sancionado;
            var ValidadorFamiliar = proveedor.familiares;
            var ValidadorCongresista = proveedor.congresistas;
            var ValidadorRegistrado = !proveedor.registrado;
            var ValidadorRubro = (proveedor.rubro!=Licitación.rubro);
            
            var aprobacion = true;
            var razones = [];
            
            if(ValidadorCongresista && ValidadorSancion && ValidadorRubro && ValidadorFamiliar && ValidadorRegistrado){
                aprobacion = false;
            }
            
            if(!aprobacion){
                if(ValidadorCongresista){
                    razones.push("Familiar de Congresista");
                }
                if(ValidadorSancion){
                    razones.push("Proveedor Sancionado");
                }
                if(ValidadorRubro){
                    razones.push("No pertene al rubro")
                }
                if(ValidadorFamiliar){
                    razones.push("Tiene familiares trabajando en el Estado")
                }
                if(ValidadorRegistrado){
                    razones.push("Proveedor no registrado");
                }
            }
    
            var result = {Aprobado: aprobacion , Razones: razones};
    
            res.status(200).send(result);
        })
        
    })
})

routes.get('/licitacion',(req,res)=>{
    Licitación.find({},(err,licitaciones)=>{
        if(err) return res.status(500).send("Error de servidor");
        if(!licitaciones) return res.status(404).send("No hay proveedores rgistrados");

        res.status(200).send({licitaciones});

    })
})
routes.get('/proveedor',(req,res)=>{
    Proveedor.find({},(err,proveedores)=>{
        if(err) return res.status(500).send("Error de servidor");
        if(!proveedores) return res.status(404).send("No hay proveedores rgistrados");

        res.status(200).send({proveedores});

    })
})

routes.post('/licitacion',(req,res)=>{
    var licitacion = new Licitación();
    licitacion.rubro = req.body.rubro;
    licitacion.save((err,licitacionStorage)=>{
        if(err) return res.status(500).send("Erro al registrar licitacion");
        res.status(200).send({licitacionStorage});
    })        
})
routes.post('/proveedor',(req,res)=>{
    var proveedor = new Proveedor();
    proveedor.nombre = req.body.nombre;
    proveedor.sancionado = req.body.sancionado;
    proveedor.familiares = req.body.familiares;
    proveedor.congresistas = req.body.congresistas;
    proveedor.registrado = req.body.registrado;
    proveedor.rubro = req.body.rubro;
    
    proveedor.save((err,proveedorStorage)=>{
        if(err) return res.status(500).send("Erro al registrar licitacion");
        res.status(200).send({proveedorStorage});
    })  
})

module.exports = routes;