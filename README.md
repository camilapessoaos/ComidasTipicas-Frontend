# 🍽️ App Comida — Frontend

Aplicativo mobile para catalogar comidas, desenvolvido com **React Native + Expo**.

---

## 🗂️ Estrutura

```
frontend/
├── app/
│   └── (tabs)/
│       └── index.tsx
├── src/
│   ├── screens/
│   │   └── ComidaScreens.js
│   ├── styles/
│   │   └── ComidaStyles.js
│   └── services/
│       └── api.js
├── App.js
├── index.js
└── app.json
```

---

## 📱 Funcionalidades

- Listar comidas cadastradas
- Cadastrar nova comida com nome, descrição, região, estado, ingredientes, tipo (doce/salgada), nota e foto
- Editar comida existente
- Excluir comida com confirmação
- Avaliação por nota de 0 a 10

---

## 🚀 Como rodar

**1. Instale as dependências:**
```bash
npm install
```

**2. Configure o IP do backend em `src/services/api.js`:**
```js
const API_URL = 'http://SEU_IP_LOCAL:3000/api';
```

> Para descobrir seu IP local:
> - **Windows:** `ipconfig` → "Endereço IPv4"
> - **Mac/Linux:** `ifconfig` ou `ip addr`
>
> O celular e o computador precisam estar na **mesma rede Wi-Fi**.

**3. Inicie o app:**
```bash
npx expo start
```

Escaneie o QR Code com o app **Expo Go** no celular.

---

## 🛠️ Tecnologias

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [expo-router](https://expo.github.io/router/)
- [expo-image](https://docs.expo.dev/versions/latest/sdk/image/)
