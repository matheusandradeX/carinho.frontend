
url = 'http://localhost:8080/api/responsavel'

var foto;
var escolaId = parseInt( sessionStorage.getItem('escola'))
var responsavelId = sessionStorage.getItem('idResponsavel')
function verifica(){
var verifica = document.getElementById("imagemResponsavel").value
if(verifica !== ""){
foto = document.getElementById('imagemResponsavel').files[0];
}

}


 function alterarResponsavel(fotoWebCam, uploadFoto) {
  var validação = true

  if(  document.getElementById('nome_responsavel').value == "" ){
  
    document.getElementById('nome_responsavel').setAttribute("class","input is-danger")
    validação = false
  }
  else{
      document.getElementById('nome_responsavel').setAttribute("class","input")
    }
    if(  document.getElementById('documento_responsavel').value == "" ){
  
      document.getElementById('documento_responsavel').setAttribute("class","input is-danger")
      validação = false
    }
    else{
        document.getElementById('documento_responsavel').setAttribute("class","input")
      }
      if(  document.getElementById('telefone').value == "" ){
  
          document.getElementById('telefone').setAttribute("class","input is-danger")
          validação = false
        }
        else{
            document.getElementById('telefone').setAttribute("class","input")
          }
          if(validação == true){
              document.getElementById("alerta").innerHTML = ""
          
      }else{
          document.getElementById("alerta").innerHTML = "* Preencher campos em vermelho"
        }
 
  if(fotoWebCam === true){
      data_uri = testeImagem
      console.log(testeImagem)
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
 
 var nome = document.getElementById('nome_responsavel').value
 var tipoResponsavel = document.getElementById('tipo').value
 var carteiraIdentidade = document.getElementById('documento_responsavel').value
 var telefone = document.getElementById('telefone').value     
 
 console.log(nome)
 console.log(tipoResponsavel)
 console.log(carteiraIdentidade)
 console.log(telefone)
console.log(responsavelId)

    const form = new FormData();
    form.append("nomeResp", nome);
    form.append('tipoResponsavel', tipoResponsavel);
    form.append('carteiraIdentidade', carteiraIdentidade);
    form.append('telefone', telefone);
    form.append('foto', foto);
    form.append('idEscola', 1);
    form.append('idResponsavel', responsavelId);



 fetch(url, {
    method: "PUT",
    body: form
 }); 
   }
  }