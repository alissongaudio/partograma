'use strict';

const mongoose = require('mongoose');
const IngestaoLiquido = mongoose.model('IngestaoLiquido');

exports.getPartogramaId = async(partogramaId) => {
    const res = await IngestaoLiquido.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await IngestaoLiquido.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            ingestaoLiquidoArray:{
                $filter:{
                    input: "$ingestaoLiquidoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await IngestaoLiquido.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            ingestaoLiquidoArray:{
                $filter:{
                    input: "$ingestaoLiquidoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await IngestaoLiquido.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            ingestaoLiquidoArray:{
                $filter:{
                    input: "$ingestaoLiquidoArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var ingestaoLiquido = new IngestaoLiquido(data); 
    ingestaoLiquido.ingestaoLiquidoArray[0].dtCadastro = new Date(Date.now());
    ingestaoLiquido.ingestaoLiquidoArray[0].status = "Criado";
    const res = await ingestaoLiquido.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var ingestaoLiquido = new IngestaoLiquido(data);
    const res = await IngestaoLiquido.findOneAndUpdate(
        {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
        {
            $push: {
                ingestaoLiquidoArray: {
                $each: [{
                    dtEvento : ingestaoLiquido.ingestaoLiquidoArray[0].dtEvento,
                    observacao : ingestaoLiquido.ingestaoLiquidoArray[0].observacao,
                    status : "Criado",
                    userCadastro : ingestaoLiquido.ingestaoLiquidoArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "ingestaoLiquidoArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await IngestaoLiquido.findOneAndUpdate(
        {_id: id,  partogramaId: partogramaId, "ingestaoLiquidoArray._id": idArray},
        {$set: {
            'ingestaoLiquidoArray.$.status': 'Cancelado',
            'ingestaoLiquidoArray.$.userAtualizacao': user,
            'ingestaoLiquidoArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var ingestaoLiquido = new IngestaoLiquido(data);
        const res = await IngestaoLiquido.findOneAndUpdate(
            {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
            {
                $push: {
                    ingestaoLiquidoArray: {
                    $each: [{
                        dtEvento : ingestaoLiquido.ingestaoLiquidoArray[0].dtEvento,
                        observacao : ingestaoLiquido.ingestaoLiquidoArray[0].observacao,
                        status : "Criado",
                        userCadastro : ingestaoLiquido.ingestaoLiquidoArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "ingestaoLiquidoArray": { $slice: -1}
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