'use strict';

const mongoose = require('mongoose');
const Postura = mongoose.model('Postura');

exports.getPartogramaId = async(partogramaId) => {
    const res = await Postura.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await Postura.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            posturaArray:{
                $filter:{
                    input: "$posturaArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await Postura.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            posturaArray:{
                $filter:{
                    input: "$posturaArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await Postura.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            posturaArray:{
                $filter:{
                    input: "$posturaArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var postura = new Postura(data); 
    postura.posturaArray[0].dtCadastro = new Date(Date.now());
    postura.posturaArray[0].status = "Criado";
    const res = await postura.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var postura = new Postura(data);
    const res = await Postura.findOneAndUpdate(
        {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
        {
            $push: {
                posturaArray: {
                $each: [{
                    dtEvento : postura.posturaArray[0].dtEvento,
                    observacao : postura.posturaArray[0].observacao,
                    status : "Criado",
                    userCadastro : postura.posturaArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "posturaArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await Postura.findOneAndUpdate(
        { _id: id, partogramaId: partogramaId, "posturaArray._id": idArray},
        {$set: {
            'posturaArray.$.status': 'Cancelado',
            'posturaArray.$.userAtualizacao': user,
            'posturaArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var postura = new Postura(data);
        const res = await Postura.findOneAndUpdate(
            {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
            {
                $push: {
                    posturaArray: {
                    $each: [{
                        dtEvento : postura.posturaArray[0].dtEvento,
                        observacao : postura.posturaArray[0].observacao,
                        status : "Criado",
                        userCadastro : postura.posturaArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "posturaArray": { $slice: -1}
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