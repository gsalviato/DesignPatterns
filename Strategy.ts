// Aplicando o padrão de projeto Strategy, onde o cliente pode escolher entre diferentes estratégias de cálculo de frete sem se preocupar com os detalhes de implementação.

interface EstrategiaFrete {
  calcular(peso: number): number;
}

class FreteNormal implements EstrategiaFrete {
  calcular(peso: number): number {
    console.log("Calculando frete NORMAL (Entrega em 10 dias)...");
    return peso * 5.00;
  }
}

class FreteExpresso implements EstrategiaFrete {
  calcular(peso: number): number {
    console.log("Calculando frete EXPRESSO (Entrega amanhã)...");
    return peso * 15.00;
  }
}

class FreteTransportadora implements EstrategiaFrete {
  calcular(peso: number): number {
    console.log("Calculando frete TRANSPORTADORA (Preço fixo)...");
    return 50.00; 
  }
}

// Onde se usa o padrao Strategy: O cliente escolhe a estratégia de frete e a usa sem se preocupar com os detalhes de implementação.

class CalculadoraDeFrete {
 
  calcularPrecoFinal(estrategiaEscolhida: EstrategiaFrete, peso: number): void {
    const valor = estrategiaEscolhida.calcular(peso);
    console.log(`Valor final do frete: R$ ${valor.toFixed(2)}\n`);
  }
}


const calculadora = new CalculadoraDeFrete();
const pesoDoPacote = 2; // 2 Kg

const pac = new FreteNormal();
calculadora.calcularPrecoFinal(pac, pesoDoPacote); 

const sedex = new FreteExpresso();
calculadora.calcularPrecoFinal(sedex, pesoDoPacote);

const loggi = new FreteTransportadora();
calculadora.calcularPrecoFinal(loggi, pesoDoPacote);

// -----------------

// Exemplo sem aplicação do Padrão Strategy, o cliente teria que lidar diretamente com a lógica de cálculo de frete, tornando o código mais complexo e difícil de manter.
class CalculadoraDeFreteRuim {
  
  // Um método gigante que tenta abraçar o mundo inteiro
  calcularPrecoFinal(tipoDeFrete: string, peso: number): void {
    
    if (tipoDeFrete === "NORMAL") {
      console.log("Calculando frete normal...");
      const valor = peso * 5;
      console.log(`Valor: R$ ${valor}`);
      
    } else if (tipoDeFrete === "EXPRESSO") {
      console.log("Calculando frete expresso...");
      const valor = peso * 15;
      console.log(`Valor: R$ ${valor}`);
      
    } else if (tipoDeFrete === "TRANSPORTADORA") {
      console.log("Calculando frete transportadora...");
      console.log(`Valor: R$ 50`);
      
    } else {
      console.log("Tipo de frete desconhecido!");
    }
  }
}