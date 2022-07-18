const router = require('express').Router();
const { addCoupon,getAllCoupon } = require("../controllers/couponController")

router.post('/addCoupon', addCoupon);
router.get('/getAllCoupon', getAllCoupon);

module.exports = router;
