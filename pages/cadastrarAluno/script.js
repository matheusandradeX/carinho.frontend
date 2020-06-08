function cadastrarCrianca(){

	const form = new FormData();
   
	
   
   var file = document.getElementById('imagemCrianca').files[0]
   var nome = document.getElementById('nomeCrianca').value
   var idade = document.getElementById('idadeCrianca').value
   var sexo = document.getElementById('sexoCrianca').value
   var carteiraIdentidade = document.getElementById('carteiraIdentidade').value
  
	  console.log(nome);
  
	 form.append("nome", nome);
	 form.append('idade',idade);
	  form.append('sexo', sexo);
	  form.append('carteiraIdentidade', carteiraIdentidade);
	  form.append('image',file);
	
	const url = 'http://localhost:8080/api'
	const request = new Request(url, {
	  method: 'POST',
	  body: form
	});
  
	fetch(request)
	  .then(response => response.text())
	  .then(console.log)
  
  
  
  

  
		   }
  
   