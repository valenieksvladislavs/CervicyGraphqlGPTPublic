export default interface ICustomer {
	id: string;
	email: string;
	phone: string;
	gender: boolean;
	password: string;
	firstname: string;
	lastname: string;
	createdAt: Date;
	updatedAt: Date;
}
//TODO: Add current location