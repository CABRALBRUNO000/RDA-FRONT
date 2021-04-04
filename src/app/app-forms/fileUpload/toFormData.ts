export function toFormData<T>(formValue) {
  const formData = new FormData();

  formData.append('nome', formValue.nome);
  formData.append('dataNascimento', formValue.dataNascimento);
  formData.append('sexo', formValue.sexo);
  formData.append('rua', formValue.rua);
  formData.append('numero', formValue.numero);
  formData.append('bairro', formValue.bairro);
  formData.append('cidade', formValue.cidade);
  formData.append('complemento', formValue.complemento);
  formData.append('uf', formValue.uf);
  formData.append('CEP', formValue.CEP);
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
  formData.append('password', formValue.password);
  formData.append('password2', formValue.password2);
  formData.append('nomeIg', formValue.nomeIg);
  formData.append('pastor', formValue.pastor);
  formData.append('chekbox1Profissao', formValue.chekbox1Profissao.toString());
  formData.append(
    'chekbox2Intercessor',
    formValue.chekbox2Intercessor.toString()
  );
  formData.append('chekbox3Cuidador', formValue.chekbox3Cuidador.toString());
  formData.append(
    'chekbox4CasaDescanso',
    formValue.chekbox4CasaDescanso.toString()
  );
  formData.append(
    'chekbox5Aconselhamento',
    formValue.chekbox5Aconselhamento.toString()
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

  return formData;
}
