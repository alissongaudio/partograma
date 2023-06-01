'use strict';

const mongoose = require('mongoose');
const PlanoCuidado = mongoose.model('PlanoCuidado');

exports.getPartogramaId = async(partogramaId) => {
    const res = await PlanoCuidado.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await PlanoCuidado.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            planoCuidadoArray:{
                $filter:{
                    input: "$planoCuidadoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await PlanoCuidado.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            planoCuidadoArray:{
                $filter:{
                    input: "$planoCuidadoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await PlanoCuidado.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            planoCuidadoArray:{
                $filter:{
                    input: "$planoCuidadoArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var planoCuidado = new PlanoCuidado(data); 
    planoCuidado.planoCuidadoArray[0].dtCadastro = new Date(Date.now());
    planoCuidado.planoCuidadoArray[0].status = "Criado";
    const res = await planoCuidado.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var planoCuidado = new PlanoCuidado(data);
    const res = await PlanoCuidado.findOneAndUpdate(
        {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
        {
            $push: {
                planoCuidadoArray: {
                $each: [{
                    tipoPlanoCuidado : planoCuidado.planoCuidadoArray[0].tipoPlanoCuidado,
                    observacao : planoCuidado.planoCuidadoArray[0].observacao,
                    status : "Criado",
                    userCadastro : planoCuidado.planoCuidadoArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "planoCuidadoArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await PlanoCuidado.findOneAndUpdate(
        { _id: id, partogramaId: partogramaId, "planoCuidadoArray._id": idArray},
        {$set: {
            'planoCuidadoArray.$.status': 'Cancelado',
            'planoCuidadoArray.$.userAtualizacao': user,
            'planoCuidadoArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var planoCuidado = new PlanoCuidado(data);
        const res = await PlanoCuidado.findOneAndUpdate(
            {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
            {
                $push: {
                    planoCuidadoArray: {
                    $each: [{
                        tipoPlanoCuidado : planoCuidado.planoCuidadoArray[0].tipoPlanoCuidado,
                        observacao : planoCuidado.planoCuidadoArray[0].observacao,
                        status : "Criado",
                        userCadastro : planoCuidado.planoCuidadoArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "planoCuidadoArray": { $slice: -1}
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