const {Router} = require('express');
const PaperController = require('../../controller/paper-controller');


const router = Router();
const paperCtrl = new PaperController();

router.get('/', paperCtrl.getAll);
router.get('/:paperId', paperCtrl.getOne);
router.post('/', paperCtrl.create);
router.put('/:paperId', paperCtrl.update);
router.delete('/:paperId', paperCtrl.delete);

module.exports = router;