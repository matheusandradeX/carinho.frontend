function cadastrar(){
    const url = "http://localhost:8080/api/cadastrarTurma"
    const form = new FormData();

    var professorResponsavel = document.getElementById('professorResponsavel').value
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