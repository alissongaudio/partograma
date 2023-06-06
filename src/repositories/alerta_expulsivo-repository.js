'use strict';

const mongoose = require('mongoose');
const AlertaExpulsivoProlongado = mongoose.model('AlertaExpulsivoProlongado');

exports.getPartogramaId = async(partogramaId) => {
    const res = await AlertaExpulsivoProlongado.findOne(
        {partogramaId: {$eq: partogramaId}, alertaEnviado: false}
    );
    return res;
};

exports.create = async(data) => {
    var alertaExpulsivoProlongado = new AlertaExpulsivoProlongado(data);
    alertaExpulsivoProlongado.dtUltimaAtualizacao = new Date(Date.now()) ;
    const res = await alertaExpulsivoProlongado.save();
    return res;
};

exports.update = async(partogramaId, key, value) => {
    const fieldName = key;
    const res = await AlertaExpulsivoProlongado.findOneAndUpdate(
        {partogramaId: {$eq: partogramaId}},
        {
            $set: {
                partogramaId: partogramaId,
                dtUltimaAtualizacao : new Date(Date.now()),
                [fieldName]: value
            }
        },
        {
            upsert: true,
            returnDocument:"after",
        }
    );
    return res;
};

exports.updateSendAlert = async(partogramaId, value) => {
    const res = await AlertaExpulsivoProlongado.findOneAndUpdate(
        {partogramaId: {$eq: partogramaId}},
        {
            $set: {
                dtUltimaAtualizacao : new Date(Date.now()),
                enviarAlerta : value
            }
        },
        {
            returnDocument:"after",
        }
    );
    return res;
};

exports.updateAlertSent = async(partogramaId, id) => {
    const res = await AlertaExpulsivoProlongado.findOneAndUpdate(
        {partogramaId: {$eq: partogramaId}, _id: {$eq: id}},
        {
            $set: {
                dtUltimaAtualizacao : new Date(Date.now()),
                alertaEnviado : true
            }
        },
        {
            returnDocument:"after",
        }
    );
    return res;
};