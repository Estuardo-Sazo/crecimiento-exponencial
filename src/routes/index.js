const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('index.ejs')
});
router.get('/duplication', (req, res) => {
    res.render('duplication.ejs')
});

module.exports =router;