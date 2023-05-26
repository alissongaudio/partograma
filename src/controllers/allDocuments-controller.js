'use strict';

const ValidationContract = require('../validators/fluent-validator');''
const repository = require('../repositories/allDocuments-repository');

exports.getByPartogramaId = async(req, res, next) => {
    try{
        var data = await repository.getByPartogramaId(req.params.partogramaId);
        res.status(200).send(data);
    }
    catch(e){
        res.status(400).send({
            message: 'Falha ao processar sua requisição:' + e.message,

        });
    }
};

exports.get = async(req, res, next) => {
    try{
        var data = await repository.get();
        res.status(200).send(data);
    }
    catch(e){
        res.status(400).send({
            message: 'Falha ao processar sua requisição:' + e.message,

        });
    }
};
