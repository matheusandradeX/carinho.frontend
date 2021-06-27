

function cadastrarResponsavel() {

    const form = new FormData();

    var file = document.getElementById('imagem').files[0]
    var nome = document.getElementById('nome_responsavel').value
    var tipoResponsavel = document.getElementById('tipo').value
    var carteiraIdentidade = document.getElementById('documento_responsavel').value
    var telefoneResponsavel = document.getElementById('telefone').value

    console.log(nome);
    form.append("nomeResp", nome);
    form.append('tipoResponsavel', tipoResponsavel);
    form.append('carteiraIdentidade', carteiraIdentidade);
    form.append('telefone', telefoneResponsavel);
    form.append('foto', file);

    const url = 'http://localhost:8080/api/responsavel'
    const request = new Request(url, {
        method: 'POST',
        body: form
    });

    fetch(request)
        .then(response => response.text())
        .then(console.log)


    alert("Dados Cadastrados!")

}

