export interface VoluntaryModel {
  _id: string;
  typeUser: string;
  nome: string;
  dataNascimento: string;
  sexo: string;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    complemento: string;
    uf: string;
    CEP: string;
  };
  profissao: string;
  telefone: string;
  telefoneFx: string;
  estadoCivil: string;
  email: string;
  password: string;
  password2: string;
  imgFilePrincipal: File;
  imgsCasaDescansoFile: File;
  imgFileCasaDescansoPrincipal: File;
  nomeIg: string;
  pastor: string;

  typeVoluntary: {
    chekbox1Profissao: boolean;
    chekbox2Intercessor: boolean;
    chekbox3Cuidador: boolean;
    chekbox4CasaDescanso: boolean;
  };

  chekbox5Aconselhamento: boolean;
  especialidade: string;
  urlsImage: {
    urlImgPrincipal: string;
    urlImgCasaDescansoPrincipal: string;
    urlImgsCasaDescanso: [];
  };
  servicoOferecido: string;
  dataCad: string;
  status: string;
  localDescanso: {
    typeLocalDescanso: {
      casaDePraia: boolean;
      casaDeCampo: boolean;
      pousada: boolean;
      hotel: boolean;
      outros: boolean;
    };
    nomeLocalDescanso: string;
    CNPJLocalDescanso: string;
    enderecoLocalDescanso: {
      ruaLocalDescanso: string;
      numeroLocalDescanso: string;
      complementoLocalDescanso: string;
      CEPLocalDescanso: string;
      bairroLocalDescanso: string;
      cidadeLocalDescanso: string;
      ufLocalDescanso: string;
    };
    disponibilidadeDuranteAno: boolean;
    mesesNaoDisponivel: string;
    mesesNaoDisponivelDescrito: string;
    maximoDiariaPg: string;
    maximoHospedesPorVez: string;
    qtFamiliaMes: string;
    custoHospedagem: string;
    valorHospedagem: string;
    alimentacao: boolean;
    custoAlimentacao: string;
    valorRefeicoes: string;
    roupaCama: boolean;
    qtQuartos: string;
    qtSuites: string;
    qtCamasCasal: string;
    qtCamasSolteiro: string;
    servicosDisponibilizados: {
      piscina: boolean;
      quadra: boolean;
      restaurante: boolean;
      TV: boolean;
      internet: boolean;
      garagem: boolean;
      outrosServicosOferecidos: boolean;
      outrosServicosOferecidosDescrito: string;
    };
  };
}
