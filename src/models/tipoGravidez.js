'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    partogramaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partograma',
        required: true
    },
    tipoGravidezArray: [{
        tipoGravidez: {
            type: String,
            enum: ['Única Cefálica', 'Única Pélvica', 'Única Córmica', 'Gestação Múltipla'],
            require:true
        },
        quantidadeBebes: {
            type: String
        },
        observacao: {
            type: String,
            required: true,
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

module.exports = mongoose.model('TipoGravidez', schema);