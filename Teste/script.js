function ler(){
    divStatus = document.getElementById("status");
    divStatus.innerHTML = "Carregando...";
    tabela = document.getElementById("tblProdutos");

    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            obj = JSON.parse(this.responseText);
            obj.forEach(prod => {
                if(document.getElementById("p" + prod.id) == null){
                    index = tabela.rows.length
                    row = tabela.insertRow(-1);
                    row.id = "p" + prod.id;
                    cellID = row.insertCell(0);
                    cellNOME = row.insertCell(1);
                    cellPRECO = row.insertCell(2);
                    cellEXCLUIR = row.insertCell(3);
                    cellID.innerHTML = prod.id;
                    cellNOME.innerHTML = prod.nome;
                    cellPRECO.innerHTML = prod.preco;
                    cellEXCLUIR.innerHTML = "<button onclick='excluir(" + prod.id +")'>Excluir</button>";
                }
            });
            divStatus.innerHTML = "";
        }

        if( this.readyState == 4 && this.status != 200){
            divStatus.innerHTML = this.responseText;
        }

    };
    xhttp.open("GET" , "http://localhost:8001/produtos/" + data.email, true);
    xhttp.send();

}

function add(){
    xhttp = new XMLHttpRequest();
    var txtNome = document.getElementById("txtNome");
    var txtPreco = document.getElementById("txtPreco");

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            ler();
            txtNome.value = "";
            txtPreco.value = "";
        }
    };
    
    xhttp.open("POST" , "http://localhost:8001/produtos", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var nome = txtNome.value;
    var preco = txtPreco.value;
    xhttp.send("nome=" + nome + "&preco=" + preco + "&email=" + data.email);
    window.alert('Produto Cadastrado com Sucesso!')
}

function excluir( idProd ){
    xhttp = new XMLHttpRequest();
  
    xhttp.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            ler();
        }
    };
    xhttp.open("DELETE" , "http://localhost:8001/produtos/" + idProd, true);
    xhttp.send();
    window.alert('Produto Deletado com sucesso, recarregue a página para ver a atualização da tabela!')

}

function handleCredentialResponse(response) {
    data = jwt_decode(response.credential)
    Texto.textContent = "Olá, " + data.name
    Texto.innerHTML += "<hr>"
    Texto.innerHTML += "<input type='text' name='nome' id='txtNome' placeholder='Nome'> <br>"
    Texto.innerHTML += "<input type='text' name='preco' id='txtPreco' placeholder='Preço'> <br>"
    Texto.innerHTML += "<input type='button' onclick='add()' id='BUTAO' value='Salvar'>"
    
    Texto.innerHTML += "<hr>"
    
    Texto.innerHTML += "<button id='btnAtualizar' onclick='ler()'>Atualizar</button>"
    Texto.innerHTML += "<div id='status'></div>"
    Texto.innerHTML +="<table border='1' id='tblProdutos'> <tr> <th>ID</th> <th>NOME</th> <th>PREÇO</th> </tr> </table>"
  }
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: "645387318029-3seove7dm5if08cvpgtri9cr5dj4qkl9.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
  google.accounts.id.renderButton(
    document.getElementById("divbotao"), {
    theme: "outline",
    size: "large",
    type: "standard",
    locale: "pt-BR"
  } 
  );
  }

