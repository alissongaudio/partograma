'use strict';

const mongoose = require('mongoose');
const Custom4 = mongoose.model('Custom4');

exports.getPartogramaId = async(partogramaId) => {
    const res = await Custom4.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await Custom4.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            custom4Array:{
                $filter:{
                    input: "$custom4Array",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await Custom4.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            custom4Array:{
                $filter:{
                    input: "$custom4Array",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await Custom4.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            custom4Array:{
                $filter:{
                    input: "$custom4Array",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var custom4 = new Custom4(data); 
    custom4.custom4Array[0].dtCadastro = new Date(Date.now());
    custom4.custom4Array[0].status = "Criado";
    const res = await custom4.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var custom4 = new Custom4(data);
    const res = await Custom4.findOneAndUpdate(
        {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
        {
            $push: {
                custom4Array: {
                $each: [{
                    titulo : custom4.custom4Array[0].titulo,
                    valor : custom4.custom4Array[0].valor,
                    status : "Criado",
                    userCadastro : custom4.custom4Array[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "custom4Array": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await Custom4.findOneAndUpdate(
        {_id: id,  partogramaId: partogramaId, "custom4Array._id": idArray},
        {$set: {
            'custom4Array.$.status': 'Cancelado',
            'custom4Array.$.userAtualizacao': user,
            'custom4Array.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var custom4 = new Custom4(data);
        const res = await Custom4.findOneAndUpdate(
            {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
            {
                $push: {
                    custom4Array: {
                    $each: [{
                        titulo : custom4.custom4Array[0].titulo,
                        valor : custom4.custom4Array[0].valor,
                        status : "Criado",
                        userCadastro : custom4.custom4Array[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "custom4Array": { $slice: -1}
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