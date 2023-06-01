'use strict';

const mongoose = require('mongoose');
const PosicaoFetal = mongoose.model('PosicaoFetal');

exports.getPartogramaId = async(partogramaId) => {
    const res = await PosicaoFetal.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await PosicaoFetal.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            posicaoFetalArray:{
                $filter:{
                    input: "$posicaoFetalArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await PosicaoFetal.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            posicaoFetalArray:{
                $filter:{
                    input: "$posicaoFetalArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await PosicaoFetal.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            posicaoFetalArray:{
                $filter:{
                    input: "$posicaoFetalArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var posicaoFetal = new PosicaoFetal(data); 
    posicaoFetal.posicaoFetalArray[0].dtCadastro = new Date(Date.now());
    posicaoFetal.posicaoFetalArray[0].status = "Criado";
    const res = await posicaoFetal.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var posicaoFetal = new PosicaoFetal(data);
    const res = await PosicaoFetal.findOneAndUpdate(
        {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
        {
            $push: {
                posicaoFetalArray: {
                $each: [{
                    apresentacaoFetal : posicaoFetal.posicaoFetalArray[0].apresentacaoFetal,
                    variedadePosicaoFetal : posicaoFetal.posicaoFetalArray[0].variedadePosicaoFetal,
                    alturaApresentacaoFetal : posicaoFetal.posicaoFetalArray[0].alturaApresentacaoFetal,
                    dtEvento : posicaoFetal.posicaoFetalArray[0].dtEvento,
                    gemelar : posicaoFetal.posicaoFetalArray[0].gemelar,
                    observacao : posicaoFetal.posicaoFetalArray[0].observacao,
                    status : "Criado",
                    userCadastro : posicaoFetal.posicaoFetalArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "posicaoFetalArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await PosicaoFetal.findOneAndUpdate(
        { _id: id, partogramaId: partogramaId, "posicaoFetalArray._id": idArray},
        {$set: {
            'posicaoFetalArray.$.status': 'Cancelado',
            'posicaoFetalArray.$.userAtualizacao': user,
            'posicaoFetalArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var posicaoFetal = new PosicaoFetal(data);
        const res = await PosicaoFetal.findOneAndUpdate(
            {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
            {
                $push: {
                    posicaoFetalArray: {
                    $each: [{
                        apresentacaoFetal : posicaoFetal.posicaoFetalArray[0].apresentacaoFetal,
                        variedadePosicaoFetal : posicaoFetal.posicaoFetalArray[0].variedadePosicaoFetal,
                        alturaApresentacaoFetal : posicaoFetal.posicaoFetalArray[0].alturaApresentacaoFetal,
                        dtEvento : posicaoFetal.posicaoFetalArray[0].dtEvento,
                        gemelar : posicaoFetal.posicaoFetalArray[0].gemelar,
                        observacao : posicaoFetal.posicaoFetalArray[0].observacao,
                        status : "Criado",
                        userCadastro : posicaoFetal.posicaoFetalArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "posicaoFetalArray": { $slice: -1}
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