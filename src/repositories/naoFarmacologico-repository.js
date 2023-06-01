'use strict';

const mongoose = require('mongoose');
const NaoFarmacologico = mongoose.model('NaoFarmacologico');

exports.getPartogramaId = async(partogramaId) => {
    const res = await NaoFarmacologico.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await NaoFarmacologico.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            naoFarmacologicoArray:{
                $filter:{
                    input: "$naoFarmacologicoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await NaoFarmacologico.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            naoFarmacologicoArray:{
                $filter:{
                    input: "$naoFarmacologicoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await NaoFarmacologico.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            naoFarmacologicoArray:{
                $filter:{
                    input: "$naoFarmacologicoArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var naoFarmacologico = new NaoFarmacologico(data); 
    naoFarmacologico.naoFarmacologicoArray[0].dtCadastro = new Date(Date.now());
    naoFarmacologico.naoFarmacologicoArray[0].status = "Criado";
    const res = await naoFarmacologico.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var naoFarmacologico = new NaoFarmacologico(data);
    const res = await NaoFarmacologico.findOneAndUpdate(
        {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
        {
            $push: {
                naoFarmacologicoArray: {
                $each: [{
                    itemNaoFarmacologico : naoFarmacologico.naoFarmacologicoArray[0].itemNaoFarmacologico,
                    dtEvento : naoFarmacologico.naoFarmacologicoArray[0].dtEvento,
                    observacao : naoFarmacologico.naoFarmacologicoArray[0].observacao,
                    status : "Criado",
                    userCadastro : naoFarmacologico.naoFarmacologicoArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "naoFarmacologicoArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await NaoFarmacologico.findOneAndUpdate(
        { _id: id, partogramaId: partogramaId, "naoFarmacologicoArray._id": idArray},
        {$set: {
            'naoFarmacologicoArray.$.status': 'Cancelado',
            'naoFarmacologicoArray.$.userAtualizacao': user,
            'naoFarmacologicoArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var naoFarmacologico = new NaoFarmacologico(data);
        const res = await NaoFarmacologico.findOneAndUpdate(
            {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
            {
                $push: {
                    naoFarmacologicoArray: {
                    $each: [{
                        itemNaoFarmacologico : naoFarmacologico.naoFarmacologicoArray[0].itemNaoFarmacologico,
                        dtEvento : naoFarmacologico.naoFarmacologicoArray[0].dtEvento,
                        observacao : naoFarmacologico.naoFarmacologicoArray[0].observacao,
                        status : "Criado",
                        userCadastro : naoFarmacologico.naoFarmacologicoArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "naoFarmacologicoArray": { $slice: -1}
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