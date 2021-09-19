var perfil = sessionStorage.getItem('perfil');
switch(perfil) {
  case 'ADMINISTRADOR':
      document.getElementById('barra').innerHTML = barraAdministrador()
    break;
  case 'PROFESSOR':
    document.getElementById('barra').innerHTML = barraProfessor()
    break;
  default:
      document.getElementById('barra').innerHTML="  "
}



function barraAdministrador(){
  return `
  <nav class="navbar is-light">
        <div class="navbar-brand">
            <a class="navbar-item">
                <img src="../../img/carinho-logo.png" width="112" height="28">
            </a>
            <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div id="navbarExampleTransparentExample" class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item" href="../Buscar/index.html">
          Buscar
        </a>
                <a class="navbar-item" href="../frequencia/index.html">
                        Controle
                      </a>
                      <a class="navbar-item" href="../turmas2/index.html">
                        Turmas
                      </a>
                     
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
            Cadastrar
          </a>
                    <div class="navbar-dropdown is-boxed">
                        <a class="navbar-item" href="../cadastrarAluno/index.html">
              Aluno
            </a>
            <a class="navbar-item" href="../cadastrarResponsavel/index.html">
  Responsavel
</a>
                        <a class="navbar-item" href="../turmas/index.html">
              Turmas
            </a>
            <a class="navbar-item" href="../AlunoResponsavel/index.html">
            Vincular Dados
          </a>
                    </div>

                </div>
                <a class="navbar-item" href="../Usuarios/index.html">
                Usuários
              </a>
                <a class="navbar-item" href="../../index.html">
                    Sair
                  </a>
            </div>
        </div>
        <div class="navbar-dropdown is-boxed">
                        <a class="navbar-item" href="../AlunoResponsavel/index.html">
              Vincular
            </a>
    </nav> 
  `
}


function barraProfessor(){
  return `
  <nav class="navbar is-light">
        <div class="navbar-brand">
            <a class="navbar-item">
                <img src="../../img/carinho-logo.png" width="112" height="28">
            </a>
            <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div id="navbarExampleTransparentExample" class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item" href="../Buscar/index.html">
          Buscar
        </a>
                <a class="navbar-item" href="../frequencia/index.html">
                        Controle
                      </a>
                      <a class="navbar-item" href="../turmas2/index.html">
                        Turmas
                      </a>
                     
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
            Cadastrar
          </a>
                    <div class="navbar-dropdown is-boxed">
                        <a class="navbar-item" href="../cadastrarAluno/index.html">
              Aluno
            </a>
            <a class="navbar-item" href="../cadastrarResponsavel/index.html">
  Responsavel
</a>
                        <a class="navbar-item" href="../turmas/index.html">
              Turmas
            </a>
            <a class="navbar-item" href="../AlunoResponsavel/index.html">
            Vincular Dados
          </a>
                    </div>

               
                <a class="navbar-item" href="../../index.html">
                    Sair
                  </a>
            </div>
        </div>
        <div class="navbar-dropdown is-boxed">
                        <a class="navbar-item" href="../AlunoResponsavel/index.html">
              Vincular
            </a>
    </nav> 
  `
}







