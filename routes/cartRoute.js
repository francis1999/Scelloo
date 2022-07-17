const router = require('express').Router();
const { addCart,checkout } = require("../controllers/addCartController")

router.post('/addCart', addCart);
router.post('/checkout', checkout);

module.exports = router;
