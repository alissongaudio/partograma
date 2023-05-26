'use strict';

const ValidationContract = require('../validators/fluent-validator');''
const repository = require('../repositories/paciente-repository');
const Paciente = require('../models/paciente');
const nameModel = 'Paciente';

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

        var data = await repository.getById(req.params.id);
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
        contract.isRequired(req.body.pacienteArray[0].nome, 'O nome do Paciente é obrigatório');
        contract.isRequired(req.body.pacienteArray[0].dtNascimento, 'A data de nascimento é obrigatório');
        contract.isRequired(req.body.pacienteArray[0].idade, 'A idade é obrigatório');
        contract.isRequired(req.body.pacienteArray[0].cpf, 'O CPF é obrigatório');
        contract.isRequired(req.body.pacienteArray[0].userCadastro, 'O usuário é obrigatório');

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
        contract.isRequired(req.body._id, 'O id do paciente é obrigatório');
        contract.isRequired(req.body.pacienteArray[0].nome, 'O nome do Paciente é obrigatório');
        contract.isRequired(req.body.pacienteArray[0].dtNascimento, 'A data de nascimento é obrigatório');
        contract.isRequired(req.body.pacienteArray[0].idade, 'A idade é obrigatório');
        contract.isRequired(req.body.pacienteArray[0].cpf, 'O CPF é obrigatório');
        contract.isRequired(req.body.pacienteArray[0].userAtualizacao, 'O usuário é obrigatório');

        // Se os dados forem inválidos
        if (!contract.isValid()){
            res.status(400).send(contract.errors()).end();
            return false;
        }

        //busca o registro para verificar o status atual
        var getCurrentRecord = await repository.getById(req.body._id, req.body.pacienteArray[0]._id);
        const currentObj = new Paciente(getCurrentRecord);
     
        if(currentObj.pacienteArray.length > 0) {
       
            //atualização do registro
            if(currentObj.pacienteArray[0].status != 'Cancelado'){
                //gera um novo registro
                var paciente = new Paciente(req.body);
                paciente.pacienteArray[0].userCadastro = req.body.pacienteArray[0].userAtualizacao;
                var result = await repository.updateAndCancel(req.body._id,paciente,req.body.pacienteArray[0]._id,req.body.pacienteArray[0].userAtualizacao);
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
            var paciente = new Paciente(req.body);
            paciente.pacienteArray[0].userCadastro = req.body.pacienteArray[0].userAtualizacao;
            var result = await repository.update(req.body._id, paciente);
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
        contract.isRequired(req.body.pacienteArray[0]._id, 'O id item é obrigatório');
        contract.isRequired(req.body.pacienteArray[0].userAtualizacao, 'O usuário de atualização é obrigatório');

        // Se os dados forem inválidos
        if (!contract.isValid()){
            res.status(400).send(contract.errors()).end();
            return false;
        }

        await repository.updateCancel(req.body._id, req.body.partogramaId,req.body.pacienteArray[0]._id,req.body.pacienteArray[0].userAtualizacao);
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