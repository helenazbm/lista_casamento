import React, { useState } from "react";
import { db } from "../data/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

interface AddPresenteFormProps {
  onSuccess: () => void;
}

const AddPresenteForm = ({ onSuccess }: AddPresenteFormProps) => {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !categoria) return alert("Preencha todos os campos obrigatórios!");
    setLoading(true);
    await addDoc(collection(db, "presentes"), {
      name: nome,
      category: categoria,
      is_selected: false,
    });
    setNome("");
    setCategoria("");
    setLoading(false);
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="m-4 flex flex-col gap-4 rounded-lg bg-card-outros p-4 md:flex-row md:items-center"
    >
      <input
        placeholder="Nome do presente"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
        className="flex-1 rounded-md border p-2"
      />
      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        required
        className="rounded-md border p-2"
      >
        <option value="">Categoria</option>
        <option value="cozinha">Cozinha</option>
        <option value="cama-mesa-banho">Cama, Mesa e Banho</option>
        <option value="eletrodomesticos">Eletrodomésticos</option>
        <option value="outros">Outros</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-accent px-4 py-2 text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
      >
        {loading ? "Adicionando..." : "Adicionar presente"}
      </button>
    </form>
  );
};

export default AddPresenteForm; 