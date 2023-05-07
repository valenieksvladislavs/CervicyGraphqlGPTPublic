import { DataSource } from "apollo-datasource";
import knex from "knex";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import ICustomerSource from "../interface/ICustomerSource";
import ICustomer from "../interface/type/ICustomer";

export default class CustomerSource extends DataSource implements ICustomerSource {
	private readonly knex: ReturnType<typeof knex>;

	constructor(options: { knex: ReturnType<typeof knex> }) {
		super();
		this.knex = options.knex;
	}

	async getCustomer(id: string): Promise<ICustomer|undefined> {
		const customers: ICustomer[] = await this.knex
			.select("*")
			.from<ICustomer[]>("customer")
			.where(id)
			.limit(1);

    	return customers[0];
	}

	async getCustomerByEmailAndPassword(email: string, password: string): Promise<ICustomer|undefined> {
		const passwordHash = await bcrypt.hash(password, 10);
		
		const customers: ICustomer[] = await this.knex
			.select("*")
			.from<ICustomer[]>("customer")
			.where('email', email)
			.andWhere('password', passwordHash)
			.limit(1);

		return customers[0];
	}
}