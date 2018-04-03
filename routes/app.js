module.exports = function () {
    var router = require('express').Router();

    // =====================================
    // START PAGE (game page) ==============
    // =====================================
    router.get('/', function (req, res) {
        return res.render('index.ejs', {title: 'Ultimate tic-tac-toe game'});
    });

    return router;

};

