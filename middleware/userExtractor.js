import jwt from 'jsonwebtoken'

const { JWT_SECRET } = process.env

export const userExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  let token = ''

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, JWT_SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const { id: userId } = decodedToken
  request.userId = userId

  next()
}
