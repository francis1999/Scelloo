const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
const port = process.env.PORT || 5000;
const http=require("http")
//Routers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());




app.get("/", (req, res) => {
    res.send("Welcome to SCELLOO APP");
})



app.use('/uploads', express.static('uploads'))
const server=http.createServer(app)
db.sequelize.sync().then(() => {
    server.listen(port, () => {
        console.log(`Server Running on 5000 Port ${port}`);
    });
})