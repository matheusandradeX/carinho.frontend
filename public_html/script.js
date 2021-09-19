

function validar() {
var nome = document.getElementById("name").value;
var senha = document.getElementById("pass").value;
var idEscola = document.getElementById("dados").value;
    const form = new FormData();

     
    form.append("nome", nome);
    form.append("senha", senha);
    form.append("idEscola",idEscola)
    
    const url = 'http://localhost:8080/api/login'
    const request = new Request(url, {
        method: 'POST',
        body: form
    });
    
    fetch(request).then(response => response.text())
    .then((response) => {
        teste(response);   
    })
    .catch(err => console.log(err))
    }
    
    function teste(variavel){
      if (variavel.length !== 0)  {
        const obj = JSON.parse(variavel);
        console.log(obj.perfil);
        sessionStorage.setItem('perfil', obj.perfil);
        sessionStorage.setItem('escola',document.getElementById("dados").value);
        window.location.replace("pages/Buscar/index.html")
      }else{
        alert("Usuário ou Senha Inválidos")
      }
    }

    var url = "http://localhost:8080/api/escolas"
    fetch(url)
        .then(response => response.json())
        .then(data => {

            document.getElementById('dados').innerHTML = data.map(professorTemplate).join(' ')
        }).catch(err => console.log(err))

    function professorTemplate(escola) {
        return `  
        <option value="${escola.id}"> ${escola.nome}</option><br/>
   `
}
    
    
    
    