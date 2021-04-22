const { Router } = require('express');
const Duplication = require('../models/duplication');

const router = Router();
const duplication = new Duplication();
const info = {
    ini: false,
    after: false,
    time: false,
    list: false,    
    t:0
}
let data = [{
    "i": 2,
    "value": 6558
}];

router.get('/', (req, res) => {
    res.render('index.ejs')
});

router.get('/duplication', (req, res) => {
    
    res.render('duplication.ejs')
});

router.post('/duplication', (req, res) => {
    const { nt, t, a, no, medicion, poblation } = req.body;
    duplication.setdata(nt, t, a, no, medicion, poblation);

    res.render('resultsDuplications.ejs', { duplication, info,data })
});

router.get('/duplication/ini', (req, res) => {
    info.ini = true;
    duplication.inicialSize()

    res.redirect('/duplication-results');
});

router.post('/duplication/after', (req, res) => {
    const { t } = req.body;
    info.t = t;
    info.after = true;

    res.redirect('/duplication-results');
});

router.post('/duplication/list', (req, res) => {
    const { t ,i } = req.body;
    data = duplication.sizeList(t, i);
    console.log(data);
    info.list = true;

    res.redirect('/duplication-results');
});


router.get('/duplication-results', (req, res) => {
    res.render('resultsDuplications.ejs', { duplication,info,data });
})

module.exports = router;