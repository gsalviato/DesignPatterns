// Exemplo de Código Cliente com o Padrão Observer

interface ObservadorEstoque {
  atualizarFaltaDeEstoque(nomeProduto: string): void;
}

interface GerenciadorNotificacoes {
  inscrever(observador: ObservadorEstoque): void;
  removerInscricao(observador: ObservadorEstoque): void;
  notificarObservadores(nomeProduto: string): void;
}

// Gerenciar o estoque e avisar quem estiver inscrito.

class ControleDeEstoque implements GerenciadorNotificacoes {
  private inscritos: ObservadorEstoque[] = [];
  private quantidadeEmEstoque: Map<string, number> = new Map();

  // Gerenciamento de inscritos (Observer)
  inscrever(observador: ObservadorEstoque): void {
    const jaInscrito = this.inscritos.includes(observador);
    if (!jaInscrito) {
      this.inscritos.push(observador);
    }
  }

  removerInscricao(observador: ObservadorEstoque): void {
    const indice = this.inscritos.indexOf(observador);
    if (indice !== -1) {
      this.inscritos.splice(indice, 1);
    }
  }

  notificarObservadores(nomeProduto: string): void {
    console.log(`\n[Sistema] Notificando departamentos sobre a falta de: ${nomeProduto}...`);
    for (const inscrito of this.inscritos) {
      inscrito.atualizarFaltaDeEstoque(nomeProduto);
    }
  }

  registrarVenda(nomeProduto: string, quantidadeVendida: number): void {
    const quantidadeAtual = this.quantidadeEmEstoque.get(nomeProduto) || 0;
    const novaQuantidade = quantidadeAtual - quantidadeVendida;

    this.quantidadeEmEstoque.set(nomeProduto, novaQuantidade);
    console.log(`Venda realizada: ${quantidadeVendida}x ${nomeProduto}. Restam: ${novaQuantidade}`);

    if (novaQuantidade <= 0) {
      this.notificarObservadores(nomeProduto);
    }
  }

  adicionarProduto(nomeProduto: string, quantidade: number): void {
    this.quantidadeEmEstoque.set(nomeProduto, quantidade);
  }
}

class DepartamentoDeCompras implements ObservadorEstoque {
  atualizarFaltaDeEstoque(nomeProduto: string): void {
    console.log(` -> [Compras] Alerta recebido! Iniciando cotação com fornecedores para comprar mais '${nomeProduto}'.`);
  }
}

class DepartamentoDeVendas implements ObservadorEstoque {
  atualizarFaltaDeEstoque(nomeProduto: string): void {
    console.log(` -> [Vendas] Alerta recebido! Pausando anúncios e removendo '${nomeProduto}' da vitrine do site.`);
  }
}
const estoque = new ControleDeEstoque();
estoque.adicionarProduto("Monitor Ultrawide", 2);


const compras = new DepartamentoDeCompras();
const vendas = new DepartamentoDeVendas();

estoque.inscrever(compras);
estoque.inscrever(vendas);

console.log("--- Dia de Trabalho Iniciado ---");
estoque.registrarVenda("Monitor Ultrawide", 1);
estoque.registrarVenda("Monitor Ultrawide", 1); 

// -----------------------
// Exemplo sem utilizar o padrão Observer
// Alto acoplamento e quebra de SRP/OCP
class ControleDeEstoqueSujo {
  
  private setorCompras = new DepartamentoDeCompras();
  private setorVendas = new DepartamentoDeVendas();
  private quantidade: number = 2;

  registrarVenda(produto: string): void {
    this.quantidade -= 1;
    
    if (this.quantidade <= 0) {
      this.setorCompras.atualizarFaltaDeEstoque(produto);
      this.setorVendas.atualizarFaltaDeEstoque(produto);
    }
  }
}