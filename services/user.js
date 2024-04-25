import User from '../models/User.js'
import { Post } from '../models/Post.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class UserService {
  async getAll () {
    const result = await User.find({})
    return result
  }

  async createUser ({ body }) {
    const { username, name, password } = body
    const passwordHash = await bcrypt.hash(password, 10)
    console.log(passwordHash)
    const user = new User({
      username,
      name,
      password: passwordHash
    })

    const savedUser = await user.save()

    return savedUser
  }

  async updateUser ({ id, body }) {
    const { name, password } = body
    const filter = { id }
    const update = { name, password }
    const result = await User.findOneAndUpdate(filter, update)

    return result
  }

  async login ({ body }) {
    const { username, password } = body

    const [user] = await User.find({ username })
    console.log(user)

    const passwordMatch = !user ? false : await bcrypt.compare(password, user.password)

    if (!(user && passwordMatch)) {
      return { error: 'invalid password or username' }
    }

    const userToken = {
      id: user._id,
      username: user.username,
      name: user.name
    }

    const token = jwt.sign(
      userToken,
      'secret'
    )

    return { name: user.name, username: user.username, token }
  }

  async delete ({ id }) {
    try {
      await Post.deleteMany({ user: id })
      const result = await User.deleteOne({ _id: id })
      if (result.deletedCount === 1) return result
      return { error: 'There was a problem deleting your account. Try again later.' }
    } catch (error) {
      return { error }
    }
  }
}

export default new UserService()
