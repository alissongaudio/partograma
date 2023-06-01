'use strict';

const mongoose = require('mongoose');
const Nascimento = mongoose.model('Nascimento');

exports.getPartogramaId = async(partogramaId) => {
    const res = await Nascimento.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await Nascimento.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            nascimentoArray:{
                $filter:{
                    input: "$nascimentoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await Nascimento.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            nascimentoArray:{
                $filter:{
                    input: "$nascimentoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await Nascimento.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            nascimentoArray:{
                $filter:{
                    input: "$nascimentoArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var nascimento = new Nascimento(data); 
    nascimento.nascimentoArray[0].dtCadastro = new Date(Date.now());
    nascimento.nascimentoArray[0].status = "Criado";
    const res = await nascimento.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var nascimento = new Nascimento(data);
    const res = await Nascimento.findOneAndUpdate(
        {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
        {
            $push: {
                nascimentoArray: {
                $each: [{
                    dtEvento : nascimento.nascimentoArray[0].dtEvento,
                    tipoParto : nascimento.nascimentoArray[0].tipoParto,
                    observacao : nascimento.nascimentoArray[0].observacao,
                    gemelar : nascimento.nascimentoArray[0].gemelar,
                    status : "Criado",
                    userCadastro : nascimento.nascimentoArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "nascimentoArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await Nascimento.findOneAndUpdate(
        {_id: id,  partogramaId: partogramaId, "nascimentoArray._id": idArray},
        {$set: {
            'nascimentoArray.$.status': 'Cancelado',
            'nascimentoArray.$.userAtualizacao': user,
            'nascimentoArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var nascimento = new Nascimento(data);
        const res = await Nascimento.findOneAndUpdate(
            {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
            {
                $push: {
                    nascimentoArray: {
                    $each: [{
                        dtEvento : nascimento.nascimentoArray[0].dtEvento,
                        tipoParto : nascimento.nascimentoArray[0].tipoParto,
                        observacao : nascimento.nascimentoArray[0].observacao,
                        gemelar : nascimento.nascimentoArray[0].gemelar,
                        status : "Criado",
                        userCadastro : nascimento.nascimentoArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "nascimentoArray": { $slice: -1}
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