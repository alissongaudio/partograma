'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    partogramaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partograma',
        required: true
    },
    ocitocinaArray: [{
        numeroUnidadesOcitocina: {
            type: Number,
            required: true
        },
        volumeDiluente: {
            type: Number,
            required: true
        },
        velocidadeInfusao: {
            type: Number,
            required: true
        },
        doseAdministrada: {
            type: Number,
            required: true
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

module.exports = mongoose.model('Ocitocina', schema);