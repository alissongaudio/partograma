'use strict';

const mongoose = require('mongoose');
const Custom5 = mongoose.model('Custom5');

exports.getPartogramaId = async(partogramaId) => {
    const res = await Custom5.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await Custom5.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            custom5Array:{
                $filter:{
                    input: "$custom5Array",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await Custom5.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            custom5Array:{
                $filter:{
                    input: "$custom5Array",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await Custom5.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            custom5Array:{
                $filter:{
                    input: "$custom5Array",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var custom5 = new Custom5(data); 
    custom5.custom5Array[0].dtCadastro = new Date(Date.now());
    custom5.custom5Array[0].status = "Criado";
    const res = await custom5.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var custom5 = new Custom5(data);
    const res = await Custom5.findOneAndUpdate(
        {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
        {
            $push: {
                custom5Array: {
                $each: [{
                    titulo : custom5.custom5Array[0].titulo,
                    valor : custom5.custom5Array[0].valor,
                    status : "Criado",
                    userCadastro : custom5.custom5Array[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "custom5Array": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await Custom5.findOneAndUpdate(
        { _id: id, partogramaId: partogramaId, "custom5Array._id": idArray},
        {$set: {
            'custom5Array.$.status': 'Cancelado',
            'custom5Array.$.userAtualizacao': user,
            'custom5Array.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var custom5 = new Custom5(data);
        const res = await Custom5.findOneAndUpdate(
            {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
            {
                $push: {
                    custom5Array: {
                    $each: [{
                        titulo : custom5.custom5Array[0].titulo,
                        valor : custom5.custom5Array[0].valor,
                        status : "Criado",
                        userCadastro : custom5.custom5Array[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "custom5Array": { $slice: -1}
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