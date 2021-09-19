var url = "http://localhost:8080/api/turmas"
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
console.log("valor de veridica:")
console.log(verifica)


if(verifica !== ""){
    console.log("chegei aqui")
         foto = document.getElementById('imagemCrianca').files[0];

}

}

idEscola =  sessionStorage.getItem('escola');

console.log(idEscola)

function cadastrarCrianca(fotoWebCam, uploadFoto ) {

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

