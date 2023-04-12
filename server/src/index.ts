/* eslint-disable @typescript-eslint/no-floating-promises */

import { ApolloServer } from '@apollo/server';
import config from "./utils/config";
import dotenv from "dotenv";
import mongoose from "mongoose";
import resolvers from './utils/resolver';
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from './utils/typeDef';

mongoose.set("strictQuery", false);
dotenv.config();

const MONGO_URI = config.MONGO_URI;
const PORT = config.PORT;

try {
  mongoose.connect(MONGO_URI);
  console.log('successfully connected to', MONGO_URI);
} catch (error) {
  console.log('error connection to', MONGO_URI);
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: PORT },
}).then(
  ({ url }) => console.log(`Server is ready. Go to ${url} for more details.`)
);

