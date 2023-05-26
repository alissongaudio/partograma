'use strict';

const mongoose = require('mongoose');
const Contracoes = mongoose.model('Contracoes');

exports.getPartogramaId = async(partogramaId) => {
    const res = await Contracoes.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await Contracoes.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            contracoesArray:{
                $filter:{
                    input: "$contracoesArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await Contracoes.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            contracoesArray:{
                $filter:{
                    input: "$contracoesArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await Contracoes.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            contracoesArray:{
                $filter:{
                    input: "$contracoesArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var contracoes = new Contracoes(data); 
    contracoes.contracoesArray[0].dtCadastro = new Date(Date.now());
    contracoes.contracoesArray[0].status = "Criado";
    const res = await contracoes.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var contracoes = new Contracoes(data);
    const res = await Contracoes.findOneAndUpdate(
        {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
        {
            $push: {
                contracoesArray: {
                $each: [{
                    numeroContracoes : contracoes.contracoesArray[0].numeroContracoes,
                    tempoContracoes : contracoes.contracoesArray[0].tempoContracoes,
                    dtEvento : contracoes.contracoesArray[0].dtEvento,
                    status : "Criado",
                    userCadastro : contracoes.contracoesArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "contracoesArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await Contracoes.findOneAndUpdate(
        { _id: id, partogramaId: partogramaId, "contracoesArray._id": idArray},
        {$set: {
            'contracoesArray.$.status': 'Cancelado',
            'contracoesArray.$.userAtualizacao': user,
            'contracoesArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var contracoes = new Contracoes(data);
        const res = await Contracoes.findOneAndUpdate(
            {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
            {
                $push: {
                    contracoesArray: {
                    $each: [{
                        dtEvento : contracoes.contracoesArray[0].dtEvento,
                        numeroContracoes : contracoes.contracoesArray[0].numeroContracoes,
                        tempoContracoes : contracoes.contracoesArray[0].tempoContracoes,
                        status : "Criado",
                        userCadastro : contracoes.contracoesArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "contracoesArray": { $slice: -1}
                },
            }
        );
        await this.updateCancel(id, partogramaId, idArray, user);
        await session.commitTransaction();
        return res;
        
    }
    catch(err){
        await session.abortTransaction();
    }
    finally{
        session.endSession();
    }
};