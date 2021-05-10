const { Router } = require('express');
const Duplication = require('../models/duplication');
const Relative = require('../models/relative');

const router = Router();
const duplication = new Duplication();
const relative = new Relative();

relative.setdata(400, 2, 0, 0, 'Personas', 'Años');

/* console.log(relative.tasaRelative(25600, 6) * 100);
console.log(relative.inicialSize());
console.log(relative.sizeAfter(4.5));
console.log(relative.sizeTime(50000));
console.log(relative.sizeList(10, 1)); 
console.log(relative);*/

//Variales para Crecimiento por duplicidad
const info = {
    ini: false,
    after: false,
    time: false,
    list: false,
    t: 0,
    nt: 0
}
let data = [{
    "i": 2,
    "value": 6558
}];


//Variales para Crecimineto por tasa relativa

const infoTasa = {
    ini: false,
    tasa: false,
    time: false,
    list: false,
    tasa: false,
    t: 0,
    nt: 0
}

let dataTasa = [{
    "i": 2,
    "value": 6558
}];


router.get('/', (req, res) => {
    res.render('index.ejs')
});

// Rutas para vistas de crecimiento por duplicacion
router.get('/duplication', (req, res) => {
    info.ini = false;
    info.list = false;
    info.time = false;
    info.after = false;

    res.render('duplication.ejs')
});

router.post('/duplication', (req, res) => {
    const { nt, t, a, no, medicion, poblation } = req.body;
    duplication.setdata(parseInt(nt), parseInt(t), parseInt(a), parseInt(no), medicion, poblation);

    res.render('resultsDuplications.ejs', { duplication, info, data });
});

router.get('/duplication/ini', (req, res) => {
    info.ini = true;
    info.list = false;
    info.time = false;
    info.after = false;

    duplication.inicialSize()
    res.redirect('/duplication-results');
});

router.post('/duplication/after', (req, res) => {
    const { t } = req.body;
    info.t = t;
    info.ini = false;
    info.list = false;
    info.time = false;
    info.after = true;

    res.redirect('/duplication-results');
});

router.post('/duplication/list', (req, res) => {
    const { t, i } = req.body;
    data = duplication.sizeList(parseInt(t), parseInt(i));
    info.ini = false;
    info.list = true;
    info.time = false;
    info.after = false;

    res.redirect('/duplication-results');
});

router.post('/duplication/time', (req, res) => {
    const { nt } = req.body;
    info.nt = duplication.sizeTime(parseInt(nt));
    info.tm = nt;
    info.ini = false;
    info.list = false;
    info.time = true;
    info.after = false;


    res.redirect('/duplication-results');
});

router.get('/duplication-results', (req, res) => {

    res.render('resultsDuplications.ejs', { duplication, info, data });
})


// Rutas para vistas de crecimiento por tasra relativa

router.get('/tasa', (req, res) => {
    infoTasa.ini = false;
    infoTasa.list = false;
    infoTasa.time = false;
    infoTasa.after = false;
    infoTasa.tasa = false;

    res.render('tasa.ejs')
});

router.get('/tasa/ini', (req, res) => {
    infoTasa.ini = true;
    infoTasa.list = false;
    infoTasa.time = false;
    infoTasa.after = false;
    infoTasa.tasa = false;

    relative.inicialSize()
    res.redirect('/tasa-results');
});

router.post('/tasa/after', (req, res) => {
    const { t } = req.body;
    infoTasa.t = t;
    infoTasa.ini = false;
    infoTasa.list = false;
    infoTasa.time = false;
    infoTasa.after = true;
    infoTasa.tasa = false;

    res.redirect('/tasa-results');
});

router.post('/tasa/list', (req, res) => {
    const { t, i } = req.body;
    dataTasa = relative.sizeList(parseInt(t), parseInt(i));
    infoTasa.ini = false;
    infoTasa.list = true;
    infoTasa.time = false;
    infoTasa.after = false;
    infoTasa.tasa = false;

    res.redirect('/tasa-results');
});

router.post('/tasa', (req, res) => {
    const { nt, t, r, no, medicion, poblation } = req.body;
    relative.setdata(parseInt(nt), parseInt(t), parseFloat(r), parseInt(no), medicion, poblation);
    res.render('resultsRelativa.ejs', { relative, infoTasa, dataTasa });
});

router.post('/tasa/time', (req, res) => {
    const { nt } = req.body;
    infoTasa.nt = relative.sizeTime(parseInt(nt));
    infoTasa.tm = nt;
    infoTasa.ini = false;
    infoTasa.list = false;
    infoTasa.time = true;
    infoTasa.after = false;
    infoTasa.tasa = false;

    res.redirect('/tasa-results');
});

router.post('/tasa/tasaRelative', (req, res) => {
    const { nt2, t2 } = req.body;
    relative.tasaRelative(parseInt(nt2), parseInt(t2));

    infoTasa.ini = false;
    infoTasa.list = false;
    infoTasa.time = false;
    infoTasa.after = false;
    infoTasa.tasa = true;

    res.redirect('/tasa-results');
});


router.get('/tasa-results', (req, res) => {
    res.render('resultsRelativa.ejs', { relative, infoTasa, dataTasa });
})
module.exports = router;