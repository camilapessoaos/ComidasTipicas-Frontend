import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  atualizarComida,
  criarComida,
  deletarComida,
  listarComidas,
} from '../services/api';
import { styles } from '../styles/ComidaStyles';

const comidaInicial = {
  nome: '',
  descricao: '',
  regiao: '',
  estado: '',
  ingredientes: '',
  doce: false,
  foto: '',
  nota: '',
};

export default function ComidaScreen() {
  const [comida, setComidas] = useState([]);
  const [form, setForm] = useState(comidaInicial);
  const [comidaEditando, setComidaEditando] = useState(null);

  useEffect(() => {
    carregarComidas();
  }, []);

  async function carregarComidas() {
    try {
      const dados = await listarComidas();
      setComidas(dados);
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  }

  function alterarCampo(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }

  function limparFormulario() {
    setForm(comidaInicial);
    setComidaEditando(null);
  }

  async function salvarComida() {
    if (!form.nome || !form.descricao || !form.nota) {
      Alert.alert('Atenção', 'Preencha nome, descrição e nota.');
      return;
    }

    const comida = {
      ...form,
      nota: Number(form.nota),
    };

    try {
      if (comidaEditando) {
        await atualizarComida(comidaEditando._id, comida);
      } else {
        await criarComida(comida);
      }

      limparFormulario();
      carregarComidas();
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  }

  function editarComida(comida) {
    setComidaEditando(comida);
    setForm({
      nome: comida.nome,
      descricao: comida.descricao,
      regiao: comida.regiao,
      estado: comida.estado,
      ingredientes: comida.ingredientes,
      doce: comida.doce,
      nota: String(comida.nota),
      foto: comida.foto || '',
    });
  }

  function confirmarExclusao(id) {
    Alert.alert('Remover comida', 'Deseja remover esta comida?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          try {
            await deletarComida(id);
            carregarComidas();
          } catch (error) {
            Alert.alert('Erro', error.message);
          }
        },
      },
    ]);
  }

  function renderItem({ item }) {
    return (
      <View style={styles.card}>
        {!!item.foto && <Image source={{ uri: item.foto }} style={styles.comidaImage} />}
        <Text style={styles.comidaName}>{item.nome}</Text>
        <Text style={styles.comidaDescription}>{item.descricao}</Text>
        <Text style={styles.comidaRegion}>{item.regiao} - {item.estado}</Text>
        <Text style={styles.comidaIngredients}>Ingredientes: {item.ingredientes}</Text> 
        <Text style={styles.comidaType}>{item.doce ? 'Doce' : 'Salgada'}</Text> 
        <Text style={styles.comidaRating}>Nota: {item.nota}/10</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.editButton} onPress={() => editarComida(item)}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={() => confirmarExclusao(item._id)}>
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>Catálogo de Comidas</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome da comida"
          value={form.nome}
          onChangeText={(valor) => alterarCampo('nome', valor)}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descrição"
          value={form.descricao}
          multiline
          onChangeText={(valor) => alterarCampo('descricao', valor)}
        />

        <TextInput
          style={styles.input}
          placeholder="Região de origem"
          value={form.regiao}
          onChangeText={(valor) => alterarCampo('regiao', valor)}
        />      

        <TextInput
          style={styles.input}
          placeholder="Estado de origem"
          value={form.estado}
          onChangeText={(valor) => alterarCampo('estado', valor)}
        />  

        <TextInput
          style={styles.input}
          placeholder="Ingredientes principais"
          value={form.ingredientes}
          onChangeText={(valor) => alterarCampo('ingredientes', valor)}
        />  

        <TextInput
          style={styles.input}
          placeholder="Doce ou salgada? (true/false)"
          value={form.doce ? 'true' : 'false'}
          onChangeText={(valor) => alterarCampo('doce', valor.toLowerCase() === 'true')}
        />


        <TextInput
          style={styles.input}
          placeholder="Nota de 0 a 10"
          value={form.nota}
          keyboardType="numeric"
          onChangeText={(valor) => alterarCampo('nota', valor)}
        />

        <TextInput
          style={styles.input}
          placeholder="URL da foto"
          value={form.foto}
          onChangeText={(valor) => alterarCampo('foto', valor)}
        />

        <TouchableOpacity style={styles.button} onPress={salvarComida}>
          <Text style={styles.buttonText}>{comidaEditando ? 'Atualizar comida' : 'Cadastrar comida'}</Text>
        </TouchableOpacity>

        {comidaEditando && (
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={limparFormulario}>
            <Text style={styles.buttonText}>Cancelar edição</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={comidas}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma comida cadastrada.</Text>}
      />
    </KeyboardAvoidingView>
  );
}
