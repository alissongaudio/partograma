'use strict';

const mongoose = require('mongoose');
const CustomObjects = mongoose.model('CustomObjects');

exports.get = async() => {
    const res = await CustomObjects.find({});
    return res;
};


exports.create = async(data) => {
    var customObjects = new CustomObjects(data); 
    customObjects.dtCadastro = new Date(Date.now());
    customObjects.status = "Ativo";
    const res = await customObjects.save();
    return res;
};
