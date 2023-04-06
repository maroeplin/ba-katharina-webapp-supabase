
import { createClient } from "@supabase/supabase-js";

// wenn der value links = 0 ist, dann vergib den rechten value (ein leerer String)
const supabaseUrl = process.env.NEXT_PUBLIC_SUBAPASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON ?? ''

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase