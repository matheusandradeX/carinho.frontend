var url = "http://localhost:8080/api/alunos"



    

    fetch(url)
        .then(response => response.json())
        .then(data => {

             console.log(data)

        
            document.getElementById('nome').innerHTML = data.map(alunoTemplate).join(' ')


        }).catch(err => console.log(err))

   /*     
    function alunoTemplate(aluno) {
        return `
        function drawTable() {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Name');
            data.addColumn('number', 'Salary');
            data.addColumn('boolean', 'Full Time Employee');
            data.addRows([
              ['${aluno.nome}',  {v: 10000, f: '$10,000'}, true],
            
            ]);
    
            var table = new google.visualization.Table(document.getElementById('table_div'));
    
            table.draw(data, {showRowNumber: true, width: '60%', height: '100%'});
          }

   `

    }
*/
    
    function alunoTemplate(aluno) {
        
        return `
        
        ${aluno.nome}
        
      

   `
    }