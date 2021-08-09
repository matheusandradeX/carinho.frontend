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
   const url = "http://localhost:8080/api/aluno"
    const form = new FormData();
    var dateObj = new Date(document.getElementById('dataNascimento').value)
    var dataLocal = dateObj.toLocaleDateString('pt-BR', { timeZone: 'UTC' })  
    var file = document.getElementById('imagemCrianca').files[0];
    var turmas = document.getElementById('turma').value
    var nome = document.getElementById('nomeCrianca').value
    var idade = document.getElementById('idadeCrianca').value
    var sexo = document.getElementById('sexoCrianca').value
    var carteiraIdentidade = document.getElementById('carteiraIdentidade').value

    form.append("nome", nome);
    form.append('idade', idade);
    form.append('genero', sexo);
     form.append('dataNascimento', dataLocal);
    form.append('carteiraIdentidade', carteiraIdentidade);
    form.append('foto', file);
    form.append('turma',14)

    for (var pair of form.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

  
  

 
   
    const request = new Request(url, {
        method: 'POST',
        body: form
    });

    fetch(request)
        .then(response => response.text())
        .then(console.log)

    alert("Dados Cadastrados!")
}




    function take_snapshot() {

        // take snapshot and get image data
        Webcam.snap(function(data_uri) {
            
            globalteste=data_uri;
            
            // display results in page
            document.getElementById('results').innerHTML =
                '<h2>Aqui está sua foto</h2>' +
                '<img id="pegarfoto" src="' + data_uri + '"/>';
            console.log(globalteste)


        });
    }



    