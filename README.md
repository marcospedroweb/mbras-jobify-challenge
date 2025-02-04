# Jobify: Desafio - Painel de Vagas de Emprego

**Objetivo:** Construir um aplicativo de listagem de vagas onde os usuários possam navegar pelas oportunidades, filtrar por categoria e visualizar detalhes.

## Requisitos:

1. **Stack:**

   - Next.js (React, TypeScript)
   - **ShadCN** e **TailwindCSS** (Recomendado para UI, pois são usados na empresa)

2. **Funcionalidades:**

   - **Página de Listagem de Vagas:** Buscar e exibir uma lista de vagas de emprego a partir de uma API.
   - **Página de Detalhes da Vaga:** Ao clicar em uma vaga, o usuário deve ser redirecionado para uma página com mais informações.
   - **Filtro por Categoria:** Permitir a filtragem de vagas por categoria (ex: Frontend, Backend, Full Stack).
   - **Design Responsivo:** Deve funcionar bem tanto em dispositivos móveis quanto em desktops.

3. **Integração com API:**
   - Utilizar a **[API do Remotive](https://remotive.io/api-documentation)** (API pública de listagem de empregos).

## Desafio Opcional com Banco de Dados (Desafio Bônus 🚀)

**Atenção:** A opção de usar banco de dados é **um desafio opcional**. Se preferir, pode pular essa parte e seguir com a funcionalidade principal. Não se preocupe com a entrega completa. Nosso foco está nas habilidades que você usou para construir o que conseguiu realizar.

- **Favoritos:** Permitir que os usuários possam "favoritar" vagas e armazená-las em um banco de dados.
- **Opções de Backend:**
  - **Banco Relacional Preferido:** **Supabase** (Banco PostgreSQL gratuito + autenticação)
  - **Banco NoSQL (Alternativa):** **Firebase Firestore** (Banco NoSQL gratuito)
- O usuário deve conseguir visualizar suas vagas salvas mesmo após atualizar a página.
- **Preferência:** Embora ambos os bancos (relacional e NoSQL) sejam válidos, **bancos relacionais** são preferenciais para este desafio, pois se alinham mais com a estrutura que usamos na empresa.

- **Desafio Adicional (Opcional):**

  - **Criação da API de Likes:** Ao implementar a funcionalidade de favoritos, crie uma API para gerenciar os "likes" ou "favoritos" das vagas. A criação da API é implícita se você decidir fazer este desafio.

  - **Desafio do Desafio (Docker):** O verdadeiro desafio aqui é **utilizar Docker** para subir **tudo junto**. Crie um **Docker Compose** para subir o site, a API e o banco de dados. Recomendamos uma estrutura de pastas como:

```
      .
      ├── frontend
      │   ├── public
      ├── backend
      │   ├── src
      └── database
         └── migrations
```

Você pode organizar da maneira que preferir, desde que mantenha tudo no mesmo repositório. Se decidir usar um banco local, o desafio será maior, pois você precisará configurar o banco de dados localmente dentro do Docker.

## Fluxo de Fork e Pull Request (PR):

Para realizar este teste, o processo será feito diretamente em um repositório público no GitHub. O fluxo a ser seguido é o seguinte:

1. **Fork do Repositório:**

   - Acesse o repositório público do teste (será fornecido o link).
   - Faça um **fork** do repositório para sua conta do GitHub. Isso cria uma cópia do repositório em seu perfil, onde você poderá trabalhar nas modificações.

2. **Clone o Repositório para seu Ambiente Local:**

   - Após fazer o fork, **clone o repositório** para o seu ambiente de desenvolvimento local usando o comando:
     ```bash
     git clone https://github.com/seu-usuario/mbras-jobify-challenge.git
     ```

3. **Desenvolvimento:**

   - Siga as instruções do repositório (caso existam) ou desenvolva a solução conforme os requisitos descritos.
   - Faça commits frequentes no seu repositório para garantir que o progresso está sendo salvo.

4. **Criação do Pull Request (PR):**

   - Quando terminar o desenvolvimento, faça o push das alterações para o seu repositório remoto.
   - Abra um **Pull Request (PR)** no repositório original. No PR, descreva as funcionalidades implementadas e qualquer detalhe relevante.
   - Nosso time irá revisar o PR, focando nas soluções e habilidades que você utilizou para resolver os desafios.

5. **Feedback:**
   - Após a análise, você receberá feedback sobre a entrega, baseado nas boas práticas e no uso das tecnologias recomendadas.

## Importante:

**Se você achar que não tem tempo suficiente, não se preocupe com os desafios opcionais.** Foque na entrega do que for mais importante, e não se importe se não conseguir implementar tudo. A avaliação será baseada **nas habilidades e soluções que você utilizou** para criar a funcionalidade que conseguiu implementar.

## Critérios de Avaliação:

✅ Estrutura e boas práticas de código  
✅ Integração com API e manipulação de dados  
✅ Conhecimento em Next.js & React (Rotas, Hooks, etc.)  
✅ **Cuidado com o design e UI do aplicativo** (Uso adequado de ShadCN e Tailwind, layout organizado)  
✅ Responsividade  
✅ (Bônus) Integração com banco de dados e operações CRUD  
✅ (Desafio Adicional) Uso de Docker Compose para criar e gerenciar o site, a API e o banco de dados local
