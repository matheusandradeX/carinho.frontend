var url = "http://localhost:8080/api/aluno"
const urlRemove = "http://localhost:8080/api/aluno/"
var listaAlunos
var nome = document.getElementById("campoBusca").value

let username = 'matheus';
let password = 'teste';

let headers = new Headers();

headers.append('Content-Type', 'text/json');


function verificarLista() {
    var nome = document.getElementById("campoBusca").value
    if (nome == "") {
        console.log("Valor nulo")
        url = "http://localhost:8080/api/alunos"
    } else {
        url = "http://localhost:8080/api/alunos" + "/" + nome
    }
}



function remove(idAluno) {
    fetch(urlRemove + idAluno, { method: 'DELETE' }).then(() => {
        location.reload();
    }).catch(err => {
        console.error(err)
        alert(erro)
    });
}

function getAluno() {
    verificarLista();

    fetch(url)
        .then(response => response.json())
        .then(data => {

            listaAlunos = data
            document.getElementById('titulo').innerHTML = `
         <h1 class="title is-2" style="text-align: center">Lista de Alunos (${data.length})</h1>
         <br>
         `
            document.getElementById('teste').innerHTML = data.map(alunoTemplate).join(' ')


        }).catch(err => console.log(err))

    function alunoTemplate(aluno) {
        return `
        <style>
        * {
        margin:0px;
        padding:0px;

        }
        </style>

       <div class="columns is-mobile is-centered ">
       <div class="box" style="width: 600px; margin-top:20px; ">
       <div style="display: flex; justify-content: flex-end">
       <div>
           <div class="dropdown is-right is-hoverable">
               <div class="dropdown-trigger">
                   <button class="button" aria-haspopup="true" aria-controls="dropdown-menu"> 
       <span>Menu</span> 
       <span class="icon is-small"> 
           <i class="fas fa-angle-down"
           aria-hidden="true"></i> 
       </span> 
       </button>
               </div>
               <div class="dropdown-menu" id="dropdown-menu" role="menu">
                   <div class="dropdown-content">
                       <a href="../alterarAluno/index.html" class="dropdown-item"   onclick="atualizarAluno(${aluno.id})"     >  <i class="material-icons">edit</i>
                           Editar
       </a>
                       <a href="#" class="dropdown-item"    onclick="remove(${aluno.id})"> <i class="material-icons">delete</i>
                           Deletar
       </a>
                       <a href="../responsavel/index.html" class="dropdown-item"             onclick="resp(${aluno.id})"   > <i class="material-icons">people</i>
                           Responsável 
       </a>
                   </div>
               </div>
           </div>
       </div>
   </div>
         <div class="elementos" style="justify-content: center;">
         
            <div class="elemento" style="width:auto; font-size:20px;">
               
            <div>
               <strong>Nome:</strong> ${aluno.nome}
               </div>
               <div>
               <strong>Idade:</strong> ${aluno.idade}
               </div>
               <div>
               <strong>Sexo:</strong> ${aluno.genero}
               </div>
               <div>
               <strong>Documento:</strong> ${aluno.carteiraIdentidade}
               </div>
            </div>
            <div class="elemento2">
               <img style='display:block; width:200px;height:200px;' src="data:image/png;base64, ${aluno.foto}" />
            </div>
         </div>
        
      <footer class="card-footer" style="font-size: 30px">
      
      <a href="#" id="entrada" class="card-footer-item"  onclick="entrada(${aluno.id})">Entrada</a>
      <a href="#" id="saida" class="card-footer-item"         onclick="saida(${aluno.id})">Saida</a>
      <a href="../responsavel/index.html" class="card-footer-item" "             onclick="resp(${aluno.id})"   > <i class="material-icons">people</i>
      Responsável 
</a>
      </footer>
      </div>  
      </div>

      <div id="snackbar">Some text some message..</div>


   `

    }
}

function entrada(id) {
    const url = "http://localhost:8080/api/controle"
    var idAluno = id;
    var status = "ENTRADA"
    var post = { id: idAluno, tipoHorario: status }
    var json = JSON.stringify(post)

    fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: json
    });
    var myDate = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");



    toast("Entrada Realizada " ,myDate);

}

function saida(id) {





    
    const url = "http://localhost:8080/api/controle"
    var idAluno = id;
    var status = "SAIDA"
    var post = { id: idAluno, tipoHorario: status }
    var json = JSON.stringify(post)


    fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: json
    });
    var myDate = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    
    toast("Saida Realizada " ,myDate);

}

function resp(aluno) {

    var id = aluno
    console.log(aluno)
    sessionStorage.setItem('idAluno', id);

}

function atualizarAluno(aluno) {
    var id = aluno
    console.log(aluno)
    sessionStorage.setItem('idAluno', id);
    
}
function postCrianca() {

    var nome = document.getElementById('nome_crianca').value
    var idade = document.getElementById('idade_crianca').value
    var sexo = document.getElementById('sexo_crianca').value
    var carteiraIdentidade = document.getElementById('carteira_identidade').value
    var post = { nome: nome, idade: idade, sexo: sexo, carteiraIdentidade: carteiraIdentidade }
    var json = JSON.stringify(post)
    const url = "http://localhost:8080/api/aluno"

    fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: json
    });

    document.getElementById('nome_crianca').value = ''
    document.getElementById('sexo_crianca').value = ''
    document.getElementById('carteira_identidade').value = ''
}

function responsavel(id) {
    var idResp = id
    sessionStorage.setItem('idResp', idResp);
}

function toast(nome,horario) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show",''); }, 3000);
 document.getElementById("snackbar").innerHTML= `${nome} ${horario} `

  }

