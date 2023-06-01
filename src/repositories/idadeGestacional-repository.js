'use strict';

const mongoose = require('mongoose');
const IdadeGestacional = mongoose.model('IdadeGestacional');

exports.getPartogramaId = async(partogramaId) => {
    const res = await IdadeGestacional.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await IdadeGestacional.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            idadeGestacionalArray:{
                $filter:{
                    input: "$idadeGestacionalArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await IdadeGestacional.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            idadeGestacionalArray:{
                $filter:{
                    input: "$idadeGestacionalArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await IdadeGestacional.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            idadeGestacionalArray:{
                $filter:{
                    input: "$idadeGestacionalArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var idadeGestacional = new IdadeGestacional(data); 
    idadeGestacional.idadeGestacionalArray[0].dtCadastro = new Date(Date.now());
    idadeGestacional.idadeGestacionalArray[0].status = "Criado";
    const res = await idadeGestacional.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var idadeGestacional = new IdadeGestacional(data);
    const res = await IdadeGestacional.findOneAndUpdate(
        {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
        {
            $push: {
                idadeGestacionalArray: {
                $each: [{
                    ultrassomSemanas : idadeGestacional.idadeGestacionalArray[0].ultrassomSemanas,
                    ultrassomDias : idadeGestacional.idadeGestacionalArray[0].ultrassomDias,
                    dumSemanas : idadeGestacional.idadeGestacionalArray[0].dumSemanas,
                    dumDias : idadeGestacional.idadeGestacionalArray[0].dumDias,
                    observacao : idadeGestacional.idadeGestacionalArray[0].observacao,
                    status : "Criado",
                    userCadastro : idadeGestacional.idadeGestacionalArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "idadeGestacionalArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await IdadeGestacional.findOneAndUpdate(
        {_id: id,  partogramaId: partogramaId, "idadeGestacionalArray._id": idArray},
        {$set: {
            'idadeGestacionalArray.$.status': 'Cancelado',
            'idadeGestacionalArray.$.userAtualizacao': user,
            'idadeGestacionalArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var idadeGestacional = new IdadeGestacional(data);
        const res = await IdadeGestacional.findOneAndUpdate(
            {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
            {
                $push: {
                    idadeGestacionalArray: {
                    $each: [{
                        ultrassomSemanas : idadeGestacional.idadeGestacionalArray[0].ultrassomSemanas,
                        ultrassomDias : idadeGestacional.idadeGestacionalArray[0].ultrassomDias,
                        dumSemanas : idadeGestacional.idadeGestacionalArray[0].dumSemanas,
                        dumDias : idadeGestacional.idadeGestacionalArray[0].dumDias,
                        observacao : idadeGestacional.idadeGestacionalArray[0].observacao,
                        status : "Criado",
                        userCadastro : idadeGestacional.idadeGestacionalArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "idadeGestacionalArray": { $slice: -1}
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