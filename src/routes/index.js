const { Router } = require('express');
const Duplication = require('../models/duplication');

const router = Router();
const duplication = new Duplication();

router.get('/', (req, res) => {
    res.render('index.ejs')
});

router.get('/duplication', (req, res) => {
    console.log(duplication);
    res.render('duplication.ejs')
});

router.post('/duplication', (req, res) => {
    const { nt, t, a, no, medicion, poblation } = req.body;
    duplication.setdata(nt, t, a, no, medicion, poblation);

    res.render('resultsDuplications.ejs', { duplication })
});

module.exports = router;