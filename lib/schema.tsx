export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      current_todos: {
        Row: {
          id: number
          user_id: string
          todo_name: string | null
          todo_description: string | null
          is_complete: boolean
          inserted_at: string
        }
        Insert: {
          id?: number
          user_id: string
          todo_name?: string | null
          todo_description?: string | null
          is_complete?: boolean
          inserted_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          todo_name?: string | null
          todo_description?: string | null
          is_complete?: boolean
          inserted_at?: string
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
