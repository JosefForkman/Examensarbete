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
          delivery_date: string | null
          id: number
          order_date: string | null
          status: boolean
          stripe_customer_id: string
          stripe_payment_intent_id: string
          user_id: string
        }
        Insert: {
          delivery_date?: string | null
          id?: number
          order_date?: string | null
          status?: boolean
          stripe_customer_id: string
          stripe_payment_intent_id: string
          user_id: string
        }
        Update: {
          delivery_date?: string | null
          id?: number
          order_date?: string | null
          status?: boolean
          stripe_customer_id?: string
          stripe_payment_intent_id?: string
          user_id?: string
        }
        Relationships: []
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
          id: string
          stripe_customer_id: string
        }
        Insert: {
          id: string
          stripe_customer_id: string
        }
        Update: {
          id?: string
          stripe_customer_id?: string
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
