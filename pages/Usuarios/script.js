

function cadastrar() {

    const form = new FormData();

  
    var nome = document.getElementById('nome').value
    var perfil = document.getElementById('perfil').value
    var usuario = document.getElementById('usuario').value
    var senha = document.getElementById('senha').value
    var email = document.getElementById('email').value


    console.log(nome);
   form.append("nome", nome);
   form.append('perfil', perfil);
    form.append('usuario',usuario);
    form.append('senha', senha);
    form.append('email', email);

    const url = 'http://localhost:8080/api/cadastrarPerfil'
    const request = new Request(url, {
        method: 'POST',
        body: form
    });

    fetch(request)
        .then(response => response.text())
        .then(console.log)
        .then((response) => {
    

            alert("Perfil Criado")
            
        })


    






   
}

