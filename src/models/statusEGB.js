'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    partogramaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partograma',
        required: true
    },
    statusEGBArray: [{
        statusEGBValue: {
            type: String,
            require: true,
            enum: ['Positivo', 'Negativo', 'Desconhecido'],
        },
        dtEvento: {
            type: Date,
            required: [true, 'A data do evento é obrigatória'],
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
        observacao: {
            type: String
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

module.exports = mongoose.model('StatusEGB', schema);