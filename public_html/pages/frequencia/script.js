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
    const urlTurma = "http://localhost:8080/api/frequencia/"+idTurma
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
          <td>${aluno.horario}</td>
          <td>${aluno.tipo_Horario}</td>
         
        
          </tr>
      `
       }  
}


const tableRows = document.querySelectorAll('td')
const exportBtn = document.querySelector('[data-js="export-table-btn"]')
exportBtn.addEventListener('click',()=>{
    const CSVString =
Array.from(tableRows).map(row => Array.from(row.cells).map(cell => cell.textContent).join(',')  ).join('\n')
   
exportBtn.setAttribute(
    'href',
    `data:text/csvcharset=utf-8,${encodeURIComponent(CSVString)}`
)
exportBtn.setAttribute('download', 'table.csv')

})


