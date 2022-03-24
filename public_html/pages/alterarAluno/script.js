var idAluno = sessionStorage.getItem('idAluno')

var idEscola = sessionStorage.getItem('escola')

var url = "http://localhost:8080/api/turmas/escola/"+idEscola
    fetch(url)
        .then(response => response.json())
        .then(data => {

            document.getElementById('turma').innerHTML = data.map(professorTemplate).join(' ')
        }).catch(err => console.log(err))

    function professorTemplate(turma) {
        return `  
        <option value="${turma.id}"> ${turma.numeroTurma}</option><br/>
   `
}
var url = "http://localhost:8080/api/aluno/"+idAluno+"/escola/"+idEscola;

 fetch(url)
        .then(response => response.json())
        .then(data => {

          document.getElementById('nome_crianca').value = data.aluno.nome
          document.getElementById('idade_crianca').value = data.aluno.idade
          document.getElementById('documento_crianca').value = data.aluno.carteiraIdentidade
          document.getElementById('imagem_crianca').files[0] 


        }).catch(err => console.log(err))


 function putAluno() {

 const url = "http://localhost:8080/api/aluno"
 
 var file = document.getElementById('imagem_crianca').files[0]
 var nome = document.getElementById('nome_crianca').value
 var idade = document.getElementById('idade_crianca').value
 var sexo = document.getElementById('sexo_crianca').value
 var carteiraIdentidade = document.getElementById('documento_crianca').value
 var turmas = document.getElementById('turma').value        


 const form = new FormData();
 form.append('id_aluno',idAluno);
 form.append('id_turma',turmas);
 form.append('nome',nome);
 form.append('idade',idade);
 form.append('foto',file);
 form.append('genero',sexo);
 form.append('carteiraIdentidade',carteiraIdentidade);
 
 fetch(url, {
    method: "PUT",
  
    body: form
 });
 
   alert("Aluno Atualizado")
  
   }