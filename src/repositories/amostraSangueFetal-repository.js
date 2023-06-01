'use strict';

const mongoose = require('mongoose');
const AmostraSangueFetal = mongoose.model('AmostraSangueFetal');

exports.getPartogramaId = async(partogramaId) => {
    const res = await AmostraSangueFetal.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await AmostraSangueFetal.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            amostraSangueFetalArray:{
                $filter:{
                    input: "$amostraSangueFetalArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await AmostraSangueFetal.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            amostraSangueFetalArray:{
                $filter:{
                    input: "$amostraSangueFetalArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await AmostraSangueFetal.findOne(
        {
            _id: id,
            partogramaId: partogramaId
        },
        {
            partogramaId:1,
            amostraSangueFetalArray:{
                $filter:{
                    input: "$amostraSangueFetalArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var amostraSangueFetal = new AmostraSangueFetal(data); 
    amostraSangueFetal.amostraSangueFetalArray[0].dtCadastro = new Date(Date.now());
    amostraSangueFetal.amostraSangueFetalArray[0].status = "Criado";
    const res = await amostraSangueFetal.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var amostraSangueFetal = new AmostraSangueFetal(data);
    const res = await AmostraSangueFetal.findOneAndUpdate(
        {_id: {$eq: id},partogramaId: {$eq: partogramaId}},
        {
            $push: {
                amostraSangueFetalArray: {
                $each: [{
                    ph : amostraSangueFetal.amostraSangueFetalArray[0].ph,
                    dtEvento : amostraSangueFetal.amostraSangueFetalArray[0].dtEvento,
                    observacao : amostraSangueFetal.amostraSangueFetalArray[0].observacao,
                    gemelar : amostraSangueFetal.amostraSangueFetalArray[0].gemelar,
                    status : "Criado",
                    userCadastro : amostraSangueFetal.amostraSangueFetalArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "amostraSangueFetalArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await AmostraSangueFetal.findOneAndUpdate(
        {_id: id, partogramaId: partogramaId, "amostraSangueFetalArray._id": idArray},
        {$set: {
            'amostraSangueFetalArray.$.status': 'Cancelado',
            'amostraSangueFetalArray.$.userAtualizacao': user,
            'amostraSangueFetalArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var amostraSangueFetal = new AmostraSangueFetal(data);
        const res = await AmostraSangueFetal.findOneAndUpdate(
            {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
            {
                $push: {
                    amostraSangueFetalArray: {
                    $each: [{
                        ph : amostraSangueFetal.amostraSangueFetalArray[0].ph,
                        dtEvento : amostraSangueFetal.amostraSangueFetalArray[0].dtEvento,
                        observacao : amostraSangueFetal.amostraSangueFetalArray[0].observacao,
                        gemelar : amostraSangueFetal.amostraSangueFetalArray[0].gemelar,
                        status : "Criado",
                        userCadastro : amostraSangueFetal.amostraSangueFetalArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "amostraSangueFetalArray": { $slice: -1}
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