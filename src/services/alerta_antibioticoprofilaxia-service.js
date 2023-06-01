'use strict';

const ValidationContract = require('../validators/fluent-validator');''
const repository = require('../repositories/alerta_antibioticoprofilaxia-repository');
const AlertaAntibioticoprofilaxia = require('../models/alerta_antibioticoprofilaxia');
const nameModel = 'AlertaAntibioticoprofilaxia';

exports.getByPartogramaId = async(partogramaId) => {
    try{
        var data = await repository.getPartogramaId(partogramaId);
        return data;
    }
    catch(e){
        return 'Falha ao processar sua requisição:' + e.message;
    }
};

exports.insert = (partogramaId, key, value) => {
    try{
        var result = repository.update(partogramaId, key, value)
    }
    catch(e){
        return 'Falha ao processar sua requisição:' + e.message;
    }
};

exports.checkRule = (partogramaId) => {
    try{
        var result = repository.getPartogramaId(partogramaId)
    }
    catch(e){
        return 'Falha ao processar sua requisição:' + e.message;
    }
};