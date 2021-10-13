var idEscola =  sessionStorage.getItem('escola');


var url = "http://localhost:8080/api/turmas/escola/"+idEscola
    fetch(url)
        .then(response => response.json())
        .then(data => {

            document.getElementById('turma').innerHTML = data.map(professorTemplate).join(' ')
        }).catch(err => console.log(err))

    function professorTemplate(turma) {
        return `  
        <option value="${turma.id}"> ${turma.numeroTurma}</option><br/>
   `
}
var foto;

function verifica(){

var verifica = document.getElementById("imagemCrianca").value

if(verifica !== ""){
    
         foto = document.getElementById('imagemCrianca').files[0];

}

}




        





function cadastrarCrianca(fotoWebCam, uploadFoto ) {
    var validação = true

    if(  document.getElementById('nomeCrianca').value == "" ){
    
      document.getElementById('nomeCrianca').setAttribute("class","input is-danger")
      validação = false
    }
    else{
        document.getElementById('nomeCrianca').setAttribute("class","input")
      }
      if(  document.getElementById('idadeCrianca').value == "" ){
    
        document.getElementById('idadeCrianca').setAttribute("class","input is-danger")
        validação = false
      }
      else{
          document.getElementById('idadeCrianca').setAttribute("class","input")
        }
        if(  document.getElementById('carteiraIdentidade').value == "" ){
    
            document.getElementById('carteiraIdentidade').setAttribute("class","input is-danger")
            validação = false
          }
          else{
              document.getElementById('carteiraIdentidade').setAttribute("class","input")
            }
            if(validação == true){
                document.getElementById("alerta").innerHTML = ""
            
        }else{
            document.getElementById("alerta").innerHTML = "* Preencher campos em vermelho"
          }











    console.log("fotoWebCam "+fotoWebCam);
    console.log("uploadFoto "+uploadFoto);


    if(fotoWebCam === true){
     //   console.log(testeImagem)
        data_uri = testeImagem
            const imagemWebcam = data_uri.slice(23,data_uri.length)
            foto = data_uri;
            const byteCharacters = atob(imagemWebcam);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
             foto = new Blob([byteArray], {type: 'image/jpeg'});
  
  
    }
    if(fotoWebCam === false){
        verifica()                
    }
    
    if (uploadFoto === true){
        console.log("valor é "+foto)
        
        
        var dateObj = new Date(document.getElementById('dataNascimento').value)
        var dataLocal = dateObj.toLocaleDateString('pt-BR', { timeZone: 'UTC' })  
        var turmas = document.getElementById('turma').value        
        var nome = document.getElementById('nomeCrianca').value
        var idade = document.getElementById('idadeCrianca').value
        var sexo = document.getElementById('sexoCrianca').value
        var carteiraIdentidade = document.getElementById('carteiraIdentidade').value

        console.log(turmas)
        
        const form = new FormData();
        form.append("nome", nome);
        form.append('idade', idade);
        form.append('genero', sexo);
        form.append('dataNascimento', dataLocal);
        form.append('carteiraIdentidade', carteiraIdentidade);
        form.append('foto', foto);
        form.append('turma',turmas)
        form.append('escola',idEscola)

        console.log(form)
        const url = 'http://localhost:8080/api/aluno'
        const request = new Request(url, {
            method: 'POST',
            body: form
        });

        fetch(request)
            .then(response => response.text())
            .then(console.log)
    }

}

