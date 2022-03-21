const express = require("express");
const router = express.Router();
const model = require("../objection/model")
const user_controller = require("../controllers/users.controller");


router.get('/developers', user_controller.users_get);



// Login
router.post('/login', user_controller.login);

// // Delete specific Developers by id
// router.delete('/developers/:uid', user_controller.user_list_delete);
//
router.post('/register', user_controller.register);

router.post('/refresh', user_controller.refreshToken);

router.get( '/get-info', user_controller.getInfo);

// router.post( '/signature', user_controller.signature);

// // Update Records /  Developers
// router.put('/', user_controller.user_list_put);


module.exports = router