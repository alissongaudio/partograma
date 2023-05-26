'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    partogramaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partograma',
        required: true
    },
    nascimentoArray: [{
        dtEvento: {
            type: Date,
            required: [true, 'A data do evento é obrigatória'],
        },
        tipoParto: {
            type: String,
            required:true,
            enum: ['Parto Vaginal Não Operatório', 'Parto Fórceps', 'Parto por Vácuo Extração', 'Parto Cesariano']
        },
        observacao: {
            type: String
        },
        gemelar: {
            type: Number,
            enum: [1,2],
            default: null
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

module.exports = mongoose.model('Nascimento', schema);