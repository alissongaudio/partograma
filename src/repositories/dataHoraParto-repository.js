'use strict';

const mongoose = require('mongoose');
const DataHoraParto = mongoose.model('DataHoraParto');

exports.getPartogramaId = async(partogramaId) => {
    const res = await DataHoraParto.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await DataHoraParto.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            dataHoraPartoArray:{
                $filter:{
                    input: "$dataHoraPartoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await DataHoraParto.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            dataHoraPartoArray:{
                $filter:{
                    input: "$dataHoraPartoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await DataHoraParto.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            dataHoraPartoArray:{
                $filter:{
                    input: "$dataHoraPartoArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var dataHoraParto = new DataHoraParto(data); 
    dataHoraParto.dataHoraPartoArray[0].dtCadastro = new Date(Date.now());
    dataHoraParto.dataHoraPartoArray[0].status = "Criado";
    const res = await dataHoraParto.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var dataHoraParto = new DataHoraParto(data);
    const res = await DataHoraParto.findOneAndUpdate(
        {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
        {
            $push: {
                dataHoraPartoArray: {
                $each: [{
                    dtEvento : dataHoraParto.dataHoraPartoArray[0].dtEvento,
                    observacao : dataHoraParto.dataHoraPartoArray[0].observacao,
                    gemelar : dataHoraParto.dataHoraPartoArray[0].gemelar,
                    status : "Criado",
                    userCadastro : dataHoraParto.dataHoraPartoArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "dataHoraPartoArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await DataHoraParto.findOneAndUpdate(
        { _id: id, partogramaId: partogramaId, "dataHoraPartoArray._id": idArray},
        {$set: {
            'dataHoraPartoArray.$.status': 'Cancelado',
            'dataHoraPartoArray.$.userAtualizacao': user,
            'dataHoraPartoArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var dataHoraParto = new DataHoraParto(data);
        const res = await DataHoraParto.findOneAndUpdate(
            {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
            {
                $push: {
                    dataHoraPartoArray: {
                    $each: [{
                        dtEvento : dataHoraParto.dataHoraPartoArray[0].dtEvento,
                        observacao : dataHoraParto.dataHoraPartoArray[0].observacao,
                        gemelar : dataHoraParto.dataHoraPartoArray[0].gemelar,
                        status : "Criado",
                        userCadastro : dataHoraParto.dataHoraPartoArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "dataHoraPartoArray": { $slice: -1}
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