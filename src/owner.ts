import express from "express";
import ownerController from "./controllers/owner.controller";
import makeUploader from "./libs/utilis/uploader";
const owner = express.Router();

owner
    .get("/", ownerController.goHome)

    .get("/signup", ownerController.getSignup)
    .post(
        "/signup",
        makeUploader("members").single("memberImage"),
        ownerController.signup)

    .get("/login", ownerController.getLogin)
    .post("/login", ownerController.login);

export default owner;
