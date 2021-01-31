function cadastrarCrianca() {

    const form = new FormData();

    var tes2 = document.getElementById('dataNascimento').value
    var dateObj = new Date(document.getElementById('dataNascimento').value)
    var dataLocal = dateObj.toLocaleDateString('pt-BR', { timeZone: 'UTC' })


    console.log(typeof(tes2))
    console.log(typeof(dataLocal))
    var file = document.getElementById('imagemCrianca').files[0]
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

    const url = 'http://localhost:8080/api/aluno'
    const request = new Request(url, {
        method: 'POST',
        body: form
    });

    fetch(request)
        .then(response => response.text())
        .then(console.log)


    alert("Dados Cadastrados!")

}