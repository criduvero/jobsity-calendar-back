let express = require('express');
let router = express.Router();
let reminderController = require('./reminderController.js');

/*
 * GET
 */
router.get('/', reminderController.list);

/*
 * GET
 */
router.get('/:id', reminderController.show);

/*
 * POST
 */
router.post('/', reminderController.create);

/*
 * PUT
 */
router.put('/update/:id', reminderController.update);

/*
 * DELETE
 */
router.delete('/:id', reminderController.remove);

module.exports = router;
