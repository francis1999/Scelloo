const express = require('express')
const db  = require('../models')
const Coupons=db.Coupons
const Validator = require('fastest-validator');
const { StatusCodes } = require('http-status-codes')


module.exports.addCoupon = async (req, res) => {
    try {
        const Cartschema = {
            couponcode: { type: "string", optional: false, empty: false},
            description: { type: "string", optional: false, empty: false},
            constraints: { type: "string", optional: false, empty: false},
            discount: { type: "number", optional: false, empty: false},
            discountype: { type: "string", optional: false, empty: false},
        }
        const v = new Validator();
        const validationResponse = v.validate(req.body, Cartschema)
        if (validationResponse !== true) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Field is missing",
                errors: validationResponse
            })
        }
        const couponData={
            couponcode: req.body.couponcode,
            description: req.body.description,
            constraints: req.body.constraints,
            discount: req.body.discount,
            discountype: req.body.discountype
        }
        Coupons.create(couponData).then(result => {
            res.status(StatusCodes.OK).json({
                message: "Coupon Added Successfully",
                data: result
            })
        }).catch(error => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Opps Something Went Wrong",
                error: error
            })
        });
}
catch(error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Opps Something Went Wrong",
        error: error
    })
}
}
