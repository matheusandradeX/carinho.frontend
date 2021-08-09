
const url = "http://localhost:8080/api/turmas"
fetch(url)
    .then(response => response.json())
    .then(data => {

        document.getElementById('dados').innerHTML = data.map(turmaTemplate).join(' ')
    }).catch(err => console.log(err))

function turmaTemplate(turma) {
    return `  
    <option value="${turma.id}"> ${turma.numeroTurma}</option><br/>
`
}
 

 
 function putAluno() {

 var id = sessionStorage.getItem('idAluno')
 const url = "http://localhost:8080/api/aluno"
 
 var file = document.getElementById('imagem_crianca').files[0]
 var nome = document.getElementById('nome_crianca').value
 var idade = document.getElementById('idade_crianca').value
 var sexo = document.getElementById('sexo_crianca').value
 var carteiraIdentidade = document.getElementById('documento_crianca').value


 const form = new FormData();
 form.append('id_aluno',id);
 form.append('nome',nome);
 form.append('idade',idade);
 form.append('foto',file);
 form.append('genero',sexo);
 form.append('carteiraIdentidade',carteiraIdentidade);
 form.append('id_turma',17)


 for (var pair of form.entries())
{
 console.log(pair[0]+ ', '+ pair[1]); 
}
 fetch(url, {
    method: "PUT",
  
    body: form
 });
 
     alert("deu certo");
  
   }