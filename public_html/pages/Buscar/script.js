var url = "http://localhost:8080/api/aluno"
var urlRemove = "http://localhost:8080/api/aluno/"
var listaAlunos
var nome = document.getElementById("campoBusca").value
let headers = new Headers();
var perfil = sessionStorage.getItem('perfil');
headers.append('Content-Type', 'text/json');
var escolaId = parseInt( sessionStorage.getItem('escola'))
var myDate = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
var valorBotaoEntradaSaida 

function verificarLista() {
    var nome = document.getElementById("campoBusca").value
    if (nome == "") {
         url = "http://localhost:8080/api/alunos/escola/"+ escolaId

    } else {
        url = "http://localhost:8080/api/alunos" + "/" + nome +"/escola/"+escolaId
        console.log(url)
    }
}

function remove(idAluno) {

    if(confirm("Relamente deseja deletar o aluno?")){

        fetch(urlRemove + idAluno+"/escola/"+escolaId, { method: 'DELETE' }).then(() => {
            location.reload();
        }).catch(err => {
            console.error(err)
            alert(erro)
        });
    }
    else{
        alert("Ação cancelada")
    }

}

function getAluno() {
    verificarLista();
    fetch(url)
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

if(ultimoStatustipoHorario == "ENTRADA"){
    console.log("entrou aqui 1 ")
    status ="SAIDA"

    toast("Saida Realizada " ,myDate);

}
else if(ultimoStatustipoHorario == "SAIDA"){
    console.log("entrou aqui 2 ")
    status ="ENTRADA"

    toast("Entrada Realizada " ,myDate);
}
else {
    console.log("entrou aqui 3 ")
    status ="ENTRADA"
    toast("Entrada Realizada " ,myDate);

}
    const entradaOuSaida =  document.getElementById('frequencia_'+alunoId).textContent
     console.log("aluno id:"+alunoId)
     console.log("valor:"+entradaOuSaida)


    switch (entradaOuSaida) {
        case 'Entrada':
            console.log("Entrada")
            document.getElementById('status_'+alunoId).innerHTML = "Entrada"
            document.getElementById('frequencia_'+alunoId).innerHTML = "Saida"
            toast("Entrada Realizada " ,myDate);      
            break;      

        case 'Saida':
            console.log("SAIDA")
            document.getElementById('status_'+alunoId).innerHTML = "Saida"
            document.getElementById('frequencia_'+alunoId).innerHTML = "Entrada"
            toast("SAIDA Realizada " ,myDate);   
        break;
    
        default:
            console.log("null")    
            document.getElementById('status_'+alunoId).innerHTML = "Entrada"   
            document.getElementById('frequencia_'+alunoId).innerHTML = "Saida"
            toast("Entrada Realizada " ,myDate);      
        break; 
         
    }

    const formData = new FormData();
    formData.append('tipoHorario',status);
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

function atualizarAluno(alunoId) {
    

    sessionStorage.setItem('idAluno', alunoId);  
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
      `
    }
  
    function administrador(data) {
        const idAluno = data.aluno.id;
        const urlRegistro = "http://localhost:8080/api/aluno/"+idAluno+"/escola/"+escolaId;
            fetch(urlRegistro)
            .then(response => response.json())
            .then(data => {       

        }).catch(err => console.log(err))
            if (data.controleAluno !== null && data.controleAluno!== undefined){
                 valorBotaoEntradaSaida = " Entrada";
            if(data.controleAluno.tipoHorario === " SAIDA"){
                valorBotaoEntradaSaida = " Entrada";
            }
            if(data.controleAluno.tipoHorario === " ENTRADA"){
                valorBotaoEntradaSaida = " Saida";

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
             <div class="elementos" style="display: flex;
             justify-content: space-between;">
                <div class="elemento" style="width:auto; font-size:20px;"> 
                <div>
                   <strong>Nome:</strong> ${data.aluno.nome}  
                </div>
                
                   <div >
                   <strong>Idade:</strong> ${data.aluno.idade}
                   </div>
                   <div>
                   <strong>Sexo:</strong> ${data.aluno.genero}
                   </div>
                   <div >
                   <strong>Documento:</strong> ${data.aluno.carteiraIdentidade}
                   <br>
                   <div style="display: flex;
                   flex-direction: row;">
                    <strong ">Último Status: </strong><p style="margin-left: 5px" id="status_${data.aluno.id}"> ${data.controleAluno.tipoHorario  }</p>
                   </div>
                   </div>
                </div>
                <div class="elemento2">
                   <img style='display:block; width:200px;height:200px;' src="data:image/png;base64, ${data.aluno.foto}" />
                </div>
             </div>
          <footer class="card-footer" id="footer"style="font-size: 30px">
          <button class="card-footer-item button"  id="frequencia_${data.aluno.id}"    onclick="persistirFrequencia(${data.aluno.id},'${data.controleAluno.tipoHorario}')" >${valorBotaoEntradaSaida}</button>
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
                       <div>
                       <strong id="status_${data.aluno.id}"  >Último Status: </strong>Novo aluno
                       </div>
                       </div>
                    </div>
                    <div class="elemento2">
                       <img style='display:block; width:200px;height:200px;' src="data:image/png;base64, ${data.aluno.foto}" />
                    </div>
                 </div>
              <footer class="card-footer" id="footer"style="font-size: 30px">
              <a href="#" id="frequencia_${data.aluno.id}"  class="card-footer-item" onclick="persistirFrequencia(${data.aluno.id},'ENTRADA')">Entrada</a>
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


