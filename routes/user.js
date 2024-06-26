import { Router } from 'express'
import UserController from '../controllers/users.js'
// eslint-disable-next-line no-unused-vars
import { userExtractor } from '../middleware/userExtractor.js'

export const createUserRouter = () => {
  const userRouter = Router()
  const userController = new UserController()

  userRouter.get('/', userExtractor, userController.getAll)
  userRouter.get('/:id', userExtractor, userController.getById)
  userRouter.post('/login', userController.login)
  userRouter.post('/', userController.create)
  userRouter.put('/:username', userController.update)
  userRouter.delete('/:id', userController.delete)

  return userRouter
}

export const userRouter = Router()
