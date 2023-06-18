import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://defuptopxkbwhlouqewj.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlZnVwdG9weGtid2hsb3VxZXdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM4MTgyNjUsImV4cCI6MTk5OTM5NDI2NX0.zbK_jYOD9o66Ko9W6DrBT_aY2-wiTrZ_OGZT5nUtQRE"

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;