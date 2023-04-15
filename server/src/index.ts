/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { ApolloServer } from "@apollo/server";
import { UserModel } from "models";
import config from "./utils/config";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import resolvers from "./utils/resolver";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./utils/typeDef";

mongoose.set("strictQuery", false);
dotenv.config();

const MONGO_URI = config.MONGO_URI;
const PORT = config.PORT;
const SECRET = config.SECRET;

try {
  mongoose.connect(MONGO_URI);
  console.log("successfully connected to", MONGO_URI);
} catch (error) {
  console.log("error connection to", MONGO_URI);
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), SECRET);
      const currentUser = await UserModel.findById(decodedToken);
      return { currentUser };
    }
  },
});

console.log(`Server is ready. Go to ${url} for more details.`);
