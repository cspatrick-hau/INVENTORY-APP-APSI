import { createClient } from '@supabase/supabase-js'

// ⚠️ Replace with your Supabase project credentials
const SUPABASE_URL = "https://nguouseiyuzuvzqwmmwx.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ndW91c2VpeXV6dXZ6cXdtbXd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwOTkyMjIsImV4cCI6MjA3MzY3NTIyMn0.s9i6_JSaYOgrBQTWnesr7dwHMalV514yjf2L3YguEyE"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

