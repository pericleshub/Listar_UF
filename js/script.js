// var url = "municipios"
// fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/BA/" + url).then(API1 =>{
//     return API1.json()
// }).then(API2 =>{
//     document.getElementById("saida").innerHTML = API2.id
//     console.log(API2)
// })

let uf
let campo = document.querySelector("input");
let but = document.querySelector("button");
let refresh = 0

but.onclick = function(){

    refresh++;
    if(refresh > 1){
        document.location.reload(true);
    }else

    uf = campo.value

    function getAPI(api){
        let request = new XMLHttpRequest()
        request.open("GET", api, false)
        request.send()
        return request.responseText
    }

    function linhaTabela(municipios){
        console.log(municipios)
        linha = document.createElement("tr")
        tdId = document.createElement("td")
        tdNome = document.createElement("td")
        tdUF = document.createElement("td")
        tdRG = document.createElement("td")

        tdId.innerHTML = municipios.id
        tdNome.innerHTML = municipios.nome
        tdUF.innerHTML = municipios.microrregiao.mesorregiao.UF.nome
        tdRG.innerHTML = municipios.microrregiao.mesorregiao.UF.regiao.nome

        linha.appendChild(tdId)
        linha.appendChild(tdNome)
        linha.appendChild(tdUF)
        linha.appendChild(tdRG)

        return linha
    }
    
    function main(){
        getJSON = getAPI("https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + uf +"/municipios")
        let municipios = JSON.parse(getJSON)
        let tabela = document.getElementById("tabela")

        municipios.forEach(element => {
            let linha = linhaTabela(element)
            
            tabela.append(linha)
            
        });

    }

    document.querySelector("button").innerHTML = "Atualizar Página";

    main()
    
}