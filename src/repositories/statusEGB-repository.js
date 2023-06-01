'use strict';

const mongoose = require('mongoose');
const StatusEGB = mongoose.model('StatusEGB');

exports.getPartogramaId = async(partogramaId) => {
    const res = await StatusEGB.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await StatusEGB.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            statusEGBArray:{
                $filter:{
                    input: "$statusEGBArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await StatusEGB.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            statusEGBArray:{
                $filter:{
                    input: "$statusEGBArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await StatusEGB.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            statusEGBArray:{
                $filter:{
                    input: "$statusEGBArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var statusGBS = new StatusEGB(data); 
    statusGBS.statusEGBArray[0].dtCadastro = new Date(Date.now());
    statusGBS.statusEGBArray[0].status = "Criado";
    const res = await statusGBS.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var statusGBS = new StatusEGB(data);
    const res = await StatusEGB.findOneAndUpdate(
        {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
        {
            $push: {
                statusEGBArray: {
                $each: [{
                    statusEGBValue : statusGBS.statusEGBArray[0].statusEGBValue,
                    dtEvento : statusGBS.statusEGBArray[0].dtEvento,
                    doencaInvasiva : statusGBS.statusEGBArray[0].doencaInvasiva,
                    bacteriuria : statusGBS.statusEGBArray[0].bacteriuria,
                    febreIntraparto : statusGBS.statusEGBArray[0].febreIntraparto,
                    observacao : statusGBS.statusEGBArray[0].observacao,
                    status : "Criado",
                    userCadastro : statusGBS.statusEGBArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "statusEGBArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await StatusEGB.findOneAndUpdate(
        { _id: id, partogramaId: partogramaId, "statusEGBArray._id": idArray},
        {$set: {
            'statusEGBArray.$.status': 'Cancelado',
            'statusEGBArray.$.userAtualizacao': user,
            'statusEGBArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var statusGBS = new StatusEGB(data);
        const res = await StatusEGB.findOneAndUpdate(
            {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
            {
                $push: {
                    statusEGBArray: {
                    $each: [{
                        statusEGBValue : statusGBS.statusEGBArray[0].statusEGBValue,
                        dtEvento : statusGBS.statusEGBArray[0].dtEvento,
                        doencaInvasiva : statusGBS.statusEGBArray[0].doencaInvasiva,
                        bacteriuria : statusGBS.statusEGBArray[0].bacteriuria,
                        febreIntraparto : statusGBS.statusEGBArray[0].febreIntraparto,
                        observacao : statusGBS.statusEGBArray[0].observacao,
                        status : "Criado",
                        userCadastro : statusGBS.statusEGBArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "statusEGBArray": { $slice: -1}
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