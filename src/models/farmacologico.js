'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    partogramaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partograma',
        required: true
    },
    farmacologicoArray: [{
        farmacologico: {
            type: String,
            required: true,
            enum: ['Venoso', 'Inalatório','Regional']
        },
        regional: {
            type: String,
            enum: ['Raqui', 'Peridural','Combinada - Peridural com Perfuração de Dura']
        },
        dtInicioEvento: {
            type: Date,
            required: [true, 'A data do início do evento é obrigatória'],
        },
        dtFimEvento: {
            type: Date,
            default: null
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

module.exports = mongoose.model('Farmacologico', schema);