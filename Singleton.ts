// Aplicando o padrão Singleton 


class SystemConfig {
  // A instância única é armazenada nesta propriedade estática e privada.
  private static instancia: SystemConfig;

  public tema: string = "claro";
  public idioma: string = "pt-BR";


// Ex. sem o padrão Singleton

// Uma classe comum, sem controle de instâncias
class ComunConfig {
  public tema: string = "claro";
  public idioma: string = "pt-BR";

  }