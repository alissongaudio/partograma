'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    partogramaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partograma',
        required: true
    },
    contracoesArray: [{
        numeroContracoes: {
            type: Number,
            required: true
        },
        tempoContracoes: {
            type: String,
            required: true,
            enum: ['<30', '>30']
        },
        dtEvento: {
            type: Date,
            required: [true, 'A data do evento é obrigatória'],
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

module.exports = mongoose.model('Contracoes', schema);