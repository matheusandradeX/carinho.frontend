var url = "http://localhost:8080/api/turmas"
    fetch(url)
        .then(response => response.json())
        .then(data => {

            document.getElementById('turma').innerHTML = data.map(professorTemplate).join(' ')
        }).catch(err => console.log(err))

    function professorTemplate(turma) {
        return `  
        <option value="${turma.id}"> ${turma.numeroTurma}</option><br/>
   `
}



var fotoNova;

function cadastrarCrianca() {
 

    if(fotoNova !== null){
        alert("gravou dados da foto")
    }
    const form = new FormData();
    var dateObj = new Date(document.getElementById('dataNascimento').value)
    var dataLocal = dateObj.toLocaleDateString('pt-BR', { timeZone: 'UTC' })  
    var file = document.getElementById('imagemCrianca').files[0];
  
  
    var turmas = document.getElementById('turma').value
    console.log(turmas)
    var nome = document.getElementById('nomeCrianca').value
    var idade = document.getElementById('idadeCrianca').value
    var sexo = document.getElementById('sexoCrianca').value
    var carteiraIdentidade = document.getElementById('carteiraIdentidade').value

    console.log(nome);



    form.append("nome", nome);
    form.append('idade', idade);
    form.append('genero', sexo);
     form.append('dataNascimento', dataLocal);
    form.append('carteiraIdentidade', carteiraIdentidade);
    form.append('foto', file);
    form.append('turma',turmas)


    console.log(form)
    const url = 'http://localhost:8080/api/aluno'
    const request = new Request(url, {
        method: 'POST',
        body: form
    });

    fetch(request)
        .then(response => response.text())
        .then(console.log)
}


