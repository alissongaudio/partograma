'use strict';

const mongoose = require('mongoose');
const Custom6 = mongoose.model('Custom6');

exports.getPartogramaId = async(partogramaId) => {
    const res = await Custom6.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await Custom6.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            custom6Array:{
                $filter:{
                    input: "$custom6Array",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await Custom6.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            custom6Array:{
                $filter:{
                    input: "$custom6Array",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await Custom6.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            custom6Array:{
                $filter:{
                    input: "$custom6Array",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var custom6 = new Custom6(data); 
    custom6.custom6Array[0].dtCadastro = new Date(Date.now());
    custom6.custom6Array[0].status = "Criado";
    const res = await custom6.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var custom6 = new Custom6(data);
    const res = await Custom6.findOneAndUpdate(
        {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
        {
            $push: {
                custom6Array: {
                $each: [{
                    titulo : custom6.custom6Array[0].titulo,
                    valor : custom6.custom6Array[0].valor,
                    status : "Criado",
                    userCadastro : custom6.custom6Array[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "custom6Array": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await Custom6.findOneAndUpdate(
        { _id: id, partogramaId: partogramaId, "custom6Array._id": idArray},
        {$set: {
            'custom6Array.$.status': 'Cancelado',
            'custom6Array.$.userAtualizacao': user,
            'custom6Array.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var custom6 = new Custom6(data);
        const res = await Custom6.findOneAndUpdate(
            {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
            {
                $push: {
                    custom6Array: {
                    $each: [{
                        titulo : custom6.custom6Array[0].titulo,
                        valor : custom6.custom6Array[0].valor,
                        status : "Criado",
                        userCadastro : custom6.custom6Array[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "custom6Array": { $slice: -1}
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