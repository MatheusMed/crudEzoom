## Instruções

1. Primeiro, crie um container Docker para o PostgreSQL com as seguintes configurações:

   ```bash
   docker run --name tasks -e POSTGRES_USER=tasks -e POSTGRES_PASSWORD=123 -e POSTGRES_DB=taks -p 5432:5432 -d postgres

2. Crie o arquivo .env

   ``` EX: DATABASE_URL=postgresql://user:123@localhost:5432/tasks ```

3. Rode os comando para rodar o projeto

   ```bash
    npx prisma generate
    npx prisma migrate dev
    npm run dev
   ```
4. Use o APK ou Localmente
   
    Para mais detalhes, consulte o repositorio [CRUD-EZOOM](https://github.com/MatheusMed/app_crud_ezoom).

     Faça o download do APK disponível em [APK-EZOOM](https://github.com/MatheusMed/app_crud_ezoom/releases/tag/appEzoom).



