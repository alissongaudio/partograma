'use strict';

const mongoose = require('mongoose');
const Farmacologico = mongoose.model('Farmacologico');

exports.getPartogramaId = async(partogramaId) => {
    const res = await Farmacologico.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await Farmacologico.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            farmacologicoArray:{
                $filter:{
                    input: "$farmacologicoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await Farmacologico.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            farmacologicoArray:{
                $filter:{
                    input: "$farmacologicoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await Farmacologico.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            farmacologicoArray:{
                $filter:{
                    input: "$farmacologicoArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var farmacologico = new Farmacologico(data); 
    farmacologico.farmacologicoArray[0].dtCadastro = new Date(Date.now());
    farmacologico.farmacologicoArray[0].status = "Criado";
    const res = await farmacologico.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var farmacologico = new Farmacologico(data);
    const res = await Farmacologico.findOneAndUpdate(
        {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
        {
            $push: {
                farmacologicoArray: {
                $each: [{
                    farmacologico : farmacologico.farmacologicoArray[0].farmacologico,
                    regional : farmacologico.farmacologicoArray[0].regional,
                    dtInicioEvento : farmacologico.farmacologicoArray[0].dtInicioEvento,
                    dtFimEvento : farmacologico.farmacologicoArray[0].dtFimEvento,
                    observacao : farmacologico.farmacologicoArray[0].observacao,
                    status : "Criado",
                    userCadastro : farmacologico.farmacologicoArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "farmacologicoArray": { $slice: -1}
            },
        }
    );
    return res;
};
exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await Farmacologico.findOneAndUpdate(
        { _id: id, partogramaId: partogramaId, "farmacologicoArray._id": idArray},
        {$set: {
            'farmacologicoArray.$.status': 'Cancelado',
            'farmacologicoArray.$.userAtualizacao': user,
            'farmacologicoArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var farmacologico = new Farmacologico(data);
        const res = await Farmacologico.findOneAndUpdate(
            {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
            {
                $push: {
                    farmacologicoArray: {
                    $each: [{
                        farmacologico : farmacologico.farmacologicoArray[0].farmacologico,
                        regional : farmacologico.farmacologicoArray[0].regional,
                        dtInicioEvento : farmacologico.farmacologicoArray[0].dtInicioEvento,
                        dtFimEvento : farmacologico.farmacologicoArray[0].dtFimEvento,
                        observacao : farmacologico.farmacologicoArray[0].observacao,
                        status : "Criado",
                        userCadastro : farmacologico.farmacologicoArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "farmacologicoArray": { $slice: -1}
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