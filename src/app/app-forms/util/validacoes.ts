import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export class Validating {
Error: any;   //#region static requiredFileTypeImg
  static requiredFileTypeImg(
    controle: AbstractControl
  ): ValidationErrors | null {
    if (controle.value) {
      const fileField = controle.value;
      const validationsExtensions = [];
      const Validationsize = [];

      [].slice
        .call(fileField)
        .forEach((element: { name: string }, index: string | number) => {
          if (!element.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            // se or arquivo tiver extenção de imagens a variavel validationExtensions recebe true se não recebe false
            validationsExtensions[index] = false;
          } else {
            validationsExtensions[index] = true;
          }
        });
      if (validationsExtensions.indexOf(false) > -1) {
        return { notImageFile: true };
      }

      [].slice
        .call(fileField)
        .forEach((element: { size: number }, index: string | number) => {
          if (element.size > 350000) {
            // se or arquivo tiver tamamnho maior que 350kb a variavel validationExtensions recebe true, se não recebe false
            Validationsize[index] = false;
          } else {
            Validationsize[index] = true;
          }
        });
      if (Validationsize.indexOf(false) > -1) {
        return { veryLargeFile: true };
      }
      if (fileField.length > 10) {
        return { imageLimitExceeded: true };
      }

      return null;
    }
  }
  //#endregion
  // tslint:disable-next-line: typedef
  //#region static equalPasswords
  static equalPasswords(controle: AbstractControl): ValidationErrors | null {
    if (controle.value) {
      const senha = controle.get('password').value;

      const confirmarSenha = controle.get('password2').value;

      if (senha === confirmarSenha) {
        return null;
      }
      controle.get('password2').setErrors({ passwordsDoNotCoincide: true });
    }
  }
  //#endregion
  //#region static conditionallyRequired
  static conditionallyRequired(
    controle: AbstractControl
  ): ValidationErrors | null {
    const id = controle.get('_id').value;

    //#region Controle grupo de  chekboxes tipo de voluntários
    const chekbox4CasaDescanso = controle.get([
      'typeVoluntary',
      'chekbox4CasaDescanso',
    ]);
    const typeVoluntary = controle.get('typeVoluntary');
    // identifica se todos os chekboxes estão selecionados

    if (Validating.haveASelected(typeVoluntary.value)) {
      typeVoluntary.setErrors(null);
    } else {
      typeVoluntary.setErrors({ noneSelect: true });
    }
    //#endregion
    //#region Controle de validações para quando não existe ID
    if (!id) {
      const password = controle.get('password');
      const password2 = controle.get('password2');
      const imgFilePrincipal = controle.get('imgFilePrincipal');
      // adiciona todos os requireds aos campos que precisam ser obrigatorios em um cadastro

      // Validating.isRequired(password);
      password.setValidators([Validators.required, Validators.minLength(8)]);
      password.updateValueAndValidity({ onlySelf: true })
      Validating.isRequired(password2);

      // faz com que os validarores condicionais sejam adicionados sem retirar os antigos
      const validators: ValidatorFn[] = !!imgFilePrincipal.validator
        ? [imgFilePrincipal.validator, Validators.required]
        : [Validators.required];

      imgFilePrincipal.setValidators(validators);
      imgFilePrincipal.updateValueAndValidity({ onlySelf: true });
    }
    //#region validator imagens
    const imgFileCasaDescansoPrincipal = controle.get('imgFileCasaDescansoPrincipal');
    const imgsCasaDescansoFile = controle.get('imgsCasaDescansoFile');


    //#endregion
    // só devem ser requiridas se for localDescanso | chekbox4CasaDescanso tem que ser true
    if (chekbox4CasaDescanso.value) {
      //#region VARIÁVEIS chekbox4CasaDescanso===TRUE

      const typeLocalDescanso = controle.get([
        'localDescanso',
        'typeLocalDescanso',
      ]);
      const enderecoLocalDescanso = controle.get([
        'localDescanso',
        'enderecoLocalDescanso',
      ]);
      const servicosDisponibilizados = controle.get([
        'localDescanso',
        'servicosDisponibilizados',
      ]);
      const CNPJLocalDescanso = controle.get([
        'localDescanso',
        'CNPJLocalDescanso',
      ]);
      const nomeLocalDescanso = controle.get([
        'localDescanso',
        'nomeLocalDescanso',
      ]);
      const hotel = controle.get([
        'localDescanso',
        'typeLocalDescanso',
        'hotel',
      ]).value;
      const pousada = controle.get([
        'localDescanso',
        'typeLocalDescanso',
        'pousada',
      ]).value;

      const ruaLocalDescanso = controle.get([
        'localDescanso',
        'enderecoLocalDescanso',
        'ruaLocalDescanso',
      ]);
      const numeroLocalDescanso = controle.get([
        'localDescanso',
        'enderecoLocalDescanso',
        'numeroLocalDescanso',
      ]);

      const CEPLocalDescanso = controle.get([
        'localDescanso',
        'enderecoLocalDescanso',
        'CEPLocalDescanso',
      ]);
      const bairroLocalDescanso = controle.get([
        'localDescanso',
        'enderecoLocalDescanso',
        'bairroLocalDescanso',
      ]);
      const cidadeLocalDescanso = controle.get([
        'localDescanso',
        'enderecoLocalDescanso',
        'cidadeLocalDescanso',
      ]);
      const ufLocalDescanso = controle.get([
        'localDescanso',
        'enderecoLocalDescanso',
        'ufLocalDescanso',
      ]);

      const disponibilidadeDuranteAno = controle.get([
        'localDescanso',
        'disponibilidadeDuranteAno',
      ]);
      const mesesNaoDisponivel = controle.get([
        'localDescanso',
        'mesesNaoDisponivel',
      ]);
      const mesesNaoDisponivelDescrito = controle.get([
        'localDescanso',
        'mesesNaoDisponivelDescrito',
      ]);
      const maximoDiariaPg = controle.get(['localDescanso', 'maximoDiariaPg']);
      const maximoHospedesPorVez = controle.get([
        'localDescanso',
        'maximoHospedesPorVez',
      ]);
      const qtFamiliaMes = controle.get(['localDescanso', 'qtFamiliaMes']);
      const custoHospedagem = controle.get([
        'localDescanso',
        'custoHospedagem',
      ]);
      const valorHospedagem = controle.get([
        'localDescanso',
        'valorHospedagem',
      ]);
      const alimentacao = controle.get(['localDescanso', 'alimentacao']);
      const custoAlimentacao = controle.get([
        'localDescanso',
        'custoAlimentacao',
      ]);
      const valorRefeicoes = controle.get(['localDescanso', 'valorRefeicoes']);
      const roupaCama = controle.get(['localDescanso', 'roupaCama']);
      const qtQuartos = controle.get(['localDescanso', 'qtQuartos']);
      const qtSuites = controle.get(['localDescanso', 'qtSuites']);
      const qtCamasCasal = controle.get(['localDescanso', 'qtCamasCasal']);
      const qtCamasSolteiro = controle.get(['localDescanso', 'qtCamasSolteiro']);

      const piscina = controle.get([
        'localDescanso',
        'servicosDisponibilizados',
        'piscina',
      ]);
      const quadra = controle.get([
        'localDescanso',
        'servicosDisponibilizados',
        'quadra',
      ]);
      const restaurante = controle.get([
        'localDescanso',
        'servicosDisponibilizados',
        'restaurante',
      ]);
      const TV = controle.get([
        'localDescanso',
        'servicosDisponibilizados',
        'TV',
      ]);
      const internet = controle.get([
        'localDescanso',
        'servicosDisponibilizados',
        'internet',
      ]);
      const garagem = controle.get([
        'localDescanso',
        'servicosDisponibilizados',
        'garagem',
      ]);
      const outrosServicosOferecidos = controle.get([
        'localDescanso',
        'servicosDisponibilizados',
        'outrosServicosOferecidos',
      ]);
      // tslint:disable-next-line: max-line-length
      const outrosServicosOferecidosDescrito = controle.get([
        'localDescanso',
        'servicosDisponibilizados',
        'outrosServicosOferecidosDescrito',
      ]);

      // //#endregion
     //#region IS REQUIRED   Validações obrigatorias chekbox4CasaDescanso === true

      //#region enderecoLocalDescanso
//#region validação de imagens
      Validating.isRequiredIMG(imgFileCasaDescansoPrincipal);
      Validating.isRequiredIMG(imgsCasaDescansoFile);
      if (id){
        Validating.cleanRequired(imgFileCasaDescansoPrincipal);
        Validating.cleanRequired(imgsCasaDescansoFile);
      }
//#endregion
      Validating.isRequired(ruaLocalDescanso);
      Validating.isRequired(numeroLocalDescanso);
      Validating.isRequired(CEPLocalDescanso);
      Validating.isRequired(bairroLocalDescanso);
      Validating.isRequired(cidadeLocalDescanso);
      Validating.isRequired(ufLocalDescanso);
      //#endregion
      //#region required CNPJ
      if (hotel || pousada) {
        Validating.isRequired(CNPJLocalDescanso);

      } else {
        Validating.cleanRequired(CNPJLocalDescanso);

      }
      //#endregion
      //#region disponibilidadeDuranteAno
      Validating.isRequired(disponibilidadeDuranteAno);
      //#endregion
      //#region nomeLocalDescanso
      Validating.isRequired(nomeLocalDescanso);
      //#endregion
      //#region mesesNaoDisponivel
      // tslint:disable-next-line: max-line-length
      if (!disponibilidadeDuranteAno.value) {
        Validating.isRequired(mesesNaoDisponivel);
      } else {
        Validating.cleanRequired(mesesNaoDisponivel);
      }
      //#endregion
      //#region mesesNaoDisponivelDescrito
      // tslint:disable-next-line: max-line-length
      if (mesesNaoDisponivel.value === '0') {
        Validating.isRequired(mesesNaoDisponivelDescrito);
      } else {
        Validating.cleanRequired(mesesNaoDisponivelDescrito);
      }
      //#endregion
      //#region maximoDiariaPg
      Validating.isRequired(maximoDiariaPg);
      //#endregion
      //#region maximoHospedesPorVez
      Validating.isRequired(maximoHospedesPorVez);
      //#endregion
      //#region qtFamiliaMes
      Validating.isRequired(qtFamiliaMes);
      //#endregion
      //#region custoHospedagem
      Validating.isRequired(custoHospedagem);
      //#endregion
      //#region valorHospedagem
      if (custoHospedagem.value) {
        Validating.isRequired(valorHospedagem);
      } else {
        Validating.cleanRequired(valorHospedagem);
      }
      //#endregion
      //#region alimentacao
      Validating.isRequired(alimentacao);
      //#endregion
      //#region custoAlimentacao
      if (alimentacao.value) {
        Validating.isRequired(custoAlimentacao);
      } else {
        Validating.cleanRequired(custoAlimentacao);
      }
      //#endregion
      //#region valorRefeicoes
      if (alimentacao.value) {
        Validating.isRequired(valorRefeicoes);
      } else {
        Validating.cleanRequired(valorRefeicoes);
      }
      //#endregion
      //#region roupaCama
      Validating.isRequired(roupaCama);
      //#endregion
      //#region qtQuartos
      Validating.isRequired(qtQuartos);
      //#endregion
      //#region qtSuites
      Validating.isRequired(qtSuites);
      //#endregion
      //#region qtCamas
      Validating.isRequired(qtCamasCasal);
      Validating.isRequired(qtCamasSolteiro);
      //#endregion
      //#region servicosDisponibilizados
      Validating.isRequired(servicosDisponibilizados);

      //#region piscina
      Validating.isRequired(piscina);
      //#endregion
      //#region quadra
      Validating.isRequired(quadra);
      //#endregion
      //#region restaurante
      Validating.isRequired(restaurante);
      //#endregion
      //#region TV
      Validating.isRequired(TV);
      //#endregion
      //#region internet
      Validating.isRequired(internet);
      //#endregion
      //#region garagem
      Validating.isRequired(garagem);
      //#endregion
      //#region outrosServicosOferecidos
      Validating.isRequired(outrosServicosOferecidos);
      //#endregion
      //#region outrosServicosOferecidosDescrito
      // tslint:disable-next-line: max-line-length
      if (outrosServicosOferecidos.value) {
        Validating.isRequired(outrosServicosOferecidosDescrito);
      } else {
        Validating.cleanRequired(outrosServicosOferecidosDescrito);
      }
      //#endregion
      //#endregion

      //#region Controle grupo de  chekboxes tipo de local de descanso

      // tslint:disable-next-line: no-shadowed-variable
      // identifica se todos os chekboxes estão selecionados
      if (Validating.haveASelected(typeLocalDescanso.value)) {
        typeLocalDescanso.setErrors(null);
      } else {
        typeLocalDescanso.setErrors({ noneSelect: true });
      }
      //#endregion
      //#region controle de chekboxes tipo de serviço

      if (Validating.haveASelected(servicosDisponibilizados.value)) {
        servicosDisponibilizados.setErrors(null);
      } else {
        servicosDisponibilizados.setErrors({ noneSelect: true });
      }
      //#endregion
      //#endregion
    } else {



      const ruaLocalDescanso = controle.get([
        'localDescanso',
        'enderecoLocalDescanso',
        'ruaLocalDescanso',
      ]);
      const numeroLocalDescanso = controle.get([
        'localDescanso',
        'enderecoLocalDescanso',
        'numeroLocalDescanso',
      ]);

      const CEPLocalDescanso = controle.get([
        'localDescanso',
        'enderecoLocalDescanso',
        'CEPLocalDescanso',
      ]);
      const bairroLocalDescanso = controle.get([
        'localDescanso',
        'enderecoLocalDescanso',
        'bairroLocalDescanso',
      ]);
      const cidadeLocalDescanso = controle.get([
        'localDescanso',
        'enderecoLocalDescanso',
        'cidadeLocalDescanso',
      ]);
      const ufLocalDescanso = controle.get([
        'localDescanso',
        'enderecoLocalDescanso',
        'ufLocalDescanso',
      ]);
      const nomeLocalDescanso = controle.get([
        'localDescanso',
        'nomeLocalDescanso',
      ]);
      const CNPJLocalDescanso = controle.get([
        'localDescanso',
        'CNPJLocalDescanso',
      ]);

      const disponibilidadeDuranteAno = controle.get([
        'localDescanso',
        'disponibilidadeDuranteAno',
      ]);
      const mesesNaoDisponivel = controle.get([
        'localDescanso',
        'mesesNaoDisponivel',
      ]);
      const mesesNaoDisponivelDescrito = controle.get([
        'localDescanso',
        'mesesNaoDisponivelDescrito',
      ]);
      const maximoDiariaPg = controle.get(['localDescanso', 'maximoDiariaPg']);
      const maximoHospedesPorVez = controle.get([
        'localDescanso',
        'maximoHospedesPorVez',
      ]);
      const qtFamiliaMes = controle.get(['localDescanso', 'qtFamiliaMes']);
      const custoHospedagem = controle.get([
        'localDescanso',
        'custoHospedagem',
      ]);
      const valorHospedagem = controle.get([
        'localDescanso',
        'valorHospedagem',
      ]);
      const alimentacao = controle.get(['localDescanso', 'alimentacao']);
      const custoAlimentacao = controle.get([
        'localDescanso',
        'custoAlimentacao',
      ]);
      const valorRefeicoes = controle.get(['localDescanso', 'valorRefeicoes']);
      const roupaCama = controle.get(['localDescanso', 'roupaCama']);
      const qtQuartos = controle.get(['localDescanso', 'qtQuartos']);
      const qtSuites = controle.get(['localDescanso', 'qtSuites']);
      const qtCamasCasal = controle.get(['localDescanso', 'qtCamasCasal']);
      const qtCamasSolteiro = controle.get(['localDescanso', 'qtCamasSolteiro']);

      const servicosDisponibilizados = controle.get([
        'localDescanso',
        'servicosDisponibilizados',
        ]);
      const piscina = controle.get([
        'localDescanso',
        'servicosDisponibilizados',
        'piscina',
      ]);
      const quadra = controle.get([
        'localDescanso',
        'servicosDisponibilizados',
        'quadra',
      ]);
      const restaurante = controle.get([
        'localDescanso',
        'servicosDisponibilizados',
        'restaurante',
      ]);
      const TV = controle.get([
        'localDescanso',
        'servicosDisponibilizados',
        'TV',
      ]);
      const internet = controle.get([
        'localDescanso',
        'servicosDisponibilizados',
        'internet',
      ]);
      const garagem = controle.get([
        'localDescanso',
        'servicosDisponibilizados',
        'garagem',
      ]);
      const outrosServicosOferecidos = controle.get([
        'localDescanso',
        'servicosDisponibilizados',
        'outrosServicosOferecidos',
      ]);
      const outrosServicosOferecidosDescrito = controle.get([
        'localDescanso',
        'servicosDisponibilizados',
        'outrosServicosOferecidosDescrito',
      ]);
      const typeLocalDescanso = controle.get([
        'localDescanso',
        'typeLocalDescanso',
      ]);

      //#region CELAN REQUIRED
      //#region imgFileCasaDescansoPrincipal
      // Validating.cleanRequired(imgFileCasaDescansoPrincipal)
      //#endregion
      //#region imgsCasaDescansoFile
      // Validating.cleanRequired(imgsCasaDescansoFile)
      //#endregion
      //#region typeLocalDescanso
      Validating.cleanRequired(typeLocalDescanso);
      //#endregion
      //#region nomeLocalDescanso
      Validating.cleanRequired(nomeLocalDescanso);
      //#endregion
      //#region CNPJLocalDescanso
      Validating.cleanRequired(CNPJLocalDescanso);
      //#endregion

      // #region Clean enderecolocalDescanso
      Validating.cleanRequired(ruaLocalDescanso);
      Validating.cleanRequired(numeroLocalDescanso);
      Validating.cleanRequired(CEPLocalDescanso);
      Validating.cleanRequired(bairroLocalDescanso);
      Validating.cleanRequired(cidadeLocalDescanso);
      Validating.cleanRequired(ufLocalDescanso);
      //#endregion
      //#region disponibilidadeDuranteAno
      Validating.cleanRequired(disponibilidadeDuranteAno);
      //#endregion
      //#region mesesNaoDisponivel
      Validating.cleanRequired(mesesNaoDisponivel);
      //#endregion
      //#region mesesNaoDisponivelDescrito
      Validating.cleanRequired(mesesNaoDisponivelDescrito);
      //#endregion
      //#region maximoDiariaPg
      Validating.cleanRequired(maximoDiariaPg);
      //#endregion
      //#region maximoHospedesPorVez
      Validating.cleanRequired(maximoHospedesPorVez);
      //#endregion
      //#region qtFamiliaMes
      Validating.cleanRequired(qtFamiliaMes);
      //#endregion
      //#region custoHospedagem
      Validating.cleanRequired(custoHospedagem);
      //#endregion
      //#region valorHospedagem
      Validating.cleanRequired(valorHospedagem);
      //#endregion
      //#region alimentacao
      Validating.cleanRequired(alimentacao);
      //#endregion
      //#region custoAlimentacao
      Validating.cleanRequired(custoAlimentacao);
      //#endregion
      //#region valorRefeicoes
      Validating.cleanRequired(valorRefeicoes);
      //#endregion
      //#region roupaCama
      Validating.cleanRequired(roupaCama);
      //#endregion
      //#region qtQuartos
      Validating.cleanRequired(qtQuartos);
      //#endregion
      //#region qtSuites
      Validating.cleanRequired(qtSuites);
      //#endregion
      //#region qtCamas
      Validating.cleanRequired(qtCamasCasal);
      Validating.cleanRequired(qtCamasSolteiro);
      //#endregion
      //#region servicosDisponibilizados
      Validating.cleanRequired(servicosDisponibilizados);
      //#endregion

      //#region piscina
      Validating.cleanRequired(piscina);
      //#endregion
      //#region quadra
      Validating.cleanRequired(quadra);
      //#endregion
      //#region restaurante
      Validating.cleanRequired(restaurante);
      //#endregion
      //#region TV
      Validating.cleanRequired(TV);
      //#endregion
      //#region internet
      Validating.cleanRequired(internet);
      //#endregion
      //#region garagem
      Validating.cleanRequired(garagem);
      //#endregion
      //#region outrosServicosOferecidos
      Validating.cleanRequired(outrosServicosOferecidos);
      //#endregion
      //#region outrosServicosOferecidosDescrito
      Validating.cleanRequired(outrosServicosOferecidosDescrito);
      //#endregion CELAN REQUIRED
      //#endregion
      //#endregion static conditionallyRequired
    }

    return null;
  }

  // torna o campo requerido
  //#region static isRequired
  static isRequired(field: AbstractControl): void {
    field.setValidators(Validators.required);
    field.updateValueAndValidity({ onlySelf: true });
  }
  static isRequiredIMG(field): void {
    const validators: ValidatorFn[] = !!field.validator
    ? [field.validator, Validators.required]
    : [Validators.required];

    field.setValidators(validators);
    field.updateValueAndValidity({ onlySelf: true });
  }
  //#endregion
  // limpa os campos requeridos
  //#region static cleanRequired
  static cleanRequired(field: AbstractControl): void {
    field.clearValidators();
    field.updateValueAndValidity({ onlySelf: true });
  }

  //#endregion
  //#region static haveASelected
  static haveASelected(fieldArrayValue: AbstractControl): boolean {
    return Object.values(fieldArrayValue).find((element) => element === true);
  }
  //#endregion


}
