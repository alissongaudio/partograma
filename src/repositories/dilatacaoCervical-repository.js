'use strict';

const mongoose = require('mongoose');
const DilatacaoCervical = mongoose.model('DilatacaoCervical');

exports.getPartogramaId = async(partogramaId) => {
    const res = await DilatacaoCervical.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await DilatacaoCervical.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            dilatacaoCervicalArray:{
                $filter:{
                    input: "$dilatacaoCervicalArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await DilatacaoCervical.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            dilatacaoCervicalArray:{
                $filter:{
                    input: "$dilatacaoCervicalArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await DilatacaoCervical.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            dilatacaoCervicalArray:{
                $filter:{
                    input: "$dilatacaoCervicalArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var dilatacaoCervical = new DilatacaoCervical(data); 
    dilatacaoCervical.dilatacaoCervicalArray[0].dtCadastro = new Date(Date.now());
    dilatacaoCervical.dilatacaoCervicalArray[0].status = "Criado";
    const res = await dilatacaoCervical.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var dilatacaoCervical = new DilatacaoCervical(data);
    const res = await DilatacaoCervical.findOneAndUpdate(
        {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
        {
            $push: {
                dilatacaoCervicalArray: {
                $each: [{
                    dilatacao : dilatacaoCervical.dilatacaoCervicalArray[0].dilatacao,
                    esvaecimento : dilatacaoCervical.dilatacaoCervicalArray[0].esvaecimento,
                    consistencia : dilatacaoCervical.dilatacaoCervicalArray[0].consistencia,
                    posicao : dilatacaoCervical.dilatacaoCervicalArray[0].posicao,
                    dtEvento : dilatacaoCervical.dilatacaoCervicalArray[0].dtEvento,
                    observacao : dilatacaoCervical.dilatacaoCervicalArray[0].observacao,
                    status : "Criado",
                    userCadastro : dilatacaoCervical.dilatacaoCervicalArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "dilatacaoCervicalArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await DilatacaoCervical.findOneAndUpdate(
        { _id: id, partogramaId: partogramaId, "dilatacaoCervicalArray._id": idArray},
        {$set: {
            'dilatacaoCervicalArray.$.status': 'Cancelado',
            'dilatacaoCervicalArray.$.userAtualizacao': user,
            'dilatacaoCervicalArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var dilatacaoCervical = new DilatacaoCervical(data);
        const res = await DilatacaoCervical.findOneAndUpdate(
            {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
            {
                $push: {
                    dilatacaoCervicalArray: {
                    $each: [{
                        dilatacao : dilatacaoCervical.dilatacaoCervicalArray[0].dilatacao,
                        esvaecimento : dilatacaoCervical.dilatacaoCervicalArray[0].esvaecimento,
                        consistencia : dilatacaoCervical.dilatacaoCervicalArray[0].consistencia,
                        posicao : dilatacaoCervical.dilatacaoCervicalArray[0].posicao,
                        dtEvento : dilatacaoCervical.dilatacaoCervicalArray[0].dtEvento,
                        observacao : dilatacaoCervical.dilatacaoCervicalArray[0].observacao,
                        status : "Criado",
                        userCadastro : dilatacaoCervical.dilatacaoCervicalArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "dilatacaoCervicalArray": { $slice: -1}
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