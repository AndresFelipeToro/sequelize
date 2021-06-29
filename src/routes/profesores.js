const express = require('express');
const router = express.Router();

const db = require('../database/models');

router.get('/:id', async (req, res) => {
	try {
		let profesor = await db.Profesor.findByPk(
			req.params.id,
			{
				attributes: {
					exclude: ['deletedAt', 'createdAt', 'updatedAt']
				},
				include: ['modulos']
			}
		);
		res.json(profesor);
	} catch (error) {
		res.json(error);
	}
});

router.post('/', async (req, res) => {
	try {
		var dniProfesor = req.body.dniProfesor;
		var nombreProfesor = req.body.nombreProfesor;
		var direccion = req.body.direccion;
		var telefono = req.body.telefono;
		var values = { id: dniProfesor, nombreProfesor: nombreProfesor, direccion: direccion, telefono: telefono, createdAt: new Date() };
		var patronLetras = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/;
		var patronNumeros = /^[0123456789\s]+$/;
		if (!patronLetras.test(nombreProfesor)) {
			res.status(400).json({
				responseDescription: 'El nombre del profesor no puede contener números'
			})
		}
		if (!patronNumeros.test(telefono)) {
			res.status(400).json({
				responseDescription: 'El télefono del profesor no puede contener letras'
			})
		}
		if (dniProfesor === '' || dniProfesor === null) {
			res.status(400).json({
				responseDescription: 'El dni del profesor no puede ir vacío'
			})
		} else if (nombreProfesor === '' || nombreProfesor === null) {
			res.status(400).json({
				responseDescription: 'El dni del profesor no puede ir vacío'
			})
		} else if (direccion === '' || direccion === null) {
			res.status(400).json({
				responseDescription: 'La dirección del profesor no puede ir vacía'
			})
		} else if (telefono === '' || telefono === null) {
			res.status(400).json({
				responseDescription: 'El teléfono del profesor no puede ir vacío'
			})
		}
		await db.Profesor.create(values)
		res.status(200).json({
			respondeCode: '200',
			responseDescription: "Profesor creado correctamente"
		})
	} catch (error) {
		res.status(500).json({ error })
	}
})

router.put('/:id', async (req, res) => {
	try {
		var id = req.params.id;
		var dniProfesor = req.body.dniProfesor;
		var nombreProfesor = req.body.nombreProfesor;
		var direccion = req.body.direccion;
		var telefono = req.body.telefono;
		var values = { id: dniProfesor, nombreProfesor: nombreProfesor, direccion: direccion, telefono: telefono, updatedAt: new Date() };
		var patronLetras = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/;
		var patronNumeros = /^[0123456789\s]+$/;
		var selector = {
			where: { id: id }
		};

		if (nombreProfesor !== undefined) {
			if (!patronLetras.test(nombreProfesor)) {
				res.status(400).json({
					responseDescription: 'El nombre del profesor no puede contener números'
				})
			}
		}

		if (telefono !== undefined) {
			if (!patronNumeros.test(telefono)) {
				res.status(400).json({
					responseDescription: 'El télefono del profesor no puede contener letras'
				})
			}
		}

		if (dniProfesor === '' || dniProfesor === null) {
			res.status(400).json({
				responseDescription: 'El dni del profesor no puede ir vacío'
			})
		} else if (nombreProfesor === '' || nombreProfesor === null) {
			res.status(400).json({
				responseDescription: 'El dni del profesor no puede ir vacío'
			})
		} else if (direccion === '' || direccion === null) {
			res.status(400).json({
				responseDescription: 'La dirección del profesor no puede ir vacía'
			})
		} else if (telefono === '' || telefono === null) {
			res.status(400).json({
				responseDescription: 'El teléfono del profesor no puede ir vacío'
			})
		}
		await db.Profesor.update(values, selector)
		res.status(200).json({
			respondeCode: '200',
			responseDescription: "Profesor actualizado correctamente"
		})
	} catch (error) {
		res.status(500).json({ error })
	}
})

router.delete('/:id', async (req, res) => {
	try {
		await db.Modulo.destroy({
			where: {
				dniProfesor: req.params.id
			}
		})
		await db.Profesor.destroy({
			where: {
				id: req.params.id
			}
		});
		return res.status(200).json({
			responseCode: '200',
			responseDescription: 'Profesor eliminado correctamente'
		});
	} catch (error) {
		return res.status(500).json({
			error
		});
	}

})

module.exports = router;