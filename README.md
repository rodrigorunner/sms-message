<h1>Problema</h1>

<p>Vamos supor uma aplicação que envia disparos de mensagens de SMS e registra esses disparos em um banco de dados. Queremos que você implemente um servidor que receberá atualizações de status dessas mensagens. A partir das regras de negócio definidas, você precisará construir uma API REST que realize a atualização das informações armazenadas em um banco de dados relacional e outra que busque os dados de mensagens no banco a partir do status da mensagem para exibir em um relatório.</p>

<p>Atualização de status: As mensagens de SMS são registradas no banco de dados e disparados por um sistema externo, que posteriormente envia uma requisição REST para atualizar o status da mensagem. Para isso, precisamos de uma API capaz de receber o ID do disparo e o status da mensagem e atualizar o registro no banco de dados.</p>

<p>Relatórios de mensagens: Para medir os resultados dos envios, temos uma aplicação que pesquisa os registros de disparo de acordo com o status da mensagem. Para que essa aplicação funcione corretamente, precisamos de uma API que seja capaz de receber um status e retornar todos os registros do banco de dados que estão marcados com esse mesmo status.</p>

<h3>Documentação</h3>

<h4>Instalação Backend</h4>
    
<ul>
    <li>Rodar o comando <strong>npm install</strong> para instalar as dependências do projeto;</li>
    <li>Criar um arquivo <i>.env</i> para configurar o ambiente, variáveis: <i>PORT</i>, <i>PGUSER</i>, <i>PGPORT</i>, <i>PGPASSWORD</i>, <i>PGHOST</i>, <i>PGDATABASE</i>;</li>
    <li>Rodar o comando <strong>npm run start</strong> para iniciar o servidor.</li> 
</ul>

<hr />

<h4>Instalação Frontend</h4>
    
<ul>
    <li>Rodar o comando <strong>npm install</strong> para instalar as dependências do projeto;</li>
    <li>Criar um arquivo <i>.env</i> e uma variável <i>REACT_APP_SERVERURL</i> passando o endereço do servidor local;</li>
    <li>Rodar o comando <strong>npm start</strong> para iniciar o projeto.</li>
</ul>

<h4>Modelagem Entidade-Relacionamento</h4>

![Captura de tela de 2023-08-24 09-59-08](https://github.com/rodrigorunner/sms-message/assets/55710562/aad5501d-2055-40d7-abe1-075594bb1e34)



