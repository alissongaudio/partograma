'use strict';

const mongoose = require('mongoose');
const Sangramento = mongoose.model('Sangramento');

exports.getPartogramaId = async(partogramaId) => {
    const res = await Sangramento.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await Sangramento.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            sangramentoArray:{
                $filter:{
                    input: "$sangramentoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await Sangramento.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            sangramentoArray:{
                $filter:{
                    input: "$sangramentoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await Sangramento.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            sangramentoArray:{
                $filter:{
                    input: "$sangramentoArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var sangramento = new Sangramento(data); 
    sangramento.sangramentoArray[0].dtCadastro = new Date(Date.now());
    sangramento.sangramentoArray[0].status = "Criado";
    const res = await sangramento.save();
    return res;
};

exports.update = async(id, partogramaId, data) => {
    var sangramento = new Sangramento(data);
    const res = await Sangramento.findOneAndUpdate(
        {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
        {
            $push: {
                sangramentoArray: {
                $each: [{
                    volume : sangramento.sangramentoArray[0].volume,
                    total : sangramento.sangramentoArray[0].total,
                    dtEvento : sangramento.sangramentoArray[0].dtEvento,
                    observacao : sangramento.sangramentoArray[0].observacao,
                    status : "Criado",
                    userCadastro : sangramento.sangramentoArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "sangramentoArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await Sangramento.findOneAndUpdate(
        {_id: id,  partogramaId: partogramaId, "sangramentoArray._id": idArray},
        {$set: {
            'sangramentoArray.$.status': 'Cancelado',
            'sangramentoArray.$.userAtualizacao': user,
            'sangramentoArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var sangramento = new Sangramento(data);
        const res = await Sangramento.findOneAndUpdate(
            {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
            {
                $push: {
                    sangramentoArray: {
                    $each: [{
                        volume : sangramento.sangramentoArray[0].volume,
                        total : sangramento.sangramentoArray[0].total,
                        dtEvento : sangramento.sangramentoArray[0].dtEvento,
                        observacao : sangramento.sangramentoArray[0].observacao,
                        status : "Criado",
                        userCadastro : sangramento.sangramentoArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "sangramentoArray": { $slice: -1}
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