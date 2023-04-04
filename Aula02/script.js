function validar(){
    var valor = document.getElementById("txtValor").value;
    var pInfo = document.getElementById("info");
    if(valor == ""){
        pInfo.innerHTML = "O campo valor deve ser preenchido!"
        return false;
    } else{      
        if (isNaN(valor)){
            pInfo.innerHTML = "O valor deve ser número!"
            return false;
        } else {
            if (valor > 0 && valor < 11){
                return true;
            } else {
                pInfo.innerHTML = "Valor não é permitido!"
                return false;
            }
        } 
    }
}

function lerObjeto(){
    var carro = {modelo : "Doblo", ano : 2006};
    var pessoa = {
        nome : "Maria",
        idade : 25,
        altura : 1.8,
        temFilhos : true,
        endereco : null, 
        veiculo : carro, 
        filhos : [
            {nome : "João", idade : 12}, 
            {nome: "Julia", idade : 10}
        ],
        formacao : [2006, 2013, 2017],
        imprimir : function(){
            texto = this.nome + " - Idade: " + this.idade + " - Carro: " + this.veiculo.modelo;
            return texto;            
        }
    }
    divObjeto = document.getElementById("divObjeto"); 
    divObjeto.innerHTML = pessoa.imprimir();
}


function calcular(){
    var retangulo = {
        altura : document.getElementById("Altura").value,
        largura : document.getElementById("Largura").value,
        print : function(){
            texto = this.altura * this.largura;
            return texto;
        }
    }
    divRetangulo = document.getElementById("divRetangulo");
    divRetangulo.innerHTML = "<br> Tamanho do retângulo: " + retangulo.print(); 
}


// função do professor 
//  function calcularr(){
//      var retangulo = {
//          largura : document.getElementById("txtLargura").value, 
//          altura : document.getElementById("txtAltura").value, 
//          calcularArea : function (){
//              return this.largura * this.altura;
//          }
//      };
//      var pResultado = document.getElementById("pResultado");
//      pResultado.innerHTML = "Área: " + retangulo.calcularArea();
//  }
