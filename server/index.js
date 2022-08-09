const mongoose = require("mongoose");
const config = require("config");
const express = require("express");
const fileUpload = require("express-fileupload");
const authRouter = require('./routes/auth.routes');
const fileRouter = require('./routes/file.router');
const PORT = config.get("serverPort");
const corsMiddleware = require('./middleware/cors.middleware');
const app = express();
app.use(fileUpload({}));
app.use(corsMiddleware);
app.use(express.json());
app.use(express.static('static'))
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);

const start = async () => {
    await mongoose.connect(config.get("dbUrl")).then(()=>console.log('success connection with DB')).catch((err) => console.error(err));
    app.listen(PORT, () => {
        console.log("server on", PORT);
    })
}

start();