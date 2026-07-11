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
      properties: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          price: number
          location: string
          address: string | null
          bedrooms: number
          bathrooms: number
          land_area: number
          building_area: number
          property_type: 'rumah' | 'apartemen' | 'villa' | 'tanah' | 'ruko'
          status: 'tersedia' | 'terjual' | 'disewa'
          fitur: string[] | null
          images: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          title: string
          slug: string
          description?: string | null
          price: number
          location: string
          address?: string | null
          bedrooms?: number
          bathrooms?: number
          land_area?: number
          building_area?: number
          property_type: string
          status: string
          fitur?: string[] | null
          images?: string[] | null
        }
        Update: {
          title?: string
          slug?: string
          description?: string | null
          price?: number
          location?: string
          address?: string | null
          bedrooms?: number
          bathrooms?: number
          land_area?: number
          building_area?: number
          property_type?: string
          status?: string
          fitur?: string[] | null
          images?: string[] | null
          updated_at?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          email: string
          password_hash: string
          name: string
          created_at: string
        }
        Insert: {
          email: string
          password_hash: string
          name: string
        }
        Update: {
          email?: string
          password_hash?: string
          name?: string
        }
      }
    }
  }
}

export type Property = Database['public']['Tables']['properties']['Row']
export type AdminUser = Database['public']['Tables']['admin_users']['Row']
