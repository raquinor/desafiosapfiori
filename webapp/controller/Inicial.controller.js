sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("googleimagens.controller.Inicial", {
            onInit: function () { 
                //Colchetes indicam que a variável é do tipo Tabela Interna no ABAP
                //Vamos fazer um "Table type" dentro de uma estrutura do ABAP
                let ImageList = {
                    Imagens : [
                        //Vai ser a estrutura da API. Não vamos usar todas as propriedades. Só as mais importantes.
                        //Aqui já estamos carregando 2 objetos de maneira fixa.
                        {
                            url : "https://oceanconservancy.org/wp-content/uploads/2019/07/Coca-cola.png",
                            thumbnail : "https://rapidapi.usearch.com/api/thumbnail/get?value=612045600173454308",
                            title : "Coca-Cola - Ocean Conservancy",
                            provider : {
                                name : "oceanconservancy"
                            }
                        },
                        {
                            url : "https://useinsider.com/assets/media/2021/02/cocacola-thumb.png",
                            thumbnail : "https://rapidapi.usearch.com/api/thumbnail/get?value=8561957372726826947",
                            title : "Coca-Cola sees a 19% conversion rate uplift with onsite engagement actions Success Story - Insider",
                            provider : {
                                name : "useinsider"
                            }
                        }
                    ]
                };

                //Criação da variável tipo "Modelo" para exibir os dados na tela
                var ImageModel = new JSONModel(ImageList);
                //Instancia a tela
                let view = this.getView();
                //Faz o Data Binding entre a tela e o Modelo
                view.setModel(ImageModel, "ModeloImagem");

            },
            onPressBuscar: function() {
                //Instancia objeto input na variável
                let inputBusca = this.byId("inpBusca");
                //Coleta o valor digitado no input
                //Variável do termo de busca (query)
                let query = inputBusca.getValue();
                //Exibe na tela
                //alert(query);

                //Aqui vamos codificar a chamada a uma API de pesquisa na Net  
                //Aqui vamos colar o código copiado da API 
                const settings = {
                    "async": true,
                    "crossDomain": true,
                    //Concatenate. Aqui colocamos a variável do termo de busca (query)
                    "url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q="
                    + query
                    //Aqui tem outros parâmetros que também poderíamos substituir por outras variáveis.
                    //&pageSize=10 ==> 10 elementos na página.
                    + "&pageNumber=1&pageSize=10&autoCorrect=true",
                    "method": "GET",
                    "headers": {
                        "X-RapidAPI-Key": "03ca2ead64msh215f12a43ed3e4cp186edcjsn3f28ff401464",
                        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                    }
                };
                //ajax ==> Comando para fazer a comunicação cliente/servidor. Comunicação com o BackEnd.
                //Parêntesis serve para passar parâmetros
                //CallBack: uma função execitada no final de outra função
                $.ajax(settings).done(function (response) {
                    console.log(response);

                    //Carregar tudo (imagens, textos e etc) que veio da API para a tela.

                    //Instanciar o Modelo - O "this" é o Controller
                    let oImageModel = this.getView().getModel("ModeloImagem");
                    //Obter os dados do "Modelo" para poder alterar. Os dados já inicializados de forma fixa (2)
                    let oDadosImage = oImageModel.getData();

                    //Clear na tabela interna = array
                    //Limpa o que está sendo carregado de forma fixa (2).
                    oDadosImage.Imagens = [];

                    //Obtém os Dados da API ==> listaResultados
                    let listaResultados = response.value;
                    //Estrutura da nova lista
                    let newItem;

                    //Vamos ao loop
                    //loop que adiciona dados de uma tabela (listaResultados) em outra tabela (oDadosImage)
                    // listaResultados (Dados da API) ==> oDadosImage (Tabela da tela)
                    for (var i = 0; i < listaResultados.length; i++)
                    {
                        //Read Table pelo índice
                        newItem = listaResultados[i];
                        //Append dos dados na nova tabela
                        oDadosImage.Imagens.push(newItem);
                    }
                    //Atualizar a tela para que os novos dados da API apareçam.
                    oImageModel.refresh();

                 //Fazer essa função local reconhecer as variáveis da função superior a esta.
                }.bind(this)
                );

            }
        });
    });
