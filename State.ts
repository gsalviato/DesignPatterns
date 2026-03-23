// Aplicação do padrão de projeto State

interface EstadoCatraca {
  inserirMoeda(): void;
  empurrar(): void;
}

class Catraca {
  public estadoAtual: EstadoCatraca;

  constructor() {
    this.estadoAtual = new Travada(this); 
  }
  inserirMoeda(): void {
    this.estadoAtual.inserirMoeda();
  }

  empurrar(): void {
    this.estadoAtual.empurrar();
  }
}

// Os estados concretos da catraca

class Travada implements EstadoCatraca {
  constructor(private catraca: Catraca) {}

  inserirMoeda(): void {
    console.log("Moeda aceita! Catraca LIBERADA.");
    this.catraca.estadoAtual = new Liberada(this.catraca); 
  }

  empurrar(): void {
    console.log("Catraca TRAVADA! Você não pode passar.");
  }
}

class Liberada implements EstadoCatraca {
  constructor(private catraca: Catraca) {}

  inserirMoeda(): void {
    console.log("A catraca já está liberada. Você desperdiçou uma moeda!");
  }

  empurrar(): void {
    console.log("Você passou. Catraca TRAVANDO novamente...");
    this.catraca.estadoAtual = new Travada(this.catraca);
  }
}
const minhaCatraca = new Catraca();

minhaCatraca.empurrar(); 

minhaCatraca.inserirMoeda();
minhaCatraca.empurrar();     

minhaCatraca.empurrar();   

// --------------

// Exemplo sem aplicação do Padrão State, repare o uso if e else para controlar os estados da catraca:

class CatracaRuim {
  private status = "TRAVADA";

  inserirMoeda(): void {
    if (this.status === "TRAVADA") {
      console.log("Moeda aceita! Catraca LIBERADA.");
      this.status = "LIBERADA";
    } else if (this.status === "LIBERADA") {
      console.log("A catraca já está liberada.");
    }
  }

  empurrar(): void {
    if (this.status === "TRAVADA") {
      console.log("Catraca TRAVADA!");
    } else if (this.status === "LIBERADA") {
      console.log("Você passou. Catraca TRAVANDO...");
      this.status = "TRAVADA";
    }
  }
}