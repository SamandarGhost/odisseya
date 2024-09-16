import { NextFunction, Request, Response } from "express";
import { T } from '../libs/types/common';
import MemberService from "../models/Member.service";
import { MemberType } from "../libs/enums/member.enum";
import { AdminRequest } from "../libs/types/member";
import Errors from "../libs/Errors";
import { HttpCode } from "../libs/Errors";
import { Message } from "../libs/Errors";

const memberService = new MemberService();


const ownerController: T = {};
ownerController.goHome = (req: Request, res: Response) => {
    try {
        console.log("goHome");
        res.render("Home");
    } catch (err) {
        console.log("Error on Home Page:", err);
        res.redirect("/admin");
    }
};

ownerController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("getSignup");
        res.send("getSignup");
    } catch (err) {
        console.log("err", err);

    }
};

ownerController.signup = (req: Request, res: Response) => {
    try {
        console.log("signup");
        res.send("signup");
    } catch (err) {
        console.log("err", err);

    }
};

ownerController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("getLogin");
        res.send("getLogin");
    } catch (err) {
        console.log("err", err);

    }
};

ownerController.login = (req: Request, res: Response) => {
    try {
        console.log("login");
        res.send("login");
    } catch (err) {
        console.log("err", err);

    }
};

ownerController.logout = async (req: AdminRequest, res: Response) => {
    try {
        console.log("LogOut");
        req.session.destroy(function () {
            res.redirect("/admin");
        })
    } catch (err) {
        console.log("Error on Login Page:", err);
        res.redirect("/admin");
    }
};

ownerController.getUsers = async (req: Request, res: Response) => {
    try {
        console.log("getUsers");
        const result = await memberService.getUsers();
        console.log(result);
        res.render("users", { users: result });
    } catch (err) {
        console.log("Error on GetUsers:", err);
        res.redirect("/admin/login");
    }
};

ownerController.updateChosenUser = async (req: Request, res: Response) => {
    try {
        console.log("updateChosenUser");
        const result = await memberService.updateChosenUser(req.body);

        res.status(HttpCode.OK).json({ data: result });
    } catch (err) {
        console.log("Error on updateChosenUser:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};

ownerController.checkAuthSession = async (req: AdminRequest, res: Response) => {
    try {
        console.log("checkAuthsession");
        if (req.session?.member) res.send(`<script> alert("Hi, ${req.session.member.memberNick}") </script>`);
        else res.send(`<script> alert("${Message.NOT_AUTHENTICATED}") </script>`);



    } catch (err) {
        console.log("Error, checkAuthSession:", err);
        res.send(err);
    }
};

ownerController.verifyOwner = (
    req: AdminRequest,
    res: Response,
    next: NextFunction
) => {
    if (req.session?.member?.memberType === MemberType.OWNER) {
        req.member = req.session.member;
        next();
    } else {
        const message = Message.NOT_AUTHENTICATED;
        res.send(`<script> alert("${message}"); window.location.replace('/admin/login') </script>`);
    }
}

export default ownerController;
