import User from '../models/User.js'
import bcrypt from 'bcrypt'

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
}

export default new UserService()
