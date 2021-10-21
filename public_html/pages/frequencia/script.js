var escolaId = parseInt( sessionStorage.getItem('escola'))
const getTurmas = "http://localhost:8080/api/turmas/escola/"+escolaId


fetch(getTurmas)
    .then(response => response.json())
    .then(data => {        
        document.getElementById('dados').innerHTML = data.map(turmaTemplate).join(' ')
    }).catch(err => console.log(err))

 

function turmaTemplate(turma) {
    return `  
    <option value="${turma.id}"> ${turma.numeroTurma}</option><br/>
  `
}

function turmaTemplate(turma) {
    return `  
    <option value="${turma.id}"> ${turma.numeroTurma}</option><br/>
  `
}

function buscar(){

    var idTurma = document.getElementById('dados').value
    const urlTurma = "http://localhost:8080/api/frequencia/"+idTurma+"/"+escolaId
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
          <td>${aluno.dataRegistro}</td>
          <td>${aluno.horario}</td>
          <td>${aluno.tipo_Horario}</td>
          </tr>
      `
       }  
}





