
 function putAluno() {

 var id = sessionStorage.getItem('idAluno')
 const url = "http://localhost:8080/api/aluno"
 
 var file = document.getElementById('imagem_crianca').files[0]
 var nome = document.getElementById('nome_crianca').value
 var idade = document.getElementById('idade_crianca').value
 var sexo = document.getElementById('sexo_crianca').value
 var carteiraIdentidade = document.getElementById('documento_crianca').value


 const form = new FormData();
 form.append('id',id);
 form.append('nome',nome);
 form.append('idade',idade);
 form.append('foto',file);
 form.append('genero',sexo);
 form.append('carteiraIdentidade',carteiraIdentidade);
 
 fetch(url, {
    method: "PUT",
  
    body: form
 });
 
   











     alert("deu certo");
  
   }