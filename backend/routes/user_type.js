const express = require('express');

const controller = require('../controllers/user_type.controller');
const checkAuthMiddleware = require('../middleware/check-auth');
const router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/',controller.add);
router.patch('/:id',controller.update);
router.delete('/:id',controller.destroy);


module.exports = router;



