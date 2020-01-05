

const url = "http://localhost:8080/api/alunos"
const urlRemove = "http://localhost:8080/api/aluno/"
var listaAlunos

function remove(idAluno) {
	fetch(urlRemove + idAluno, { method: 'DELETE' }).then(() => {
		location.reload();
	}).catch(err => {
		console.error(err)
		alert(erro)
	});
}

function getAluno() {
	fetch(url)
		.then(response => response.json())
		.then(data => {
			listaAlunos = data
			document.getElementById('teste').innerHTML = `
 	${data.map(alunoTemplate).join(' ')}

 `
			document.getElementById('titulo').innerHTML = `
 <h1 class="title is-2" style="text-align: center">Lista de Alunos (${data.length})</h1>
 <br>

 `})
		.catch(err => console.log(err))

	function alunoTemplate(aluno) {
		return `		
		<div class="box">
		<strong>Nome:</strong> ${aluno.nome}<br>
	<strong>Idade:</strong> ${aluno.idade}<br>
	<strong>Sexo:</strong> ${aluno.sexo}
	 <footer class="card-footer">
    <a href="#" class="card-footer-item" onclick="atualizarAluno(${aluno.id})">Edit</a>
    <a href="#" class="card-footer-item" onclick="remove(${aluno.id})">Delete</a>
  </footer>
		</div>
	`
	}






}
function getAlunoNome() {
	var nome = document.getElementById("campoBusca").value

	fetch(url+"/"+nome)
		.then(response => response.json())
		.then(data => {
			listaAlunos = data
			document.getElementById('teste').innerHTML = `
 	${data.map(alunoTemplate).join(' ')}

 `
			document.getElementById('titulo').innerHTML = `
 <h1 class="title is-2" style="text-align: center">Lista de Alunos (${data.length})</h1>
 <br>

 `})
		.catch(err => console.log(err))

	function alunoTemplate(aluno) {
		return `		
		<div class="box">
		<strong>Nome:</strong> ${aluno.nome}<br>
	<strong>Idade:</strong> ${aluno.idade}<br>
	<strong>Sexo:</strong> ${aluno.sexo}
	 <footer class="card-footer">
    <a href="#" class="card-footer-item" onclick="atulizarAluno(${aluno.id})">Edit</a>
    <a href="#" class="card-footer-item" onclick="remove(${aluno.id})">Delete</a>
  </footer>
		</div>
	`
	}






}










function atualizarAluno(aluno) {
	var idAluno = aluno
	console.log(aluno)
	console.log(listaAlunos)
	window.open("editarAluno.html", "Altualizar Dados do Aluno", "height=600,width=600");








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