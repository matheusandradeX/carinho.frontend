const urlRemove = "http://localhost:8080/api/aluno/"
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
          <td>  <a  href="../alterarAluno/index.html">  <i class="material-icons">edit</i> </a>  <a  onclick="remove(${aluno.id})"  >  <i  style="color:red"class="material-icons">delete</i>  </a>  </td> 
          </tr>
      `
       }  
}





function remove(idAluno) {

    alert("aqui "+ idAluno)
    fetch(urlRemove + idAluno, { method: 'DELETE' }).then(() => {
        location.reload();
    }).catch(err => {
        console.error(err)
        alert(erro)
    });
}
