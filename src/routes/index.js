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
console.log(relative.sizeList(10, 1)); */



console.log(relative);


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

module.exports = router;