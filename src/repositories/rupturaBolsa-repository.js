'use strict';

const mongoose = require('mongoose');
const RupturaBolsa = mongoose.model('RupturaBolsa');

exports.getPartogramaId = async(partogramaId) => {
    const res = await RupturaBolsa.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await RupturaBolsa.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            rupturaBolsaArray:{
                $filter:{
                    input: "$rupturaBolsaArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await RupturaBolsa.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            rupturaBolsaArray:{
                $filter:{
                    input: "$rupturaBolsaArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await RupturaBolsa.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            rupturaBolsaArray:{
                $filter:{
                    input: "$rupturaBolsaArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.getByPartograma = async(partogramaId) => {
    const res = await RupturaBolsa.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.create = async(data, LiquidoAmnioticoId) => {
    var rupturaBolsa = new RupturaBolsa(data);
    rupturaBolsa.rupturaBolsaArray[0].liquidoAmnioticoId = mongoose.Types.ObjectId(LiquidoAmnioticoId);
    rupturaBolsa.rupturaBolsaArray[0].dtCadastro = new Date(Date.now());
    rupturaBolsa.rupturaBolsaArray[0].status = "Criado";
    const res = await rupturaBolsa.save();
    return res;
};

exports.createGemelar = async(data) => {
    const res = await data.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var rupturaBolsa = new RupturaBolsa(data);
    const res = await RupturaBolsa.findOneAndUpdate(
        {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
        {
            $push: {
                rupturaBolsaArray: {
                $each: [{
                    dtEvento : rupturaBolsa.rupturaBolsaArray[0].dtEvento,
                    bolsa : rupturaBolsa.rupturaBolsaArray[0].bolsa,
                    statusRupturaMembrana : rupturaBolsa.rupturaBolsaArray[0].statusRupturaMembrana,
                    indicacaoAmniotomia : rupturaBolsa.rupturaBolsaArray[0].indicacaoAmniotomia,
                    volumeLiquidoAmniotico : rupturaBolsa.rupturaBolsaArray[0].volumeLiquidoAmniotico,
                    liquidoAmnioticoId : rupturaBolsa.rupturaBolsaArray[0].liquidoAmnioticoId,
                    observacao : rupturaBolsa.rupturaBolsaArray[0].observacao,
                    gemelar : rupturaBolsa.rupturaBolsaArray[0].gemelar,
                    status : "Criado",
                    userCadastro : rupturaBolsa.rupturaBolsaArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "rupturaBolsaArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await RupturaBolsa.findOneAndUpdate(
        { _id: id, partogramaId: partogramaId, "rupturaBolsaArray._id": idArray},
        {$set: {
            'rupturaBolsaArray.$.status': 'Cancelado',
            'rupturaBolsaArray.$.userAtualizacao': user,
            'rupturaBolsaArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var rupturaBolsa = new RupturaBolsa(data);
        const res = await RupturaBolsa.findOneAndUpdate(
            {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
            {
                $push: {
                    rupturaBolsaArray: {
                    $each: [{
                        dtEvento : rupturaBolsa.rupturaBolsaArray[0].dtEvento,
                        bolsa : rupturaBolsa.rupturaBolsaArray[0].bolsa,
                        statusRupturaMembrana : rupturaBolsa.rupturaBolsaArray[0].statusRupturaMembrana,
                        indicacaoAmniotomia : rupturaBolsa.rupturaBolsaArray[0].indicacaoAmniotomia,
                        volumeLiquidoAmniotico : rupturaBolsa.rupturaBolsaArray[0].volumeLiquidoAmniotico,
                        liquidoAmnioticoId : rupturaBolsa.rupturaBolsaArray[0].liquidoAmnioticoId,
                        observacao : rupturaBolsa.rupturaBolsaArray[0].observacao,
                        gemelar : rupturaBolsa.rupturaBolsaArray[0].gemelar,
                        status : "Criado",
                        userCadastro : rupturaBolsa.rupturaBolsaArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "rupturaBolsaArray": { $slice: -1}
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