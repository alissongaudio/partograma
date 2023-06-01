'use strict';

const ValidationContract = require('../validators/fluent-validator');''
const service = require('../services/alerta_antibioticoprofilaxia-service');
const AlertaAntibioticoprofilaxia = require('../models/alerta_antibioticoprofilaxia');
const nameModel = 'AlertaAntibioticoprofilaxia';

exports.get = async(req, res, next) => {
    try{
        var data = await service.get(req.params.partogramaId);
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
        var data = await service.getByPartogramaId(req.params.partogramaId);
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

// exports.put = async(req, res, next) => {
//     try{
//         let contract = new ValidationContract();
//         contract.isRequired(req.body.partogramaId, 'O partogramaId é obrigatório');
//         contract.isRequired(req.body._id, 'O _id é obrigatório');
//         contract.isRequired(req.body.amostraSangueFetalArray[0].ph, 'O ph é obrigatório');
//         contract.isRequired(req.body.amostraSangueFetalArray[0].dtEvento, 'A data do evento é obrigatório');
//         contract.isRequired(req.body.amostraSangueFetalArray[0].userAtualizacao, 'O usuário é obrigatório');

//         // Se os dados forem inválidos
//         if (!contract.isValid()){
//             res.status(400).send(contract.errors()).end();
//             return false;
//         }

//         //busca o registro para verificar o status atual
//         var getCurrentRecord = await repository.getById(req.body._id, req.body.partogramaId, req.body.amostraSangueFetalArray[0]._id);
//         const currentObj = new AlertaAntibioticoprofilaxia(getCurrentRecord);
     
//         if(currentObj.amostraSangueFetalArray.length > 0) {
       
//             //atualização do registro
//             if(currentObj.amostraSangueFetalArray[0].status != 'Cancelado'){
//                 //gera um novo registro
//                 var amostraSangueFetal = new AlertaAntibioticoprofilaxia(req.body);
//                 amostraSangueFetal.amostraSangueFetalArray[0].userCadastro = req.body.amostraSangueFetalArray[0].userAtualizacao;
//                 var result = await repository.updateAndCancel(req.body._id, req.body.partogramaId,amostraSangueFetal,req.body.amostraSangueFetalArray[0]._id,req.body.amostraSangueFetalArray[0].userAtualizacao);
//                 res.status(200).send(result);

//             }else{
//                 res.status(400).send({
//                     message: 'Registro cancelado. Não permite alteração!'
//                 });
//                 return false;
//             }
//         }
//         else{
//             //gera um novo registro
//             var amostraSangueFetal = new AlertaAntibioticoprofilaxia(req.body);
//             amostraSangueFetal.amostraSangueFetalArray[0].userCadastro = req.body.amostraSangueFetalArray[0].userAtualizacao;
//             var result = await repository.update(req.body._id, req.body.partogramaId,amostraSangueFetal);
//             res.status(200).send(result);
//         }

//     }
//     catch(e){
//         res.status(500).send({
//             message: 'Falha ao processar sua requisição:' + e.message,
//         });
//     }
// };

// exports.putCancel = async(req, res, next) => {
//     try{
//         let contract = new ValidationContract();
//         contract.isRequired(req.body._id, 'O id é obrigatório');
//         contract.isRequired(req.body.partogramaId, 'O partogramaId é obrigatório');
//         contract.isRequired(req.body.amostraSangueFetalArray[0]._id, 'O id do item é obrigatório');
//         contract.isRequired(req.body.amostraSangueFetalArray[0].userAtualizacao, 'O usuário de atualização é obrigatório');

//         // Se os dados forem inválidos
//         if (!contract.isValid()){
//             res.status(400).send(contract.errors()).end();
//             return false;
//         }

//         await repository.updateCancel(req.body._id, req.body.partogramaId,req.body.amostraSangueFetalArray[0]._id,req.body.amostraSangueFetalArray[0].userAtualizacao);
//         res.status(200).send({
//             message: nameModel.concat(' atualizado com sucesso!')
//         });
//     }
//     catch(e){
//         res.status(500).send({
//             message: 'Falha ao processar sua requisição:' + e.message,
//         });
//     }
// };