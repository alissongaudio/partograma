'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    partogramaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partograma',
        required: true
    },
    liquidoAmnioticoArray: [{
        aspectoLiquido: {
            type: String,
            required: true,
            enum: ['Claro', 'Hemoâmnio', 'Mecônio +1/+4', 'Mecônio +2/+4', 'Mecônio +3/+4', 'Mecônio +4/+4']
        },
        gemelar: {
            type: Number,
            enum: [1,2],
            default: null
        },
        dtInicioEvento: {
            type: Date,
            required: [true, 'A data do início do evento é obrigatória'],
        },
        dtFimEvento: {
            type: Date,
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
            required: true,
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

module.exports = mongoose.model('LiquidoAmniotico', schema);