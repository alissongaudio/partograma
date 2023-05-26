'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    partogramaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partograma',
        required: true
    },
    dilatacaoCervicalArray: [{
        dilatacao: {
            type: Number,
            required: true,
            enum: [
                0,1,2,3,4,5,6,7,8,9,10
            ]
        },
        esvaecimento: {
            type: String,
            required: true,
            enum: [
                '0',
                '10%',
                '20%',
                '30%',
                '40%',
                '50%',
                '60%',
                '70%',
                '80%',
                '90%',
                '100%',
            ]
        },
        consistencia: {
            type: String,
            required: true,
            enum: ['Firme', 'Médio','Amolecido']
        },
        posicao: {
            type: String,
            required: true,
            enum: ['Posterior', 'Médio','Anterior'],
        },
        dtEvento: {
            type: Date,
            required: [true, 'A data do evento é obrigatória'],
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

module.exports = mongoose.model('DilatacaoCervical', schema);