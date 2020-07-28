const express = require('express');
const router = express.Router();
const classCtrl = require('../../controllers/classes');

router.post('/', classCtrl.getAll);
router.post('/legacy', classCtrl.getLegacy);
router.post('/add', classCtrl.add);
router.post('/my-classes', classCtrl.getMine)
router.post('/delete/:id', classCtrl.deleteOne)
router.post('/delete/', classCtrl.deleteAll)

router.post('/enroll/:id', classCtrl.enroll)
router.post('/unenroll/:id', classCtrl.unenroll)

/*------- ADMIN ---------*/

router.post('/admin', classCtrl.getAllPopulated)
router.post('/admin/:id', classCtrl.getOnePopulated)

router.post('/:id', classCtrl.getOne);

module.exports = router;