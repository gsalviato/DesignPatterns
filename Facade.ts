// Aplicação do Padrão Facade em TypeScript para uma Casa Inteligente

class Iluminacao {
  ligar(): void { console.log("Luzes: Ligadas."); }
  desligar(): void { console.log("Luzes: Desligadas."); }
  ajustarBrilho(porcentagem: number): void { 
    console.log(`Luzes: Brilho ajustado para ${porcentagem}%.`); 
  }
}

class ArCondicionado {
  ligar(): void { console.log("Ar-Condicionado: Ligado."); }
  desligar(): void { console.log("Ar-Condicionado: Desligado."); }
  definirTemperatura(graus: number): void { 
    console.log(`Ar-Condicionado: Temperatura ajustada para ${graus}°C.`); 
  }
}

class SistemaDeVideoESom {
  ligar(): void { console.log("TV e Som: Ligados."); }
  desligar(): void { console.log("TV e Som: Desligados."); }
  configurarModo(modo: string): void { 
    console.log(`TV e Som: Modo de áudio/vídeo alterado para '${modo}'.`); 
  }
  ajustarVolume(nivel: number): void { 
    console.log(`TV e Som: Volume ajustado para ${nivel}.`); 
  }
}


// A Fachada (Facade) - Orquestrando a complexidade dos subsistemas

class CasaInteligenteFacade {
  private iluminacao: Iluminacao;
  private arCondicionado: ArCondicionado;
  private sistemaMultimidia: SistemaDeVideoESom;

  constructor(
    iluminacao: Iluminacao, 
    arCondicionado: ArCondicionado, 
    sistemaMultimidia: SistemaDeVideoESom
  ) {
    this.iluminacao = iluminacao;
    this.arCondicionado = arCondicionado;
    this.sistemaMultimidia = sistemaMultimidia;
  }

  ativarModoCinema(): void {
    console.log("\n--- Preparando a sala para o Modo Cinema ---");
    this.iluminacao.ajustarBrilho(10);
    this.arCondicionado.ligar();
    this.arCondicionado.definirTemperatura(22);
    this.sistemaMultimidia.ligar();
    this.sistemaMultimidia.configurarModo("Surround 5.1 e HDR");
    this.sistemaMultimidia.ajustarVolume(45);
    console.log("--- Tudo pronto! Bom filme. ---\n");
  }

  encerrarModoCinema(): void {
    console.log("\n--- Encerrando o Modo Cinema ---");
    this.sistemaMultimidia.desligar();
    this.arCondicionado.desligar();
    this.iluminacao.ajustarBrilho(100);
    console.log("--- Sala voltou ao normal. ---\n");
  }
}


const luzes = new Iluminacao();
const ar = new ArCondicionado();
const multimidia = new SistemaDeVideoESom();

// 2. Crio a "fachada" passando as dependências
const minhaCasa = new CasaInteligenteFacade(luzes, ar, multimidia);

// Interagindo apenas com a Fachada. 

minhaCasa.ativarModoCinema();

minhaCasa.encerrarModoCinema();

// -----------------

// Exemplo sem aplicação do Padrão Facade:

// O Cliente lida com toda a complexidade
class BotaoInterfaceUsuario {
  // A interface precisa importar e conhecer todos os aparelhos
  private luzes = new Iluminacao();
  private ar = new ArCondicionado();
  private multimidia = new SistemaDeVideoESom();

  aoClicarNoBotaoCinema(): void {
    console.log("Iniciando...");
    this.luzes.ajustarBrilho(10);
    this.ar.ligar();
    this.ar.definirTemperatura(22);
    this.multimidia.ligar();
    this.multimidia.configurarModo("Surround 5.1 e HDR");
    this.multimidia.ajustarVolume(45);
  }
}