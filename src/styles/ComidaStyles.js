import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4b1022',
    paddingTop: 52,
    paddingHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fafafa',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#7b1e3a',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#777',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  comidaImage: {
    width: '100%',
    height: 170,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#eee',
  },
  comidaName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  comidaDescription: {
    color: '#555',
    marginVertical: 6,
  },
  comidaRegion: {
    color: '#888',
    fontSize: 13,
    marginBottom: 4,
  },
  comidaIngredients: {
    color: '#666',
    fontSize: 13,
    marginBottom: 4,
  },
  comidaType: {
    color: '#7b1e3a',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  comidaRating: {
    color: '#7b1e3a',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#305c89',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#a83232',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  emptyText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});