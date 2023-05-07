import { ContextValue } from "../../..";
import ICustomer from "../../../interface/type/ICustomer";

const getCustomer =  async (parent, { id }, context: ContextValue): Promise<ICustomer|undefined> => {
    console.log('get customer by id', id);
    const { customerSource } = context.dataSources;
    console.log('customerSource', customerSource);
    return await customerSource.getCustomer(id);
}

export default getCustomer;