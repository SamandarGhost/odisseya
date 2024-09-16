import { Request, Response } from "express";
import { T } from '../libs/types/common';
import MemberService from "../models/Member.service";
import AuthService from "../models/Auth.service";

const memberService = new MemberService();
const authService = new AuthService();

const memberController: T = {};
memberController.goHome = (req: Request, res: Response) => {
    try {
        res.send("Home");
    } catch (err) {
        console.log("err", err);

    }
};

export default memberController;
