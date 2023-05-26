'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    pacienteArray: [{
        nome: {
            type: String,
            required: true
        },
        dtNascimento: {
            type: String,
            required: true
        },
        idade: {
            type: Number,
            required: true,
            default: Date.now
        },
        cpf: {
            type: Number,
            required: true
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

module.exports = mongoose.model('Paciente', schema);