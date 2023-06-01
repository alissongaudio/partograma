'use strict';

const mongoose = require('mongoose');
const AlertaAntibioticoprofilaxia = mongoose.model('AlertaAntibioticoprofilaxia');

exports.getPartogramaId = async(partogramaId) => {
    const res = await AlertaAntibioticoprofilaxia.findOne(
        {partogramaId: {$gte: partogramaId}}
    );
    return res;
};

exports.create = async(data) => {
    var alertaAntibioticoprofilaxia = new AlertaAntibioticoprofilaxia(data); 
    const res = await alertaAntibioticoprofilaxia.save();
    return res;
};

exports.update = async(partogramaId, key, value) => {
    const fieldName = key;
    const res = await AlertaAntibioticoprofilaxia.findOneAndUpdate(
        {partogramaId: {$gte: partogramaId}},
        {
            $set: {
                partogramaId: partogramaId,
                [fieldName]: value
            }
        },
        {upsert: true}
    );
    return res;
};