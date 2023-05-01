/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { StudentModel, TeacherModel } from "./models";

import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import config from "./utils/config";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import resolvers from "./utils/resolver";
import typeDefs from "./utils/typeDef";

mongoose.set("strictQuery", false);
dotenv.config();

const MONGO_URI = config.MONGO_URI;
const PORT = config.PORT;
const SECRET = config.SECRET;
const app = express();
const httpServer = http.createServer(app);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("successfully connected to", MONGO_URI);
  })
  .catch((_error) => {
    console.log("error connection to", MONGO_URI);
  });


const start = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith("Bearer ")) {
          const decodedToken = jwt.verify(auth.substring(7), SECRET);
          const currentUser = await StudentModel.findById(
            //@ts-ignore
            decodedToken.id
          ).populate({
            path: "studyProgress",
            populate: ["course", { path: "lessonCompleted", populate: ["comments", "lesson"] }],
          });
          if (!currentUser) {
            const teacher = await TeacherModel.findById(
              //@ts-ignore
              decodedToken.id);
            return { currentUser: teacher };
          }
          return { currentUser };
        } else return { currentUser: null };
      },
    })
  );

  await new Promise<void>((resolve) => {
    httpServer.listen({ port: PORT }, resolve);
    console.log(`Server is now running on http://localhost:${PORT}`);
  });
};

start();
