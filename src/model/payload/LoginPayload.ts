import ICustomer from "../../interface/type/ICustomer";

export default class LoginPayload {
    public constructor(
        public token: string,
        public customer: ICustomer
    ) {}
}