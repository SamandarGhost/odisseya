import cors from "cors";
import express from "express";
import path from 'path';
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { MORGAN_FORMAT } from "./libs/config";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import { T } from "./libs/types/common";


const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
    uri: String(process.env.M_MONGO_URL),
    collection: "sessions",
});


/** 1 - ENTRANCE**/
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("./uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: true,
}));
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));


/** 2 - SESSIONS**/
app.use(
    session({
        secret: String(process.env.SESSION_SECRET),
        cookie: {
            maxAge: 1000 * 3600 * 6 // 6h
        },
        store: store,
        resave: true,
        saveUninitialized: true
    })
);

app.use(function (req, res, next) {
    const sessionInstance = req.session as T;
    res.locals.member = sessionInstance.member;
    next();
})



/** 3 - VIEWS**/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");




/** 4 - ROUTERS**/



export default app;    // module.exports = app;  bu holat ayni commanJsda ishlatardik, lekin ESJS da export default qilib ishlatamiz

