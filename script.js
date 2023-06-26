"use strict";
function preencherDados(dados) {
    document.body.innerHTML = `
    <div>
      <h2>${dados.nome}</h2>
      <p>R$ ${dados.preco}</p>
      <p>Inclui teclado: ${dados.teclado ? "sim" : "não"}
    </div>`;
}
preencherDados({
    nome: "Computador",
    preco: 2345,
    teclado: true,
});
