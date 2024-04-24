import { Router } from 'express'
import BlogController from '../controllers/posts.js'
import { userExtractor } from '../middleware/userExtractor.js'

export const createBlogRouter = () => {
  const blogRouter = Router()
  const blogController = new BlogController()

  blogRouter.get('/', blogController.getAll)
  blogRouter.post('/', userExtractor, blogController.create)
  blogRouter.put('/:id', blogController.update)
  blogRouter.delete('/:id', blogController.delete)

  return blogRouter
}

export const blogRouter = Router()
