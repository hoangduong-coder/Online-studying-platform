import { Document, Schema, model } from 'mongoose';

import { Content } from 'types/helper';

export type ContentDocument = Document & Content;
const schema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 5
  },
  description: {
    type: String,
    required: true,
    minlength: 5
  },
  body: String,
  material: [
    {
      materialType: String,
      link: String
    }
  ]
});

export default model<ContentDocument>("Content", schema);