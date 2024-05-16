const router = require('express').Router();

const { getmail } = require('../controller/appController.js')


/** HTTP Reqeust */
// router.post('/user/signup', signup);
router.post('/getmail', getmail);


module.exports = router;