'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    sequencial: {
        type: Number,
        required: true,
        enum: [1,2,3,4,5,6,7]
    },
    observacao: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Ativo', 'Ivativo'],
        default: 'Ativo'
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
});

module.exports = mongoose.model('CustomObjects', schema);