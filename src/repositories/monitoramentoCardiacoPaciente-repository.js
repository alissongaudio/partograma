'use strict';

const mongoose = require('mongoose');
const MonitoramentoCardiacoPaciente = mongoose.model('MonitoramentoCardiacoPaciente');

exports.getPartogramaId = async(partogramaId) => {
    const res = await MonitoramentoCardiacoPaciente.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await MonitoramentoCardiacoPaciente.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            monitoramentoCardiacoPacienteArray:{
                $filter:{
                    input: "$monitoramentoCardiacoPacienteArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await MonitoramentoCardiacoPaciente.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            monitoramentoCardiacoPacienteArray:{
                $filter:{
                    input: "$monitoramentoCardiacoPacienteArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await MonitoramentoCardiacoPaciente.findOne(
        {
            _id: id,
            partogramaId: partogramaId
        },
        {
            partogramaId:1,
            monitoramentoCardiacoPacienteArray:{
                $filter:{
                    input: "$monitoramentoCardiacoPacienteArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var monitoramentoCardiacoPaciente = new MonitoramentoCardiacoPaciente(data); 
    monitoramentoCardiacoPaciente.monitoramentoCardiacoPacienteArray[0].dtCadastro = new Date(Date.now());
    monitoramentoCardiacoPaciente.monitoramentoCardiacoPacienteArray[0].status = "Criado";
    const res = await monitoramentoCardiacoPaciente.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var monitoramentoCardiacoPaciente = new MonitoramentoCardiacoPaciente(data);
    const res = await MonitoramentoCardiacoPaciente.findOneAndUpdate(
        {
            _id: {$gte: id},
            partogramaId: {$gte: partogramaId}
        },
        {
            $push: {
                monitoramentoCardiacoPacienteArray: {
                $each: [{
                    dtEvento : monitoramentoCardiacoPaciente.monitoramentoCardiacoPacienteArray[0].dtEvento,
                    frequenciaCardiaca : monitoramentoCardiacoPaciente.monitoramentoCardiacoPacienteArray[0].frequenciaCardiaca,
                    pressaoArterialSistolica : monitoramentoCardiacoPaciente.monitoramentoCardiacoPacienteArray[0].pressaoArterialSistolica,
                    pressaoArterialDiastolica : monitoramentoCardiacoPaciente.monitoramentoCardiacoPacienteArray[0].pressaoArterialDiastolica,
                    saturacaoO2Materna : monitoramentoCardiacoPaciente.monitoramentoCardiacoPacienteArray[0].saturacaoO2Materna,
                    observacao : monitoramentoCardiacoPaciente.monitoramentoCardiacoPacienteArray[0].observacao,
                    status : "Criado",
                    userCadastro : monitoramentoCardiacoPaciente.monitoramentoCardiacoPacienteArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "monitoramentoCardiacoPacienteArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await MonitoramentoCardiacoPaciente.findOneAndUpdate(
        { 
            _id: id,
            partogramaId: partogramaId,
            "monitoramentoCardiacoPacienteArray._id": idArray
        },
        {$set: {
            'monitoramentoCardiacoPacienteArray.$.status': 'Cancelado',
            'monitoramentoCardiacoPacienteArray.$.userAtualizacao': user,
            'monitoramentoCardiacoPacienteArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var monitoramentoCardiacoPaciente = new MonitoramentoCardiacoPaciente(data);
        const res = await MonitoramentoCardiacoPaciente.findOneAndUpdate(
            {
                partogramaId: {$gte: partogramaId},
                _id: {$gte: id}
            },
            {
                $push: {
                    monitoramentoCardiacoPacienteArray: {
                    $each: [{
                        dtEvento : monitoramentoCardiacoPaciente.monitoramentoCardiacoPacienteArray[0].dtEvento,
                        frequenciaCardiaca : monitoramentoCardiacoPaciente.monitoramentoCardiacoPacienteArray[0].frequenciaCardiaca,
                        pressaoArterialSistolica : monitoramentoCardiacoPaciente.monitoramentoCardiacoPacienteArray[0].pressaoArterialSistolica,
                        pressaoArterialDiastolica : monitoramentoCardiacoPaciente.monitoramentoCardiacoPacienteArray[0].pressaoArterialDiastolica,
                        saturacaoO2Materna : monitoramentoCardiacoPaciente.monitoramentoCardiacoPacienteArray[0].saturacaoO2Materna,
                        observacao : monitoramentoCardiacoPaciente.monitoramentoCardiacoPacienteArray[0].observacao,
                        status : "Criado",
                        userCadastro : monitoramentoCardiacoPaciente.monitoramentoCardiacoPacienteArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "monitoramentoCardiacoPacienteArray": { $slice: -1}
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