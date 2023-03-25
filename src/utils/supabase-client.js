
import { createClient } from "@supabase/supabase-js";

// wenn der value links = 0 ist, dann vergib den rechten value (ein leerer String)
const supabase = process.env.NEXT_PUBLIC_SUBAPASE_URL ?? ''