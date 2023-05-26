'use strict';

const mongoose = require('mongoose');
const StatusGBS = mongoose.model('StatusGBS');

exports.getPartogramaId = async(partogramaId) => {
    const res = await StatusGBS.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await StatusGBS.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            statusGBSArray:{
                $filter:{
                    input: "$statusGBSArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await StatusGBS.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            statusGBSArray:{
                $filter:{
                    input: "$statusGBSArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await StatusGBS.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            statusGBSArray:{
                $filter:{
                    input: "$statusGBSArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var statusGBS = new StatusGBS(data); 
    statusGBS.statusGBSArray[0].dtCadastro = new Date(Date.now());
    statusGBS.statusGBSArray[0].status = "Criado";
    const res = await statusGBS.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var statusGBS = new StatusGBS(data);
    const res = await StatusGBS.findOneAndUpdate(
        {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
        {
            $push: {
                statusGBSArray: {
                $each: [{
                    statusGbsValue : statusGBS.statusGBSArray[0].statusGbsValue,
                    dtEvento : statusGBS.statusGBSArray[0].dtEvento,
                    observacao : statusGBS.statusGBSArray[0].observacao,
                    status : "Criado",
                    userCadastro : statusGBS.statusGBSArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "statusGBSArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await StatusGBS.findOneAndUpdate(
        { _id: id, partogramaId: partogramaId, "statusGBSArray._id": idArray},
        {$set: {
            'statusGBSArray.$.status': 'Cancelado',
            'statusGBSArray.$.userAtualizacao': user,
            'statusGBSArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var statusGBS = new StatusGBS(data);
        const res = await StatusGBS.findOneAndUpdate(
            {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
            {
                $push: {
                    statusGBSArray: {
                    $each: [{
                        statusGbsValue : statusGBS.statusGBSArray[0].statusGbsValue,
                        dtEvento : statusGBS.statusGBSArray[0].dtEvento,
                        observacao : statusGBS.statusGBSArray[0].observacao,
                        status : "Criado",
                        userCadastro : statusGBS.statusGBSArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "statusGBSArray": { $slice: -1}
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
}