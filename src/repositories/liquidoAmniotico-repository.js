'use strict';

const mongoose = require('mongoose');
const LiquidoAmniotico = mongoose.model('LiquidoAmniotico');

exports.getPartogramaId = async(partogramaId) => {
    const res = await LiquidoAmniotico.findOne(
        {partogramaId: partogramaId}
    );
    return res;
};

exports.get = async(partogramaId) => {
    const res = await LiquidoAmniotico.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            liquidoAmnioticoArray:{
                $filter:{
                    input: "$liquidoAmnioticoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getByPartogramaId = async(partogramaId) => {
    const res = await LiquidoAmniotico.findOne(
        {partogramaId: partogramaId},
        {
            partogramaId:1,
            liquidoAmnioticoArray:{
                $filter:{
                    input: "$liquidoAmnioticoArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    );
    return res;
};

exports.getById = async(id, partogramaId, idArray) => {
    const res = await LiquidoAmniotico.findOne(
        {_id: id, partogramaId: partogramaId},
        {
            partogramaId:1,
            liquidoAmnioticoArray:{
                $filter:{
                    input: "$liquidoAmnioticoArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.create = async(data) => {
    var liquidoAmniotico = new LiquidoAmniotico(data); 
    liquidoAmniotico.liquidoAmnioticoArray[0].dtCadastro = new Date(Date.now());
    liquidoAmniotico.liquidoAmnioticoArray[0].status = "Criado";
    const res = await liquidoAmniotico.save();
    return res;
}

exports.update = async(id, partogramaId, data) => {
    var liquidoAmniotico = new LiquidoAmniotico(data);
    const res = await LiquidoAmniotico.findOneAndUpdate(
        {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
        {
            $push: {
            liquidoAmnioticoArray: {
                $each: [{
                    aspectoLiquido : liquidoAmniotico.liquidoAmnioticoArray[0].aspectoLiquido,
                    dtInicioEvento : liquidoAmniotico.liquidoAmnioticoArray[0].dtInicioEvento,
                    dtFimEvento : liquidoAmniotico.liquidoAmnioticoArray[0].dtFimEvento,
                    gemelar : liquidoAmniotico.liquidoAmnioticoArray[0].gemelar,
                    status : "Criado",
                    userCadastro : liquidoAmniotico.liquidoAmnioticoArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "liquidoAmnioticoArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, partogramaId, idArray, user) => {
    await LiquidoAmniotico.findOneAndUpdate(
        { _id: id, partogramaId: partogramaId, "liquidoAmnioticoArray._id": idArray},
        {$set: {
            'liquidoAmnioticoArray.$.status': 'Cancelado',
            'liquidoAmnioticoArray.$.userAtualizacao': user,
            'liquidoAmnioticoArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, partogramaId, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var liquidoAmniotico = new LiquidoAmniotico(data);
        const res = await LiquidoAmniotico.findOneAndUpdate(
            {_id: {$eq: id}, partogramaId: {$eq: partogramaId}},
            {
                $push: {
                liquidoAmnioticoArray: {
                    $each: [{
                        aspectoLiquido : liquidoAmniotico.liquidoAmnioticoArray[0].aspectoLiquido,
                        dtInicioEvento : liquidoAmniotico.liquidoAmnioticoArray[0].dtInicioEvento,
                        dtFimEvento : liquidoAmniotico.liquidoAmnioticoArray[0].dtFimEvento,
                        gemelar : liquidoAmniotico.liquidoAmnioticoArray[0].gemelar,
                        status : "Criado",
                        userCadastro : liquidoAmniotico.liquidoAmnioticoArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "liquidoAmnioticoArray": { $slice: -1}
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