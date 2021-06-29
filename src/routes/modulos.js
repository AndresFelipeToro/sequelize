const express = require('express');
const router = express.Router();

const db = require('../database/models');

router.get('/:id', async (req, res) => {
    try {
        let modulo = await db.Modulo.findByPk(
            req.params.id,
            {
                attributes: {
                    exclude: ['deletedAt', 'createdAt', 'updatedAt']
                },
                include: ['profesors']
            }
        );
        res.json(modulo);
    } catch (error) {
        res.status(500).send({ error })
    }
});

router.post('/', async (req, res) => {
    try {
        var nombreModulo = req.body.nombreModulo;
        var dniProfesor = req.body.dniProfesor;
        var values = { nombreModulo: nombreModulo, dniProfesor: dniProfesor, createdAt: new Date() };
        if (nombreModulo === '' || nombreModulo === null) {
            return res.status(400).json({
                responseDescription: 'El nombre del módulo no puede ir vacío'
            })
        } else if (dniProfesor === '' || dniProfesor === null) {
            return res.status(400).json({
                responseDescription: 'El dni del profesor no puede ir vacío'
            })
        }
        await db.Modulo.create(values)
        return res.status(200).json({
            respondeCode: '200',
            responseDescription: "Módulo creado correctamente"
        })
    } catch (error) {
        return res.status(500).json({ error })
    }
})

router.put('/:id', async (req, res) => {
    try {
        var nombreModulo = req.body.nombreModulo;
        var dniProfesor = req.body.dniProfesor;
        var id = req.params.id

        var values = { nombreModulo: nombreModulo, dniProfesor: dniProfesor, updatedAt: new Date() };
        var selector = {
            where: { id: id }
        };
        if (nombreModulo === '' || nombreModulo === null) {
            return res.status(400).json({
                responseDescription: 'El nombre del módulo no puede ir vacío'
            })
        } else if (dniProfesor === '' || dniProfesor === null) {
            return res.status(400).json({
                responseDescription: 'El dni del profesor no puede ir vacío'
            })
        }
        await db.Modulo.update(values, selector)
        return res.status(200).json({
            respondeCode: '200',
            responseDescription: "Datos actualizados correctamente"
        })
    } catch (error) {
        return res.status(500).json({ error })
    }
});

router.delete('/:id', async (req, res) => {
    await db.Modulo.destroy({
        where: {
            id: req.params.id
        }
    });
    res.send('Módulo eliminado correctamente');
})

module.exports = router;