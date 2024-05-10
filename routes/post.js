import { Router } from 'express'
import PostController from '../controllers/posts.js'
import { userExtractor } from '../middleware/userExtractor.js'

export const createPostRouter = () => {
  const postRouter = Router()
  const postController = new PostController()

  postRouter.get('/', postController.getAll)
  postRouter.get('/:id', postController.getById)
  postRouter.post('/', userExtractor, postController.create)
  postRouter.put('/:id', postController.update)
  postRouter.delete('/:id', postController.delete)
  postRouter.post('/:id/like', userExtractor, postController.like)
  return postRouter
}

// export const postRouter = Router()
