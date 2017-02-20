import {Router} from 'express';
import HomeworkController from '../../controller/homework-controll';


const router = Router();
const homeworkCtrl = new HomeworkController();

router.get('/', homeworkCtrl.getAll);
router.get('/:homeworkId', homeworkCtrl.getOne);
router.post('/', homeworkCtrl.create);
router.put('/:homeworkId', homeworkCtrl.update);
router.delete('/:homeworkId', homeworkCtrl.delete);

module.exports = router;