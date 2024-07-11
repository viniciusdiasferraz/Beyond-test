Projeto React com Context API, Material-UI, Jest e MSW
Este projeto React utiliza Context API para gerenciamento de estado global, Material-UI para componentes de interface, Jest para testes unitários e MSW para simulação de chamadas de API durante o desenvolvimento.

Instalação
Certifique-se de ter o Node.js v20.13.1 e npm instalados em seu ambiente de desenvolvimento.

Clone o repositório:

bash
Copiar código
git clone https://github.com/viniciusdiasferraz/Beyond-test
cd seu-projeto
Instale as dependências:

bash
Copiar código
npm install
Scripts Disponíveis
No diretório do projeto, você pode executar os seguintes comandos:

npm run start
Inicia o aplicativo no modo de desenvolvimento.
Abra http://localhost:3000 para visualizá-lo no navegador.

A página será recarregada se você fizer edições.
Você também verá erros de lint no console.

npm test
Executa os testes unitários utilizando Jest.

npm run build
Compila o aplicativo para produção na pasta build.
Ele agrupa corretamente o React no modo de produção e otimiza a construção para obter o melhor desempenho.

Tecnologias Utilizadas
React: Biblioteca JavaScript para construção de interfaces de usuário.
Context API: API do React para gerenciamento de estado global.
Material-UI: Biblioteca de componentes React para um design rápido e fácil.
Jest: Framework de teste de JavaScript com foco na simplicidade.
MSW (Mock Service Worker): Biblioteca para mockar chamadas de API durante o desenvolvimento.