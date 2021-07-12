

var fotoNova;






function cadastrarCrianca(x) {
    fotoNova = x;

    if(fotoNova !== null){
        alert("gravou dados da foto")
    }
    const form = new FormData();

    var tes2 = document.getElementById('dataNascimento').value
    var dateObj = new Date(document.getElementById('dataNascimento').value)
    var dataLocal = dateObj.toLocaleDateString('pt-BR', { timeZone: 'UTC' })


    
var file = document.getElementById('imagemCrianca').files[0];
  
   // var file = document.getElementById('pegarfoto').files[0];
     
    /*
    if( document.getElementById('imagemCrianca').files[0]==null || document.getElementById('imagemCrianca').files[0]!==null=='undefined'){
        var file = document.getElementById('pegarfoto').files[0];
        alert("ENTROU AQUI")
    }else{

      

        var file = document.getElementById('imagemCrianca').files[0];
        alert("NÃO E PRA ENTRAR")
    }
    
    */






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
    window.location.replace("../cadastrarResponsavel/index.html")

}


