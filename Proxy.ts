// Exemplo de Código Cliente sem o Padrão Proxy
class DirectService {
  private SystemPassword: string = "senha_secreta_123";

  executeOperation(typedPassword: string): void {
    console.log("DirectService: Verificando a senha de acesso...");
    
    
    if (typedPassword === this.SystemPassword) {
      
      console.log("DirectService: Executando a operação restrita do sistema.");
      
      console.log("DirectService: Registrando horário de acesso no log do sistema.\n");
      
    } else {
      console.log("DirectService: Acesso Negado! Senha incorreta.\n");
    }
  }
}

// O cliente fala diretamente com o serviço, sem passar por um proxy.
const service = new DirectService();

console.log("--- Tentativa 1: Acesso Negado ---");
service.executeOperation("senha_errada");

console.log("--- Tentativa 2: Acesso Permitido ---");
service.executeOperation("senha_secreta_123");

// -----------------------
// Exemplo de Código Cliente com o Padrão Proxy

interface Service {
  executeOperation(): void;
}

class realService implements Service {
  executeOperation(): void {
    console.log("ServicoReal: Executando a operação restrita do sistema.");
  }
}

// Aplicando o Proxy
class securityProxy implements Service {
  private realService: realService | null = null;
  private enteredPassword: string;

  constructor(enteredPassword: string) {
    this.enteredPassword = enteredPassword;
  }
    executeOperation(): void {
        throw new Error("Method not implemented.");
    }

  private verificarAcesso(): boolean {
    console.log("Proxy: Verificando a senha de acesso...");
    return this.enteredPassword === "senha_secreta_123";
  }
}  