const express = require('express');
const router = express.Router();
const classCtrl = require('../../controllers/classes');

router.post('/', classCtrl.getAll);
router.post('/legacy', classCtrl.getLegacy);
router.post('/classes', classCtrl.getClasses);
router.post('/collabs', classCtrl.getCollabs);
router.post('/checklive/:id', classCtrl.checkLive);
router.post('/live/enroll/:id', classCtrl.enrollLive);
router.post('/move-bds', classCtrl.getMoveBDs);
router.post('/add', classCtrl.add);
router.post('/my-classes', classCtrl.getMine)
router.post('/update/:id', classCtrl.updateOne)
router.post('/delete/:id', classCtrl.deleteOne)
router.post('/delete/', classCtrl.deleteAll)

router.post('/enroll/:id', classCtrl.enroll)
router.post('/unenroll/:id', classCtrl.unenroll)

/*------- ADMIN ---------*/

router.use(require('../../config/auth'))
router.post('/admin', classCtrl.getAllPopulated)
router.post('/admin/live/', classCtrl.getAllLive);
router.post('/admin/live/add', classCtrl.addLive);
router.post('/admin/live/:id', classCtrl.getLive);
router.post('/admin/:id', classCtrl.getOnePopulated);

router.post('/:id', classCtrl.getOne);

module.exports = router;