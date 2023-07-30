export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      badge_categories: {
        Row: {
          created_at: string | null
          id: number
          name: string
          parent_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          parent_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          parent_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "badge_categories_parent_id_fkey"
            columns: ["parent_id"]
            referencedRelation: "badge_categories"
            referencedColumns: ["id"]
          }
        ]
      }
      badges: {
        Row: {
          category_id: number
          created_at: string | null
          emoji: string | null
          id: number
          name: string
        }
        Insert: {
          category_id: number
          created_at?: string | null
          emoji?: string | null
          id?: number
          name: string
        }
        Update: {
          category_id?: number
          created_at?: string | null
          emoji?: string | null
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "badges_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "badge_categories"
            referencedColumns: ["id"]
          }
        ]
      }
      companies: {
        Row: {
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      educations: {
        Row: {
          activities_and_societies: string[] | null
          details: string | null
          end_date: string | null
          profile_id: string
          school_id: number
          start_date: string | null
        }
        Insert: {
          activities_and_societies?: string[] | null
          details?: string | null
          end_date?: string | null
          profile_id: string
          school_id: number
          start_date?: string | null
        }
        Update: {
          activities_and_societies?: string[] | null
          details?: string | null
          end_date?: string | null
          profile_id?: string
          school_id?: number
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "educations_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "educations_school_id_fkey"
            columns: ["school_id"]
            referencedRelation: "schools"
            referencedColumns: ["id"]
          }
        ]
      }
      experiences: {
        Row: {
          company_id: number
          end_date: string | null
          profile_id: string
          start_date: string | null
          title: string | null
        }
        Insert: {
          company_id: number
          end_date?: string | null
          profile_id: string
          start_date?: string | null
          title?: string | null
        }
        Update: {
          company_id?: number
          end_date?: string | null
          profile_id?: string
          start_date?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "experiences_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experiences_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      group_categories: {
        Row: {
          can_change_join_status: boolean
          can_join: Database["public"]["Enums"]["availability"]
          can_leave: Database["public"]["Enums"]["availability"]
          created_at: string | null
          id: number
          name: string
          slug: string
        }
        Insert: {
          can_change_join_status?: boolean
          can_join: Database["public"]["Enums"]["availability"]
          can_leave: Database["public"]["Enums"]["availability"]
          created_at?: string | null
          id?: number
          name: string
          slug: string
        }
        Update: {
          can_change_join_status?: boolean
          can_join?: Database["public"]["Enums"]["availability"]
          can_leave?: Database["public"]["Enums"]["availability"]
          created_at?: string | null
          id?: number
          name?: string
          slug?: string
        }
        Relationships: []
      }
      groups: {
        Row: {
          category_id: number
          created_at: string | null
          from: string | null
          full_name: string | null
          id: number
          name: string
          slack_channel: string | null
          to: string | null
        }
        Insert: {
          category_id: number
          created_at?: string | null
          from?: string | null
          full_name?: string | null
          id?: number
          name: string
          slack_channel?: string | null
          to?: string | null
        }
        Update: {
          category_id?: number
          created_at?: string | null
          from?: string | null
          full_name?: string | null
          id?: number
          name?: string
          slack_channel?: string | null
          to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "groups_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "group_categories"
            referencedColumns: ["id"]
          }
        ]
      }
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
          id?: string
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
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles_badges: {
        Row: {
          badge_id: number
          profile_id: string
        }
        Insert: {
          badge_id: number
          profile_id: string
        }
        Update: {
          badge_id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_badges_badge_id_fkey"
            columns: ["badge_id"]
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_badges_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles_contacts: {
        Row: {
          email: string | null
          facebook: string | null
          instagram: string | null
          linkedin: string | null
          paypay: string | null
          profile_id: string
          twitter: string | null
          web: string | null
        }
        Insert: {
          email?: string | null
          facebook?: string | null
          instagram?: string | null
          linkedin?: string | null
          paypay?: string | null
          profile_id: string
          twitter?: string | null
          web?: string | null
        }
        Update: {
          email?: string | null
          facebook?: string | null
          instagram?: string | null
          linkedin?: string | null
          paypay?: string | null
          profile_id?: string
          twitter?: string | null
          web?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_contacts_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles_groups: {
        Row: {
          group_id: number
          profile_id: string
        }
        Insert: {
          group_id: number
          profile_id: string
        }
        Update: {
          group_id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_groups_group_id_fkey"
            columns: ["group_id"]
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_groups_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      residence_histories: {
        Row: {
          id: number
          move_in_date: string | null
          move_out_date: string | null
          profile_id: string
          program_id: number | null
        }
        Insert: {
          id?: number
          move_in_date?: string | null
          move_out_date?: string | null
          profile_id: string
          program_id?: number | null
        }
        Update: {
          id?: number
          move_in_date?: string | null
          move_out_date?: string | null
          profile_id?: string
          program_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "residence_histories_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "residence_histories_program_id_fkey"
            columns: ["program_id"]
            referencedRelation: "groups"
            referencedColumns: ["id"]
          }
        ]
      }
      schools: {
        Row: {
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      availability: "allowed" | "approval required" | "not allowed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
