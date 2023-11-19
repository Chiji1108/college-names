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
      answers: {
        Row: {
          answered_at: string
          body: string | null
          question_id: number
          reaction_id: number
          use_on_bio: boolean
          user_id: string
        }
        Insert: {
          answered_at?: string
          body?: string | null
          question_id: number
          reaction_id: number
          use_on_bio?: boolean
          user_id?: string
        }
        Update: {
          answered_at?: string
          body?: string | null
          question_id?: number
          reaction_id?: number
          use_on_bio?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_reaction_id_fkey"
            columns: ["reaction_id"]
            isOneToOne: true
            referencedRelation: "reactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
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
            isOneToOne: false
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
            isOneToOne: false
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
      drinkings: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      educations: {
        Row: {
          activities_and_societies: string[] | null
          faculty: string | null
          graduation_date: string
          school_id: number
          user_id: string
        }
        Insert: {
          activities_and_societies?: string[] | null
          faculty?: string | null
          graduation_date: string
          school_id: number
          user_id?: string
        }
        Update: {
          activities_and_societies?: string[] | null
          faculty?: string | null
          graduation_date?: string
          school_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "educations_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "educations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      experiences: {
        Row: {
          company_id: number
          end_date: string | null
          position: string
          projects_and_skills: string[] | null
          start_date: string
          user_id: string
        }
        Insert: {
          company_id: number
          end_date?: string | null
          position: string
          projects_and_skills?: string[] | null
          start_date: string
          user_id?: string
        }
        Update: {
          company_id?: number
          end_date?: string | null
          position?: string
          projects_and_skills?: string[] | null
          start_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "experiences_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experiences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      group_categories: {
        Row: {
          created_at: string | null
          id: number
          is_editable: boolean
          is_noteworthy: boolean
          join_type: Database["public"]["Enums"]["availability"]
          name: string
          parent_id: number | null
          slug: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_editable?: boolean
          is_noteworthy?: boolean
          join_type?: Database["public"]["Enums"]["availability"]
          name: string
          parent_id?: number | null
          slug: string
        }
        Update: {
          created_at?: string | null
          id?: number
          is_editable?: boolean
          is_noteworthy?: boolean
          join_type?: Database["public"]["Enums"]["availability"]
          name?: string
          parent_id?: number | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "group_categories"
            referencedColumns: ["id"]
          }
        ]
      }
      groups: {
        Row: {
          category_id: number
          created_at: string | null
          end_date: string | null
          full_name: string | null
          id: number
          image_url: string | null
          name: string
          slack_channel: string | null
          start_date: string | null
        }
        Insert: {
          category_id: number
          created_at?: string | null
          end_date?: string | null
          full_name?: string | null
          id?: number
          image_url?: string | null
          name: string
          slack_channel?: string | null
          start_date?: string | null
        }
        Update: {
          category_id?: number
          created_at?: string | null
          end_date?: string | null
          full_name?: string | null
          id?: number
          image_url?: string | null
          name?: string
          slack_channel?: string | null
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "groups_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "group_categories"
            referencedColumns: ["id"]
          }
        ]
      }
      mbti: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      members: {
        Row: {
          group_id: number
          position: string | null
          user_id: string
        }
        Insert: {
          group_id: number
          position?: string | null
          user_id?: string
        }
        Update: {
          group_id?: number
          position?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      personalities: {
        Row: {
          badge_id: number
          user_id: string
        }
        Insert: {
          badge_id: number
          user_id?: string
        }
        Update: {
          badge_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "personalities_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "personalities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      photos: {
        Row: {
          alt: string | null
          created_at: string
          height: number
          id: number
          reaction_id: number
          src: string
          width: number
        }
        Insert: {
          alt?: string | null
          created_at?: string
          height: number
          id?: number
          reaction_id: number
          src: string
          width: number
        }
        Update: {
          alt?: string | null
          created_at?: string
          height?: number
          id?: number
          reaction_id?: number
          src?: string
          width?: number
        }
        Relationships: [
          {
            foreignKeyName: "photos_reaction_id_fkey"
            columns: ["reaction_id"]
            isOneToOne: false
            referencedRelation: "reactions"
            referencedColumns: ["id"]
          }
        ]
      }
      politics: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          body: string
          created_at: string
          id: number
          receiver_id: string | null
          sender_id: string | null
        }
        Insert: {
          body: string
          created_at?: string
          id?: number
          receiver_id?: string | null
          sender_id?: string | null
        }
        Update: {
          body?: string
          created_at?: string
          id?: number
          receiver_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reaction_items: {
        Row: {
          created_at: string
          emoji: string
          reaction_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          reaction_id: number
          user_id?: string
        }
        Update: {
          created_at?: string
          emoji?: string
          reaction_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reaction_items_reaction_id_fkey"
            columns: ["reaction_id"]
            isOneToOne: false
            referencedRelation: "reactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reaction_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reactions: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      religions: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      residential_histories: {
        Row: {
          id: number
          move_in_date: string | null
          move_out_date: string | null
          program_id: number | null
          user_id: string
        }
        Insert: {
          id?: number
          move_in_date?: string | null
          move_out_date?: string | null
          program_id?: number | null
          user_id?: string
        }
        Update: {
          id?: number
          move_in_date?: string | null
          move_out_date?: string | null
          program_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "residential_histories_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "residential_histories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
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
      smokings: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          bio_tags: string[] | null
          created_at: string
          date_of_birth: string | null
          drinking_id: number | null
          email: string | null
          facebook: string | null
          full_name: string | null
          header_url: string | null
          id: string
          instagram: string | null
          is_admin: boolean
          linkedin: string | null
          mbti_id: number | null
          name: string
          paypay: string | null
          photo1_id: number | null
          photo2_id: number | null
          photo3_id: number | null
          photo4_id: number | null
          politics_id: number | null
          post_number: string | null
          religion_id: number | null
          room_number: string | null
          slack_channel: string | null
          smoking_id: number | null
          twitter: string | null
          updated_at: string | null
          username: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio_tags?: string[] | null
          created_at?: string
          date_of_birth?: string | null
          drinking_id?: number | null
          email?: string | null
          facebook?: string | null
          full_name?: string | null
          header_url?: string | null
          id?: string
          instagram?: string | null
          is_admin?: boolean
          linkedin?: string | null
          mbti_id?: number | null
          name: string
          paypay?: string | null
          photo1_id?: number | null
          photo2_id?: number | null
          photo3_id?: number | null
          photo4_id?: number | null
          politics_id?: number | null
          post_number?: string | null
          religion_id?: number | null
          room_number?: string | null
          slack_channel?: string | null
          smoking_id?: number | null
          twitter?: string | null
          updated_at?: string | null
          username?: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio_tags?: string[] | null
          created_at?: string
          date_of_birth?: string | null
          drinking_id?: number | null
          email?: string | null
          facebook?: string | null
          full_name?: string | null
          header_url?: string | null
          id?: string
          instagram?: string | null
          is_admin?: boolean
          linkedin?: string | null
          mbti_id?: number | null
          name?: string
          paypay?: string | null
          photo1_id?: number | null
          photo2_id?: number | null
          photo3_id?: number | null
          photo4_id?: number | null
          politics_id?: number | null
          post_number?: string | null
          religion_id?: number | null
          room_number?: string | null
          slack_channel?: string | null
          smoking_id?: number | null
          twitter?: string | null
          updated_at?: string | null
          username?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_drinking_id_fkey"
            columns: ["drinking_id"]
            isOneToOne: false
            referencedRelation: "drinkings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_mbti_id_fkey"
            columns: ["mbti_id"]
            isOneToOne: false
            referencedRelation: "mbti"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_photo1_id_fkey"
            columns: ["photo1_id"]
            isOneToOne: false
            referencedRelation: "photos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_photo2_id_fkey"
            columns: ["photo2_id"]
            isOneToOne: false
            referencedRelation: "photos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_photo3_id_fkey"
            columns: ["photo3_id"]
            isOneToOne: false
            referencedRelation: "photos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_photo4_id_fkey"
            columns: ["photo4_id"]
            isOneToOne: false
            referencedRelation: "photos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_politics_id_fkey"
            columns: ["politics_id"]
            isOneToOne: false
            referencedRelation: "politics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_religion_id_fkey"
            columns: ["religion_id"]
            isOneToOne: false
            referencedRelation: "religions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_smoking_id_fkey"
            columns: ["smoking_id"]
            isOneToOne: false
            referencedRelation: "smokings"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_unique_username: {
        Args: {
          email: string
        }
        Returns: string
      }
    }
    Enums: {
      availability: "allowed" | "approval required" | "not allowed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
