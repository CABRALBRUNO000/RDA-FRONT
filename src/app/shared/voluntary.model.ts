export interface VoluntaryModel {
  _id: string;
  nome: string;
  dataNascimento: string;
  sexo: string;

    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    complemento: string;
    uf: string;
    CEP: string;

  profissao: string;
  telefone: string;
  telefoneFx: string;
  estadoCivil: string;
  email: string;
  password: string,
  password2: string,
  imgFilePrincipal: File;
  imgsCasaDescansoFile:File,
  imgFileCasaDescansoPrincipal:File,
  nomeIg: string;
  pastor: string;
  chekbox1Profissao: boolean;
  chekbox2Intercessor: boolean;
  chekbox3Cuidador: boolean;
  chekbox4CasaDescanso: boolean;
  chekbox5Aconselhamento: boolean;
  especialidade: string;
  urlsImage: {
    urlImgPrincipal: string;
    urlImgCasaDescansoPrincipal: string,
    urlImgsCasaDescanso: []
  };
  servicoOferecido: string;
  dataCad: string;
  status: string;
}
