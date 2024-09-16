import MemberModel from "../schema/Member.model";
import { MemberType } from "../libs/enums/member.enum";
import Errors from "../libs/Errors";
import { Message } from "../libs/Errors";
import { HttpCode } from "../libs/Errors";
import { Member, MemberUpdateInput } from "../libs/types/member";
import { shapeIntoMongooseObjectId } from "../libs/config";

class MemberService {
    private readonly memberModel;
    constructor() {
        this.memberModel = MemberModel;
    }

    public async getUsers(): Promise<Member[]> {
        const result = await this.memberModel.find({ memberType: MemberType.USER }).exec();
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.N0_DATA_FOUND);
        return result;
    }

    public async updateChosenUser(input: MemberUpdateInput): Promise<Member> {
        input._id = shapeIntoMongooseObjectId(input._id);
        const result = await this.memberModel.findByIdAndUpdate({ _id: input._id }, input, { new: true }).exec();
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.N0_DATA_FOUND);

        return result;
    }
};

export default MemberService;