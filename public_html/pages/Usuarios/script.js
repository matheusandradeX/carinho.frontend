

function cadastrar() {

    const form = new FormData();

    var nome = document.getElementById('nome').value
    var perfil = document.getElementById('perfil').value
    var usuario = document.getElementById('usuario').value
    var senha = document.getElementById('senha').value
    var senha2 = document.getElementById('senha2').value
    var email = document.getElementById('email').value
    var carteiraIdentidade = document.getElementById('carteira_identidade').value
    var cpf = document.getElementById('cpf').value


  var validação = true

    if( document.getElementById('nome').value == "" ){

      document.getElementById('nome').setAttribute("class","input is-danger")
      validação = false
    }else{
      document.getElementById('nome').setAttribute("class","input")
    }
    if( document.getElementById('perfil').value == "" ){

      document.getElementById('perfil').setAttribute("class","input is-danger")
      validação = false
    }else{
      document.getElementById('perfil').setAttribute("class","input")
    }
    if( document.getElementById('usuario').value == "" ){

      document.getElementById('usuario').setAttribute("class","input is-danger")
      validação = false
    }else{
      document.getElementById('usuario').setAttribute("class","input")
    }

    if( document.getElementById('senha').value == "" ){

      document.getElementById('senha').setAttribute("class","input is-danger")
      validação = false
    }else{
      document.getElementById('senha').setAttribute("class","input")
    }

    if( document.getElementById('senha2').value == "" ){

      document.getElementById('senha2').setAttribute("class","input is-danger")
      validação = false
    }else{
      document.getElementById('senha2').setAttribute("class","input")
    }

    if( document.getElementById('email').value == "" ){
      document.getElementById('email').setAttribute("class","input is-danger")
      validação = false
    }else{
      document.getElementById('email').setAttribute("class","input")
    }

    if( document.getElementById('carteira_identidade').value == "" ){
      document.getElementById('carteira_identidade').setAttribute("class","input is-danger")
      validação = false
    }else{
      document.getElementById('carteira_identidade').setAttribute("class","input")
    }

    if( document.getElementById('cpf').value == "" ){
      document.getElementById('cpf').setAttribute("class","input is-danger")
      validação = false
    }else{
      document.getElementById('cpf').setAttribute("class","input")
    }

    
  
    
    if(validação == true){
      document.getElementById("alerta").innerHTML = ""
      console.log("entrei aqui")
    if(senha === senha2 && senha !== undefined && senha2 !== undefined && senha !== "" && senha2 !== ""){
 
   form.append("nome", nome);
   form.append('perfil', perfil);
    form.append('usuario',usuario);
    form.append('senha', senha);
    form.append('email', email);
    form.append('cpf', cpf);
    form.append('carteiraIdentidade', carteiraIdentidade);
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
    }else{
        alert("As senhas não são iguais ou não foram preenchidas")
    }


  }else{
    document.getElementById("alerta").innerHTML = "* Preencher campos em vermelho"
  }
}

function setMask(inputCpf)
{
  var cpf = inputCpf;

  setTimeout("aplicar()",250);
}  

function aplicar()
{
  cpf.value = mask(cpf.value);  
}

function mask(cpf)
{
  cpf = cpf.replace(/\D/g, "");    
  cpf = cpf.replace(/^(\d{3})/g, "$1.");
  cpf = cpf.replace(/(\d{3})(\d{3})/g, "$1.$2-");        
  return cpf;
}