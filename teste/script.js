

const url = "http://localhost:8080/api/alunos"
const urlRemove = "http://localhost:8080/api/aluno/"

function remove(idAluno){
  fetch(urlRemove +idAluno, { method: 'DELETE'}).then(() => {
     location.reload();  }).catch(err => {
    console.error(err)
    alert(erro)
  });}






fetch(url)
.then(response => response.json())
.then(data =>{


document.getElementById('teste').innerHTML = `
 	${data.map(alunoTemplate).join(' ')}

 `

 document.getElementById('titulo').innerHTML = `
 <h1 class="title is-2" style="text-align: center">Lista de Alunos (${data.length})</h1>
 <br>

 `




})
.catch(err=>console.log(err))



function alunoTemplate(aluno){
	return `
			
		<div class="box">
		<strong>Nome:</strong> ${aluno.nome}<br>
	<strong>Idade:</strong> ${aluno.idade}<br>
	<strong>Sexo:</strong> ${aluno.sexo}
	 <footer class="card-footer">
    <a href="#" class="card-footer-item">Edit</a>
    <a href="#" class="card-footer-item" onclick="remove(${aluno.id})">Delete</a>
  </footer>
		</div>
	
	

	`




}

