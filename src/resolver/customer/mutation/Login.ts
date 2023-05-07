import { ContextValue } from "../../..";
import * as jwt from "jsonwebtoken";
import LoginPayload from "../../../model/payload/LoginPayload";

const login =  async (_parent, { email, password }, context: ContextValue): Promise<LoginPayload|undefined> => {
    const { customerSource } = context.dataSources;
    const customer = await customerSource.getCustomerByEmailAndPassword(email, password);

    return new LoginPayload(jwt(customer.id), customer);
}

export default login;