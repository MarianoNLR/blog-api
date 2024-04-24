import { Post } from '../models/Post.js'

class BlogService {
  async getAll () {
    const result = await Post.find({})
      .populate('user', 'name username -_id')
      .then(posts => {
        return posts
      })
      .catch(err => {
        return { error: err }
      })

    return result
  }

  async create ({ body, userId }) {
    const { title, description } = body

    try {
      const newPost = new Post({
        title,
        description,
        user: userId
      })

      const resultCreate = await newPost.save()

      return resultCreate
    } catch (error) {
      return error
    }
  }

  async update ({ blogId, body }) {
    const { title, description } = body

    try {
      const filter = blogId
      const update = { title, description }

      const result = await Post.findOneAndUpdate(filter, update)

      if (!result) return { error: 'Post does not exists.' }

      return result
    } catch (error) {
      return { error }
    }
  }

  async delete () {

  }
}

export default new BlogService()
