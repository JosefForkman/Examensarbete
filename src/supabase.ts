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
      Order_items: {
        Row: {
          id: number
          order_id: number | null
          product_id: number | null
          quantity: number | null
        }
        Insert: {
          id?: number
          order_id?: number | null
          product_id?: number | null
          quantity?: number | null
        }
        Update: {
          id?: number
          order_id?: number | null
          product_id?: number | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            isOneToOne: false
            referencedRelation: "Orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "Products"
            referencedColumns: ["id"]
          }
        ]
      }
      Orders: {
        Row: {
          apartment_number: number | null
          delivery_date: string | null
          house_number: number | null
          id: number
          order_date: string | null
          street: string | null
          user_id: string | null
        }
        Insert: {
          apartment_number?: number | null
          delivery_date?: string | null
          house_number?: number | null
          id?: number
          order_date?: string | null
          street?: string | null
          user_id?: string | null
        }
        Update: {
          apartment_number?: number | null
          delivery_date?: string | null
          house_number?: number | null
          id?: number
          order_date?: string | null
          street?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      Products: {
        Row: {
          description: string | null
          id: number
          img_url: string | null
          name: string
          price: number
          stripe_price_id: string
        }
        Insert: {
          description?: string | null
          id?: number
          img_url?: string | null
          name: string
          price: number
          stripe_price_id: string
        }
        Update: {
          description?: string | null
          id?: number
          img_url?: string | null
          name?: string
          price?: number
          stripe_price_id?: string
        }
        Relationships: []
      }
      Profiles: {
        Row: {
          apartment_number: number | null
          first_name: string | null
          house_number: number | null
          id: string
          last_name: string | null
          street: string | null
        }
        Insert: {
          apartment_number?: number | null
          first_name?: string | null
          house_number?: number | null
          id: string
          last_name?: string | null
          street?: string | null
        }
        Update: {
          apartment_number?: number | null
          first_name?: string | null
          house_number?: number | null
          id?: string
          last_name?: string | null
          street?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
