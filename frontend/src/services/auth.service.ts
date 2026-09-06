import { api } from '@/services/api'

// access_token/token_type stay snake_case here (not camelCase like the rest
// of the API) because this is a standard OAuth2 token response shape.
type TokenResponse = {
  access_token: string
  token_type: string
}

export const authService = {
  register: (name: string, email: string, password: string) =>
    api.post<TokenResponse>('/auth/register', { name, email, password }).then((r) => r.data.access_token),

  login: (email: string, password: string) =>
    api.post<TokenResponse>('/auth/login', { email, password }).then((r) => r.data.access_token),
}
