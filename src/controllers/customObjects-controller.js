'use strict';

const ValidationContract = require('../validators/fluent-validator');''
const repository = require('../repositories/customObjects-repository');
const CustomObjects = require('../models/customObjects');
const nameModel = 'CustomObjects';

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

exports.post = async(req, res, next) => {
    try{
        let contract = new ValidationContract();
        contract.isRequired(req.body.titulo, 'O titulo é obrigatório');
        contract.isRequired(req.body.sequencial, 'O sequencial é obrigatório');
        contract.isRequired(req.body.observacao, 'O observacao é obrigatório');
        contract.isRequired(req.body.userCadastro, 'O userCadastro é obrigatório');

        // Se os dados forem inválidos
        if (!contract.isValid()){
            res.status(400).send(contract.errors()).end();
            return false;
        }
    
        var result = await repository.create(req.body);
        res.status(200).send(result);
    }
    catch(e){
        res.status(500).send({
        message: 'Falha ao processar sua requisição:' + e.message,
        })
    }
};