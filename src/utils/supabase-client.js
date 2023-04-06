
import { createClient } from "@supabase/supabase-js";

// wenn der value links = 0 ist, dann vergib den rechten value (ein leerer String)
const supabaseUrl = 'https://qonjmkccfrmtvyqblrdc.supabase.co' ?? ''
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvbmpta2NjZnJtdHZ5cWJscmRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxNzcxNTcsImV4cCI6MTk5NTc1MzE1N30.m5CHW8FBOJvqVKY1bLYOKaBuFgfbku-hRfN1m6DywKg' ?? ''

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase