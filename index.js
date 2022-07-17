const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;
const http=require("http")
dotenv.config();
//Routers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


const couponrouter = require('./routes/couponRoute');
const cartrouter = require('./routes/cartRoute');

app.get("/", (req, res) => {
    res.send("Welcome to SCELLOO APP");
})

app.use('/api/coupon', couponrouter);
app.use('/api/cart', cartrouter);

app.use('/uploads', express.static('uploads'))
const server=http.createServer(app)
db.sequelize.sync().then(() => {
    server.listen(port, () => {
        console.log(`Server Running on 5000 Port ${port}`);
    });
})