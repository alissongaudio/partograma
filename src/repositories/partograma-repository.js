'use strict';

const mongoose = require('mongoose');
const Partograma = mongoose.model('Partograma');

exports.get = async() => {
    const res = await Partograma.find(
        {},
        {
            "_id" :1,
            partogramaArray:{
                $filter:{
                    input: "$partogramaArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    )
    .populate({
        path: 'pacienteId'
    })
    ;
    return res;
};

exports.getPartogramaById = async(id) => {
    const res = await Partograma.findOne(
        {_id: id},
        {
            "_id": 1,
            partogramaArray:{
                $filter:{
                    input: "$partogramaArray",
                    as: "item",
                    cond:{$eq:["$$item.status","Criado"]}
                }
            }
        }
    )
    .populate({
        path: 'pacienteId'
    }
    )
    ;
    return res;
};

exports.getById = async(id, idArray) => {
    const res = await Partograma.findOne(
        {
            _id: id
        },
        {
            partogramaId:1,
            partogramaArray:{
                $filter:{
                    input: "$partogramaArray",
                    as: "item",
                    cond:{$eq:["$$item._id", mongoose.Types.ObjectId(idArray)]}
                }
            }
        }
    );
    return res;
};

exports.getByCreatedAt = async() => {
    const yesterday = formatYesterday(new Date());
    const today = formatToday(new Date());
    const res = await Partograma.find(
        {
        dtCadastro :{$gte:yesterday, $lt:today}
        }
    );
    return res;
};

exports.create = async(data) => {
    var partograma = new Partograma(data); 
    partograma.partogramaArray[0].dtCadastro = new Date(Date.now());
    partograma.partogramaArray[0].status = "Criado";
    const res = await partograma.save();
    return res;
};

exports.update = async(id, data) => {
    var partograma = new Partograma(data);
    const res = await Partograma.findOneAndUpdate(
        {
            _id: {$gte: id},
        },
        {
            $push: {
                partogramaArray: {
                $each: [{
                    responsavel : partograma.partogramaArray[0].responsavel,
                    horario : partograma.partogramaArray[0].horario,
                    statusPartograma : partograma.partogramaArray[0].statusPartograma,
                    leito : partograma.partogramaArray[0].leito,
                    mv : partograma.partogramaArray[0].mv,
                    dtInicioEvento : partograma.partogramaArray[0].dtInicioEvento,
                    dtFimEvento : partograma.partogramaArray[0].dtFimEvento,
                    observacao : partograma.partogramaArray[0].observacao,
                    status : "Criado",
                    userCadastro : partograma.partogramaArray[0].userCadastro,
                    dtCadastro : new Date(Date.now())
                }]
            }
            }
        },
        { 
            returnDocument:"after",
            projection: { 
                "partogramaArray": { $slice: -1}
            },
        }
    );
    return res;
};

exports.updateCancel = async(id, idArray, user) => {
    await Partograma.findOneAndUpdate(
        { 
            _id: id,
            "partogramaArray._id": idArray
        },
        {$set: {
            'partogramaArray.$.status': 'Cancelado',
            'partogramaArray.$.userAtualizacao': user,
            'partogramaArray.$.dtAtualizacao': new Date(Date.now())
        }}
    );
};

exports.updateAndCancel = async(id, data, idArray, user) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        var partograma = new Partograma(data);
        const res = await Partograma.findOneAndUpdate(
            {
                _id: {$gte: id}
            },
            {
                $push: {
                    partogramaArray: {
                    $each: [{
                        responsavel : partograma.partogramaArray[0].responsavel,
                        horario : partograma.partogramaArray[0].horario,
                        statusPartograma : partograma.partogramaArray[0].statusPartograma,
                        leito : partograma.partogramaArray[0].leito,
                        mv : partograma.partogramaArray[0].mv,
                        dtInicioEvento : partograma.partogramaArray[0].dtInicioEvento,
                        dtFimEvento : partograma.partogramaArray[0].dtFimEvento,
                        observacao : partograma.partogramaArray[0].observacao,
                        status : "Criado",
                        userCadastro : partograma.partogramaArray[0].userCadastro,
                        dtCadastro : new Date(Date.now())
                    }]
                }
                }
            },
            { 
                returnDocument:"after",
                projection: { 
                    "partogramaArray": { $slice: -1}
                },
            }
        );
        await this.updateCancel(id, idArray, user);
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

function formatYesterday (date) {  
    if (!(date instanceof Date)) {
      throw new Error('Invalid "date" argument. You must pass a date instance')
    }
  
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()-1).padStart(2, '0')
  
    return `${year}-${month}-${day}T00:00:00.000Z`
}

function formatToday (date) {  
    if (!(date instanceof Date)) {
      throw new Error('Invalid "date" argument. You must pass a date instance')
    }
  
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
  
    return `${year}-${month}-${day}T00:00:00.000Z`
}