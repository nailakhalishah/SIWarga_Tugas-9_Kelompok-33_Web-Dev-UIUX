import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://rccbpaveuykswsctrogx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjY2JwYXZldXlrc3dzY3Ryb2d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4MDkxODEsImV4cCI6MjA5MzM4NTE4MX0.JFdhfMIjxZUZo6iLePog6dbhzShEsuj76SyqtFIUeZY"
);
