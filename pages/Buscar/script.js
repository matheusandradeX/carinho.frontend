var url = "http://localhost:8080/api/alunos"
const urlRemove = "http://localhost:8080/api/aluno/"
var listaAlunos
var nome = document.getElementById("campoBusca").value

let username = 'matheus';
let password = 'teste';

let headers = new Headers();

headers.append('Content-Type', 'text/json');
//headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

fetch(url, {
    method: 'GET',
    headers: headers,

})


function verificarLista() {

    var nome = document.getElementById("campoBusca").value
    if (nome == "") {
        console.log("Valor nulo")
        url = "http://localhost:8080/api/alunos"
    } else {
        url = "http://localhost:8080/api/alunos" + "/" + nome
    }

}



function remove(idAluno) {
    fetch(urlRemove + idAluno, { method: 'DELETE' }).then(() => {
        location.reload();
    }).catch(err => {
        console.error(err)
        alert(erro)
    });
}

function getAluno() {
    verificarLista();

    fetch(url)
        .then(response => response.json())
        .then(data => {

            listaAlunos = data
            console.log(typeof mapAluno);
            console.log(data);
            document.getElementById('titulo').innerHTML = `
         <h1 class="title is-2" style="text-align: center">Lista de Alunos (${data.content.length})</h1>
         <br>
         `
            document.getElementById('teste').innerHTML = data.content.map(alunoTemplate).join(' ')


        }).catch(err => console.log(err))

    function alunoTemplate(aluno) {
        return `		
       <div class="columns is-mobile is-centered">
       <div class="box">
         <div class="elementos">
            <div class="elemento">
            <div>
               <strong>Nome:</strong> ${aluno.nome}
               </div>
               <div>
               <strong>Idade:</strong> ${aluno.idade}
               </div>
               <div>
               <strong>Sexo:</strong> ${aluno.genero}
               </div>
               <div>
               <strong>Documento:</strong> ${aluno.carteiraIdentidade}
               </div>
            </div>
            <div class="elemento2">
               <img style='display:block; width:200px;height:200px;' src="data:image/png;base64, ${aluno.foto}" />
            </div>
         </div>
      <footer class="card-footer">
    
      <a href="../alterarAluno/index.html" class="card-footer-item" onclick="atualizarAluno(${aluno.id})">Editar</a>
      <a href="#" class="card-footer-item" onclick="remove(${aluno.id})">Deletar</a>
      <a href="../responsavel/index.html" class="card-footer-item"onclick="resp(${aluno.id})">Responsavel</a>
      </footer>
      </div>
  </div>

   `
    }
}



function resp(aluno) {

    var id = aluno
    console.log(aluno)
    sessionStorage.setItem('idAluno', id);

}


function atualizarAluno(aluno) {

    var idAluno = aluno


    var atualizarAluno = listaAlunos.filter(function(aluno) {
        return aluno.id == idAluno
    })
    console.log(atualizarAluno)
    var campoNome;
    var campoIdade;
    var campoSexo;
    var campoCI;



    var teste = atualizarAluno.map(preencherCampos).join('')


    function preencherCampos(campo) {
        return campoNome = campo.nome,
            campoIdade = campo.idade,
            campoSexo = campo.genero,
            campoCI = campo.carteiraIdentidade
    }

    sessionStorage.setItem('idAluno', idaluno);
    sessionStorage.setItem('nome', campoNome);
    sessionStorage.setItem('idade', campoIdade);
    sessionStorage.setItem('sexo', campoSexo);
    sessionStorage.setItem('CarteiraIdentidade', campoCI)

}

function postCrianca() {

    var nome = document.getElementById('nome_crianca').value

    var idade = document.getElementById('idade_crianca').value

    var sexo = document.getElementById('sexo_crianca').value

    var carteiraIdentidade = document.getElementById('carteira_identidade').value

    var post = { nome: nome, idade: idade, sexo: sexo, carteiraIdentidade: carteiraIdentidade }

    var json = JSON.stringify(post)

    const url = "http://localhost:8080/api/aluno"

    fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: json
    });

    document.getElementById('nome_crianca').value = ''

    document.getElementById('sexo_crianca').value = ''

    document.getElementById('carteira_identidade').value = ''


}

function responsavel(id) {

    var idResp = id

    sessionStorage.setItem('idResp', idResp);


}