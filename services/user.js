import User from '../models/User.js'
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
      username: user.username,
      name: user.name
    }

    const token = jwt.sign(
      userToken,
      'secret'
    )

    return { name: user.name, token }
  }
}

export default new UserService()
