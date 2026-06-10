import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity,
         ScrollView, StyleSheet, Alert } from 'react-native';

export default function FormComida({ inicial = {}, onSubmit, labelBotao }) {
  const [form, setForm] = useState({
    nome: '', descricao: '', nota: '', foto: '',
    regiao: '', estado: '', ingredientes: '', doce: false,
    ...inicial,
  });

  const set = (campo, valor) => setForm(prev => ({ ...prev, [campo]: valor }));

  const handleSubmit = () => {
    if (!form.nome || !form.descricao || !form.nota) {
      return Alert.alert('Campos obrigatórios', 'Preencha nome, descrição e nota.');
    }
    onSubmit({ ...form, nota: Number(form.nota) });
  };

  return (
    <ScrollView style={styles.container}>
      {[
        ['Nome',        'nome',        'Ex: Acarajé'],
        ['Descrição',   'descricao',   'Descreva o prato...'],
        ['Nota (0-10)', 'nota',        '8', 'numeric'],
        ['Foto (URL)',  'foto',        'https://...'],
        ['Região',      'regiao',      'Nordeste'],
        ['Estado',      'estado',      'Bahia'],
        ['Ingredientes','ingredientes','Feijão-fradinho, ...'],
      ].map(([label, campo, placeholder, keyboard]) => (
        <View key={campo} style={styles.campo}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={String(form[campo])}
            onChangeText={v => set(campo, v)}
            keyboardType={keyboard || 'default'}
            multiline={campo === 'descricao' || campo === 'ingredientes'}
          />
        </View>
      ))}

      <View style={styles.switchRow}>
        <Text style={styles.label}>É doce?</Text>
        <Switch value={form.doce} onValueChange={v => set('doce', v)} />
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnTexto}>{labelBotao}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, padding: 16, backgroundColor: '#fff9f0' },
  campo:      { marginBottom: 14 },
  label:      { fontWeight: 'bold', color: '#555', marginBottom: 4 },
  input:      { backgroundColor: '#fff', borderRadius: 8, padding: 10,
                borderWidth: 1, borderColor: '#ddd' },
  switchRow:  { flexDirection: 'row', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: 20 },
  btn:        { backgroundColor: '#e63946', borderRadius: 10,
                padding: 14, alignItems: 'center', marginBottom: 40 },
  btnTexto:   { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});