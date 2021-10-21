var id = sessionStorage.getItem('idAluno')
var url = "http://localhost:8080/api/responsavel/" + id
var urlRemove = "http://localhost:8080/api/responsavel/"
var escolaId = parseInt( sessionStorage.getItem('escola'))

console.log(url)
fetch(url)
    .then(response => response.json())
    .then(data => {
        listaresponsavels = data

        console.log(data)
        document.getElementById('responsavel').innerHTML = data.map(responsavelTemplate).join(' ')


    }).catch(err => console.log(err))

function responsavelTemplate(responsavel) {
    return `		
       <div class="columns is-mobile is-centered">
       <div class="box">
         <div class="elementos">
            <div class="elemento">
            <div>
               <strong>Nome:</strong> ${responsavel.nome_resp}
               </div>
               <div>
               <strong>Carteira de Identidade:</strong> ${responsavel.carteira_identidade}
               </div>
               <div>
               <strong>Tipo de Responsavel:</strong> ${responsavel.tipo_responsavel}
               </div>
               <div>
               <strong>Telefone 1:</strong> ${responsavel.telefone}
               </div>
               
            </div>
            <div class="elemento2">
               <img style='display:block; width:200px;height:200px;' src="data:image/png;base64, ${responsavel.foto}" />
            </div>
         </div>
      <footer class="card-footer">
    
      <a href="../alterarResponsavel/index.html" class="card-footer-item" onclick="atulizarResponsavel(${responsavel.id})">Editar</a>
      <a href="#" class="card-footer-item" onclick="remove(${responsavel.id})">Deletar</a>
      </footer>
      </div>
  </div>

   `

  
   




}
function atulizarResponsavel(idResponsavel){
   sessionStorage.setItem('idResponsavel', idResponsavel);
   alert("entrei aqui")

}



function remove(idResponsavel) {

   if(confirm("Realmente deseja deletar o responsavel?")){
   fetch(urlRemove + idResponsavel+"/idEscola/"+escolaId, { method: 'DELETE' }).then(() => {
       location.reload();
   }).catch(err => {
       console.error(err)
       alert(erro)
   });}
}