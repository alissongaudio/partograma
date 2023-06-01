'use strict';

const mongoose = require('mongoose');
const AlertaAntibioticoprofilaxia = mongoose.model('AlertaAntibioticoprofilaxia');

exports.getPartogramaId = async(partogramaId) => {
    const res = await AlertaAntibioticoprofilaxia.findOne(
        {partogramaId: {$eq: partogramaId}}
    );
    return res;
};

exports.create = async(data) => {
    var alertaAntibioticoprofilaxia = new AlertaAntibioticoprofilaxia(data);
    alertaAntibioticoprofilaxia.dtUltimaAtualizacao = new Date(Date,mongoose.now()) ;
    const res = await alertaAntibioticoprofilaxia.save();
    return res;
};

exports.update = async(partogramaId, key, value) => {
    const fieldName = key;
    const res = await AlertaAntibioticoprofilaxia.findOneAndUpdate(
        {partogramaId: {$eq: partogramaId}},
        {
            $set: {
                partogramaId: partogramaId,
                dtUltimaAtualizacao : new Date(Date,mongoose.now()),
                [fieldName]: value
            }
        },
        {upsert: true}
    );
    return res;
};