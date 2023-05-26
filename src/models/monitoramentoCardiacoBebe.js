'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    partogramaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partograma',
        required: true
    },
    monitoramentoCardiacoBebeArray: [{
        dtEvento: {
            type: Date,
            required: [true, 'A data do evento é obrigatória'],
        },
        frequenciaCardiacaFetal: {
            type: Number,
            required: true
        },
        gemelar: {
            type: Number,
            enum: [1,2],
            default: null
        },
        observacao: {
            type: String,
        },
        status: {
            type: String,
            required: true,
            enum: ['Criado', 'Cancelado'],
            default: 'Criado'
        },
        dtCadastro: {
            type: Date,
            default: Date.now
        },
        userCadastro: {
            type: String,
            required: true
        },
        dtAtualizacao: {
            type: Date,
            default: null
        },
        userAtualizacao: {
            type: String,
            default: null
        }
    }]
});

module.exports = mongoose.model('MonitoramentoCardiacoBebe', schema);