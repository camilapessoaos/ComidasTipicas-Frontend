// CriarComidaScreen.jsx
import { criarComida } from '../api/api';
import FormComida from '../components/FormComida';

export default function CriarComidaScreen({ navigation }) {
  const handleSubmit = async (dados) => {
    await criarComida(dados);
    navigation.goBack();
  };
  return <FormComida onSubmit={handleSubmit} labelBotao="Criar Comida 🍽️" />;
}

// EditarComidaScreen.jsx
import { useEffect, useState } from 'react';
import { buscarComidaPorId, atualizarComida } from '../api/api';
import FormComida from '../components/FormComida';

export default function EditarComidaScreen({ navigation, route }) {
  const [comida, setComida] = useState(null);

  useEffect(() => {
    buscarComidaPorId(route.params.id).then(({ data }) => setComida(data));
  }, []);

  if (!comida) return null;

  const handleSubmit = async (dados) => {
    await atualizarComida(comida._id, dados);
    navigation.goBack();
  };
  return <FormComida inicial={comida} onSubmit={handleSubmit} labelBotao="Salvar Alterações ✅" />;
}