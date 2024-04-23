import { Router } from 'express'
import UserController from '../controllers/users.js'
// eslint-disable-next-line no-unused-vars
import { userExtractor } from '../middleware/userExtractor.js'

export const createUserRouter = () => {
  const userRouter = Router()
  const userController = new UserController()

  userRouter.get('/', userController.getAll)
  userRouter.post('/login', userController.login)
  userRouter.post('/', userController.create)
  userRouter.put('/:username', userController.update)

  return userRouter
}

export const userRouter = Router()
