const express = require('express');
const router = express.Router();


const postsController = require('../controllers/postsController');


//index
router.get('/', postsController.index);


//show
router.get('/:slug', postsController.show);


// store
router.post('/', postsController.store);


// update
router.put('/:id', postsController.update);


//partial update
router.patch('/:id', postsController.modify);


//delete
router.delete('/:id', postsController.destroy);



module.exports = router;