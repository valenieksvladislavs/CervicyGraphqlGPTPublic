import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express, { Request } from 'express';
import http from 'http';
import cors from 'cors';
import pkg from 'body-parser';
import { Knex } from 'knex';
import typeDefs from './schema';
import resolvers from './resolver/customer';
import CustomerSource from './dataSource/CustomerSource';
import { knexInstance } from './database';

export class ContextValue {
	public token: string;
	public dataSources: {
		customerSource: CustomerSource;
	};

	constructor({ req, knex }: { req: Request, knex: Knex }) {
		this.token = req.headers.token.toString();
		this.dataSources = {
			customerSource: new CustomerSource({ knex }),
		};
	}
}

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<ContextValue>({
	typeDefs,
	resolvers,
	plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
});
await server.start();
app.use(
	'/customer',
	cors<cors.CorsRequest>(),
	pkg.json(),
	expressMiddleware(server, {
		context: async ({ req }) => {
			return new ContextValue({ req, knex: knexInstance() });
		},
	}),
);

await new Promise<void>((resolve) => httpServer.listen({port: 4000}, resolve));
console.log(`🚀 Server ready at http://localhost:4000/customer`);