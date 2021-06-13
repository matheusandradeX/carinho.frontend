function cadastrarCrianca() {
const url = "http://localhost:8080/api/aluno"
 
  var file = document.getElementById('imagemCrianca').files[0]
  var nome = document.getElementById('nomeCrianca').value
  var idade = document.getElementById('idadeCrianca').value
  var sexo = document.getElementById('sexoCrianca').value
  var carteiraIdentidade = document.getElementById('carteiraIdentidade').value


  const form = new FormData();
  
  form.append('nome',nome);
  form.append('idade',idade);
  form.append('foto',file);
  form.append('sexo',sexo);
  form.append('sexo',sexo);
  form.append('carteiraIdentidade',carteiraIdentidade);
  
  fetch(url, {
     method: "POST",
   
     body: form
  });
  
  alert("executou");
  
}