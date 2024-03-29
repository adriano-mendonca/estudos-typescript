import Estatisticas from "./Estatisticas.js";
import { CountList } from "./countBy.js";
import fetchData from "./fetchData.js";
import normalizarTransacao from "./normalizarTransacao.js";

async function handleData() {
  const data = await fetchData<TransacaoAPI[]>(
    "https://api.origamid.dev/json/transacoes.json?"
  );

  if (!data) return;
  const transacoes = data.map(normalizarTransacao);
  preencherTabela(transacoes);
  preencherStats(transacoes);
}

function preencherLista(lista: CountList, containerId: string): void {
  const containerElement = document.getElementById(containerId);
  if (containerElement) {
    Object.keys(lista).forEach((key) => {
      containerElement.innerHTML += `<p>${key}: ${lista[key]}</p>`;
    });
  }
}

function preencherStats(transacoes: Transacao[]): void {
  const data = new Estatisticas(transacoes);

  preencherLista(data.pagamento, "pagamento");
  preencherLista(data.status, "status");

  const totalElemento = document.querySelector<HTMLElement>("#total span");
  if (totalElemento) {
    totalElemento.innerText = data.total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const diaElemento = document.querySelector<HTMLElement>("#dia span");
  if (diaElemento) {
    diaElemento.innerText = data.melhorDia[0];
  }
}
function preencherTabela(transacoes: Transacao[]): void {
  const tabela = document.querySelector("#transacoes tbody");
  if (!tabela) return;
  transacoes.forEach((transacao) => {
    tabela.innerHTML += `
      <tr>
        <td>${transacao.nome}</td>
        <td>${transacao.email}</td>
        <td>R$ ${transacao.moeda}</td>
        <td>${transacao.pagamento}</td>
        <td>${transacao.status}</td>
      </tr>`;
  });
}

handleData();
