'use strict';

const ValidationContract = require('../validators/fluent-validator');''
const repository = require('../repositories/custom2-repository');
const Custom2 = require('../models/custom2');
const nameModel = 'Custom2';

exports.get = async(req, res, next) => {
    try{
        var data = await repository.get(req.body.partogramaId);
        res.status(200).send(data);
    }
    catch(e){
        res.status(400).send({
            message: 'Falha ao processar sua requisição:' + e.message,

        });
    }
};

exports.getByPartogramaId = async(req, res, next) => {
    try{
        var data = await repository.get(req.params.partogramaId);
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
        contract.isRequired(req.body.partogramaId, 'O partogramaId é obrigatório');
        contract.isRequired(req.body.custom2Array[0].titulo, 'O titulo é obrigatório');
        contract.isRequired(req.body.custom2Array[0].valor, 'O valor é obrigatório');
        contract.isRequired(req.body.custom2Array[0].userCadastro, 'O usuário é obrigatório');

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
        contract.isRequired(req.body.partogramaId, 'O partogramaId é obrigatório');
        contract.isRequired(req.body._id, 'O _id é obrigatório');
        contract.isRequired(req.body.custom2Array[0].titulo, 'O titulo é obrigatório');
        contract.isRequired(req.body.custom2Array[0].valor, 'O valor é obrigatório');
        contract.isRequired(req.body.custom2Array[0].userAtualizacao, 'O usuário é obrigatório');

        // Se os dados forem inválidos
        if (!contract.isValid()){
            res.status(400).send(contract.errors()).end();
            return false;
        }

        //busca o registro para verificar o status atual
        var getCurrentRecord = await repository.getById(req.body._id, req.body.partogramaId, req.body.custom2Array[0]._id);
        const currentObj = new Custom2(getCurrentRecord);
     
        if(currentObj.custom2Array.length > 0) {
       
            //atualização do registro
            if(currentObj.custom2Array[0].status != 'Cancelado'){
                //gera um novo registro
                var custom2 = new Custom2(req.body);
                custom2.custom2Array[0].userCadastro = req.body.custom2Array[0].userAtualizacao;
                var result = await repository.updateAndCancel(req.body._id, req.body.partogramaId,custom2,req.body.custom2Array[0]._id,req.body.custom2Array[0].userAtualizacao);
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
            var custom2 = new Custom2(req.body);
            custom2.custom2Array[0].userCadastro = req.body.custom2Array[0].userAtualizacao;
            var result = await repository.update(req.body._id, req.body.partogramaId,custom2);
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
        contract.isRequired(req.body.partogramaId, 'O partogramaId é obrigatório');
        contract.isRequired(req.body.custom2Array[0]._id, 'O id do item é obrigatório');
        contract.isRequired(req.body.custom2Array[0].userAtualizacao, 'O usuário de atualização é obrigatório');

        // Se os dados forem inválidos
        if (!contract.isValid()){
            res.status(400).send(contract.errors()).end();
            return false;
        }

        await repository.updateCancel(req.body._id, req.body.partogramaId,req.body.custom2Array[0]._id,req.body.custom2Array[0].userAtualizacao);
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