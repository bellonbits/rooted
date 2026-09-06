import { api } from '@/services/api'

export type Author = { id: string; name: string }
export type Reply = { id: string; body: string; createdAt: string; author: Author }
export type Post = {
  id: string
  title: string
  body: string
  category: string
  createdAt: string
  author: Author
  replies: Reply[]
}

export const communityService = {
  list: () => api.get<Post[]>('/community').then((r) => r.data),
  get: (id: string) => api.get<Post>(`/community/${id}`).then((r) => r.data),
  create: (title: string, body: string, category: string) =>
    api.post<Post>('/community', { title, body, category }).then((r) => r.data),
  reply: (postId: string, body: string) =>
    api.post<Reply>(`/community/${postId}/replies`, { body }).then((r) => r.data),
}
