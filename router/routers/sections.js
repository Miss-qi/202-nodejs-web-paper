import {Router} from 'express';
import SectionController from '../../controller/section-controller';


const router = Router();
const sectionCtrl = new SectionController();

router.get('/', sectionCtrl.getAll);
router.get('/:sectionId', sectionCtrl.getOne);
router.post('/', sectionCtrl.create);
router.put('/:sectionId', sectionCtrl.update);
router.delete('/:sectionId', sectionCtrl.delete);

module.exports = router;