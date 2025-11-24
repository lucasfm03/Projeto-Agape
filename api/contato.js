import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { nome, telefone, email } = req.body;

  if (!nome || !telefone || !email) {
    return res.status(400).json({ message: "Campos incompletos" });
  }

  const { data, error } = await supabase
    .from('contatos')
    .insert([{ nome, telefone, email }]);

  if (error) {
    return res.status(500).json(error);
  }

  return res.status(200).json({ message: "Contato recebido!" });
}
