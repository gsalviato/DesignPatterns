// Aplicando SOLID e Clean Code e Design Patterns (Strategy)
interface EstrategiaPagamento {
  processarPagamento(valor: number): void;
}

class PagamentoPix implements EstrategiaPagamento {
  private descontoPix: number = 0.05;

  processarPagamento(valor: number): void {
    const valorComDesconto = valor - (valor * this.descontoPix);
    console.log(`[PIX] Gerando QR Code para o valor de R$ ${valorComDesconto.toFixed(2)}...`);
  }
}

class PagamentoCartaoCredito implements EstrategiaPagamento {
  private taxaCartao: number = 2.50; 

  processarPagamento(valor: number): void {
    const valorComTaxa = valor + this.taxaCartao;
    console.log(`[CARTÃO] Autorizando cobrança de R$ ${valorComTaxa.toFixed(2)} na operadora...`);
  }
}

class CarrinhoDeCompras {
  private valorTotal: number = 0;

  adicionarItem(nome: string, preco: number): void {
    this.valorTotal += preco;
    console.log(`Item '${nome}' adicionado. Subtotal: R$ ${this.valorTotal.toFixed(2)}`);
  }

  finalizarCompra(estrategiaPagamento: EstrategiaPagamento): void {
    if (this.valorTotal === 0) {
      console.log("Erro: O carrinho está vazio.");
      return; 
    }

    console.log("\n--- Iniciando Checkout ---");
    estrategiaPagamento.processarPagamento(this.valorTotal);
    this.valorTotal = 0; // Limpa o carrinho
    console.log("--- Compra Finalizada com Sucesso ---\n");
  }
}

const carrinho = new CarrinhoDeCompras();
carrinho.adicionarItem("Teclado Mecânico", 200.00);

const pagamentoViaPix = new PagamentoPix();
carrinho.finalizarCompra(pagamentoViaPix); 

//Fazendo outra compra com outra forma de pagamento

carrinho.adicionarItem("Mouse Sem Fio", 100.00);
const pagamentoViaCartao = new PagamentoCartaoCredito();
carrinho.finalizarCompra(pagamentoViaCartao);

// ----------- 
// Exemplo de Código sujo, sem aplicar os princípios SOLID e sem usar o padrão Strategy. O código fica acoplado, difícil de manter e de estender para novos métodos de pagamento.

class CarrinhoSujo {
  private valorTotal: number = 0;

  adicionarItem(nome: string, preco: number): void {
    this.valorTotal += preco;
  }

  finalizarCompra(tipoPagamento: string): void {
    if (this.valorTotal > 0) { 
      console.log("\n--- Iniciando Checkout ---");
      
      if (tipoPagamento === "PIX") {
        const valorFinal = this.valorTotal - (this.valorTotal * 0.05); 
        console.log(`[PIX] Cobrando R$ ${valorFinal}`);
      
      } else if (tipoPagamento === "CARTAO") {
        const valorFinal = this.valorTotal + 2.50;
        console.log(`[CARTÃO] Cobrando R$ ${valorFinal}`);
      
      } else {
        console.log("Método inválido!");
      }
      
      this.valorTotal = 0;
      console.log("--- Compra Finalizada ---");
    } else {
      console.log("Erro: carrinho vazio.");
    }
  }
}