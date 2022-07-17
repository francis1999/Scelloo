const db = require('../models')
const Carts = db.Carts
const Coupons = db.Coupons
const Validator = require('fastest-validator');
const sequelize = require("sequelize"); 
const { StatusCodes } = require('http-status-codes');

module.exports.addCart = async (req, res) => {
    const Cartschema = {
        name: { type: "string", optional: false, empty: false, },
        price: { type: "number", optional: false, empty: false, },
        quantity: { type: "number", optional: false, empty: false, },
        customername: { type: "string", optional: false, empty: false, },

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
            await Carts.create({
                name: req.body.name,
                price: req.body.price,
                quantity: req.body.quantity,
                customername: req.body.customername,
        
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
    console.log(error)
    res.status(500).json({
        message: "Opps Something Went Wrong",
        error: error
    })
}
}

module.exports.checkout= async (req, res) => {
    const {couponcode} = req.body;
    const verifyCoupon=await Coupons.findOne({where: {couponcode:couponcode}})
    if(verifyCoupon){
        const getcart=await Carts.findAll({
            attributes: ['customername', [sequelize.fn('sum', sequelize.col('price')), 'total'],[sequelize.fn('sum', sequelize.col('quantity')), 'totalquantity']],
            group : ['Carts.customername'],
            raw: true,
            order: sequelize.literal('total DESC')
        })
        const totalprice=getcart[0].total;
        const itemcount=getcart[0].totalquantity;
        const customerName=getcart[0].customername

        if(totalprice>verifyCoupon.discounttype && itemcount>verifyCoupon.item ){
            const removediscount=totalprice-verifyCoupon.discount
            res.status(StatusCodes.OK).json({
                totalprice:removediscount,
                customerName:customerName,
            })
        }else if(totalprice>verifyCoupon.discounttype && itemcount>verifyCoupon.item){
            const removepercentage=(verifyCoupon.percentage/100)*totalprice
            const finalResult=totalprice-removepercentage
            res.status(StatusCodes.OK).json({
                totalprice:finalResult,
                customerName:customerName,
            })
        }else if(totalprice>verifyCoupon.discounttype && itemcount>verifyCoupon.item){
            const removepercentage=(verifyCoupon.percentage/100)*totalprice
            const finalResult=totalprice-removepercentage
            res.status(StatusCodes.OK).json({
                totalprice:finalResult,
                customerName:customerName,
            })
        }else if(totalprice>verifyCoupon.discounttype && itemcount>verifyCoupon.item){
            const removediscount=totalprice-verifyCoupon.discount
            const removepercentage=(verifyCoupon.percentage/100)*removediscount
            const finalResult=removediscount-removepercentage
            res.status(StatusCodes.OK).json({
                totalprice:finalResult,
                customerName:customerName,
            })
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({
                message:"Invaid Coupon Code",
                status:"Failed",
            })
        }
    }else{
        res.status(StatusCodes.NOT_FOUND).json({
            message: "Coupon Not Found",
        })
    }
}


