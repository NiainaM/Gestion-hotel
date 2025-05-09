const router = require('express').Router();
const controller = require('../controllers/hotelController');

router.post('/', controller.create);
router.get('/:id', controller.findOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;