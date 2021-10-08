var url = "http://localhost:8080/api/turma/1"



    

    fetch(url)
        .then(response => response.json())
        .then(data => {

             console.log(data)

        
            document.getElementById('kkk').innerHTML = data.map(alunoTemplate).join(' ')
            

           

        }).catch(err => console.log(err))

   
    
    function alunoTemplate(aluno) {
        
        return `      
        
    
       <tr>
       <td>${aluno.nome}</td>
       <td>${aluno.carteira_identidade}</td>
       <td>${aluno.genero}</td>
       <td>${aluno.numero_turma}</td>
       </tr>
    
        
      

   `
    }




