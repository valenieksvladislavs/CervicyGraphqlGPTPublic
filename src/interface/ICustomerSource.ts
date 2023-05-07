import ICustomer from "./type/ICustomer";

export default interface ICUstomerSource {
    getCustomer(id: string): Promise<ICustomer|undefined>
}