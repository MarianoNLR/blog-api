import { Post } from '../models/Post.js'
import User from '../models/User.js'
import mongoose from 'mongoose'

class PostService {
  async getAll ({ page }) {
    const pageSize = 5
    const result = await Post.find({}).sort({ createdAt: -1 }).skip((page - 1) * 5).limit(pageSize)
      .populate('user', 'name username -_id')
      .then(posts => {
        return posts
      })
      .catch(err => {
        return { error: err }
      })

    const totalPosts = await Post.countDocuments()

    return {
      posts: result,
      totalPages: Math.ceil(totalPosts / pageSize),
      currentPage: page
    }
  }

  async getById ({ id }) {
    const result = await Post.findById(id)
      .populate('user', 'name username -_id')
      .then(post => { return post })
      .catch(err => {
        return { error: err }
      })
    result.comments.sort((a, b) => b.timeStamp - a.timeStamp)
    return result
  }

  async create ({ body, userId }) {
    const { title, description } = body
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      const newPost = new Post({
        title,
        description,
        user: userId
      })

      const resultCreate = await newPost.save()
      await User.updateOne(
        { _id: userId },
        { $push: { posts: resultCreate.id } }
      )
      await session.commitTransaction()

      return resultCreate
    } catch (error) {
      await session.abortTransaction()
      return error
    } finally {
      session.endSession()
    }
  }

  async update ({ postId, body }) {
    const { title, description } = body

    try {
      const filter = postId
      const update = { title, description }

      const result = await Post.findOneAndUpdate(filter, update)

      if (!result) return { error: 'Post does not exists.' }

      return result
    } catch (error) {
      return { error }
    }
  }

  async delete ({ id }) {
    try {
      const result = await Post.deleteOne({ _id: id })

      if (result.deletedCount === 0) return { error: 'Post not found.' }
      return result
    } catch (error) {
      return { error: 'An error has ocurred. Try again later.' }
    }
  }

  async like ({ id, userId }) {
    try {
      await User.updateOne(
        { _id: userId },
        { $push: { likes: id } }
      )

      const result = await Post.updateOne(
        { _id: id },
        { $inc: { likes: 1 }, $push: { usersLike: userId } }
      )

      if (result.modifiedCount === 0) return { error: 'An error has ocurred.' }

      return result
    } catch (error) {
      return { error }
    }
  }

  async unlike ({ id, userId }) {
    try {
      await User.updateOne(
        { _id: userId },
        { $pull: { likes: id } }
      )

      const result = await Post.updateOne(
        { _id: id },
        { $inc: { likes: -1 }, $pull: { usersLike: userId } }
      )

      if (result.modifiedCount === 0) return { error: 'An error has ocurred.' }

      return result
    } catch (error) {
      return { error }
    }
  }

  async addComment ({ postId, userId, comment }) {
    try {
      const user = await User.findById(userId)

      const result = await Post.updateOne(
        { _id: postId },
        {
          $push: {
            comments: {
              userId,
              username: user.username,
              comment,
              timestamp: new Date()
            }
          }
        }
      )
      return result
    } catch (error) {
      return { error }
    }
  }
}

export default new PostService()
