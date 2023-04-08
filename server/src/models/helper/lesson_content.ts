import { Schema, model } from 'mongoose';

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

const Content = model("Content", schema);

export default Content;