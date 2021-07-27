
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

function buscar(){

    var idTurma = document.getElementById('dados').value
    const urlTurma = "http://localhost:8080/api/turma/"+idTurma
    fetch(urlTurma)
           .then(response => response.json())
           .then(data => {
                console.log(data)
               document.getElementById('tabela').innerHTML = data.map(alunoTemplate).join(' ')
           }).catch(err => console.log(err))
   
       function alunoTemplate(aluno) {
           return `      
          <tr>
          <td>${aluno.nome}</td>
          <td>${aluno.carteira_identidade}</td>
          <td>${aluno.genero}</td>
          <td>${aluno.numero_turma}</td>
          </tr>
      `
       }  
}





