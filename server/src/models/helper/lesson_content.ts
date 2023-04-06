import { Schema, model } from 'mongoose'

import { Content } from 'types/helper'

const schema = new Schema<Content>({
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

export default model<Content>("Content", schema)