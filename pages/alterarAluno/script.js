var id = sessionStorage.getItem('idAluno')
var nome = sessionStorage.getItem('nome')
var idade = sessionStorage.getItem('idade')
var sexo = sessionStorage.getItem('sexo')
var carteiraIdentidade= sessionStorage.getItem('CarteiraIdentidade')

document.getElementById("nome_crianca").value = nome 

document.getElementById("idade_crianca").value = idade

document.getElementById('sexo_crianca').value = sexo

document.getElementById('documento_crianca').value = carteiraIdentidade


function putAluno() {

    var nome = document.getElementById('nome_crianca').value
 
    var idade = document.getElementById('idade_crianca').value
 
    var sexo = document.getElementById('sexo_crianca').value
 
    var carteiraIdentidade = document.getElementById('documento_crianca').value
 
    var post = { id: id, nome: nome, idade: idade, sexo: sexo, carteiraIdentidade: carteiraIdentidade }
 
    var json = JSON.stringify(post)
 
    const url = "http://localhost:8080/api/aluno"
 
    fetch(url, {
       method: "PUT",
       headers: { 'Content-Type': 'application/json' },
       body: json
    });
 
 
 alert('Dados Atualizados')
 }