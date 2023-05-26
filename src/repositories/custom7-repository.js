'use strict';

const mongoose = require('mongoose');
const Custom7 = mongoose.model('Custom7');

exports.getPartogramaId = async(partogramaId) => {
    const res = await Custom7.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await Custom7.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            custom7Array:{
                $filter:{
                    input: "$custom7Array",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await Custom7.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            custom7Array:{
                $filter:{
                    input: "$custom7Array",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await Custom7.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            custom7Array:{
                $filter:{
                    input: "$custom7Array",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var custom7 = new Custom7(data); 
    custom7.custom7Array[0].dtCadastro = new Date(Date.now());
    custom7.custom7Array[0].status = "Criado";
    const res = await custom7.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var custom7 = new Custom7(data);
    const res = await Custom7.findOneAndUpdate(
        {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
        {
            $push: {
                custom7Array: {
                $each: [{
                    titulo : custom7.custom7Array[0].titulo,
                    valor : custom7.custom7Array[0].valor,
                    status : "Criado",
                    userCadastro : custom7.custom7Array[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "custom7Array": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await Custom7.findOneAndUpdate(
        { _id: id, partogramaId: partogramaId, "custom7Array._id": idArray},
        {$set: {
            'custom7Array.$.status': 'Cancelado',
            'custom7Array.$.userAtualizacao': user,
            'custom7Array.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var custom7 = new Custom7(data);
        const res = await Custom7.findOneAndUpdate(
            {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
            {
                $push: {
                    custom7Array: {
                    $each: [{
                        titulo : custom7.custom7Array[0].titulo,
                        valor : custom7.custom7Array[0].valor,
                        status : "Criado",
                        userCadastro : custom7.custom7Array[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "custom7Array": { $slice: -1}
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