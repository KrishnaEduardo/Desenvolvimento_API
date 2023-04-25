function gerarObjeto(){
    var pessoa = {
        nome : "Skan",
        idade : 19,
        altura : 1.45,
        aluno : true,
        formaturas : [ 2006, 2013, 2017 ],
        cursos : ["Técnico", "Graduação", "Mestrado"],
        cnh : {numero : "123456", categoria : "B"}, 
        filhos : [
            {nome : "Shen", idade : 8},
            {nome : "Akali", idade : 9}
        ],
        endereco : null  
    }
    $("#dadosJSON").html(JSON.stringify(pessoa))
}

function lerJSON(){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 & this.status == 200){
            var pessoa = JSON.parse(this.responseText)
            texto = "Nome: " + pessoa.nome + "<br>";
            texto += "Idade: " + pessoa.idade + "<br>";
            texto += "Categoria: " + pessoa.cnh.categoria + "<br>";
            texto += "Filhos: <br>";
            pessoa.filhos.forEach( filho =>{
                texto += "Nome: " + filho.nome + " Idade: " + filho.idade + "<br>";
            });
            $("#resposta").html(texto);
        }
    }

    xhttp.open("GET", "meuJson.json", true); 
    xhttp.send(); 
}