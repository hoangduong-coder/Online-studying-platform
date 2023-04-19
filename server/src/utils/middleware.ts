/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GraphQLError } from "graphql";
import config from "./config";
import jwt from "jsonwebtoken";
import { UserModel } from "models";

const returnUser = (token: string) => {
  const decodedToken = jwt.verify(token.substring(7), config.SECRET);
  //@ts-ignore
  const currentUser = await UserModel.findById(decodedToken.id);
  return currentUser;
};

const errorHandler = ({ errorMessage, error, code }: { errorMessage: string, error: unknown, code: string }) => {
  throw new GraphQLError(errorMessage, {
    extensions: {
      code,
      error
    }
  });
};

export default {
  middleware: returnUser, errorHandler
};