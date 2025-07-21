import React, { useState } from "react";
import { db } from "../data/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const AddPresenteForm = () => {
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
    alert("Presente adicionado!");
  };

  return (
    <form onSubmit={handleSubmit} style={{margin: 16, padding: 16, background: '#fff0f6', borderRadius: 8}}>
      <input
        placeholder="Nome do presente"
        value={nome}
        onChange={e => setNome(e.target.value)}
        required
        style={{marginRight: 8, padding: 4}}
      />
      <select
        value={categoria}
        onChange={e => setCategoria(e.target.value)}
        required
        style={{marginRight: 8, padding: 4}}
      >
        <option value="">Categoria</option>
        <option value="cozinha">Cozinha</option>
        <option value="cama-mesa-banho">Cama, Mesa e Banho</option>
        <option value="eletrodomesticos">Eletrodomésticos</option>
        <option value="outros">Outros</option>
      </select>
      <button type="submit" disabled={loading} style={{padding: 4, background: '#f472b6', color: 'white', borderRadius: 4}}>
        {loading ? 'Adicionando...' : 'Adicionar presente'}
      </button>
    </form>
  );
};

export default AddPresenteForm; 