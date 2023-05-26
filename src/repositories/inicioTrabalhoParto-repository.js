'use strict';

const mongoose = require('mongoose');
const InicioTrabalhoParto = mongoose.model('InicioTrabalhoParto');

exports.getPartogramaId = async(partogramaId) => {
    const res = await InicioTrabalhoParto.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await InicioTrabalhoParto.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            inicioTrabalhoPartoArray:{
                $filter:{
                    input: "$inicioTrabalhoPartoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await InicioTrabalhoParto.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            inicioTrabalhoPartoArray:{
                $filter:{
                    input: "$inicioTrabalhoPartoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await InicioTrabalhoParto.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            inicioTrabalhoPartoArray:{
                $filter:{
                    input: "$inicioTrabalhoPartoArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var inicioTrabalhoParto = new InicioTrabalhoParto(data); 
    inicioTrabalhoParto.inicioTrabalhoPartoArray[0].dtCadastro = new Date(Date.now());
    inicioTrabalhoParto.inicioTrabalhoPartoArray[0].status = "Criado";
    const res = await inicioTrabalhoParto.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var inicioTrabalhoParto = new InicioTrabalhoParto(data);
    const res = await InicioTrabalhoParto.findOneAndUpdate(
        {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
        {
            $push: {
                inicioTrabalhoPartoArray: {
                $each: [{
                    dtEvento : inicioTrabalhoParto.inicioTrabalhoPartoArray[0].dtEvento,
                    observacao : inicioTrabalhoParto.inicioTrabalhoPartoArray[0].observacao,
                    status : "Criado",
                    userCadastro : inicioTrabalhoParto.inicioTrabalhoPartoArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "inicioTrabalhoPartoArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await InicioTrabalhoParto.findOneAndUpdate(
        { _id: id, partogramaId: partogramaId, "inicioTrabalhoPartoArray._id": idArray},
        {$set: {
            'inicioTrabalhoPartoArray.$.status': 'Cancelado',
            'inicioTrabalhoPartoArray.$.userAtualizacao': user,
            'inicioTrabalhoPartoArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var inicioTrabalhoParto = new InicioTrabalhoParto(data);
        const res = await InicioTrabalhoParto.findOneAndUpdate(
            {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
            {
                $push: {
                    inicioTrabalhoPartoArray: {
                    $each: [{
                        dtEvento : inicioTrabalhoParto.inicioTrabalhoPartoArray[0].dtEvento,
                        observacao : inicioTrabalhoParto.inicioTrabalhoPartoArray[0].observacao,
                        status : "Criado",
                        userCadastro : inicioTrabalhoParto.inicioTrabalhoPartoArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "inicioTrabalhoPartoArray": { $slice: -1}
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