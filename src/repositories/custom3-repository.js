'use strict';

const mongoose = require('mongoose');
const Custom3 = mongoose.model('Custom3');

exports.getPartogramaId = async(partogramaId) => {
    const res = await Custom3.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await Custom3.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            custom3Array:{
                $filter:{
                    input: "$custom3Array",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await Custom3.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            custom3Array:{
                $filter:{
                    input: "$custom3Array",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await Custom3.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            custom3Array:{
                $filter:{
                    input: "$custom3Array",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var custom3 = new Custom3(data); 
    custom3.custom3Array[0].dtCadastro = new Date(Date.now());
    custom3.custom3Array[0].status = "Criado";
    const res = await custom3.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var custom3 = new Custom3(data);
    const res = await Custom3.findOneAndUpdate(
        {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
        {
            $push: {
                custom3Array: {
                $each: [{
                    titulo : custom3.custom3Array[0].titulo,
                    valor : custom3.custom3Array[0].valor,
                    status : "Criado",
                    userCadastro : custom3.custom3Array[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "custom3Array": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await Custom3.findOneAndUpdate(
        {_id: id,  partogramaId: partogramaId, "custom3Array._id": idArray},
        {$set: {
            'custom3Array.$.status': 'Cancelado',
            'custom3Array.$.userAtualizacao': user,
            'custom3Array.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var custom3 = new Custom3(data);
        const res = await Custom3.findOneAndUpdate(
            {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
            {
                $push: {
                    custom3Array: {
                    $each: [{
                        titulo : custom3.custom3Array[0].titulo,
                        valor : custom3.custom3Array[0].valor,
                        status : "Criado",
                        userCadastro : custom3.custom3Array[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "custom3Array": { $slice: -1}
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