export default async function handler(req, res) {
  const internet = true;
  const payhip = true;
  const supabase = !!process.env.VITE_SUPABASE_URL && !!process.env.VITE_SUPABASE_ANON_KEY;
  res.status(200).json({ internet, payhip, supabase });
}
