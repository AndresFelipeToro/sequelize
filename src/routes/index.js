const express = require('express');
const router = express.Router();

const db = require('../database/models');

/* GET home page. */
router.get('/', async function (req, res, next) {
	try {
		let profesors = await db.Profesor.findAll({ include: ['modulos'] });
		res.render('index', { title: 'Express -- Ejercicio Sequelize', profesors });
	} catch (error) {
		res.status(500).send({ error })
	}

});

router.get('/modulos', async function (req, res, next) {
	try {
		let modulos = await db.Modulo.findAll({ include: ['profesors'] });
		res.render('indexModulo', { title: 'Express -- Ejercicio Sequelize', modulos });
	} catch (error) {
		res.status(500).send({ error })
	}
});



module.exports = router;