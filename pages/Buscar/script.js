

 var url
const urlRemove = "http://localhost:8080/api/aluno/"
var listaAlunos
var nome = document.getElementById("campoBusca").value


function verificarLista( ){

  var nome = document.getElementById("campoBusca").value
   if(nome == ""){
      console.log("Valor nulo")
      url ="http://localhost:8080/api/alunos"
   }else{
      url = "http://localhost:8080/api/alunos"+"/"+nome
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
         console.log(data);

         document.getElementById('teste').innerHTML = `
    ${data.map(alunoTemplate).join(' ')}

 `
         document.getElementById('titulo').innerHTML = `
 <h1 class="title is-2" style="text-align: center">Lista de Alunos (${data.length})</h1>
 <br>

 `})    .catch(err => console.log(err))

   function alunoTemplate(aluno) {
      return `		
      <div class="box">
      <strong>Nome:</strong> ${aluno.nome}<br>
   <strong>Idade:</strong> ${aluno.idade}<br>
   <strong>Sexo:</strong> ${aluno.sexo}<br>
   <strong>Documento:</strong> ${aluno.carteiraIdentidade}<br>
   <img src="data:image/png;base64, ${aluno.foto}" />
    <footer class="card-footer">
    <a href="../alterarAluno/index.html" class="card-footer-item" onclick="atualizarAluno(${aluno.id})">Editar</a>
    <a href="#" class="card-footer-item" onclick="remove(${aluno.id})">Deletar</a>
  </footer>
      </div>
   `
   }
}

function atualizarAluno(aluno) {
   
   var idAluno = aluno
   
  
   var atualizarAluno = listaAlunos.filter(function(aluno){
         return aluno.id == idAluno
   })
console.log(atualizarAluno)
   var campoNome;
   var campoIdade;
   var campoSexo;
   var campoCI;



 var teste =  atualizarAluno.map(preencherCampos).join('')


   function preencherCampos(campo){
      return  campoNome = campo.nome ,
              campoIdade = campo.idade,
              campoSexo = campo.sexo,
              campoCI = campo.carteiraIdentidade
   }
  
  sessionStorage.setItem('idAluno', aluno);
   sessionStorage.setItem('nome', campoNome);
   sessionStorage.setItem('idade', campoIdade);
   sessionStorage.setItem('sexo', campoSexo);
   sessionStorage.setItem('CarteiraIdentidade',campoCI)
  
 
   
/*  
var n = "Joao"
    document.getElementById('nome_crianca').value = n
   document.getElementById('sexo_crianca').value = campoSexo
   document.getElementById('idade_crianca').value = campoIdade
   document.getElementById('carteira_identidade').value = campoCI
 window.open("editarAluno.html", "Altualizar Dados do Aluno", "height=600,width=600");
   */
  
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

