'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    partogramaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partograma',
        required: true
    },
    tipoPartoArray: [{
        tipoParto: {
            type: String,
            required:true,
            enum: ['Parto Vaginal Não Operatório', 'Parto Fórceps', 'Parto por Vácuo Extração', 'Parto Cesariano']
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

module.exports = mongoose.model('TipoParto', schema);