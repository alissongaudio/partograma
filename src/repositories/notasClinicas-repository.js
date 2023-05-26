'use strict';

const mongoose = require('mongoose');
const NotasClinicas = mongoose.model('NotasClinicas');

exports.getPartogramaId = async(partogramaId) => {
    const res = await NotasClinicas.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await NotasClinicas.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            notasClinicasArray:{
                $filter:{
                    input: "$notasClinicasArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await NotasClinicas.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            notasClinicasArray:{
                $filter:{
                    input: "$notasClinicasArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await NotasClinicas.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            notasClinicasArray:{
                $filter:{
                    input: "$notasClinicasArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var notasClinicas = new NotasClinicas(data); 
    notasClinicas.notasClinicasArray[0].dtCadastro = new Date(Date.now());
    notasClinicas.notasClinicasArray[0].status = "Criado";
    const res = await notasClinicas.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var notasClinicas = new NotasClinicas(data);
    const res = await NotasClinicas.findOneAndUpdate(
        {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
        {
            $push: {
                notasClinicasArray: {
                $each: [{
                    dtEvento : notasClinicas.notasClinicasArray[0].dtEvento,
                    observacao : notasClinicas.notasClinicasArray[0].observacao,
                    status : "Criado",
                    userCadastro : notasClinicas.notasClinicasArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "notasClinicasArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await NotasClinicas.findOneAndUpdate(
        {_id: id, partogramaId: partogramaId, "notasClinicasArray._id": idArray},
        {$set: {
            'notasClinicasArray.$.status': 'Cancelado',
            'notasClinicasArray.$.userAtualizacao': user,
            'notasClinicasArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var notasClinicas = new NotasClinicas(data);
        const res = await NotasClinicas.findOneAndUpdate(
            {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
            {
                $push: {
                    notasClinicasArray: {
                    $each: [{
                        dtEvento : notasClinicas.notasClinicasArray[0].dtEvento,
                        observacao : notasClinicas.notasClinicasArray[0].observacao,
                        status : "Criado",
                        userCadastro : notasClinicas.notasClinicasArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "notasClinicasArray": { $slice: -1}
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