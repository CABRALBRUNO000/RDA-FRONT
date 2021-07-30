import { VoluntaryModel } from 'src/app/shared/entities/voluntary.model';

export function toFormData<T>(formValue: VoluntaryModel): FormData {
  const formData = new FormData();

  formData.append('nome', formValue.nome);
  formData.append('typeUser', formValue.typeUser);
  formData.append('dataNascimento', formValue.dataNascimento);
  formData.append('sexo', formValue.sexo);
  if (formValue.endereco) {
    Object.keys(formValue.endereco).forEach((key, index) => {
      const value = formValue.endereco[key];
      formData.append(`${'endereco'}[${key}]`, value);
    });
  }

  formData.append('profissao', formValue.profissao);
  formData.append('telefone', formValue.telefone);
  formData.append('telefoneFx', formValue.telefoneFx);
  formData.append('estadoCivil', formValue.estadoCivil);
  if (formValue.imgFilePrincipal != null) {
    formData.append(
      'imgFilePrincipal',
      formValue.imgFilePrincipal[0],
      formValue.imgFilePrincipal.name
    );
  }
  formData.append('email', formValue.email);
  if (!formValue._id) {
    formData.append('password', formValue.password);
    formData.append('password2', formValue.password2);
  }

  formData.append('nomeIg', formValue.nomeIg);
  formData.append('pastor', formValue.pastor);

  if (formValue.typeVoluntary) {
    Object.keys(formValue.typeVoluntary).forEach((key, index) => {
      const value = formValue.typeVoluntary[key];
      formData.append(`${'typeVoluntary'}[${key}]`, value);
    });
  }

  formData.append(
    'chekbox5Aconselhamento',
    JSON.stringify(formValue.chekbox5Aconselhamento)
  );
  formData.append('especialidade', formValue.especialidade);
  formData.append('servicoOferecido', formValue.servicoOferecido);

  if (formValue.imgsCasaDescansoFile != null) {
    Object.keys(formValue.imgsCasaDescansoFile).forEach((element, index) => {
      formData.append(
        'imgsCasaDescansoFile',
        formValue.imgsCasaDescansoFile[index],
        formValue.imgsCasaDescansoFile.name
      );
    });
  }

  if (formValue.imgFileCasaDescansoPrincipal != null) {
    formData.append(
      'imgFileCasaDescansoPrincipal',
      formValue.imgFileCasaDescansoPrincipal[0],
      formValue.imgFileCasaDescansoPrincipal.name
    );
  }
  formData.append('dataCad', formValue.dataCad);
  formData.append('status', formValue.status);
  // formData.append('localDescanso', JSON.stringify(formValue.localDescanso));
  if (formValue.localDescanso) {
    Object.keys(formValue.localDescanso).forEach((key, index) => {
      const value = formValue.localDescanso[key];
      const name = `${'localDescanso'}[${key}]`;
      if (typeof value === 'object') {
        if (key === 'typeLocalDescanso') {
          Object.keys(formValue.localDescanso.typeLocalDescanso).forEach(
            (key, index) => {
              const value = formValue.localDescanso.typeLocalDescanso[key];
              formData.append(`${name}[${key}]`, value);
            }
          );
        }
        if (key === 'enderecoLocalDescanso') {
          Object.keys(formValue.localDescanso.enderecoLocalDescanso).forEach(
            (key, index) => {
              const value = formValue.localDescanso.enderecoLocalDescanso[key];
              formData.append(`${name}[${key}]`, value);
            }
          );
        }
        if (key === 'servicosDisponibilizados') {
          Object.keys(formValue.localDescanso.servicosDisponibilizados).forEach(
            (key, index) => {
              const value =
                formValue.localDescanso.servicosDisponibilizados[key];
              formData.append(`${name}[${key}]`, value);
            }
          );
        }
      }
      formData.append(name, value);
    });
  }

  return formData;
}
