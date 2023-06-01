'use strict'

const mongoose = require('mongoose');
const Custom2 = mongoose.model('Custom2');

exports.getPartogramaId = async(partogramaId) => {
    const res = await Custom2.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await Custom2.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            custom2Array:{
                $filter:{
                    input: "$custom2Array",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await Custom2.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            custom2Array:{
                $filter:{
                    input: "$custom2Array",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await Custom2.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            custom2Array:{
                $filter:{
                    input: "$custom2Array",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var custom2 = new Custom2(data); 
    custom2.custom2Array[0].dtCadastro = new Date(Date.now());
    custom2.custom2Array[0].status = "Criado";
    const res = await custom2.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var custom2 = new Custom2(data);
    const res = await Custom2.findOneAndUpdate(
        {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
        {
            $push: {
                custom2Array: {
                $each: [{
                    titulo : custom2.custom2Array[0].titulo,
                    valor : custom2.custom2Array[0].valor,
                    status : "Criado",
                    userCadastro : custom2.custom2Array[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "custom2Array": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await Custom2.findOneAndUpdate(
        { _id: id, partogramaId: partogramaId, "custom2Array._id": idArray},
        {$set: {
            'custom2Array.$.status': 'Cancelado',
            'custom2Array.$.userAtualizacao': user,
            'custom2Array.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var custom2 = new Custom2(data);
        const res = await Custom2.findOneAndUpdate(
            {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
            {
                $push: {
                    custom2Array: {
                    $each: [{
                        titulo : custom2.custom2Array[0].titulo,
                        valor : custom2.custom2Array[0].valor,
                        status : "Criado",
                        userCadastro : custom2.custom2Array[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "custom2Array": { $slice: -1}
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