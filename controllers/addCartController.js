const express = require('express')
const { Cart } = require('../models/cartModel')
var couponCode = require('coupon-code')
const Validator = require('fastest-validator');

module.exports.addCart = async (req, res) => {
    const Cartschema = {
        name: { type: "string", optional: false, empty: false, },
        price: { type: "number", optional: false, empty: false, },
        totalprice: { type: "number", optional: false, empty: false, },
    }
    try {
        const v = new Validator();
        const validationResponse = v.validate(req.body, Cartschema)
        if (validationResponse !== true) {
            return res.status(404).json({
                message: "Field is missing",
                errors: validationResponse
            })
        }
        await Cart.create({
            name: req.body.name,
            price: req.body.price,
            totalprice: req.body.totalprice,
    
        }).then(result => {
            res.status(200).json({
                message: "Cart Added Successfully",
                data: result
            })
        }).catch(error => {
            console.log(error)
            res.status(500).json({
                message: "Opps Something Went Wrong",
                error: error
            })
        });
}
catch(error) {
    res.status(500).json({
        message: "Opps Something Went Wrong",
        error: error
    })
}
}
