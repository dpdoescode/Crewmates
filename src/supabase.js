import { createClient } from '@supabase/supabase-js'

const URL = 'https://qpruqoaahiwaomkhdxum.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwcnVxb2FhaGl3YW9ta2hkeHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwODUwMTAsImV4cCI6MjA3ODY2MTAxMH0.FX8IwyGe-2RrhaLKdTXIXGxUxlbG0k9_5Q0EpOpmf7U'

export const supabase = createClient(URL, API_KEY)