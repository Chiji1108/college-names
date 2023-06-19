export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          bio_tags: string[] | null
          full_name: string | null
          id: string
          nick_name: string | null
          post_number: string | null
          room_number: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio_tags?: string[] | null
          full_name?: string | null
          id: string
          nick_name?: string | null
          post_number?: string | null
          room_number?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio_tags?: string[] | null
          full_name?: string | null
          id?: string
          nick_name?: string | null
          post_number?: string | null
          room_number?: string | null
          updated_at?: string | null
          username?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
