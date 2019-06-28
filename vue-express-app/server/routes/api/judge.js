//jshint esversion: 6, node: true
const router = require('express').Router();
const controler = require('../../controllers/judge');

router.post('/', controler.create);
router.get('/', controler.readAll);
router.get('/:id', controler.read);
router.put('/:id', controler.update);
router.delete('/:id', controler.delete);

module.exports = router;
