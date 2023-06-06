'use strict';

const repository = require('../repositories/alerta_antibioticoprofilaxia-repository');
const AlertaAntibioticoprofilaxia = require('../models/alerta_antibioticoprofilaxia');

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

exports.checkRule = async (partogramaId) => {
    try{
        const result = await repository.getPartogramaId(partogramaId)

        if(result){
            var obj = new AlertaAntibioticoprofilaxia(result);
        
            if(
                (
                    (isNotNullOrEmpty(obj.inicioTrabalhoParto) || isNotNullOrEmpty(obj.dtHoraRompimentoBolsa))
                ) &&
                (
                     (obj.statusEGB === 'Positivo') ||
                     (obj.statusEGB === 'Negativo' && (obj.doencaInvasiva === true || obj.bacteriuria === true)) ||
                     (obj.statusEGB === 'Desconhecido' && ((obj.doencaInvasiva === true || obj.bacteriuria === true || obj.febreIntraparto === true || horasBolsa(obj.dtHoraRompimentoBolsa) >= 18 || obj.idadeGestacionalSemanas < '37')))
                )
              ){
                    const res = await repository.updateSendAlert(partogramaId, true);
                    return res;
                }
                else{
                    const res = await repository.updateSendAlert(partogramaId, false);
                    return res;
                }
        }
        else{
            return result;
        }
    }
    catch(e){
        return 'Falha ao processar sua requisição:' + e.message;
    }
};

exports.updateAlertSent = (partogramaId, id) => {
    try{
        var result = repository.updateAlertSent(partogramaId, id)
    }
    catch(e){
        return 'Falha ao processar sua requisição:' + e.message;
    }
};

function horasBolsa(dt){
    const date1 = new Date(Date.now());
    const date2 = new Date(dt);

    const diffInMilliseconds = Math.abs(date1.getTime() - date2.getTime());
    const diffInHours = Math.floor(diffInMilliseconds / 36e5);

    return diffInHours;
}

function isNotNullOrEmpty(variable){
    if
    (
        variable === null ||
        variable === undefined ||
        (typeof variable === 'string' && variable.trim() === '')
    )
    {
        return false;
    }
    else{
        return true;
    }
}