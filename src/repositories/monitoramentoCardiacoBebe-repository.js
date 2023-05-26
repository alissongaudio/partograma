'use strict';

const mongoose = require('mongoose');
const MonitoramentoCardiacoBebe = mongoose.model('MonitoramentoCardiacoBebe');

exports.getPartogramaId = async(partogramaId) => {
    const res = await MonitoramentoCardiacoBebe.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await MonitoramentoCardiacoBebe.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            monitoramentoCardiacoBebeArray:{
                $filter:{
                    input: "$monitoramentoCardiacoBebeArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await MonitoramentoCardiacoBebe.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            monitoramentoCardiacoBebeArray:{
                $filter:{
                    input: "$monitoramentoCardiacoBebeArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await MonitoramentoCardiacoBebe.findOne(
        {
            _id: id,
            partogramaId: partogramaId
        },
        {
            partogramaId:1,
            monitoramentoCardiacoBebeArray:{
                $filter:{
                    input: "$monitoramentoCardiacoBebeArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var monitoramentoCardiacoBebe = new MonitoramentoCardiacoBebe(data); 
    monitoramentoCardiacoBebe.monitoramentoCardiacoBebeArray[0].dtCadastro = new Date(Date.now());
    monitoramentoCardiacoBebe.monitoramentoCardiacoBebeArray[0].status = "Criado";
    const res = await monitoramentoCardiacoBebe.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var monitoramentoCardiacoBebe = new MonitoramentoCardiacoBebe(data);
    const res = await MonitoramentoCardiacoBebe.findOneAndUpdate(
        {
            _id: {$gte: id},
            partogramaId: {$gte: partogramaId}
        },
        {
            $push: {
                monitoramentoCardiacoBebeArray: {
                $each: [{
                    dtEvento : monitoramentoCardiacoBebe.monitoramentoCardiacoBebeArray[0].dtEvento,
                    frequenciaCardiacaFetal : monitoramentoCardiacoBebe.monitoramentoCardiacoBebeArray[0].frequenciaCardiacaFetal,
                    gemelar : monitoramentoCardiacoBebe.monitoramentoCardiacoBebeArray[0].gemelar,
                    observacao : monitoramentoCardiacoBebe.monitoramentoCardiacoBebeArray[0].observacao,
                    status : "Criado",
                    userCadastro : monitoramentoCardiacoBebe.monitoramentoCardiacoBebeArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "monitoramentoCardiacoBebeArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await MonitoramentoCardiacoBebe.findOneAndUpdate(
        { 
            _id: id,
            partogramaId: partogramaId,
            "monitoramentoCardiacoBebeArray._id": idArray
        },
        {$set: {
            'monitoramentoCardiacoBebeArray.$.status': 'Cancelado',
            'monitoramentoCardiacoBebeArray.$.userAtualizacao': user,
            'monitoramentoCardiacoBebeArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var monitoramentoCardiacoBebe = new MonitoramentoCardiacoBebe(data);
        const res = await MonitoramentoCardiacoBebe.findOneAndUpdate(
            {
                partogramaId: {$gte: partogramaId},
                _id: {$gte: id}
            },
            {
                $push: {
                    monitoramentoCardiacoBebeArray: {
                    $each: [{
                        dtEvento : monitoramentoCardiacoBebe.monitoramentoCardiacoBebeArray[0].dtEvento,
                        frequenciaCardiacaFetal : monitoramentoCardiacoBebe.monitoramentoCardiacoBebeArray[0].frequenciaCardiacaFetal,
                        gemelar : monitoramentoCardiacoBebe.monitoramentoCardiacoBebeArray[0].gemelar,
                        observacao : monitoramentoCardiacoBebe.monitoramentoCardiacoBebeArray[0].observacao,
                        status : "Criado",
                        userCadastro : monitoramentoCardiacoBebe.monitoramentoCardiacoBebeArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "monitoramentoCardiacoBebeArray": { $slice: -1}
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