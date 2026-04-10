# 🌦️ Projeto Clima

> **App de auxílio a comunidades em áreas vulneráveis e com alto risco de alagamento.**

Este projeto faz parte do **Itinerário Extensionista** da faculdade Braz Cubas e tem como objetivo principal fornecer uma ferramenta acessível e rápida para monitorar o clima e alertar moradores de regiões de risco (com foco inicial na região do Alto Tietê) sobre possíveis enchentes e alagamentos, além da função de previsão do tempo.

---

## 🎯 Propósito e Impacto Social

Com as frequentes mudanças climáticas e o aumento do volume de chuvas em épocas críticas, muitas comunidades sofrem com enchentes que ameaçam vidas e o patrimônio. Este aplicativo foi idealizado para democratizar o acesso à informação meteorológica e promover instruções rápidas e rotas seguras para abrigos em momentos de emergência.

## ✨ Funcionalidades Principais

- 🔍 **Busca de Cidades:** Encontre informações meteorológicas precisas e direcionadas.
- ⛅ **Dados Climáticos em Tempo Real:** Acompanhamento da previsão do tempo e condições atuais com interface amigável.
- 🚨 **Alerta de Alagamentos:** Avisos visuais de risco iminente de enchente para as áreas cadastradas.
- 🗺️ **Rotas para Abrigos Seguros:** Roteamento mostrando o caminho até locais seguros e pontos de apoio caso uma emergência se confirme.

## 🛠️ Tecnologias Utilizadas

O ecossistema do projeto está dividido em duas partes fundamentais:

### 📱 Frontend (App)
- **[React Native](https://reactnative.dev/)** & **[Expo](https://expo.dev/)**: Para o desenvolvimento ágil do aplicativo móvel multiplataforma (Android e iOS).
- **TypeScript**: Adicionando tipagem estática e maior confiabilidade de compilação.

### ⚙️ Backend (API)
- **[Python](https://www.python.org/) / [FastAPI](https://fastapi.tiangolo.com/)**: Construção de uma arquitetura super-rápida (assíncrona) para disponibilização dos alertas e consultas climáticas.
- **Uvicorn**: Servidor de alta performance para a aplicação.

---

## 🚀 Como executar o projeto localmente

Certifique-se de ter o **Node.js** (e npm/yarn) e o **Python** instalados em sua máquina.

### 1. Clonando o repositório
```bash
git clone https://github.com/seu-usuario/projetoClima.git
cd projetoClima
```

### 2. Subindo o Backend
```bash
cd back

# Crie e ative seu ambiente virtual (recomendado)
python -m venv venv
# No Windows: venv\Scripts\activate
# No Linux/Mac: source venv/bin/activate

# Instale as dependências (ajuste caso os nomes/ferramentas sejam diferentes)
pip install -r requirements.txt

# Configure as variáveis de ambiente baseando-se no arquivo de exemplo
cp .env.example .env

# Execute o servidor web
uvicorn main:app --reload
```

### 3. Rodando o Frontend (Aplicativo)
Em um novo terminal, abra na raiz do projeto e siga:

```bash
cd front

# Instalando dependências do aplicativo
npm install

# Iniciando o servidor do Expo
npx expo start
```
> Após o comando, irá aparecer um QR Code no seu terminal. Basta baixar o app **Expo Go** no seu celular físico (Android ou iPhone) e escanear para testar o aplicativo em tempo real. Alternativamente, você pode usar um Emulador (Android Studio ou iOS Simulator).

---

## 📋 TODO & Próximos Passos

Aqui estão os pontos onde a aplicação ainda está evoluindo:

- [ ] **Protótipo de Novas Telas:** Desenvolver e implementar o restante das "screens" do app no frontend para finalizar os fluxos completos do usuário.
- [ ] Refinar o fluxo de visualização de mapas para abrigos.
- [ ] Implementar integração com push notifications para alertas imediatos offline/background.

---

<p align="center">
  <i>Feito com dedicação para salvar e melhorar a qualidade de vida em zonas de risco. 💙🌧️</i>
</p>
