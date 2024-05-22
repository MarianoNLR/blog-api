import postService from '../services/post.js'

export default class PostController {
  getAll = async (req, res) => {
    const { page } = req.query
    const results = await postService.getAll({ page })
    res.json(results)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const result = await postService.getById({ id })
    return res.json(result)
  }

  create = async (req, res) => {
    const { body } = req
    const { userId } = req
    const result = await postService.create({ body, userId })

    if (result.error) {
      return res.status(400).json({ error: result.error })
    }

    return res.status(201).json(result)
  }

  update = async (req, res) => {
    const { postId } = req.params
    const { body } = req

    const result = await postService.update({ postId, body })

    return res.json(result)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await postService.delete({ id })

    if (result.error) return res.status(404).json(result)
    return res.status(200).json()
  }

  like = async (req, res) => {
    const { id } = req.params
    const { userId } = req
    const result = await postService.like({ id, userId })

    if (result.error) return res.json(result)

    return res.sendStatus(200)
  }

  unlike = async (req, res) => {
    const { id } = req.params
    const { userId } = req
    const result = await postService.unlike({ id, userId })

    if (result.error) return res.json(result)

    return res.sendStatus(200)
  }

  addComment = async (req, res) => {
    const { id: postId } = req.params
    const { userId } = req
    const { comment } = req.body
    const result = await postService.addComment({ postId, userId, comment })
    console.log(result)
    if (result.error) return res.json(result)

    return res.sendStatus(200)
  }
}
