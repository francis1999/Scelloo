const router = require('express').Router();
const { addCoupon } = require("../controllers/couponController")

router.post('/addCoupon', addCoupon);

module.exports = router;
