var url = "http://localhost:8080/api/aluno"
const urlRemove = "http://localhost:8080/api/aluno/"
var listaAlunos
var nome = document.getElementById("campoBusca").value
let headers = new Headers();
var perfil = sessionStorage.getItem('perfil');
headers.append('Content-Type', 'text/json');

function verificarLista() {
    var nome = document.getElementById("campoBusca").value
    if (nome == "") {
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
        
            //console.log(data[0].turma.id);



            switch(perfil) {
                case 'ADMINISTRADOR':
                    document.getElementById('teste').innerHTML = data.map(administrador)
                // data.map(validarControle(data.id))
                    
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
             <strong>Nome:</strong> ${aluno.nome} ${aluno.turma.id} 
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



  function administrador(aluno) {


const idAluno = aluno.id;

console.log(idAluno);

const urlRegistro = "http://localhost:8080/api/ultimoRegistro/"+idAluno;

    fetch(urlRegistro)
    .then(response => response.json())
    .then(data => {
   
        var myobj 
        console.log(data.tipo_Horario)

        var variavel = "none";
        
       // if(data.tipo_Horario == "SAIDA"){

     //  console.log("entrada_"+idAluno)
        //   var a = document.getElementById("entrada_"+idAluno)
         //  a.remove()
            
       // myobj = document.getElementsByName('btn_entrada')[0]
          //  myobj.remove();  
       // }
       // else if(data.tipo_Horario == "ENTRADA"){
         //   console.log("O Aluno: "+data.fk_aluno+" Entrou")
         //   myobj = document.getElementsByName('btn_saida')[0]
          //  myobj.remove();
       // }



}).catch(err => console.log(err))


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

                   <a href="../alterarAluno/index.html" class="dropdown-item"   onclick="atualizarAluno(${aluno.id})">  <i class="material-icons">edit</i>
                       Editar
                    </a>
                    <a href="#" class="dropdown-item"    onclick="remove(${aluno.id})"> <i class="material-icons">delete</i>
                       Deletar
                    </a>
                    <a href="../responsavel/index.html" class="dropdown-item" onclick="resp(${aluno.id})"   > <i class="material-icons">people</i>
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
           <strong>Nome:</strong> ${aluno.nome}  ${aluno.id} 
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
  <a href="#"  name="btn_saida" id ="saida_${aluno.id}"   class="card-footer-item"         onclick="saida(${aluno.id})">Saida</a>
  <a href="../responsavel/index.html" class="card-footer-item" "             onclick="resp(${aluno.id})"   > <i class="material-icons">people</i>
  Responsável 
</a>
  </footer>
  </div>  
  <div id="snackbar">Some text some message..</div>
  </div>

   
  
`    



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
 

  function validarControle(idAluno){
      console.log("o id é "+ idAluno)
    const urlUtimoRegistro = "http://localhost:8080/api/ultimoRegistro/"
    fetch(urlUtimoRegistro+19)
    .then(response => response.json())
    .then(data => {
   
        console.log(data)
     

}).catch(err => console.log(err))












  }




  function verifica_entrada(id){
    

    const urlUtimoRegistro = "http://localhost:8080/api/ultimoRegistro/"+id
    fetch(urlUtimoRegistro)
    .then(response => response.json())
    .then(data => {

        console.log("---------tipo horario------------");
        console.log(data.tipo_Horario);
        if(data.tipo_Horario==="ENTRADA"){
            nome_entrada = "Saida";
            
        }
        if(data.tipo_Horario==="SAIDA"){
            nome_entrada = "Entrada";
        }

       

     

    }).catch(err => console.log(err))


  }



  function teste() {
var url = "http://localhost:8080/api/alunos"
var url2 = "http://localhost:8080/api/ultimoRegistro/"
    console.log("entrou na função teste")

    //Lista Alunos
        fetch(url)
            .then(response => response.json())
            .then(data => {
           console.log(data)
                //console.log(data.id[0])
                for(var i=0;i<data.length;i++){
                   // console.log(data[i].id)
                    fetch(url2+data[i].id)
                    .then(response => response.json())
                    .then(data => {
                    console.log("------------data---------------")
                    console.log(data)  
                    
                    if(data.tipo_Horario=="ENTRADA"){
                        var e = "entrada_"+data.fk_aluno 
                        if(document.getElementById(e)){                                            
                            

            
                            console.log("removerndo: "+e)
                            var a = document.getElementById(e)
                            a.remove()
                          
                        }else{
                            console.log("nao que remover: "+e)
                        }
                            
                    
                    }
                    if(data.tipo_Horario=="SAIDA"){
                        var e = "saida_"+data.fk_aluno 
                        if(document.getElementById(e)){                                            
                            
                            console.log("removendo: "+e)
                            var a = document.getElementById(e)
                            a.remove()
                        }else{
                            console.log("nao que remover: "+e)
                        }
                            
                    
                    }
                        

                        
                   
                        
                        
                      



                    


                    }).catch(err => console.log(err))




                }
           
          



        }).catch(err => console.log(err))

     






    }






  setTimeout(function(){
    

  teste();
   
}, 100);
