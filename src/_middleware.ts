import { handleMiddleware } from 'hono/cloudflare-pages'
import { basicAuth } from 'hono/basic-auth'

export const onRequest = handleMiddleware(
  basicAuth({
    username: 'hono',
    password: 'acoolproject',
  })
)