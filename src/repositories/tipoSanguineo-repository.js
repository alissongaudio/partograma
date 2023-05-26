'use strict';

const mongoose = require('mongoose');
const TipoSanguineo = mongoose.model('TipoSanguineo');

exports.getPartogramaId = async(partogramaId) => {
    const res = await TipoSanguineo.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await TipoSanguineo.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            tipoSanguineoArray:{
                $filter:{
                    input: "$tipoSanguineoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await TipoSanguineo.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            tipoSanguineoArray:{
                $filter:{
                    input: "$tipoSanguineoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await TipoSanguineo.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            tipoSanguineoArray:{
                $filter:{
                    input: "$tipoSanguineoArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var tipoSanguineo = new TipoSanguineo(data); 
    tipoSanguineo.tipoSanguineoArray[0].dtCadastro = new Date(Date.now());
    tipoSanguineo.tipoSanguineoArray[0].status = "Criado";
    const res = await tipoSanguineo.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var tipoSanguineo = new TipoSanguineo(data);
    const res = await TipoSanguineo.findOneAndUpdate(
        {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
        {
            $push: {
                tipoSanguineoArray: {
                $each: [{
                    grupoABO : tipoSanguineo.tipoSanguineoArray[0].grupoABO,
                    fatorRH : tipoSanguineo.tipoSanguineoArray[0].fatorRH,
                    observacao : tipoSanguineo.tipoSanguineoArray[0].observacao,
                    status : "Criado",
                    userCadastro : tipoSanguineo.tipoSanguineoArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "tipoSanguineoArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await TipoSanguineo.findOneAndUpdate(
        { _id: id, partogramaId: partogramaId, "tipoSanguineoArray._id": idArray},
        {$set: {
            'tipoSanguineoArray.$.status': 'Cancelado',
            'tipoSanguineoArray.$.userAtualizacao': user,
            'tipoSanguineoArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var tipoSanguineo = new TipoSanguineo(data);
        const res = await TipoSanguineo.findOneAndUpdate(
            {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
            {
                $push: {
                    tipoSanguineoArray: {
                    $each: [{
                        grupoABO : tipoSanguineo.tipoSanguineoArray[0].grupoABO,
                        fatorRH : tipoSanguineo.tipoSanguineoArray[0].fatorRH,
                        observacao : tipoSanguineo.tipoSanguineoArray[0].observacao,
                        status : "Criado",
                        userCadastro : tipoSanguineo.tipoSanguineoArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "tipoSanguineoArray": { $slice: -1}
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