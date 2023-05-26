'use strict';

const ValidationContract = require('../validators/fluent-validator');''
const repository = require('../repositories/partograma-repository');
const Partograma = require('../models/partograma');
const nameModel = 'Partograma';

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

exports.getById = async(req, res, next) => {
    try{
        let contract = new ValidationContract();
        contract.isRequired(req.params.id, 'O id é obrigatório');
        
        // Se os dados forem inválidos
        if (!contract.isValid()){
            res.status(400).send(contract.errors()).end();
            return false;
        }

        var data = await repository.getPartogramaById(req.params.id);
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
        contract.isRequired(req.body.pacienteId, 'O nome pacienteId é obrigatório');
        contract.isRequired(req.body.partogramaArray[0].responsavel, 'O responsavel é obrigatório');
        contract.isRequired(req.body.partogramaArray[0].horario, 'O horario é obrigatório');
        contract.isRequired(req.body.partogramaArray[0].statusPartograma, 'O statusPartograma é obrigatório');
        contract.isRequired(req.body.partogramaArray[0].leito, 'O leito é obrigatório');
        contract.isRequired(req.body.partogramaArray[0].mv, 'O mv é obrigatório');
        contract.isRequired(req.body.partogramaArray[0].userCadastro, 'O userCadastro é obrigatório');

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

exports.put = async(req, res, next) => {
    try{
        let contract = new ValidationContract();
        contract.isRequired(req.body._id, 'O id do partograma é obrigatório');
        contract.isRequired(req.body.partogramaArray[0]._id, 'O id do item é obrigatório');
        contract.isRequired(req.body.partogramaArray[0].responsavel, 'O responsavel é obrigatório');
        contract.isRequired(req.body.partogramaArray[0].horario, 'O horario é obrigatório');
        contract.isRequired(req.body.partogramaArray[0].statusPartograma, 'O statusPartograma é obrigatório');
        contract.isRequired(req.body.partogramaArray[0].leito, 'O leito é obrigatório');
        contract.isRequired(req.body.partogramaArray[0].mv, 'O mv é obrigatório');
        contract.isRequired(req.body.partogramaArray[0].userAtualizacao, 'O usuário é obrigatório');

        // Se os dados forem inválidos
        if (!contract.isValid()){
            res.status(400).send(contract.errors()).end();
            return false;
        }

        //busca o registro para verificar o status atual
        var getCurrentRecord = await repository.getById(req.body._id, req.body.partogramaArray[0]._id);
        const currentObj = new Partograma(getCurrentRecord);
     
        if(currentObj.partogramaArray.length > 0) {
       
            //atualização do registro
            if(currentObj.partogramaArray[0].status != 'Cancelado'){
                //gera um novo registro
                var partograma = new Partograma(req.body);
                partograma.partogramaArray[0].userCadastro = req.body.partogramaArray[0].userAtualizacao;
                var result = await repository.updateAndCancel(req.body._id, partograma, req.body.partogramaArray[0]._id, req.body.partogramaArray[0].userAtualizacao);
                res.status(200).send(result);

            }else{
                res.status(400).send({
                    message: 'Registro cancelado. Não permite alteração!'
                });
                return false;
            }
        }
        else{
            //gera um novo registro
            var partograma = new Partograma(req.body);
            partograma.partogramaArray[0].userCadastro = req.body.partogramaArray[0].userAtualizacao;
            var result = await repository.update(req.body._id, partograma);
            res.status(200).send(result);
        }

    }
    catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição:' + e.message,
        });
    }
};

exports.putCancel = async(req, res, next) => {
    try{
        let contract = new ValidationContract();
        contract.isRequired(req.body._id, 'O id é obrigatório');
        contract.isRequired(req.body.partogramaArray[0]._id, 'O id item é obrigatório');
        contract.isRequired(req.body.partogramaArray[0].userAtualizacao, 'O usuário de atualização é obrigatório');

        // Se os dados forem inválidos
        if (!contract.isValid()){
            res.status(400).send(contract.errors()).end();
            return false;
        }

        await repository.updateCancel(req.body._id, req.body.partogramaArray[0]._id,req.body.partogramaArray[0].userAtualizacao);
        res.status(200).send({
            message: nameModel.concat(' atualizado com sucesso!')
        });
    }
    catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição:' + e.message,
        });
    }
};