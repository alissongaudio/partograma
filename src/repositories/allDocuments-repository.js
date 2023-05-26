'use strict';

const mongoose = require('mongoose');

const partogramarepository = require('../repositories/partograma-repository');

const amostraSangueFetalrepository = require('../repositories/amostraSangueFetal-repository');
const apgarsrepository = require('../repositories/apgars-repository');
const companhiarepository = require('../repositories/companhia-repository');
const contracoesrepository = require('../repositories/contracoes-repository');
const custom1repository = require('../repositories/custom1-repository');
const custom2repository = require('../repositories/custom2-repository');
const custom3repository = require('../repositories/custom3-repository');
const custom4repository = require('../repositories/custom4-repository');
const custom5repository = require('../repositories/custom5-repository');
const dataHoraPartorepository = require('../repositories/dataHoraParto-repository');
const dataHoraPlacentarepository = require('../repositories/dataHoraPlacenta-repository');
const dequitacaorepository = require('../repositories/dequitacao-repository');
const dilatacaoCervicalrepository = require('../repositories/dilatacaoCervical-repository');
const farmacologicorepository = require('../repositories/farmacologico-repository');
const historicoObstetricorepository = require('../repositories/historicoObstetrico-repository');
const idadeGestacionalrepository = require('../repositories/idadeGestacional-repository');
const ingestaoLiquidorepository = require('../repositories/ingestaoLiquido-repository');
const inicioTrabalhoPartorepository = require('../repositories/inicioTrabalhoParto-repository');
const liquidoAmnioticorepository = require('../repositories/liquidoAmniotico-repository');
const monitoramentoCardiacoBeberepository = require('../repositories/monitoramentoCardiacoBebe-repository');
const monitoramentoCardiacoPacienterepository = require('../repositories/monitoramentoCardiacoPaciente-repository');
const naoFarmacologicorepository = require('../repositories/naoFarmacologico-repository');
const nascimentorepository = require('../repositories/nascimento-repository');
const notasClinicasrepository = require('../repositories/notasClinicas-repository');
const ocitocinarepository = require('../repositories/ocitocina-repository');
const planoCuidadorepository = require('../repositories/planoCuidado-repository');
const posicaoFetalrepository = require('../repositories/posicaoFetal-repository');
const posturarepository = require('../repositories/postura-repository');
const rupturaBolsarepository = require('../repositories/rupturaBolsa-repository');
const sangramentorepository = require('../repositories/sangramento-repository');
const statusGBSrepository = require('../repositories/statusGBS-repository');
const tipoGravidezrepository = require('../repositories/tipoGravidez-repository');
const tipoPartorepository = require('../repositories/tipoParto-repository');
const tipoSanguineorepository = require('../repositories/tipoSanguineo-repository');

exports.getByPartogramaId = async(partogramaId) => {

    var res = [];
    
    const amostraSangueFetal = await amostraSangueFetalrepository.get(partogramaId);
    const apgars = await apgarsrepository.get(partogramaId);
    const companhia = await companhiarepository.get(partogramaId);
    const contracoes = await contracoesrepository.get(partogramaId);
    const custom1 = await custom1repository.get(partogramaId);
    const custom2 = await custom2repository.get(partogramaId);
    const custom3 = await custom3repository.get(partogramaId);
    const custom4 = await custom4repository.get(partogramaId);
    const custom5 = await custom5repository.get(partogramaId);
    const dataHoraParto = await dataHoraPartorepository.get(partogramaId);
    const dataHoraPlacenta = await dataHoraPlacentarepository.get(partogramaId);
    const dequitacao = await dequitacaorepository.get(partogramaId);
    const dilatacaoCervical = await dilatacaoCervicalrepository.get(partogramaId);
    const farmacologico = await farmacologicorepository.get(partogramaId);
    const historicoObstetrico = await historicoObstetricorepository.get(partogramaId);
    const idadeGestacional = await idadeGestacionalrepository.get(partogramaId);
    const ingestaoLiquido = await ingestaoLiquidorepository.get(partogramaId);
    const inicioTrabalhoParto = await inicioTrabalhoPartorepository.get(partogramaId);
    const liquidoAmniotico = await liquidoAmnioticorepository.get(partogramaId);
    const monitoramentoCardiacoBebe = await monitoramentoCardiacoBeberepository.get(partogramaId);
    const monitoramentoCardiacoPaciente = await monitoramentoCardiacoPacienterepository.get(partogramaId);
    const naoFarmacologico = await naoFarmacologicorepository.get(partogramaId);
    const nascimento = await nascimentorepository.get(partogramaId);
    const notasClinicas = await notasClinicasrepository.get(partogramaId);
    const ocitocina = await ocitocinarepository.get(partogramaId);
    const planoCuidado = await planoCuidadorepository.get(partogramaId);
    const posicaoFetal = await posicaoFetalrepository.get(partogramaId);
    const postura = await posturarepository.get(partogramaId);
    const rupturaBolsa = await rupturaBolsarepository.get(partogramaId);
    const sangramento = await sangramentorepository.get(partogramaId);
    const statusGBS = await statusGBSrepository.get(partogramaId);
    const tipoGravidez = await tipoGravidezrepository.get(partogramaId);
    const tipoParto = await tipoPartorepository.get(partogramaId);
    const tipoSanguineo = await tipoSanguineorepository.get(partogramaId);

    res.push(amostraSangueFetal);
    res.push(apgars);
    res.push(companhia);
    res.push(contracoes);
    res.push(custom1);
    res.push(custom2);
    res.push(custom3);
    res.push(custom4);
    res.push(custom5);
    res.push(dataHoraParto);
    res.push(dataHoraPlacenta);
    res.push(dequitacao);
    res.push(dilatacaoCervical);
    res.push(farmacologico);
    res.push(historicoObstetrico);
    res.push(idadeGestacional);
    res.push(ingestaoLiquido);
    res.push(inicioTrabalhoParto);
    res.push(liquidoAmniotico);
    res.push(monitoramentoCardiacoBebe);
    res.push(monitoramentoCardiacoPaciente);
    res.push(naoFarmacologico);
    res.push(nascimento);
    res.push(notasClinicas);
    res.push(ocitocina);
    res.push(planoCuidado);
    res.push(posicaoFetal);
    res.push(postura);
    res.push(rupturaBolsa);
    res.push(sangramento);
    res.push(statusGBS);
    res.push(tipoGravidez);
    res.push(tipoParto);
    res.push(tipoSanguineo);

    return res;
};

//  // teste all data
//  exports.get = async(partogramaId) => {
    
//     const allModels = mongoose.modelNames();
//     var res = [];

//     for(const model of allModels){
//         const currentModel = mongoose.model(model);
//         const arrayName = model.charAt(0).toLocaleLowerCase() + model.slice(1) + 'Array';
//         const data = await currentModel.findOne(
//             {partogramaId: partogramaId}
//         );
//         console.log(arrayName);
//         res.push(data);
//     }
//     return res;
// };


exports.get = async() => {

    var res = [];
    var partogramas = await partogramarepository.getByCreatedAt();

    for(const item of partogramas){
        console.log(item._id.valueOf())
        res.push(await this.getByPartogramaId(item._id.valueOf()));
        
    }
    return res;
};
