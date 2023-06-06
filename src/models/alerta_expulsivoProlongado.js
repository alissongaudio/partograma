'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    partogramaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partograma',
        required: true
    },
    p: {
        type: Number
    },
    dilatacao: {
        type: Number
    },
    dtDilatacao: {
        type: Date
    },
    dtNascimento: {
        type: Date
    },
    enviarAlerta: {
        type: Boolean
    },
    alertaEnviado: {
        type: Boolean
    },
    dtUltimaAtualizacao: {
        type: Date
    },
});

module.exports = mongoose.model('AlertaExpulsivoProlongado', schema);