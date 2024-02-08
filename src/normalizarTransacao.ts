import moedaParaNumero from "./moedaParaNumero.js";

declare global {
  type TransacaoPagamento = "Boleto" | "Cartão de Crédito";
  type TransacaoStatus =
    | "Paga"
    | "Recusada pela operadora de cartão"
    | "Aguardando pagamento"
    | "Estornada";

  interface TransacaoAPI {
    Status: TransacaoStatus;
    ID: number;
    Data: string;
    Nome: string;
    ["Forma de Pagamento"]: TransacaoPagamento;
    Email: string;
    ["Valor (R$)"]: string;
    ["Cliente Novo"]: number;
  }

  interface Transacao {
    status: TransacaoStatus;
    id: number;
    data: string;
    nome: string;
    pagamento: TransacaoPagamento;
    email: string;
    moeda: string;
    valor: number | null;
    novo: boolean;
  }
}

export default function normalizarTransacao(transacao: TransacaoAPI) {
  return {
    status: transacao.Status,
    id: transacao.ID,
    data: transacao.Data,
    nome: transacao.Nome,
    pagamento: transacao["Forma de Pagamento"],
    email: transacao.Email,
    moeda: transacao["Valor (R$)"],
    valor: moedaParaNumero(transacao["Valor (R$)"]),
    novo: Boolean(transacao["Cliente Novo"]),
  };
}
