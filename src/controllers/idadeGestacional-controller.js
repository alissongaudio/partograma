'use strict';

const ValidationContract = require('../validators/fluent-validator');''
const repository = require('../repositories/idadeGestacional-repository');
const IdadeGestacional = require('../models/idadeGestacional');
const nameModel = 'Idade gestacional';

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
        contract.isRequired(req.body.idadeGestacionalArray[0].ultrassomSemanas, 'O número de semanas pelo ultrassom é obrigatório');
        contract.isRequired(req.body.idadeGestacionalArray[0].ultrassomDias, 'O número de dias pelo ultrassom é obrigatório');
        contract.isRequired(req.body.idadeGestacionalArray[0].dumSemanas, 'O número de semanas pelo DUM é obrigatório');
        contract.isRequired(req.body.idadeGestacionalArray[0].dumDias, 'O número de dias pelo DUM é obrigatório');
        contract.isRequired(req.body.idadeGestacionalArray[0].observacao, 'A observação é obrigatório');
        contract.isRequired(req.body.idadeGestacionalArray[0].userCadastro, 'O usuário é obrigatório');
        contract.existsPartogramaToObj(await repository.getPartogramaId(req.body.partogramaId),'Já existe um registro desse objeto para o partograma informado. Atualize pela requisição PUT');
    
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
        contract.isRequired(req.body.idadeGestacionalArray[0].ultrassomSemanas, 'O número de semanas pelo ultrassom é obrigatório');
        contract.isRequired(req.body.idadeGestacionalArray[0].ultrassomDias, 'O número de dias pelo ultrassom é obrigatório');
        contract.isRequired(req.body.idadeGestacionalArray[0].dumSemanas, 'O número de semanas pelo DUM é obrigatório');
        contract.isRequired(req.body.idadeGestacionalArray[0].dumDias, 'O número de dias pelo DUM é obrigatório');
        contract.isRequired(req.body.idadeGestacionalArray[0].observacao, 'A observação é obrigatório');
        contract.isRequired(req.body.idadeGestacionalArray[0].userAtualizacao, 'O usuário é obrigatório');

        // Se os dados forem inválidos
        if (!contract.isValid()){
            res.status(400).send(contract.errors()).end();
            return false;
        }

        //busca o registro para verificar o status atual
        var getCurrentRecord = await repository.getById(req.body._id, req.body.partogramaId, req.body.idadeGestacionalArray[0]._id);
        const currentObj = new IdadeGestacional(getCurrentRecord);
     
        if(currentObj.idadeGestacionalArray.length > 0) {
       
            //atualização do registro
            if(currentObj.idadeGestacionalArray[0].status != 'Cancelado'){
                //gera um novo registro
                var idadeGestacional = new IdadeGestacional(req.body);
                idadeGestacional.idadeGestacionalArray[0].userCadastro = req.body.idadeGestacionalArray[0].userAtualizacao;
                var result = await repository.updateAndCancel(req.body._id, req.body.partogramaId,idadeGestacional,req.body.idadeGestacionalArray[0]._id,req.body.idadeGestacionalArray[0].userAtualizacao);
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
            var idadeGestacional = new IdadeGestacional(req.body);
            idadeGestacional.idadeGestacionalArray[0].userCadastro = req.body.idadeGestacionalArray[0].userAtualizacao;
            var result = await repository.update(req.body._id, req.body.partogramaId,idadeGestacional);
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
        contract.isRequired(req.body.idadeGestacionalArray[0]._id, 'O id do item é obrigatório');
        contract.isRequired(req.body.idadeGestacionalArray[0].userAtualizacao, 'O usuário de atualização é obrigatório');

        // Se os dados forem inválidos
        if (!contract.isValid()){
            res.status(400).send(contract.errors()).end();
            return false;
        }

        await repository.updateCancel(req.body._id, req.body.partogramaId,req.body.idadeGestacionalArray[0]._id,req.body.idadeGestacionalArray[0].userAtualizacao);
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