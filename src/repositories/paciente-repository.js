'use strict';

const mongoose = require('mongoose');
const Paciente = mongoose.model('Paciente');

exports.get = async() => {
    const res = await Paciente.find(
        {},
        {
            _id:1,
            pacienteArray:{
                $filter:{
                    input: "$pacienteArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(Id) => {
    const res = await Paciente.findOne(
        {_id: Id},
        {
            _id:1,
            pacienteArray:{
                $filter:{
                    input: "$pacienteArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

// exports.getById = async(idPaciente, id) => {
//     const res = await Paciente.findOne(
//         {_id: idPaciente},
//         {
//             partogramaId:1,
//             pacienteArray:{
//                 $filter:{
//                     input: "$pacienteArray",
//                     as: "item",
//                     cond:{$eq:["$$item._id", mongoose.Types.ObjectId(id)]}
//                 }
//             }
//         }
//     );
//     return res;
// };

exports.create = async(data) => {
    var paciente = new Paciente(data); 
    paciente.pacienteArray[0].dtCadastro = new Date(Date.now());
    paciente.pacienteArray[0].status = "Criado";
    const res = await paciente.save();
    return res;
};

exports.update = async(id, data) => {
    var paciente = new Paciente(data);
    const res = await Paciente.findOneAndUpdate(
        {_id: {$eq: id}},
        {
            $push: {
                pacienteArray: {
                $each: [{
                    nome : paciente.pacienteArray[0].nome,
                    dtNascimento : paciente.pacienteArray[0].dtNascimento,
                    idade : paciente.pacienteArray[0].idade,
                    cpf : paciente.pacienteArray[0].cpf,
                    status : "Criado",
                    userCadastro : paciente.pacienteArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "pacienteArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(idPaciente, id, user) => {
    await Paciente.findOneAndUpdate(
        { _id: idPaciente, "pacienteArray._id": id},
        {$set: {
            'pacienteArray.$.status': 'Cancelado',
            'pacienteArray.$.userAtualizacao': user,
            'pacienteArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(IdPaciente, data, id, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var paciente = new Paciente(data);
        await Paciente.findOneAndUpdate(
            {_id: {$eq: IdPaciente}},
            {
                $push: {
                    pacienteArray: {
                    $each: [{
                        nome : paciente.pacienteArray[0].nome,
                        dtNascimento : paciente.pacienteArray[0].dtNascimento,
                        idade : paciente.pacienteArray[0].idade,
                        cpf : paciente.pacienteArray[0].cpf,
                        status : "Criado",
                        userCadastro : paciente.pacienteArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            }
        );
        await this.updateCancel(IdPaciente,id,user);
        await session.commitTransaction();
    }
    catch(err){
        await session.abortTransaction();
    }
    finally{
        session.endSession();
    }
};