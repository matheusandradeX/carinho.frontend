var url = "http://localhost:8080/api/login/professores"
    fetch(url)
        .then(response => response.json())
        .then(data => {

            document.getElementById('dados').innerHTML = data.map(professorTemplate).join(' ')
        }).catch(err => console.log(err))

    function professorTemplate(professor) {
        return `  
        <option value="${professor.id}"> ${professor.nome}</option><br/>
   `
}



function cadastrar(){
    const url = "http://localhost:8080/api/cadastrarTurma"
    const form = new FormData();

    var professorResponsavel = document.getElementById('dados').value
    var numeroTurma = document.getElementById('numeroTurma').value
   

    
    form.append("numeroTurma", numeroTurma);
    form.append('professorResponsavel', professorResponsavel);
   
   
    const request = new Request(url, {
        method: 'POST',
        body: form
    });

    fetch(request)
        .then(response => response.text())
        .then(console.log)


    alert("Dados Cadastrados!")
}