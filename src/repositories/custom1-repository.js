'use strict';

const mongoose = require('mongoose');
const Custom1 = mongoose.model('Custom1');

exports.getPartogramaId = async(partogramaId) => {
    const res = await Custom1.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await Custom1.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            custom1Array:{
                $filter:{
                    input: "$custom1Array",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await Custom1.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            custom1Array:{
                $filter:{
                    input: "$custom1Array",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await Custom1.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            custom1Array:{
                $filter:{
                    input: "$custom1Array",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var custom1 = new Custom1(data); 
    custom1.custom1Array[0].dtCadastro = new Date(Date.now());
    custom1.custom1Array[0].status = "Criado";
    const res = await custom1.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var custom1 = new Custom1(data);
    const res = await Custom1.findOneAndUpdate(
        {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
        {
            $push: {
                custom1Array: {
                $each: [{
                    titulo : custom1.custom1Array[0].titulo,
                    valor : custom1.custom1Array[0].valor,
                    status : "Criado",
                    userCadastro : custom1.custom1Array[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "custom1Array": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await Custom1.findOneAndUpdate(
        {_id: id,  partogramaId: partogramaId, "custom1Array._id": idArray},
        {$set: {
            'custom1Array.$.status': 'Cancelado',
            'custom1Array.$.userAtualizacao': user,
            'custom1Array.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var custom1 = new Custom1(data);
        const res = await Custom1.findOneAndUpdate(
            {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
            {
                $push: {
                    custom1Array: {
                    $each: [{
                        titulo : custom1.custom1Array[0].titulo,
                        valor : custom1.custom1Array[0].valor,
                        status : "Criado",
                        userCadastro : custom1.custom1Array[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "custom1Array": { $slice: -1}
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