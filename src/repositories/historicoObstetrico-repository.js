'use strict';

const mongoose = require('mongoose');
const HistoricoObstetrico = mongoose.model('HistoricoObstetrico');

exports.getPartogramaId = async(partogramaId) => {
    const res = await HistoricoObstetrico.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await HistoricoObstetrico.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            historicoObstetricoArray:{
                $filter:{
                    input: "$historicoObstetricoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await HistoricoObstetrico.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            historicoObstetricoArray:{
                $filter:{
                    input: "$historicoObstetricoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await HistoricoObstetrico.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            historicoObstetricoArray:{
                $filter:{
                    input: "$historicoObstetricoArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var historicoObstetrico = new HistoricoObstetrico(data); 
    historicoObstetrico.historicoObstetricoArray[0].dtCadastro = new Date(Date.now());
    historicoObstetrico.historicoObstetricoArray[0].status = "Criado";
    const res = await historicoObstetrico.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var historicoObstetrico = new HistoricoObstetrico(data);
    const res = await HistoricoObstetrico.findOneAndUpdate(
        {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
        {
            $push: {
                historicoObstetricoArray: {
                $each: [{
                    g : historicoObstetrico.historicoObstetricoArray[0].g,
                    p : historicoObstetrico.historicoObstetricoArray[0].p,
                    partosVaginais : historicoObstetrico.historicoObstetricoArray[0].partosVaginais,
                    partosCesareos : historicoObstetrico.historicoObstetricoArray[0].partosCesareos,
                    perdasPrecoces : historicoObstetrico.historicoObstetricoArray[0].perdasPrecoces,
                    observacao : historicoObstetrico.historicoObstetricoArray[0].observacao,
                    status : "Criado",
                    userCadastro : historicoObstetrico.historicoObstetricoArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "historicoObstetricoArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await HistoricoObstetrico.findOneAndUpdate(
        { _id: id, partogramaId: partogramaId, "historicoObstetricoArray._id": idArray},
        {$set: {
            'historicoObstetricoArray.$.status': 'Cancelado',
            'historicoObstetricoArray.$.userAtualizacao': user,
            'historicoObstetricoArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var historicoObstetrico = new HistoricoObstetrico(data);
        const res = await HistoricoObstetrico.findOneAndUpdate(
            {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
            {
                $push: {
                    historicoObstetricoArray: {
                    $each: [{
                        g : historicoObstetrico.historicoObstetricoArray[0].g,
                        p : historicoObstetrico.historicoObstetricoArray[0].p,
                        partosVaginais : historicoObstetrico.historicoObstetricoArray[0].partosVaginais,
                        partosCesareos : historicoObstetrico.historicoObstetricoArray[0].partosCesareos,
                        perdasPrecoces : historicoObstetrico.historicoObstetricoArray[0].perdasPrecoces,
                        observacao : historicoObstetrico.historicoObstetricoArray[0].observacao,
                        status : "Criado",
                        userCadastro : historicoObstetrico.historicoObstetricoArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "historicoObstetricoArray": { $slice: -1}
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