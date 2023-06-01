'use strict';

const mongoose = require('mongoose');
const Dequitacao = mongoose.model('Dequitacao');

exports.getPartogramaId = async(partogramaId) => {
    const res = await Dequitacao.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await Dequitacao.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            dequitacaoArray:{
                $filter:{
                    input: "$dequitacaoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await Dequitacao.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            dequitacaoArray:{
                $filter:{
                    input: "$dequitacaoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await Dequitacao.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            dequitacaoArray:{
                $filter:{
                    input: "$dequitacaoArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var dequitacao = new Dequitacao(data); 
    dequitacao.dequitacaoArray[0].dtCadastro = new Date(Date.now());
    dequitacao.dequitacaoArray[0].status = "Criado";
    const res = await dequitacao.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var dequitacao = new Dequitacao(data);
    const res = await Dequitacao.findOneAndUpdate(
        {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
        {
            $push: {
                dequitacaoArray: {
                $each: [{
                    dtEvento : dequitacao.dequitacaoArray[0].dtEvento,
                    observacao : dequitacao.dequitacaoArray[0].observacao,
                    gemelar : dequitacao.dequitacaoArray[0].gemelar,
                    status : "Criado",
                    userCadastro : dequitacao.dequitacaoArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "dequitacaoArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await Dequitacao.findOneAndUpdate(
        {_id: id,  partogramaId: partogramaId, "dequitacaoArray._id": idArray},
        {$set: {
            'dequitacaoArray.$.status': 'Cancelado',
            'dequitacaoArray.$.userAtualizacao': user,
            'dequitacaoArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var dequitacao = new Dequitacao(data);
        const res = await Dequitacao.findOneAndUpdate(
            {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
            {
                $push: {
                    dequitacaoArray: {
                    $each: [{
                        dtEvento : dequitacao.dequitacaoArray[0].dtEvento,
                        observacao : dequitacao.dequitacaoArray[0].observacao,
                        gemelar : dequitacao.dequitacaoArray[0].gemelar,
                        status : "Criado",
                        userCadastro : dequitacao.dequitacaoArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "dequitacaoArray": { $slice: -1}
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