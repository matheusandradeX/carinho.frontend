var url = "http://localhost:8080/api/alunos"
    fetch(url)
        .then(response => response.json())
        .then(data => {

            document.getElementById('dados').innerHTML = data.map(alunoTemplate).join(' ')
        }).catch(err => console.log(err))

    function alunoTemplate(aluno) {
        return `  
        <option value="${aluno.id}"> ${aluno.nome}</option><br/>
   `
}

var url2 = "http://localhost:8080/api/responsaveis"



    fetch(url2)
        .then(response => response.json())
        .then(data2 => {
            console.log(data2)
            document.getElementById('dadosResponsavel').innerHTML = data2.map(responsavelTemplate).join(' ')


        }).catch(err => console.log(err))

    function responsavelTemplate(responsavel) {
        return `
        
        <option value="${responsavel.id}"> ${responsavel.nomeResp}</option><br/>

   `

}

function vincularDados(){


    const form = new FormData();


    var aluno = document.getElementById('dados').value
    var responsavel = document.getElementById('dadosResponsavel').value
    
    console.log(aluno);
    console.log(responsavel);

    form.append("alunoId", aluno);
    form.append('responsavelId', responsavel);
   

    const url = 'http://localhost:8080/api/alunoresponsavel'
    const request = new Request(url, {
        method: 'POST',
        body: form
    });

    fetch(request)
        .then(response => response.text())
        .then(console.log)


    alert("Dados Cadastrados!")
   

}
