import { gql } from "apollo-server-express";

export default gql`
	type Customer {
		id: String!
		email: String!
		phone: String
		firstname: String
		lastname: String
	}

	type LoginPayload {
		token: String
		customer: Customer
	}

	type Query {
		Customer(id: ID!): Customer!
		Customers: [Customer]
	}

	type Mutation {
		Login(email: String!, password: String!)
	}
`;