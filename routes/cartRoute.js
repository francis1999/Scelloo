const router = require('express').Router();
const { addCart } = require("../controllers/addCartController")

router.post('/addCart', addCart);

module.exports = router;
