'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    partogramaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partograma',
        required: true
    },
    inicioTrabalhoParto: {
        type: String
    },
    dtHoraRompimentoBolsa: {
        type: Date
    },
    idadeGestacionalSemanas: {
        type: String
    },
    idadeGestacionalDias: {
        type: String
    },
    statusEGB: {
        type: String
    },
    doencaInvasiva: {
        type: String
    },
    bacteriuria: {
        type: String
    },
    febreIntraparto: {
        type: String
    },
    alertaEnviado: {
        type: Boolean
    },
    dtUltimaAtualizacao: {
        type: Date
    },
});

module.exports = mongoose.model('AlertaAntibioticoprofilaxia', schema);