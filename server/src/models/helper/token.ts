import { Document, Schema, Types, model } from "mongoose";

import { Token } from "types/user";
import mongooseUniqueValidator from "mongoose-unique-validator";

export type TokenDocument = Document & Token;

const schema = new Schema({
  user: {
    type: Types.ObjectId,
    required: true,
    unique: true,
    refPath: 'userType'
  },
  userType: {
    type: String,
    required: true,
    enum: ['Student', 'Teacher']
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    expires: 3600
  }
});
schema.plugin(mongooseUniqueValidator);
export default model<TokenDocument>("VerifyToken", schema);