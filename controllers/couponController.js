const express = require('express')
const { couponmodel } = require('../models/couponModel')
var couponCode = require('coupon-code')

module.exports.addCoupon = async (req, res) => {
  
  var code = null
  do {
    code = couponCode.generate()
  } while (!unique(code))
  console.log(code)
  // code is unique here
  return code
}
