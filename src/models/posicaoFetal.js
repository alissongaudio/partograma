'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    partogramaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partograma',
        required: true
    },
    posicaoFetalArray: [{
        apresentacaoFetal: {
            type: String,
            required: true,
            enum: [
                'Apresentação de vértice ou occipital',
                'Apresentação Bregmática',
                'Apresentação Mento',
                'Apresentação Naso',
                'Apresentação Sacro',
                'Apresentação Acrômio'
            ]
        },
        variedadePosicaoFetal: {
            type: String,
            required: true,
            enum: [
                'Occipito-Anterior (Occipito Púbica)',
                'Occipito-Anterior-Esquerda',
                'Occipito-Anterior-Direita',                                                                                                             
                'Occipito-Posterior (Occipito Sacra)',
                'Occipito-Posterior-Esquerda',
                'Occipito-Posterior-Direita',
                'Occipito-Transversa-Esquerda',
                'Occipito-Transversa-Direita',
                'Bregmática-Anterior',
                'Bregmática-Posterior',
                'Bregmática-Esquerda-Anterior',
                'Bregmática-Esquerda-Posterior',
                'Bregmática-Esquerda-Transversa',
                'Bregmática-Direita-Transversa',
                'Bregmática-Direita-Anterior',
                'Bregmática-Direita-Posterior',
                'Mento-Esquerda-Anterior',
                'Mento-Esquerda-Posterior',
                'Mento-Direita-Anterior',
                'Mento-Direita-Posterior',
                'Naso-Esquerda-Anterior',
                'Naso-Esquerda-Posterior',
                'Naso-Direita-Anterior',
                'Naso-Direita-Posterior',
                'Sacro-Esquerda-Anterior',
                'Sacro-Esquerda-Posterior',
                'Sacro-Direita-Anterior',
                'Sacro-Direita-Posterior',
                'Acrômio-Esquerda Dorso Anterior',
                'Acrômio-Esquerda Dorso Posterior',
                'Acrômio-Direita Dorso Anterior',
                'Acrômio-Direita Dorso Posterior'
            ]
        },
        alturaApresentacaoFetal: {
            type: String,
            required: true,
            enum: [
                '+5',
                '+4',
                '+3',
                '+2',
                '+1',
                '0',
                '-1',
                '-2',
                '-3',
                '-4',
                '-5'
            ]
        },
        dtEvento: {
            type: Date,
            required: [true, 'A data do evento é obrigatória'],
        },
        observacao: {
            type: String
        },
        gemelar: {
            type: Number,
            enum: [1,2],
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

module.exports = mongoose.model('PosicaoFetal', schema);