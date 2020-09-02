const express = require('express');
const router = express.Router();
const requestCtrl = require('../../controllers/requests');

router.post('/', requestCtrl.getAll);
router.post('/create', requestCtrl.create);

module.exports = router;