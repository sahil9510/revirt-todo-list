const express = require('express')
const todosControllers = require('../controllers/todos-controller')
const {check} = require('express-validator')
const router = express.Router();

router.get('/',todosControllers.getAllTasks)

router.post('/',check('title').not().isEmpty(),todosControllers.addNewTask)


router.delete('/:id',todosControllers.deleteTask)

router.patch('/:id',todosControllers.updateTask)
module.exports=router