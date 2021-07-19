
function validar() {

const form = new FormData();
var nome = document.getElementById("name").value;
var senha = document.getElementById("pass").value;
 
form.append("nome", nome);
form.append("senha", senha);


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

    window.location.replace("../Buscar/index.html")


  }else{
    alert("Usuário ou Senha Inválidos")


  }


}














