import { Router } from 'express'
import UserController from '../controllers/users.js'

export const createUserRouter = () => {
  const userRouter = Router()
  const userController = new UserController()

  userRouter.get('/', userController.getAll)
  userRouter.post('/', userController.create)
  userRouter.put('/:username', userController.update)

  return userRouter
}

export const userRouter = Router()
