'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    partogramaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partograma',
        required: true
    },
    monitoramentoCardiacoPacienteArray: [{
        dtEvento: {
            type: Date,
            required: [true, 'A data do evento é obrigatória'],
        },
        frequenciaCardiaca: {
            type: Number,
            required: true
        },
        pressaoArterialSistolica: {
            type: Number,
            required: true
        },
        pressaoArterialDiastolica: {
            type: Number,
            required: true
        },
        saturacaoO2Materna: {
            type: Number,
            required: true
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

module.exports = mongoose.model('MonitoramentoCardiacoPaciente', schema);