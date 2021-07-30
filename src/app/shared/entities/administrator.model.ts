export interface AdministratorModel {
  _id: string;
  typeUser: string;
  nome: string;
  email: string;
  password: string;
  password2: string;
  dataCad: string;
  status: string;
  sexo: string;
  dataNascimento: string;
  imgAdmin: File;
  urlsImage: {
    urlImgAdmin: string
  }
}