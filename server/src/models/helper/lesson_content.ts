import { Document, Schema, model } from 'mongoose'

import { Content } from 'types/helper'

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
})
export type IContentModel = Content & Document

const LessonContent = model<IContentModel>("Content", schema)

export default LessonContent