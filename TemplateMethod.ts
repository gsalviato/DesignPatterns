// Criar a classe abstrata que define o Template Method 
abstract class ProcessadorDados {

  public processarArquivo(caminhoArquivo: string): void {
    const dadosBrutos = this.lerArquivo(caminhoArquivo);
    const dadosExtraidos = this.extrairDados(dadosBrutos);
    this.salvarNoBanco(dadosExtraidos);
    console.log("--- Processamento finalizado ---\n");
  }

  protected lerArquivo(caminhoArquivo: string): string {
    console.log(`Abrindo e lendo o arquivo: ${caminhoArquivo}`);
    return "texto_bruto_do_arquivo";
  }

  protected abstract extrairDados(dadosBrutos: string): any;

  protected salvarNoBanco(dadosExtraidos: any): void {
    console.log("Salvando os dados formatados de forma segura no Banco de Dados.");
  }
}


class ProcessadorCSV extends ProcessadorDados {
  protected extrairDados(dadosBrutos: string): any {
    console.log("Fazendo o 'parser' (leitura) de linhas e colunas do formato CSV...");
    return { formato: "csv", dados: dadosBrutos };
  }
}

class ProcessadorJSON extends ProcessadorDados {
  protected extrairDados(dadosBrutos: string): any {
    console.log("Fazendo o 'parser' (leitura) de chaves e valores do formato JSON...");
    return { formato: "json", dados: dadosBrutos };
  }
}

// ----------

// SEM o padrão Template Method, teria que repetir o código de leitura e salvamento em cada classe de processador, o que não é eficiente e viola o princípio DRY.

// Classes independentes, sem um esqueleto em comum
class ProcessadorCSVDireto {
  public processarArquivoCSV(caminhoArquivo: string): void {
    // Código repetido
    console.log(`Abrindo e lendo o arquivo: ${caminhoArquivo}`);
    const dadosBrutos = "texto_bruto_do_arquivo";
    
    console.log("Fazendo o 'parser' (leitura) do formato CSV...");
    const dadosExtraidos = { formato: "csv", dados: dadosBrutos };
    
    // Código repetido
    console.log("Salvando no Banco de Dados.");
  }
}

class ProcessadorJSONDireto {
  public lidarComArquivoJSON(caminhoArquivo: string): void {
    // Código repetido de novo!
    console.log(`Abrindo e lendo o arquivo: ${caminhoArquivo}`);
    const dadosBrutos = "texto_bruto_do_arquivo";
    
    console.log("Fazendo o 'parser' (leitura) do formato JSON...");
    const dadosExtraidos = { formato: "json", dados: dadosBrutos };
    
    console.log("Processo JSON terminado."); 
  }
}