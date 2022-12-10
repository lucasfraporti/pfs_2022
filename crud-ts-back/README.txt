========================================== COMANDOS ==========================================

npm install --save cors @types/cors
yarn add -D typescript nodemon ts-node @types/express @types/node
yarn add express pg typeorm dotenv reflect-metadata

Criar a database no postgres chamada "api_rest_typescript"

yarn migration:generate
yarn migration:run
yarn dev

========================================== ROTAS ==========================================

---------------------- Listagem das aulas cadastradas
GET:
localhost:3000/room

---------------------- Adicionar uma nova matéria
POST:
localhost:3000/subject
{
    "name": "Matemática"
}

---------------------- Adicionar uma nova aula
POST:
localhost:3000/room
{
    "name": "Aula de matemática",
    "description": "Iremos aprender fração, divisão e multipilicação"
}

---------------------- Criação de uma gravação de uma aula para uma determinada aula (neste caso é a aula 1)
POST:
localhost:3000/room/1/create
{
    "title": "Gravação da aula 01",
    "url": "senac.blackboard.com/record_01_math"
}

---------------------- Vinculação de uma matéria já cadastrada com uma aula (neste caso é a aula 1)
POST:
localhost:3000/room/1/subject
{
    "subject_id": 1
}