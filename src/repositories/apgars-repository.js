'use strict';

const mongoose = require('mongoose');
const Apgars = mongoose.model('Apgars');

exports.getPartogramaId = async(partogramaId) => {
    const res = await Apgars.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await Apgars.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            apgarsArray:{
                $filter:{
                    input: "$apgarsArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await Apgars.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            apgarsArray:{
                $filter:{
                    input: "$apgarsArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await Apgars.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            apgarsArray:{
                $filter:{
                    input: "$apgarsArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var apgars = new Apgars(data); 
    apgars.apgarsArray[0].dtCadastro = new Date(Date.now());
    apgars.apgarsArray[0].status = "Criado";
    const res = await apgars.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var apgars = new Apgars(data);
    const res = await Apgars.findOneAndUpdate(
        {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
        {
            $push: {
                apgarsArray: {
                $each: [{
                    umMinuto : apgars.apgarsArray[0].umMinuto,
                    cincoMinutos : apgars.apgarsArray[0].cincoMinutos,
                    observacao : apgars.apgarsArray[0].observacao,
                    gemelar : apgars.apgarsArray[0].gemelar,
                    status : "Criado",
                    userCadastro : apgars.apgarsArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "apgarsArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await Apgars.findOneAndUpdate(
        { _id: id, partogramaId: partogramaId, "apgarsArray._id": idArray},
        {$set: {
            'apgarsArray.$.status': 'Cancelado',
            'apgarsArray.$.userAtualizacao': user,
            'apgarsArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var apgars = new Apgars(data);
        const res = await Apgars.findOneAndUpdate(
            {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
            {
                $push: {
                    apgarsArray: {
                    $each: [{
                        umMinuto : apgars.apgarsArray[0].umMinuto,
                        cincoMinutos : apgars.apgarsArray[0].cincoMinutos,
                        observacao : apgars.apgarsArray[0].observacao,
                        gemelar : apgars.apgarsArray[0].gemelar,
                        status : "Criado",
                        userCadastro : apgars.apgarsArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "apgarsArray": { $slice: -1}
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