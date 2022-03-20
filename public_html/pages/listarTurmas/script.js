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

function buscar(){

    var idTurma = document.getElementById('dados').value
    const urlTurma = "http://localhost:8080/api/turma/"+idTurma+"/1"
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






function download_csv(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV FILE
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // We have to create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Make sure that the link is not displayed
    downloadLink.style.display = "none";

    // Add the link to your DOM
    document.body.appendChild(downloadLink);

    // Lanzamos
    downloadLink.click();
}

function export_table_to_csv(html, filename) {
	var csv = [];
	var rows = document.querySelectorAll("table tr");
	
    for (var i = 0; i < rows.length; i++) {
		var row = [], cols = rows[i].querySelectorAll("td, th");
		
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
		csv.push(row.join(","));		
	}

    // Download CSV
    download_csv(csv.join("\n"), filename);
}

document.querySelector("a").addEventListener("click", function () {
    var html = document.querySelector("table").outerHTML;
	export_table_to_csv(html, "table.csv");
});
