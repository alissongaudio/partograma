'use strict';

let errors = [];

function ValidationContract() {
    errors = [];
}

ValidationContract.prototype.isRequired = (value, message) => {
    if (value == null)
        errors.push({ message: message });
}

ValidationContract.prototype.hasMinLen = (value, min, message) => {
    if (!value || value.length < min)
        errors.push({ message: message });
}

ValidationContract.prototype.hasMaxLen = (value, max, message) => {
    if (!value || value.length > max)
        errors.push({ message: message });
}

ValidationContract.prototype.isFixedLen = (value, len, message) => {
    if (value.length != len)
        errors.push({ message: message });
}

ValidationContract.prototype.isEmail = (value, message) => {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value))
        errors.push({ message: message });
}

ValidationContract.prototype.isCreateStatus = (value, message) => {
    if (value != 'Criado')
        errors.push({ message: message });
}

ValidationContract.prototype.isUpdateStatus = (value, message) => {
    if (value != 'Salvo' && value != 'Editado' && value != 'Finalizado' && value != 'Cancelado')
        errors.push({ message: message });
}

ValidationContract.prototype.CannotUpdatedStatus = (value, message) => {
    if (value === 'Cancelado')
        errors.push({ message: message });
}

ValidationContract.prototype.CanStatusFromTo = (currentStatus, newStatus, message) => {
    if (
        (currentStatus === 'Criado' && (newStatus != 'Salvo' && newStatus != 'Editado'&& newStatus != 'Finalizado' && newStatus != 'Cancelado')) ||
        (currentStatus === 'Salvo' && (newStatus != 'Salvo' && newStatus != 'Finalizado' && newStatus != 'Cancelado')) ||
        (currentStatus === 'Editado' && (newStatus != 'Editado' && newStatus != 'Finalizado' && newStatus != 'Cancelado')) ||
        (currentStatus === 'Finalizado' && newStatus != 'Cancelado')
    )
        errors.push({ message: message });
}

ValidationContract.prototype.existsPartogramaToObj = (data, message) => {
    if (data)
        errors.push({ message: message });
}

ValidationContract.prototype.existsPaciente = (data, message) => {
    if (data)
        errors.push({ message: message });
}

ValidationContract.prototype.ApresentacaoVariedadeFetal = (apresentacaoFetal, variedadePosicaoFetal, message) => {
    if (
        (apresentacaoFetal === 'Apresentação de vértice ou occipital' && 
            (
                variedadePosicaoFetal != 'Occipito-Anterior (Occipito Púbica)' &&
                variedadePosicaoFetal != 'Occipito-Anterior-Esquerda' &&
                variedadePosicaoFetal != 'Occipito-Anterior-Direita' &&                                                                                                          
                variedadePosicaoFetal != 'Occipito-Posterior (Occipito Sacra)' &&
                variedadePosicaoFetal != 'Occipito-Posterior-Esquerda' &&
                variedadePosicaoFetal != 'Occipito-Posterior-Direita' &&
                variedadePosicaoFetal != 'Occipito-Transversa-Esquerda' &&
                variedadePosicaoFetal != 'Occipito-Transversa-Direita'
                
            )) ||
        (apresentacaoFetal === 'Apresentação Bregmática' && 
            (
                variedadePosicaoFetal != 'Bregmática-Anterior' &&
                variedadePosicaoFetal != 'Bregmática-Posterior' &&
                variedadePosicaoFetal != 'Bregmática-Esquerda-Anterior' &&
                variedadePosicaoFetal != 'Bregmática-Esquerda-Posterior' &&
                variedadePosicaoFetal != 'Bregmática-Esquerda-Transversa' &&
                variedadePosicaoFetal != 'Bregmática-Direita-Transversa' &&
                variedadePosicaoFetal != 'Bregmática-Direita-Anterior' &&
                variedadePosicaoFetal != 'Bregmática-Direita-Posterior'
            )) ||
        (apresentacaoFetal === 'Apresentação Mento' && 
            (
                variedadePosicaoFetal != 'Mento-Esquerda-Anterior' &&
                variedadePosicaoFetal != 'Mento-Esquerda-Posterior' &&
                variedadePosicaoFetal != 'Mento-Direita-Anterior' &&
                variedadePosicaoFetal != 'Mento-Direita-Posterior'               
            )) ||
        (apresentacaoFetal === 'Apresentação Naso' && 
            (
                variedadePosicaoFetal != 'Naso-Esquerda-Anterior' &&
                variedadePosicaoFetal != 'Naso-Esquerda-Posterior' &&
                variedadePosicaoFetal != 'Naso-Direita-Anterior' &&
                variedadePosicaoFetal != 'Naso-Direita-Posterior'
            )) ||
        (apresentacaoFetal === 'Apresentação Sacro' && 
            (
                variedadePosicaoFetal != 'Sacro-Esquerda-Anterior' &&
                variedadePosicaoFetal != 'Sacro-Esquerda-Posterior' &&
                variedadePosicaoFetal != 'Sacro-Direita-Anterior' &&
                variedadePosicaoFetal != 'Sacro-Direita-Posterior'
            )) ||
        (apresentacaoFetal === 'Apresentação Acrômio' && 
            (
                variedadePosicaoFetal != 'Acrômio-Esquerda Dorso Anterior' &&
                variedadePosicaoFetal != 'Acrômio-Esquerda Dorso Posterior' &&
                variedadePosicaoFetal != 'Acrômio-Direita Dorso Anterior' &&
                variedadePosicaoFetal != 'Acrômio-Direita Dorso Posterior'
            ))


    )
        errors.push({ message: message });
}

ValidationContract.prototype.errors = () => { 
    return errors; 
}

ValidationContract.prototype.clear = () => {
    errors = [];
}

ValidationContract.prototype.isValid = () => {
    return errors.length == 0;
}

module.exports = ValidationContract;