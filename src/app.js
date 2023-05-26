'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger/swagger');

const app = express();
const router = express.Router();

//Conecta ao banco
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL);

//Carrega os Models
const AmostraSangueFetal = require('./models/amostraSangueFetal');
const Apgars = require('./models/apgars');
const Companhia = require('./models/companhia');
const Contracoes = require('./models/contracoes');
const Custom1 = require('./models/custom1');
const Custom2 = require('./models/custom2');
const Custom3 = require('./models/custom3');
const Custom4 = require('./models/custom4');
const Custom5 = require('./models/custom5');
const Custom6 = require('./models/custom6');
const Custom7 = require('./models/custom7');
const CustomObjects = require('./models/customObjects');
const DataHoraParto = require('./models/dataHoraParto');
const DataHoraPlacenta = require('./models/dataHoraPlacenta');
const Dequitacao = require('./models/dequitacao');
const DilatacaoCervical = require('./models/dilatacaoCervical');
const Farmacologico = require('./models/farmacologico');
const HistoricoObstetrico = require('./models/historicoObstetrico');
const IdadeGestacional = require('./models/idadeGestacional');
const IngestaoLiquido = require('./models/ingestaoLiquido');
const InicioTrabalhoParto = require('./models/inicioTrabalhoParto');
const LiquidoAmniotico = require('./models/liquidoAmniotico');
const MonitoramentoCardiacoBebe = require('./models/monitoramentoCardiacoBebe');
const MonitoramentoCardiacoPaciente = require('./models/monitoramentoCardiacoPaciente');
const NaoFarmacologico = require('./models/naoFarmacologico');
const Nascimento = require('./models/nascimento');
const NotasClinicas = require('./models/notasClinicas');
const Ocitocina = require('./models/ocitocina');
const Paciente = require('./models/paciente');
const Partograma = require('./models/partograma');
const PlanoCuidado = require('./models/planoCuidado');
const PosicaoFetal = require('./models/posicaoFetal');
const Postura = require('./models/postura');
const RupturaBolsa = require('./models/rupturaBolsa');
const Sangramaneto = require('./models/sangramento');
const TipoGravidez = require('./models/tipoGravidez');
const StatusGBS = require('./models/statusGBS');
const TipoParto = require('./models/tipoParto');
const TipoSanguineo = require('./models/tipoSanguineo');


//Carrega as Rotas
const indexRoute = require('./routes/index-route');

const allDocumentsRoute = require('./routes/allDocuments-route')
const amostraSangueFetalRoute = require('./routes/amostraSangueFetal-route')
const apgarsRoute = require('./routes/apgars-route')
const companhiaRoute = require('./routes/companhia-route')
const contracoesRoute = require('./routes/contracoes-route')
const custom1Route = require('./routes/custom1-route');
const custom2Route = require('./routes/custom2-route');
const custom3Route = require('./routes/custom3-route');
const custom4Route = require('./routes/custom4-route');
const custom5Route = require('./routes/custom5-route');
const custom6Route = require('./routes/custom6-route');
const custom7Route = require('./routes/custom7-route');
const customObjectsRoute = require('./routes/customObjects-route');
const dataHoraPartoRoute = require('./routes/dataHoraParto-route')
const dataHoraPlacentaRoute = require('./routes/dataHoraPlacenta-route')
const dequitacaoRoute = require('./routes/dequitacao-route')
const dilatacaoCervicalRoute = require('./routes/dilatacaoCervical-route')
const farmacologicoRoute = require('./routes/farmacologico-route')
const historicoObstetricoRoute = require('./routes/historicoObstetrico-route')
const idadeGestacionalRoute = require('./routes/idadeGestacional-route')
const ingestaoLiquidoRoute = require('./routes/ingestaoLiquido-route')
const inicioTrabalhoPartoRoute = require('./routes/inicioTrabalhoParto-route')
const liquidoAmnioticoRoute = require('./routes/liquidoAmniotico-route')
const monitoramentoCardiacoBebeRoute = require('./routes/monitoramentoCardiacoBebe-route')
const monitoramentoCardiacoPacienteRoute = require('./routes/monitoramentoCardiacoPaciente-route')
const naoFarmacologicoRoute = require('./routes/naoFarmacologico-route')
const nascimentolRoute = require('./routes/nascimento-route')
const notasClinicasRoute = require('./routes/notasClinicas-route')
const ocitocinaRoute = require('./routes/ocitocina-route')
const pacienteRoute = require('./routes/paciente-route')
const partogramaRoute = require('./routes/partograma-route')
const planoCuidadoRoute = require('./routes/planoCuidado-route')
const posicaoFetalRoute = require('./routes/posicaoFetal-route')
const posturaRoute = require('./routes/postura-route')
const rupturaBolsaRoute = require('./routes/rupturaBolsa-route')
const sangramentoRoute = require('./routes/sangramaneto-route')
const tipoGravidezRoute = require('./routes/tipoGravidez-route')
const statusGBSRoute = require('./routes/statusGBS-route')
const tipoPartoRoute = require('./routes/tipoParto-route')
const tipoSanguineoRoute = require('./routes/tipoSanguineo-route')

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({ 
    extended: false 
}));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/allDocuments', allDocumentsRoute);
app.use('/amostraSangueFetal', amostraSangueFetalRoute);
app.use('/apgars', apgarsRoute);
app.use('/companhia', companhiaRoute);
app.use('/contracoes', contracoesRoute);
app.use('/custom1', custom1Route);
app.use('/custom2', custom2Route);
app.use('/custom3', custom3Route);
app.use('/custom4', custom4Route);
app.use('/custom5', custom5Route);
app.use('/custom6', custom6Route);
app.use('/custom7', custom7Route);
app.use('/customObjects', customObjectsRoute);
app.use('/dataHoraParto', dataHoraPartoRoute);
app.use('/dataHoraPlacenta', dataHoraPlacentaRoute);
app.use('/dequitacao', dequitacaoRoute);
app.use('/dilatacao', dilatacaoCervicalRoute);
app.use('/farmacologico', farmacologicoRoute);
app.use('/historicoObstetrico', historicoObstetricoRoute);
app.use('/idadeGestacional', idadeGestacionalRoute);
app.use('/ingestaoLiquido', ingestaoLiquidoRoute);
app.use('/inicioTrabalhoParto', inicioTrabalhoPartoRoute);
app.use('/liquidoAmnioticos', liquidoAmnioticoRoute);
app.use('/monitoramentoCardiacoBebe', monitoramentoCardiacoBebeRoute);
app.use('/monitoramentoCardiacoPaciente', monitoramentoCardiacoPacienteRoute);
app.use('/naoFarmacologico', naoFarmacologicoRoute);
app.use('/nascimento', nascimentolRoute);
app.use('/notasClinicas', notasClinicasRoute);
app.use('/ocitocina', ocitocinaRoute);
app.use('/pacientes', pacienteRoute);
app.use('/partogramas', partogramaRoute);
app.use('/planocuidado', planoCuidadoRoute);
app.use('/posicaoFetal', posicaoFetalRoute);
app.use('/postura', posturaRoute);
app.use('/rupturaBolsa', rupturaBolsaRoute);
app.use('/sangramento', sangramentoRoute);
app.use('/tipoGravidez', tipoGravidezRoute);
app.use('/statusGBS', statusGBSRoute);
app.use('/tipoParto', tipoPartoRoute);
app.use('/tipoSanguineo', tipoSanguineoRoute);

module.exports = app;


