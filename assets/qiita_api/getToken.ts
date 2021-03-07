import AccessToken from "./AccessToken";
import { Context } from "@nuxt/types";

export default async function(context: Context, code: string, response: (accessToken: AccessToken) => void) {
  const res = await context.$axios.$post('https://qiita.com/api/v2/access_tokens', {
    client_id: '112ffccc148278536d0b84c8ca0fc1f46c9163ea',
    client_secret: '5a1e96ce9f568478eac99a602676cbe2872c33cc',
    code
  })
  response(res)
}