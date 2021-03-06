const {Router} = require('express');
const HomeworkController = require('../../controller/homework-controller');


const router = Router();
const homeworkCtrl = new HomeworkController();

router.get('/', homeworkCtrl.getAll);
router.get('/:homeworkId', homeworkCtrl.getOne);
router.post('/', homeworkCtrl.create);
router.put('/:homeworkId', homeworkCtrl.update);
router.delete('/:homeworkId', homeworkCtrl.delete);

module.exports = router;