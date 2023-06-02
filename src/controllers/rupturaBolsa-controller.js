'use strict';

const ValidationContract = require('../validators/fluent-validator');''
const repository = require('../repositories/rupturaBolsa-repository');
const repositoryLiquidoAmniotico = require('../repositories/liquidoAmniotico-repository');
const RupturaBolsa = require('../models/rupturaBolsa');
const alertService = require('../services/alerta_antibioticoprofilaxia-service');
const nameModel = 'Ruptura Bolsa';

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
        contract.isRequired(req.body.rupturaBolsaArray[0].dtEvento, 'A dtEvento é obrigatório');
        contract.isRequired(req.body.rupturaBolsaArray[0].bolsa, 'A bolsa é obrigatório');
        contract.isRequired(req.body.rupturaBolsaArray[0].statusRupturaMembrana, 'O status da ruptura da membrana é obrigatório');
        contract.isRequired(req.body.rupturaBolsaArray[0].indicacaoAmniotomia, 'A indicação da Amniotomia é obrigatório');
        contract.isRequired(req.body.rupturaBolsaArray[0].volumeLiquidoAmniotico, 'O volume do liquido amniótico é obrigatório');
        contract.isRequired(req.body.rupturaBolsaArray[0].userCadastro, 'O usuário é obrigatório');
        contract.isRequired(req.body.liquidoAmnioticoArray[0].aspectoLiquido, 'O aspecto do liquido é obrigatório');
        contract.isRequired(req.body.liquidoAmnioticoArray[0].dtInicioEvento, 'A data do evento é obrigatória');
        contract.isRequired(req.body.liquidoAmnioticoArray[0].userCadastro, 'O usuário é obrigatório');
        if (req.body.rupturaBolsaArray[0].bolsa === 'Diamniótica'){
            contract.isRequired(req.body.rupturaBolsaArray[0].gemelar, 'O gemelar 1 é obrigatóriona na ruptura para bolsa Diamniótica');
            contract.isRequired(req.body.liquidoAmnioticoArray[0].gemelar, 'O gemelar 1 é obrigatório no liquido amniótico para bolsa Diamniótica');
        }
        contract.existsPartogramaToObj(await repository.getPartogramaId(req.body.partogramaId),'Já existe um registro desse objeto para o partograma informado. Atualize pela requisição PUT');
    
        // Se os dados forem inválidos
        if (!contract.isValid()){
            res.status(400).send(contract.errors()).end();
            return false;
        }

        //Liquido Amnitótico
        let resLiquidoAmniotico = await repositoryLiquidoAmniotico.create(req.body)

        // //Ruptura Bolsa
        var result = await repository.create(req.body, resLiquidoAmniotico.liquidoAmnioticoArray[0]._id);
        res.status(200).send(result);
    }
    catch(e){
        res.status(500).send({
        message: 'Falha ao processar sua requisição:' + e.message,
        })
    }
    finally{
       await alertService.insert(req.body.partogramaId,'dtHoraRompimentoBolsa',req.body.rupturaBolsaArray[0].dtEvento);
       alertService.checkRule(req.body.partogramaId);
    }
};

exports.put = async(req, res, next) => {
    try{
        let contract = new ValidationContract();
        contract.isRequired(req.body.partogramaId, 'O partogramaId é obrigatório');
        contract.isRequired(req.body._id, 'O _id é obrigatório');
        contract.isRequired(req.body.rupturaBolsaArray[0].dtEvento, 'A dtEvento é obrigatório');
        contract.isRequired(req.body.rupturaBolsaArray[0].bolsa, 'A bolsa é obrigatório');
        contract.isRequired(req.body.rupturaBolsaArray[0].statusRupturaMembrana, 'O status da ruptura da membrana é obrigatório');
        contract.isRequired(req.body.rupturaBolsaArray[0].indicacaoAmniotomia, 'A indicação da Amniotomia é obrigatório');
        contract.isRequired(req.body.rupturaBolsaArray[0].volumeLiquidoAmniotico, 'O volume do liquido amniótico é obrigatório');
        contract.isRequired(req.body.rupturaBolsaArray[0].userAtualizacao, 'O usuário é obrigatório');
        if (req.body.rupturaBolsaArray[0].bolsa === 'Diamniótica'){
            contract.isRequired(req.body.rupturaBolsaArray[0].gemelar, 'O gemelar é obrigatório para bolsa Diamniótica');
        }

        // Se os dados forem inválidos
        if (!contract.isValid()){
            res.status(400).send(contract.errors()).end();
            return false;
        }

        //busca o registro da ruptura para verificar o status atual
        var getCurrentRecord = await repository.getById(req.body._id, req.body.partogramaId, req.body.rupturaBolsaArray[0]._id);
        const currentObj = new RupturaBolsa(getCurrentRecord);
   
        if(currentObj.rupturaBolsaArray.length > 0 ) {
      
            //atualização do registro
            if(currentObj.rupturaBolsaArray[0].status != 'Cancelado'){

                //gera um novo registro da ruptura 
                var rupturaBolsa = new RupturaBolsa(req.body);
                rupturaBolsa.rupturaBolsaArray[0].userCadastro = req.body.rupturaBolsaArray[0].userAtualizacao;
                var result = await repository.updateAndCancel(req.body._id, req.body.partogramaId,rupturaBolsa,req.body.rupturaBolsaArray[0]._id,req.body.rupturaBolsaArray[0].userAtualizacao);
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
            var rupturaBolsa = new RupturaBolsa(req.body);
            rupturaBolsa.rupturaBolsaArray[0].userCadastro = req.body.rupturaBolsaArray[0].userAtualizacao;
            var result = await repository.update(req.body._id, req.body.partogramaId,rupturaBolsa);
            res.status(200).send(result);
        }

    }
    catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição:' + e.message,
        });
    }
    finally{
        alertService.insert(req.body.partogramaId,'dtHoraRompimentoBolsa',req.body.rupturaBolsaArray[0].dtEvento);
        alertService.checkRule(req.body.partogramaId);
    }
};

exports.putCancel = async(req, res, next) => {
    try{
        let contract = new ValidationContract();
        contract.isRequired(req.body._id, 'O id é obrigatório');
        contract.isRequired(req.body.partogramaId, 'O partogramaId é obrigatório');
        contract.isRequired(req.body.rupturaBolsaArray[0]._id, 'O id do item é obrigatório');
        contract.isRequired(req.body.rupturaBolsaArray[0].userAtualizacao, 'O usuário de atualização é obrigatório');

        // Se os dados forem inválidos
        if (!contract.isValid()){
            res.status(400).send(contract.errors()).end();
            return false;
        }

        await repository.updateCancel(req.body._id, req.body.partogramaId,req.body.rupturaBolsaArray[0]._id,req.body.rupturaBolsaArray[0].userAtualizacao);
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