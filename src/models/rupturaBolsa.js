'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    partogramaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partograma',
        required: true
    },
    rupturaBolsaArray: [{
        dtEvento: {
            type: Date,
            required: [true, 'A data do evento é obrigatória'],
        },
        bolsa: {
            type: String,
            require: true,
            enum: ['Monoamniótica', 'Diamniótica'],
        },
        gemelar: {
            type: Number,
            enum: [1,2],
            default: null
        },
        statusRupturaMembrana: {
            type: String,
            require: true,
            enum: ['Ruptura Espontânea', 'Ruptura Artificial', 'Membranas Íntegras', 'Indeterminado'],
        },
        indicacaoAmniotomia: {
            type: String,
            require: true,
            enum: ['Aceleração', 'Indução'],
        },
        volumeLiquidoAmniotico: {
            type: String,
            enum: ['Ausente', 'Escasso', 'Moderado', 'Excessivo']
        },
        liquidoAmnioticoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LiquidoAmniotico',
            required: true
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

module.exports = mongoose.model('RupturaBolsa', schema);