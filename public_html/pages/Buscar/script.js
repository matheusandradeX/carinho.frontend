var url = "http://localhost:8080/api/aluno"
const urlRemove = "http://localhost:8080/api/aluno/"
var listaAlunos
var nome = document.getElementById("campoBusca").value
let headers = new Headers();
var perfil = sessionStorage.getItem('perfil');
headers.append('Content-Type', 'text/json');
var escolaId = parseInt( sessionStorage.getItem('escola'))
var myDate = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");


urlAlunomaisControle = "http://localhost:8080/api/alunos/escola/"+ escolaId

function verificarLista() {
    var nome = document.getElementById("campoBusca").value
    if (nome == "") {
         url = "http://localhost:8080/api/alunos/escola/"+ escolaId

    } else {
        url = "http://localhost:8080/api/alunos" + "/" + nome +"/escola/"+escolaId
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
    fetch(urlAlunomaisControle)
        .then(response => response.json())
        .then(data => {  
    listaAlunos = data
    console.log(listaAlunos)
   
            switch(perfil) {
                case 'ADMINISTRADOR':
                    document.getElementById('teste').innerHTML = data.map(administrador) 
                  break;
                case 'PROFESSOR':
                    document.getElementById('teste').innerHTML = data.map(professor)
                  break;
                default:
                   alert("Usuário não Autenticado")
                   window.location.replace("../../index.html") 
              }
              
            document.getElementById('titulo').innerHTML = `
         <h1 class="title is-2" style="text-align: center">Lista de Alunos (${data.length})</h1>
         <br>
         `
    }).catch(err => console.log(err))   
}

function persistirFrequencia(alunoId,ultimoStatustipoHorario) {

var status = ultimoStatustipoHorario


console.log(ultimoStatustipoHorario)
if(ultimoStatustipoHorario == "ENTRADA"){
    console.log("entrou aqui 1 ")
    status ="ENTRADA"
    toast("Saida Realizada " ,myDate);
    atulizarStatus(ultimoStatustipoHorario,alunoId)
}
if(ultimoStatustipoHorario == "SAIDA"){
    console.log("entrou aqui 2 ")
    status ="SAIDA"
    toast("Entrada Realizada " ,myDate);
}
if(ultimoStatustipoHorario == undefined){
    console.log("entrou aqui 3 ")
    toast("Entrada Realizada " ,myDate);
    status ="ENTRADA"
}
console.log("valor status e ")
console.log(status)
const formData = new FormData();
formData.append('tipoHorario', status);
formData.append('idAluno', alunoId);
formData.append('idEscola', escolaId);
const url = "http://localhost:8080/api/controle"
const request = new Request(url, {
    method: 'POST',
    body: formData
});

fetch(request)
    .then(response => response.text())
    .then(console.log)


    

} 



function resp(aluno) {
    var id = aluno
    console.log(aluno)
    sessionStorage.setItem('idAluno', id);
}

function atualizarAluno(aluno,turma) {
    var id = aluno
    var id_turma = turma
    console.log(aluno)
    sessionStorage.setItem('idAluno', id);  
    sessionStorage.setItem('id_turma',id_turma);
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
 
    function professor(aluno){
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
       <div id="remove" class="remove" name="remove" >  
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
      <footer class="card-footer" id="footer"style="font-size: 30px">
    
      <a href="#" name="btn_entrada" id ="entrada_${aluno.id}" id="entrada" class="card-footer-item"  onclick="entrada(${aluno.id})">Entrada</a>
      <a href="#" id="saida" name="btn_saida" id ="saida_${aluno.id}"   class="card-footer-item"         onclick="saida(${aluno.id})">Saida</a>
      <a href="../responsavel/index.html" class="card-footer-item" " onclick="resp(${aluno.id}${aluno.turma.id})"   > <i class="material-icons">people</i>
      Responsável 
    </a>
      </footer>
      </div>  
      <div id="snackbar">Some text some message..</div>
      </div> 
  
      `
    }
  

    function administrador(data) {
        const idAluno = data.aluno.id;

        const urlRegistro = "http://localhost:8080/api/testeAluno/"+idAluno+"/escola/"+escolaId;
            fetch(urlRegistro)
            .then(response => response.json())
            .then(data => {       
        
        
        }).catch(err => console.log(err))
            if (data.controleAluno !== null && data.controleAluno!== undefined){
            var valorBotaoEntradaSaida = "Entrada";
            if(data.controleAluno.tipoHorario === "SAIDA"){
                valorBotaoEntradaSaida = "Entrada";
            }
            if(data.controleAluno.tipoHorario === "ENTRADA"){
                valorBotaoEntradaSaida = "Saida";
            }
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
           <div id="remove" class="remove" name="remove" >
               <div class="dropdown is-right is-hoverable">
                   <div class="dropdown-trigger">
                        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu"> 
                        <span>Menu</span> 
                        <span class="icon is-small"> 
                        <i class="fas fa-angle-down"     aria-hidden="true"></i> 
                        </span> 
                    </button>
                   </div>
                   <div class="dropdown-menu" id="dropdown-menu1" role="menu">
                       <div class="dropdown-content">
        
                           <a href="../alterarAluno/index.html" class="dropdown-item"   onclick="atualizarAluno(${data.aluno.id})">  <i class="material-icons">edit</i>
                               Editar
                            </a>
                            <a href="#" class="dropdown-item"    onclick="remove(${data.aluno.id})"> <i class="material-icons">delete</i>
                               Deletar
                            </a>
                            <a href="../responsavel/index.html" class="dropdown-item" onclick="resp(${data.aluno.id})"   > <i class="material-icons">people</i>
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
                   <strong>Nome:</strong> ${data.aluno.nome}  ${data.aluno.id} 
                </div>
                
                   <div>
                   <strong>Idade:</strong> ${data.aluno.idade}
                   </div>
                   <div>
                   <strong>Sexo:</strong> ${data.aluno.genero}
                   </div>
                   <div>
                   <strong>Documento:</strong> ${data.aluno.carteiraIdentidade}
                   <br>
                   <strong>Status:</strong> ${data.controleAluno.tipoHorario  }
                   </div>
                </div>
                <div class="elemento2">
                   <img style='display:block; width:200px;height:200px;' src="data:image/png;base64, ${data.aluno.foto}" />
                </div>
             </div>
          <footer class="card-footer" id="footer"style="font-size: 30px">
          <a href="#" class="card-footer-item" onclick="persistirFrequencia(${data.aluno.id},'${data.controleAluno.tipoHorario}')"  > ${valorBotaoEntradaSaida}</a>
          <a href="../responsavel/index.html" class="card-footer-item" "             onclick="resp(${data.aluno.id})"   > <i class="material-icons">people</i>
          Responsável 
        </a>
          </footer>
          </div>  
          <div id="snackbar">Some text some message..</div>
          </div>
        `    
            } 
            else{
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
               <div id="remove" class="remove" name="remove" >
                   <div class="dropdown is-right is-hoverable">
                       <div class="dropdown-trigger">
                            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu"> 
                            <span>Menu</span> 
                            <span class="icon is-small"> 
                            <i class="fas fa-angle-down"     aria-hidden="true"></i> 
                            </span> 
                        </button>
                       </div>
                       <div class="dropdown-menu" id="dropdown-menu1" role="menu">
                           <div class="dropdown-content">
            
                               <a href="../alterarAluno/index.html" class="dropdown-item"   onclick="atualizarAluno(${data.aluno.id})">  <i class="material-icons">edit</i>
                                   Editar
                                </a>
                                <a href="#" class="dropdown-item"    onclick="remove(${data.aluno.id})"> <i class="material-icons">delete</i>
                                   Deletar
                                </a>
                                <a href="../responsavel/index.html" class="dropdown-item" onclick="resp(${data.aluno.id})"   > <i class="material-icons">people</i>
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
                       <strong>Nome:</strong> ${data.aluno.nome}  ${data.aluno.id} 
                    </div>
                    
                       <div>
                       <strong>Idade:</strong> ${data.aluno.idade}
                       </div>
                       <div>
                       <strong>Sexo:</strong> ${data.aluno.genero}
                       </div>
                       <div>
                       <strong>Documento:</strong> ${data.aluno.carteiraIdentidade}
                       <br>
                       <strong>Status:</strong> Novo aluno
                       </div>
                    </div>
                    <div class="elemento2">
                       <img style='display:block; width:200px;height:200px;' src="data:image/png;base64, ${data.aluno.foto}" />
                    </div>
                 </div>
              <footer class="card-footer" id="footer"style="font-size: 30px">
              
            
        
              <a href="#" class="card-footer-item" onclick="persistirFrequencia(${valorBotaoEntradaSaida})"   >Entrada</a>
        
        
              <a href="../responsavel/index.html" class="card-footer-item" "             onclick="resp(${data.aluno.id})"   > <i class="material-icons">people</i>
              Responsável 
            </a>
              </footer>
              </div>  
              <div id="snackbar">Some text some message..</div>
              </div>
            ` 
            }
        }
        

//Adicionar um delay para ler a API
  setTimeout(function(){   
}, 100);



function atulizarStatus(status,element){

    if(status === "Saida"){
        document.getElementById(element).innerHTML = "Entrada";  
    }
    
    if(status === "Entrada"){
        document.getElementById(element).innerHTML = "Saida";
    }
}

