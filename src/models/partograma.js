'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    pacienteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    partogramaArray: [{
        responsavel: {
            type: String,
            required: true
        },
        horario: {
            type: Date,
            required: true,
            default: Date.now
        },
        statusPartograma: {
            type: String,
            required: true,
            enum: ['Não iniciado', 'Criado', 'Salvo', 'Sem interação', 'Editado', 'Em andamento', 'Finalizado','Cancelado'],
            default: 'Não iniciado'
        },
        leito: {
            type: String,
            required: true
        },
        mv: {
            type: String,
            required: true,
            enum: ['Vinculados', 'Sem vínculo'],
            default: 'Não iniciado'
        },
        dtInicioEvento: {
            type: Date,
            default: null
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

module.exports = mongoose.model('Partograma', schema);