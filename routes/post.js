import { Router } from 'express'
import PostController from '../controllers/posts.js'
import { userExtractor } from '../middleware/userExtractor.js'

export const createpostRouter = () => {
  const postRouter = Router()
  const postController = new PostController()

  postRouter.get('/', postController.getAll)
  postRouter.post('/', userExtractor, postController.create)
  postRouter.put('/:id', postController.update)
  postRouter.delete('/:id', postController.delete)

  return postRouter
}

export const postRouter = Router()
