# Projeto modulo 5

<h3>Tecnologias:</h3><br> 

![image](https://user-images.githubusercontent.com/56053290/218258400-46b576f3-03c0-4557-b984-189c104e5a51.png)
![image](https://user-images.githubusercontent.com/56053290/218258497-d0ddc8bf-a8dc-45b2-aba5-4614700e73d5.png)
![image](https://user-images.githubusercontent.com/56053290/218259194-0cbc46a8-6150-4eb7-8cfb-14846262a0c3.png)

<h1>Introdução</h1>

<h4>Você e sua equipe foram escalados para desenvolverem
propostas de APIs que serão o produto mínimo viável de um
aplicativo.Vocês devem escolher o tema do aplicativo para
identificar as entidades.</h4>

Utilizar o padrão MVC;<br>
⇨ Utilizar os verbos HTTP seguindo o padrão REST;<br>
⇨ Implementar todas as operações de CRUD;<br>
⇨ Utilizar o padrão de projeto (design pattern) DAO para abstração de transações no banco, com Promises;<br>
⇨ Utilizar o README.md do repositório para documentação, contendo informações como:<br>
◼ Como instalar as dependências do projeto;<br>
◼ Como executar o projeto;<br>
◼ Quais são as rotas possíveis;<br>
◼ Quaisquer outros pontos que você achar necessários;<br>
⇨ Utilização de async/await para operações no banco (DAO)<br>
⇨ Ter o código fonte hospedado em um repositório no Github.<br>

<h4>Nesse projeto você e sua squad serão responsáveis por
definir quais são as entidades que o projeto precisa
contemplar e cada um de vocês será responsável por
implementar uma dessas entidades.</h4>

<h2>Empresa de reciclagem</h2><br>

<h4>A nossa empresa é dedicada à reciclagem de materiais e resíduos, visando contribuir para um futuro mais sustentável. Com uma equipe altamente qualificada e equipamentos de ponta, trabalhamos para reduzir o impacto ambiental e promover a economia circular.</h4>

<h2>🗺️Mapeamento das Entidades</h2>

<h3>Cliente ↧</h3>

```
ID (CHAVE PRIMÁRIA)
Nome
Email
CPF
Endereço
```

<h3>Funcionários</h3>

```
ID (CHAVE PRIMÁRIA)
Nome
CPF
Cargo
Salario
```

<h3>Coletador ↧</h3>

```
id (Chave Primária)
Nome
Email
Cpf
Data_de_nascimento
```

<h3>Pontos de Coleta ↧</h3>

```
Id (Chave Prímaria)
Empresa
horario
lugar
Dia

```

<h3>Material ↧</h3>

```
Id (Chave Prímaria)
Tipo
Peso
Quantidade
Tamanho

```


<h2>🚀Frameworks utilizados no projeto:</h2><br>

>`Express.`

 <h2>❔Como abrir o projeto modelo MVC❓</h2><br>
<h3>⚙️Você precisará instalar os seguintes pacotes:</h3><br>

>`npm install`<br>


 <h3>✔️execute o projeto:</h3>
 
>`npm start`
 
<h3>⚙️Como dev:</h3>
 
<sup>OBS: definido no package.json ("dev": "nodemon ./src/server.js")<sup>
 
>`npm run dev`

<br>
 
 ## 📦 EQUIPE

---
⌨️ com ❤️ por:<br>
               Eliseu Machado 😊
               <br>  Karolayne Rodrigues  😊
               <br> Pedro Nicacio 😊
               <br>  Suzana Barbosa 😊
               <br> Thiago Oliveira 😊   
             




