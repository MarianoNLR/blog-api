import { Schema, model } from 'mongoose'

const postSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: {
    type: Number,
    default: 0
  },
  usersLike: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    username: { type: String },
    comment: { type: String },
    timeStamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true })

postSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Post = model('Post', postSchema)
