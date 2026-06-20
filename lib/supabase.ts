import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export type Page = {
  id?: number
  slug: string
  service_type: string
  h1: string
  meta_title: string
  meta_description: string
  intro: string
  body_section: string
  deep_section: string
  address?: string
  city?: string
  district?: string
  status: 'published' | 'draft'
  indexed_google: boolean
  created_at?: string
}

export type BlogPost = {
  id?: number
  slug: string
  title: string
  excerpt: string
  content: string
  meta_title: string
  meta_desc: string
  category: string
  read_time: number
  published_at: string
  district?: string
  city?: string
}

export type Lead = {
  id?: number
  phone: string
  name: string
  email: string
  postcode?: string
  message?: string
  source_page_slug: string
  service_type: string
  job_status: 'new' | 'contacted' | 'done'
  job_value?: number
  created_at?: string
}
