const db = require('../models')
const Coupons = db.Coupons
const Validator = require('fastest-validator')
const { StatusCodes } = require('http-status-codes')

module.exports.addCoupon = async (req, res) => {
  var couponCode = ''
  var possible = process.env.COUPON_VARIABLE
  for (var i = 0; i < 10; i++) {
    couponCode += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  try {
    /***************This is Validation Code************/ 
    const Cartschema = {
      description: { type: 'string', optional: false, empty: false },
      constraints: { type: 'string', optional: false, empty: false },
      discount: { type: 'number', optional: true, empty: false },
      item: { type: 'number', optional: false, empty: false },
      percentage: { type: 'number', optional: true, empty: false },
      discounttype: { type: 'number', optional: false, empty: false },
    }
    const v = new Validator()
    const validationResponse = v.validate(req.body, Cartschema)

    /***************end of Validation Code************/ 
    const checkCuoponCode= await Coupons.findOne({ where: {couponcode: couponCode }})
    if (validationResponse !== true) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Field is missing',
        errors: validationResponse,
      })
    }else if(checkCuoponCode){
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'This Coupon type already exist',
            errors: "Failed",
          })
    }else{
        const couponData = {
            couponcode: couponCode,
            description: req.body.description,
            constraints: req.body.constraints,
            discount: req.body.discount,
            item: req.body.item,
            percentage: req.body.percentage,
            discounttype: req.body.discounttype,
          }
          Coupons.create(couponData)
            .then((result) => {
              res.status(StatusCodes.OK).json({
                message: 'Coupon Added Successfully',
                data: result,
              })
            })
            .catch((error) => {
              res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Opps Something Went Wrong',
                error: error,
              })
            })
    }
   
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Opps Something Went Wrong',
      error: error,
    })
  }
}
