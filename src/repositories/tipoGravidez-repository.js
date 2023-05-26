'use strict';

const mongoose = require('mongoose');
const TipoGravidez = mongoose.model('TipoGravidez');

exports.getPartogramaId = async(partogramaId) => {
    const res = await TipoGravidez.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await TipoGravidez.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            tipoGravidezArray:{
                $filter:{
                    input: "$tipoGravidezArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await TipoGravidez.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            tipoGravidezArray:{
                $filter:{
                    input: "$tipoGravidezArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await TipoGravidez.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            tipoGravidezArray:{
                $filter:{
                    input: "$tipoGravidezArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var tipoGravidez = new TipoGravidez(data); 
    tipoGravidez.tipoGravidezArray[0].dtCadastro = new Date(Date.now());
    tipoGravidez.tipoGravidezArray[0].status = "Criado";
    const res = await tipoGravidez.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var tipoGravidez = new TipoGravidez(data);
    const res = await TipoGravidez.findOneAndUpdate(
        {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
        {
            $push: {
                tipoGravidezArray: {
                $each: [{
                    tipoGravidez : tipoGravidez.tipoGravidezArray[0].tipoGravidez,
                    quantidadeBebes : tipoGravidez.tipoGravidezArray[0].quantidadeBebes,
                    observacao : tipoGravidez.tipoGravidezArray[0].observacao,
                    status : "Criado",
                    userCadastro : tipoGravidez.tipoGravidezArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "tipoGravidezArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await TipoGravidez.findOneAndUpdate(
        {_id: id,  partogramaId: partogramaId, "tipoGravidezArray._id": idArray},
        {$set: {
            'tipoGravidezArray.$.status': 'Cancelado',
            'tipoGravidezArray.$.userAtualizacao': user,
            'tipoGravidezArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var tipoGravidez = new TipoGravidez(data);
        const res = await TipoGravidez.findOneAndUpdate(
            {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
            {
                $push: {
                    tipoGravidezArray: {
                    $each: [{
                        tipoGravidez : tipoGravidez.tipoGravidezArray[0].tipoGravidez,
                        quantidadeBebes : tipoGravidez.tipoGravidezArray[0].quantidadeBebes,
                        observacao : tipoGravidez.tipoGravidezArray[0].observacao,
                        status : "Criado",
                        userCadastro : tipoGravidez.tipoGravidezArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "tipoGravidezArray": { $slice: -1}
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