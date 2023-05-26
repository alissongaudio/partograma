'use strict';

const mongoose = require('mongoose');
const TipoParto = mongoose.model('TipoParto');

exports.getPartogramaId = async(partogramaId) => {
    const res = await TipoParto.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await TipoParto.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            tipoPartoArray:{
                $filter:{
                    input: "$tipoPartoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await TipoParto.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            tipoPartoArray:{
                $filter:{
                    input: "$tipoPartoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await TipoParto.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            tipoPartoArray:{
                $filter:{
                    input: "$tipoPartoArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var tipoParto = new TipoParto(data); 
    tipoParto.tipoPartoArray[0].dtCadastro = new Date(Date.now());
    tipoParto.tipoPartoArray[0].status = "Criado";
    const res = await tipoParto.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var tipoParto = new TipoParto(data);
    const res = await TipoParto.findOneAndUpdate(
        {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
        {
            $push: {
                tipoPartoArray: {
                $each: [{
                    tipoParto : tipoParto.tipoPartoArray[0].tipoParto,
                    observacao : tipoParto.tipoPartoArray[0].observacao,
                    status : "Criado",
                    userCadastro : tipoParto.tipoPartoArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "tipoPartoArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await TipoParto.findOneAndUpdate(
        { _id: id, partogramaId: partogramaId, "tipoPartoArray._id": idArray},
        {$set: {
            'tipoPartoArray.$.status': 'Cancelado',
            'tipoPartoArray.$.userAtualizacao': user,
            'tipoPartoArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var tipoParto = new TipoParto(data);
        const res = await TipoParto.findOneAndUpdate(
            {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
            {
                $push: {
                    tipoPartoArray: {
                    $each: [{
                        tipoParto : tipoParto.tipoPartoArray[0].tipoParto,
                        observacao : tipoParto.tipoPartoArray[0].observacao,
                        status : "Criado",
                        userCadastro : tipoParto.tipoPartoArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "tipoPartoArray": { $slice: -1}
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