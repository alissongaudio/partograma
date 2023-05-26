'use strict';

const mongoose = require('mongoose');
const DataHoraPlacenta = mongoose.model('DataHoraPlacenta');

exports.getPartogramaId = async(partogramaId) => {
    const res = await DataHoraPlacenta.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await DataHoraPlacenta.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            dataHoraPlacentaArray:{
                $filter:{
                    input: "$dataHoraPlacentaArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await DataHoraPlacenta.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            dataHoraPlacentaArray:{
                $filter:{
                    input: "$dataHoraPlacentaArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await DataHoraPlacenta.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            dataHoraPlacentaArray:{
                $filter:{
                    input: "$dataHoraPlacentaArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var dataHoraPlacenta = new DataHoraPlacenta(data); 
    dataHoraPlacenta.dataHoraPlacentaArray[0].dtCadastro = new Date(Date.now());
    dataHoraPlacenta.dataHoraPlacentaArray[0].status = "Criado";
    const res = await dataHoraPlacenta.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var dataHoraPlacenta = new DataHoraPlacenta(data);
    const res = await DataHoraPlacenta.findOneAndUpdate(
        {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
        {
            $push: {
                dataHoraPlacentaArray: {
                $each: [{
                    dtEvento : dataHoraPlacenta.dataHoraPlacentaArray[0].dtEvento,
                    observacao : dataHoraPlacenta.dataHoraPlacentaArray[0].observacao,
                    gemelar : dataHoraPlacenta.dataHoraPlacentaArray[0].gemelar,
                    status : "Criado",
                    userCadastro : dataHoraPlacenta.dataHoraPlacentaArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "dataHoraPlacentaArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await DataHoraPlacenta.findOneAndUpdate(
        { _id: id, partogramaId: partogramaId, "dataHoraPlacentaArray._id": idArray},
        {$set: {
            'dataHoraPlacentaArray.$.status': 'Cancelado',
            'dataHoraPlacentaArray.$.userAtualizacao': user,
            'dataHoraPlacentaArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var dataHoraPlacenta = new DataHoraPlacenta(data);
        const res = await DataHoraPlacenta.findOneAndUpdate(
            {_id: {$gte: id}, partogramaId: {$gte: partogramaId}},
            {
                $push: {
                    dataHoraPlacentaArray: {
                    $each: [{
                        dtEvento : dataHoraPlacenta.dataHoraPlacentaArray[0].dtEvento,
                        observacao : dataHoraPlacenta.dataHoraPlacentaArray[0].observacao,
                        gemelar : dataHoraPlacenta.dataHoraPlacentaArray[0].gemelar,
                        status : "Criado",
                        userCadastro : dataHoraPlacenta.dataHoraPlacentaArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "dataHoraPlacentaArray": { $slice: -1}
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