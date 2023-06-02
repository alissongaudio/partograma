'use strict';

const service = require('../services/alerta_expulsivoProlongado-service');

exports.getByPartogramaId = async(req, res, next) => {
    try{
        var data = await service.checkRule(req.params.partogramaId);
        res.status(200).send(data);
    }
    catch(e){
        res.status(400).send({
            message: 'Falha ao processar sua requisição:' + e.message,

        });
    }
};

exports.post = async(req, res, next) => {
    try{    
        var result = await service.insert(req.body.partogramaId, req.body.key, req.body.value);
        res.status(200).send(result);
    }
    catch(e){
        res.status(500).send({
        message: 'Falha ao processar sua requisição:' + e.message,
        })
    }
};