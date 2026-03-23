// Aplicando o padrão Decorator

interface Coffe {
  obterDescricao(): string;
  obterCusto(): number;
}
class SimpleCoffe implements Coffe {
  obterDescricao(): string {
    return "Café Simples";
  }

  obterCusto(): number {
    return 5.00; 
  }
}

abstract class CoffeDecorator implements Coffe {
  protected coffeBase: Coffe;

  constructor(coffe: Coffe) {
    this.coffeBase = coffe;
  }

  obterDescricao(): string {
    return this.coffeBase.obterDescricao();
  }

  obterCusto(): number {
    return this.coffeBase.obterCusto();
  }
}

// Os "Decoradores" concretos que adicionam funcionalidades extras ao café base.
class WithMilk extends CoffeDecorator {
  obterDescricao(): string {
    return this.coffeBase.obterDescricao() + ", com Leite";
  }

  obterCusto(): number {
    return this.coffeBase.obterCusto() + 2.00; 
  }
}

class WithChocolate extends CoffeDecorator {
  obterDescricao(): string {
    return this.coffeBase.obterDescricao() + ", com Chocolate";
  }

  obterCusto(): number {
    return this.coffeBase.obterCusto() + 3.50;
  }
}

// ----------

// Sem o padrão Decorator, teríamos que criar uma nova classe para cada combinação possível de ingredientes, o que não é escalável.

class hardCoffe {
  public withMilk: boolean = false;
  public withChocolate: boolean = false;
  public withChantilly: boolean = false; 

  obterDescricao(): string {
    let description = "Café Simples";
    if (this.withMilk) description += ", com Leite";
    if (this.withChocolate) description += ", com Chocolate";
    if (this.withChantilly) description += ", com Chantilly";
    return description;
  }

  obterCusto(): number {
    let custo = 5.00;
    if (this.withMilk) custo += 2.00;
    if (this.withChocolate) custo += 3.50;
    if (this.withChantilly) custo += 1.50;
    return custo;
  }
}