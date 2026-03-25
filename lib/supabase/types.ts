export interface Message {
  id: string
  user_id: string
  username: string
  content: string
  created_at: string
}

export interface Note {
  id: string
  user_id: string
  username: string
  title: string
  content: string
  updated_at: string
}
