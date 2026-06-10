import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Alert, Image, TextInput
} from 'react-native';
import { listarComidas, deletarComida } from '../api/api';

export default function HomeScreen({ navigation }) {
  const [comidas, setComidas]   = useState([]);
  const [busca, setBusca]       = useState('');
  const [loading, setLoading]   = useState(true);

  const fetchComidas = async () => {
    try {
      setLoading(true);
      const { data } = await listarComidas();
      setComidas(data);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar as comidas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchComidas);
    return unsubscribe;
  }, [navigation]);

  const handleDeletar = (id) => {
    Alert.alert('Confirmar', 'Deseja remover esta comida?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover', style: 'destructive',
        onPress: async () => {
          await deletarComida(id);
          fetchComidas();
        }
      }
    ]);
  };

  const comidasFiltradas = comidas.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detalhes', { id: item._id })}
    >
      {item.foto ? (
        <Image source={{ uri: item.foto }} style={styles.foto} />
      ) : (
        <View style={[styles.foto, styles.semFoto]}>
          <Text style={{ fontSize: 32 }}>🍽️</Text>
        </View>
      )}
      <View style={styles.cardInfo}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.regiao}>{item.estado} — {item.regiao}</Text>
        <Text style={styles.nota}>⭐ {item.nota}/10</Text>
      </View>
      <View style={styles.acoes}>
        <TouchableOpacity onPress={() => navigation.navigate('Editar', { id: item._id })}>
          <Text style={styles.btnEditar}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeletar(item._id)}>
          <Text style={styles.btnDeletar}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar comida..."
        value={busca}
        onChangeText={setBusca}
      />
      <FlatList
        data={comidasFiltradas}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        refreshing={loading}
        onRefresh={fetchComidas}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma comida encontrada.</Text>}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Criar')}
      >
        <Text style={styles.fabTexto}>+ Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: '#fff9f0', padding: 12 },
  input:      { backgroundColor: '#fff', borderRadius: 8, padding: 10,
                marginBottom: 12, borderWidth: 1, borderColor: '#ddd' },
  card:       { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12,
                marginBottom: 10, overflow: 'hidden', elevation: 2 },
  foto:       { width: 90, height: 90 },
  semFoto:    { backgroundColor: '#f0e6d3', justifyContent: 'center', alignItems: 'center' },
  cardInfo:   { flex: 1, padding: 10, justifyContent: 'center' },
  nome:       { fontWeight: 'bold', fontSize: 16, color: '#333' },
  regiao:     { color: '#888', fontSize: 12, marginTop: 2 },
  nota:       { color: '#e63946', fontWeight: 'bold', marginTop: 4 },
  acoes:      { justifyContent: 'space-around', padding: 8 },
  btnEditar:  { fontSize: 20 },
  btnDeletar: { fontSize: 20 },
  fab:        { position: 'absolute', bottom: 20, right: 20,
                backgroundColor: '#e63946', borderRadius: 30,
                paddingHorizontal: 20, paddingVertical: 12, elevation: 5 },
  fabTexto:   { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  vazio:      { textAlign: 'center', marginTop: 40, color: '#aaa' },
});

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: '#fff9f0', padding: 12 },
  input:      { backgroundColor: '#fff', borderRadius: 8, padding: 10,
                marginBottom: 12, borderWidth: 1, borderColor: '#ddd' },
  card:       { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12,
                marginBottom: 10, overflow: 'hidden', elevation: 2 },
  foto:       { width: 90, height: 90 },
  semFoto:    { backgroundColor: '#f0e6d3', justifyContent: 'center', alignItems: 'center' },
  cardInfo:   { flex: 1, padding: 10, justifyContent: 'center' },
  nome:       { fontWeight: 'bold', fontSize: 16, color: '#333' },
  regiao:     { color: '#888', fontSize: 12, marginTop: 2 },
  nota:       { color: '#e63946', fontWeight: 'bold', marginTop: 4 },
  acoes:      { justifyContent: 'space-around', padding: 8 },
  btnEditar:  { fontSize: 20 },
  btnDeletar: { fontSize: 20 },
  fab:        { position: 'absolute', bottom: 20, right: 20,
                backgroundColor: '#e63946', borderRadius: 30,
                paddingHorizontal: 20, paddingVertical: 12, elevation: 5 },
  fabTexto:   { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  vazio:      { textAlign: 'center', marginTop: 40, color: '#aaa' },
});