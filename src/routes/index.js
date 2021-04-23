const { Router } = require('express');
const Duplication = require('../models/duplication');

const router = Router();
const duplication = new Duplication();
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

router.get('/', (req, res) => {
    res.render('index.ejs')
});

router.get('/duplication', (req, res) => {
    console.log(duplication, info, data);

    res.render('duplication.ejs')
});

router.post('/duplication', (req, res) => {
    const { nt, t, a, no, medicion, poblation } = req.body;
    duplication.setdata(parseInt(nt), parseInt(t), parseInt(a), parseInt(no), medicion, poblation);
    console.log(duplication, info, data);

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
    console.log(duplication, info, data);

    res.render('resultsDuplications.ejs', { duplication, info, data });
})

module.exports = router;