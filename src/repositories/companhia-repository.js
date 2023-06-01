'use strict';

const mongoose = require('mongoose');
const Companhia = mongoose.model('Companhia');

exports.getPartogramaId = async(partogramaId) => {
    const res = await Companhia.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await Companhia.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            companhiaArray:{
                $filter:{
                    input: "$companhiaArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await Companhia.find(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            companhiaArray:{
                $filter:{
                    input: "$companhiaArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await Companhia.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            companhiaArray:{
                $filter:{
                    input: "$companhiaArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var companhia = new Companhia(data); 
    companhia.companhiaArray[0].dtCadastro = new Date(Date.now());
    companhia.companhiaArray[0].status = "Criado";
    const res = await companhia.save();
    return res;
}

exports.update = async(id, partogramaId, data) => {
    var companhia = new Companhia(data);
    const res = await Companhia.findOneAndUpdate(
        {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
        {
            $push: {
            companhiaArray: {
                $each: [{
                    dtInicioEvento : companhia.companhiaArray[0].dtInicioEvento,
                    dtFimEvento : companhia.companhiaArray[0].dtFimEvento,
                    observacao : companhia.companhiaArray[0].observacao,
                    status : "Criado",
                    userCadastro : companhia.companhiaArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "companhiaArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateItem = async(partogramaId, data) => {
    var companhia = new Companhia(data);
    await Companhia.findOneAndUpdate(
        { partogramaId: companhia.partogramaId, "companhiaArray._id": companhia.companhiaArray[0].id},
        {$set: {
            'companhiaArray.$.dtInicioEvento': companhia.companhiaArray[0].dtInicioEvento,
            'companhiaArray.$.dtFimEvento': companhia.companhiaArray[0].dtFimEvento,
            'companhiaArray.$.status': companhia.companhiaArray[0].status,
            'companhiaArray.$.userAtualizacao': companhia.companhiaArray[0].userAtualizacao,
            'companhiaArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await Companhia.findOneAndUpdate(
        { _id: id, partogramaId: partogramaId, "companhiaArray._id": idArray},
        {$set: {
            'companhiaArray.$.status': 'Cancelado',
            'companhiaArray.$.userAtualizacao': user,
            'companhiaArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var companhia = new Companhia(data);
        const res = await Companhia.findOneAndUpdate(
            {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
            {
                $push: {
                companhiaArray: {
                    $each: [{
                        dtInicioEvento : companhia.companhiaArray[0].dtInicioEvento,
                        dtFimEvento : companhia.companhiaArray[0].dtFimEvento,
                        observacao : companhia.companhiaArray[0].observacao,
                        status : "Criado",
                        userCadastro : companhia.companhiaArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "companhiaArray": { $slice: -1}
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