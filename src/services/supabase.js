import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://czoxcidyufukacgougmo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6b3hjaWR5dWZ1a2FjZ291Z21vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyOTM1MzYsImV4cCI6MjAxNTg2OTUzNn0.01mpq2H7Xnq2F6wTCEttNj4TVo2L4gmJ47wpnaoOYgA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
