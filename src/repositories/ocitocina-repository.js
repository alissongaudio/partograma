'use strict';

const mongoose = require('mongoose');
const Ocitocina = mongoose.model('Ocitocina');

exports.getPartogramaId = async(partogramaId) => {
    const res = await Ocitocina.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await Ocitocina.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            ocitocinaArray:{
                $filter:{
                    input: "$ocitocinaArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await Ocitocina.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            ocitocinaArray:{
                $filter:{
                    input: "$ocitocinaArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await Ocitocina.findOne(
        {
            _id: id,
            partogramaId: partogramaId
        },
        {
            partogramaId:1,
            ocitocinaArray:{
                $filter:{
                    input: "$ocitocinaArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var ocitocina = new Ocitocina(data); 
    ocitocina.ocitocinaArray[0].dtCadastro = new Date(Date.now());
    ocitocina.ocitocinaArray[0].status = "Criado";
    const res = await ocitocina.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var ocitocina = new Ocitocina(data);
    const res = await Ocitocina.findOneAndUpdate(
        {
            _id: {$eq: id},
            partogramaId: {$eq: partogramaId}
        },
        {
            $push: {
                ocitocinaArray: {
                $each: [{
                    numeroUnidadesOcitocina : ocitocina.ocitocinaArray[0].numeroUnidadesOcitocina,
                    volumeDiluente : ocitocina.ocitocinaArray[0].volumeDiluente,
                    velocidadeInfusao : ocitocina.ocitocinaArray[0].velocidadeInfusao,
                    doseAdministrada : ocitocina.ocitocinaArray[0].doseAdministrada,
                    dtInicioEvento : ocitocina.ocitocinaArray[0].dtInicioEvento,
                    dtFimEvento : ocitocina.ocitocinaArray[0].dtFimEvento,
                    status : "Criado",
                    userCadastro : ocitocina.ocitocinaArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "ocitocinaArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await Ocitocina.findOneAndUpdate(
        { 
            _id: id,
            partogramaId: partogramaId,
            "ocitocinaArray._id": idArray
        },
        {$set: {
            'ocitocinaArray.$.status': 'Cancelado',
            'ocitocinaArray.$.userAtualizacao': user,
            'ocitocinaArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var ocitocina = new Ocitocina(data);
        const res = await Ocitocina.findOneAndUpdate(
            {
                partogramaId: {$eq: partogramaId},
                _id: {$eq: id}
            },
            {
                $push: {
                    ocitocinaArray: {
                    $each: [{
                        numeroUnidadesOcitocina : ocitocina.ocitocinaArray[0].numeroUnidadesOcitocina,
                        volumeDiluente : ocitocina.ocitocinaArray[0].volumeDiluente,
                        velocidadeInfusao : ocitocina.ocitocinaArray[0].velocidadeInfusao,
                        doseAdministrada : ocitocina.ocitocinaArray[0].doseAdministrada,
                        dtInicioEvento : ocitocina.ocitocinaArray[0].dtInicioEvento,
                        dtFimEvento : ocitocina.ocitocinaArray[0].dtFimEvento,
                        status : "Criado",
                        userCadastro : ocitocina.ocitocinaArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "ocitocinaArray": { $slice: -1}
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