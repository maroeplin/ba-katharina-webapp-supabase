
import { createClient } from "@supabase/supabase-js";

// wenn der value links = 0 ist, dann vergib den rechten value (ein leerer String)
const supabaseUrl = "https://kwxufazzlocqpiahmkwd.supabase.co" ?? ''
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3eHVmYXp6bG9jcXBpYWhta3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk3NDc4MTUsImV4cCI6MTk5NTMyMzgxNX0.ixFeq4YR1FrK4CpKN6sYlUeqp8pGlcTewTKflmWR8DA" ?? ''

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase