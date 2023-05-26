'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    partogramaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partograma',
        required: true
    },
    historicoObstetricoArray: [{
        g: {
            type: Number,
            require: true
        },
        p: {
            type: Number,
            require: true
        },
        partosVaginais: {
            type: Number,
            require: true
        },
        partosCesareos: {
            type: Number,
            require: true
        },
        perdasPrecoces: {
            type: Number,
            require: true
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

module.exports = mongoose.model('HistoricoObstetrico', schema);