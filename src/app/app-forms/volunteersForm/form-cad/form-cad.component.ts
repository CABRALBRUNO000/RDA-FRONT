import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VolunteersService } from 'src/app/adminUsers/volunteers/services/volunteers.service';
import { VoluntaryModel } from '../../../shared/entities/voluntary.model';
import { FormValidationControl } from '../../services/form-validation-control.service';
import { Validating } from '../../util/validacoes';
import { alertAnimation } from './../../../shared/services/alert-animation';
import { AlertService } from './../../../shared/services/alert.service';


@Component({
  selector: 'app-form-cad',
  templateUrl: './form-cad.component.html',
  styleUrls: ['./form-cad.component.css', './../../app-forms.css'],
  providers: [VolunteersService],
  animations: [alertAnimation],
})
export class FormCadComponent implements OnInit, OnChanges {
  alertState = 'hide';

  public Voluntary: VoluntaryModel;
  public formulario: FormGroup; // formulario em questão

  alertSuccess = true;
  alertDanger: boolean;
  alertMessage: string;
  alertActivated: any;
  alertStyle: any;
  style: any;
  brandRadiosValidator: boolean = undefined;
  brandRadiosValidatorLocalDescanso: boolean = undefined;
  inputPasswordValidity: any;
  disponibilidadeAno = 'O local estará disponível durante todo o ano?';
  // custoHospedagem: string = 'Não, o local será disponibilizado gratuitamente';
  varCustoHospedagem = 'Haverá algum custo de hospedagem?';
  comercioAlimetacao = 'O local providencia algum tipo de alimentação?';
  custoAlimetacao = 'haverá algum custo de alimentação?';


  isCasaDescanso: boolean;
  disponibilidadeRoupaCama = 'O local disponibilizará roupa de cama e banho?';
  imgFilePrincipalHaveFile: boolean;
  imgFileCasaDescansoPrincipalHaveFile: boolean;
  imgsCasaDescansoFileHaveFile: boolean;

  constructor(
    private voluntaryService: VolunteersService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private formValidationControl: FormValidationControl,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {

  }

  setMensagem(field: string): void {
    if (field === 'roupaCama') {
      this.disponibilidadeRoupaCama = this.roupaCama.value === true ? 'Sim, O local disponibilizará roupa de cama e banho. ' : 'Não, O local não disponibilizará roupa de cama e banho.';
    }
    if (field === 'disponibilidadeDuranteAno') {
      this.disponibilidadeAno =
        this.formulario.value.localDescanso.disponibilidadeDuranteAno === true
          ? ' Sim, o local estará disponível durante todo o ano'
          : 'Não, o local não estará disponível durante todo o ano';
      if (this.formulario.value.localDescanso.disponibilidadeDuranteAno) {
        this.formulario
          .get(['localDescanso', 'mesesNaoDisponivel'])
          .setValue('');
        this.formulario
          .get(['localDescanso', 'mesesNaoDisponivelDescrito'])
          .setValue('');
      }
    }
    if (field === 'custoHospedagem') {
      this.varCustoHospedagem =
        this.formulario.value.localDescanso.custoHospedagem === false
          ? 'Não, o local será disponibilizado gratuitamente'
          : 'Sim, o Missionário terá custos de Hospedagem';
      if (!this.formulario.value.localDescanso.custoHospedagem) {
        this.formulario.get(['localDescanso', 'valorHospedagem']).setValue('');
      }
    }
    if (field === 'alimentacao') {
      this.comercioAlimetacao =
        this.formulario.value.localDescanso.alimentacao === true
          ? 'Sim, o local Comercializa alimentos'
          : 'Não, o local não Comercializa alimentos';
    }
    if (field === 'custoAlimentacao') {
      this.custoAlimetacao =
        this.formulario.value.localDescanso.custoAlimentacao === true
          ? 'Sim, Será cobrado o que for consumido'
          : 'Não, para este hóspede não haverão custos de alimentação';
    }
  }

  public toggle(view?: string): void {
    this.alertState = this.alertService.toggle(view);
  }

  ngOnInit(): void {
    this.Voluntary = this.route.snapshot.data.voluntary; // recebe os dados capturados do guard e guarda na variável voluntary


    this.formulario = this.formBuilder.group(
      {
        _id: this.Voluntary._id,
        typeUser: 'VOLUNTARY',
        nome: [
          this.Voluntary.nome,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ],
        ],
        dataNascimento: [this.Voluntary.dataNascimento, [Validators.required]],
        sexo: [this.Voluntary.sexo, [Validators.required]],

        endereco: this.formBuilder.group({
          rua: [this.Voluntary.endereco.rua],
          numero: [this.Voluntary.endereco.numero],
          bairro: [this.Voluntary.endereco.bairro],
          cidade: [this.Voluntary.endereco.cidade],
          complemento: [this.Voluntary.endereco.complemento],
          uf: [this.Voluntary.endereco.uf],
          CEP: [this.Voluntary.endereco.CEP],
        }),

        profissao: [this.Voluntary.profissao, [Validators.required]],
        telefone: [this.Voluntary.telefone, [Validators.required]],
        telefoneFx: [this.Voluntary.telefoneFx],
        EstadoCivil: [this.Voluntary.estadoCivil],
        imgFilePrincipal: [null, [Validating.requiredFileTypeImg]],
        email: [this.Voluntary.email, [Validators.required, Validators.email]],
        password: [null],
        password2: [null],
        nomeIg: [this.Voluntary.nomeIg, [Validators.required]],
        pastor: [this.Voluntary.pastor, [Validators.required]],

        typeVoluntary: this.formBuilder.group({
          chekbox1Profissao: [this.Voluntary.typeVoluntary.chekbox1Profissao],
          chekbox2Intercessor: [
            this.Voluntary.typeVoluntary.chekbox2Intercessor,
          ],
          chekbox3Cuidador: [this.Voluntary.typeVoluntary.chekbox3Cuidador],
          chekbox4CasaDescanso: [
            this.Voluntary.typeVoluntary.chekbox4CasaDescanso,
          ],
        }),

        chekbox5Aconselhamento: [this.Voluntary.chekbox5Aconselhamento],
        especialidade: [this.Voluntary.especialidade],
        servicoOferecido: [this.Voluntary.servicoOferecido],
        imgsCasaDescansoFile: [null, [Validating.requiredFileTypeImg]],
        // imgsCasaDescansoFile: [null,  this.isCasaDescanso? Validators.required, requiredFileTypeImg():''],
        imgFileCasaDescansoPrincipal: [null, [Validating.requiredFileTypeImg]],
        // imgFileCasaDescansoPrincipal: [null,  this.isCasaDescanso? [Validators.required, requiredFileTypeImg()]: ''],
        dataCad: [this.Voluntary.dataCad],
        status: [this.Voluntary.status],

        localDescanso: this.formBuilder.group({
          typeLocalDescanso: this.formBuilder.group({
            casaDePraia: [
              this.Voluntary.localDescanso.typeLocalDescanso.casaDePraia,
            ],
            casaDeCampo: [
              this.Voluntary.localDescanso.typeLocalDescanso.casaDeCampo,
            ],
            pousada: [this.Voluntary.localDescanso.typeLocalDescanso.pousada],
            hotel: [this.Voluntary.localDescanso.typeLocalDescanso.hotel],
            outros: [this.Voluntary.localDescanso.typeLocalDescanso.outros],
          }),

          nomeLocalDescanso: [this.Voluntary.localDescanso.nomeLocalDescanso],
          CNPJLocalDescanso: [this.Voluntary.localDescanso.CNPJLocalDescanso],
          enderecoLocalDescanso: this.formBuilder.group({
            ruaLocalDescanso: [
              this.Voluntary.localDescanso.enderecoLocalDescanso
                .ruaLocalDescanso,
            ],
            numeroLocalDescanso: [
              this.Voluntary.localDescanso.enderecoLocalDescanso
                .numeroLocalDescanso,
            ],
            complementoLocalDescanso: [
              this.Voluntary.localDescanso.enderecoLocalDescanso
                .complementoLocalDescanso,
            ],
            CEPLocalDescanso: [
              this.Voluntary.localDescanso.enderecoLocalDescanso
                .CEPLocalDescanso,
            ],
            bairroLocalDescanso: [
              this.Voluntary.localDescanso.enderecoLocalDescanso
                .bairroLocalDescanso,
            ],
            cidadeLocalDescanso: [
              this.Voluntary.localDescanso.enderecoLocalDescanso
                .cidadeLocalDescanso,
            ],
            ufLocalDescanso: [
              this.Voluntary.localDescanso.enderecoLocalDescanso
                .ufLocalDescanso,
            ],
          }),
          disponibilidadeDuranteAno: [
            this.Voluntary.localDescanso.disponibilidadeDuranteAno,
          ], // switch
          mesesNaoDisponivel: [this.Voluntary.localDescanso.mesesNaoDisponivel],
          mesesNaoDisponivelDescrito: [
            this.Voluntary.localDescanso.mesesNaoDisponivelDescrito,
          ], // tentar criar um select que possa selecionar mais de um ítem
          maximoDiariaPg: [this.Voluntary.localDescanso.maximoDiariaPg], // tipo moeda
          maximoHospedesPorVez: [
            this.Voluntary.localDescanso.maximoHospedesPorVez,
          ], // number
          qtFamiliaMes: [this.Voluntary.localDescanso.qtFamiliaMes], // number
          custoHospedagem: [this.Voluntary.localDescanso.custoHospedagem], // switch
          valorHospedagem: [this.Voluntary.localDescanso.valorHospedagem], // if custoHospedagem
          alimentacao: [this.Voluntary.localDescanso.alimentacao], // switch
          custoAlimentacao: [this.Voluntary.localDescanso.custoAlimentacao], // if alimentacao //switch
          valorRefeicoes: [this.Voluntary.localDescanso.valorRefeicoes], // if alimentacao
          roupaCama: [this.Voluntary.localDescanso.roupaCama], // switch
          qtQuartos: [this.Voluntary.localDescanso.qtQuartos], // number
          qtSuites: [this.Voluntary.localDescanso.qtSuites], // number
          qtCamasCasal: [this.Voluntary.localDescanso.qtCamasCasal], // number
          qtCamasSolteiro: [this.Voluntary.localDescanso.qtCamasSolteiro], // number
          servicosDisponibilizados: this.formBuilder.group({
            // todos switch
            piscina: [
              this.Voluntary.localDescanso.servicosDisponibilizados.piscina,
            ],
            quadra: [
              this.Voluntary.localDescanso.servicosDisponibilizados.quadra,
            ],
            restaurante: [
              this.Voluntary.localDescanso.servicosDisponibilizados.restaurante,
            ],
            TV: [this.Voluntary.localDescanso.servicosDisponibilizados.TV],
            internet: [
              this.Voluntary.localDescanso.servicosDisponibilizados.internet,
            ],
            garagem: [
              this.Voluntary.localDescanso.servicosDisponibilizados.garagem,
            ],
            outrosServicosOferecidos: [
              this.Voluntary.localDescanso.servicosDisponibilizados.outrosServicosOferecidos,
            ],
            outrosServicosOferecidosDescrito: [
              this.Voluntary.localDescanso.servicosDisponibilizados
                .outrosServicosOferecidos,
            ], // if outros
          }),
        }),
      },
      {
        validator: [
          Validating.conditionallyRequired,
          Validating.equalPasswords,
        ],
      } as AbstractControlOptions
    );
    // this.formulario = this.formBuilder.group(
    //   {
    //     _id: this.Voluntary._id,
    //     nome: [
    //       'TESTE FORMULARIO',
    //       [
    //         Validators.required,
    //         Validators.minLength(3),
    //         Validators.maxLength(100),
    //       ],
    //     ],
    //     dataNascimento: ['10111995', [Validators.required]],
    //     sexo: ['M', [Validators.required]],

    //     endereco: this.formBuilder.group({
    //       rua: ['RUA TESTE'],
    //       numero: ['TESTE'],
    //       bairro: ['321'],
    //       cidade: [ 'Cidade testes'],
    //       complemento: ['perto da conclusão'],
    //       uf: ['RO'],
    //       CEP: ['03122010'],
    //     }),

    //     profissao: ['profissão teste', [Validators.required]],
    //     telefone: ['021988734469', [Validators.required]],
    //     telefoneFx: ['021988734469'],
    //     EstadoCivil: ['solteiro'],
    //     imgFilePrincipal: [null, [Validating.requiredFileTypeImg]],
    //     email: ['teste@teste', [Validators.required, Validators.email]],
    //     password: ['321321321'],
    //     password2: ['321321321'],
    //     nomeIg: ['teste', [Validators.required]],
    //     pastor: ['teste', [Validators.required]],

    //     typeVoluntary: this.formBuilder.group({
    //       chekbox1Profissao: [true],
    //       chekbox2Intercessor: [
    //         this.Voluntary.typeVoluntary.chekbox2Intercessor,
    //       ],
    //       chekbox3Cuidador: [this.Voluntary.typeVoluntary.chekbox3Cuidador],
    //       chekbox4CasaDescanso: [
    //         true,
    //       ],
    //     }),

    //     chekbox5Aconselhamento: [this.Voluntary.chekbox5Aconselhamento],
    //     especialidade: ['this.Voluntary.especialidade'],
    //     servicoOferecido: ['this.Voluntary.servicoOferecido'],
    //     imgsCasaDescansoFile: [null, [Validating.requiredFileTypeImg]],
    //     // imgsCasaDescansoFile: [null,  this.isCasaDescanso? Validators.required, requiredFileTypeImg():''],
    //     imgFileCasaDescansoPrincipal: [null, [Validating.requiredFileTypeImg]],
    //     // imgFileCasaDescansoPrincipal: [null,  this.isCasaDescanso? [Validators.required, requiredFileTypeImg()]: ''],
    //     dataCad: [this.Voluntary.dataCad],
    //     status: [this.Voluntary.status],

    //     localDescanso: this.formBuilder.group({
    //       typeLocalDescanso: this.formBuilder.group({
    //         casaDePraia: [
    //           this.Voluntary.localDescanso.typeLocalDescanso.casaDePraia,
    //         ],
    //         casaDeCampo: [
    //           true,
    //         ],
    //         pousada: [true],
    //         hotel: [this.Voluntary.localDescanso.typeLocalDescanso.hotel],
    //         outros: [this.Voluntary.localDescanso.typeLocalDescanso.outros],
    //       }),

    //       nomeLocalDescanso: ['this.Voluntary.localDescanso.nomeLocalDescanso'],
    //       CNPJLocalDescanso: ['101522336'],
    //       enderecoLocalDescanso: this.formBuilder.group({
    //         ruaLocalDescanso: [
    //           'rua teste'
    //         ],
    //         numeroLocalDescanso: [
    //           '32165161'
    //         ],
    //         complementoLocalDescanso: [
    //          'complemento'
    //         ],
    //         CEPLocalDescanso: [
    //           '321351651321516'
    //         ],
    //         bairroLocalDescanso: [
    //           'teste'
    //         ],
    //         cidadeLocalDescanso: [
    //           'teste'
    //         ],
    //         ufLocalDescanso: [
    //          'RO'
    //         ],
    //       }),
    //       disponibilidadeDuranteAno: [
    //        true,
    //       ], // switch
    //       mesesNaoDisponivel: ['7'],
    //       mesesNaoDisponivelDescrito: [
    //         this.Voluntary.localDescanso.mesesNaoDisponivelDescrito,
    //       ], // tentar criar um select que possa selecionar mais de um ítem
    //       maximoDiariaPg: ['11561'], // tipo moeda
    //       maximoHospedesPorVez: [
    //         '10',
    //       ], // number
    //       qtFamiliaMes: ['10'], // number
    //       custoHospedagem: [true], // switch
    //       valorHospedagem: ['500'], // if custoHospedagem
    //       alimentacao: [true], // switch
    //       custoAlimentacao: ['150'], // if alimentacao //switch
    //       valorRefeicoes: ['90'], // if alimentacao
    //       roupaCama: [true], // switch
    //       qtQuartos: ['10'], // number
    //       qtSuites: ['8'], // number
    //       qtCamas: ['20'], // number
    //       servicosDisponibilizados: this.formBuilder.group({
    //         // todos switch
    //         piscina: [
    //           true,
    //         ],
    //         quadra: [
    //           true
    //         ],
    //         restaurante: [
    //           true
    //         ],
    //         TV: [this.Voluntary.localDescanso.servicosDisponibilizados.TV],
    //         internet: [
    //           this.Voluntary.localDescanso.servicosDisponibilizados.internet,
    //         ],
    //         garagem: [
    //           true
    //         ],
    //         outrosServicosOferecidos: [
    //           this.Voluntary.localDescanso.servicosDisponibilizados.outros,
    //         ],
    //         outrosServicosOferecidosDescrito: [
    //           this.Voluntary.localDescanso.servicosDisponibilizados
    //             .outrosServicosOferecidos,
    //         ], // if outros
    //       }),
    //     }),
    //   },
    //   {
    //     validator: [
    //       Validating.conditionallyRequired,
    //       Validating.equalPasswords,
    //     ],
    //   } as AbstractControlOptions
    // );
    console.log(this.formulario.controls);
    console.log(this.imgFilePrincipal);
  }

  async onSubmit(): Promise<void> {
    this.cleanValidationsIFLocalDescanso(); // limpa validações se local descanso false
    this.cleanValidationsIF_id(); // limpa validações se _id contido
    this.findAllErrors();
    // this.findAllValid();

    this.findErrors(this.formulario);
    this.findErrors(this.endereco);
    this.findErrors(this.typeVoluntary);
    this.findErrors(this.localDescanso);
    this.findErrors(this.typeLocalDescanso);
    this.findErrors(this.enderecoLocalDescanso);
    this.findErrors(this.servicosDisponibilizados);

    this.findValid(this.formulario);
    this.findValid(this.endereco);
    this.findValid(this.typeVoluntary);
    this.findValid(this.localDescanso);
    this.findValid(this.typeLocalDescanso);
    this.findValid(this.enderecoLocalDescanso);
    this.findValid(this.servicosDisponibilizados);

    // função executada no clicar do botão principal
    if (this.formulario.valid) {
      // só entra neste if se passar por todas as validações
      if (!this.Voluntary._id) {
        // só entra neste if se não tiver id, pq se tiver id se trata de uma atualização de cadastro
        this.salveVoluntaryCTRL(); // função que cria um novo voluntário nas bases de dados
      } else {
        this.UpdateVoluntaryCTRL(this.formulario.value); // função que atualiza os dados de uma base existente
      }
    } else {
      // se não passar pelas validações
      this.activAlert('danger', 'Atenção, preencha os campos obrigatórios');
      console.log('formulario invalido');
      console.log('valid do formulario ::::', this.formulario.valid);

      this.formulario.markAllAsTouched();
      this.formulario.markAsPristine();

    }
  }

  // atualiza os dados dos voluntarios

  public UpdateVoluntaryCTRL(VoluntaryDataFormUpdated: VoluntaryModel): void {

    this.voluntaryService.updateVolunteerID(VoluntaryDataFormUpdated).subscribe(
      (voluntary) => {
        this.activAlert(
          'success',
          `Os dados do ${this.formulario.value.nome} foram alterados com sucesso`
        );

        console.log(
          `Os dados do ${this.Voluntary.nome} foram alterados com sucesso`
        );
      },
      (error) => {
        console.log('Console do Erro', error);

        if (error.StatusCode === 413) {
          this.activAlert(
            'danger',
            `Os dados do ${this.formulario.value.nome} não puderam ser alterados :: ALGUMAS DAS IMAGENS ENVIADAS ESTÁ  EXCEDENDO O TAMANHO PERMITIDO, REVEJA `
          );
        }
        if (error.StatusCode === 400) {
          this.activAlert(
            'danger',
            `Os dados do ${this.formulario.value.nome} não puderam ser alterados :: VOCÊ ESTÁ ADICIONANDO QUANTIDADE DE IMAGENS MAIOR DO QUE APERMITIDA, REVEJA `
          );
        }

        console.error(
          `Os dados do ${this.Voluntary.nome} não puderam ser alterados: => Relatório: ${error}`
        );
      }
    );
  }
  public salveVoluntaryCTRL(): void {
    if (this.formulario !== undefined) {
      this.settingRegistrationDate();
      this.addingStatusToVolunteer();

      this.voluntaryService.saveVolunteer(this.formulario.value).subscribe(
        (voluntary) => {
          this.activAlert(
            'success',
            `os dados de ${this.formulario.value.nome} foram cadastrados com sucesso!`
          ),
            console.log(
              `Os dados do ${this.Voluntary.nome} foram salvos com sucesso`
            );
          this.formulario.reset(); // reseta formulário
          this.resetImg();
        },
        (error) => {
          this.activAlert(
            'danger',
            'Por algum motivo os dados não puderam ser salvos'
          );
          console.error(
            `Os dados do ${this.Voluntary.nome} não puderam ser salvos: => Relatório: ${error}`
          );
        }
      );
    }
  }

  // FUNÇÕES DE CONTROLES DE ALERTS

  public activAlert(typeAlert: string, mensagem: string): void {
    (this.alertState = this.alertService.toggle('show')),
      this.alertService.content(mensagem),
      (this.style = this.alertService.style(typeAlert));

    setTimeout(() => {
      // fecha o alert após 15 segundos
      this.toggle('hide');
    }, 15000);
  }
  // FUNÇÃO DE ESTILIZAÇÃO DE ALERTS
  public typeStyle(): {} {
    const alertStyle = this.alertService.style('');
    return {
      success: alertStyle === 'success',
      warning: alertStyle === 'warning',
      information: alertStyle === 'information',
      danger: alertStyle === 'danger',
    };
  }

  // FUNÇÕES DE VALIDAÇÃO DE FORMULÁRIO

  // função compara se o valor inserido este neste input password2 é igual ao inserido no input password

  onFileSelect(event, field: string): void {
    if (event.target.files.length > 0) {
      const file = event.target.files as File;
      this.formulario.get(field).setValue(file);
      this.imgFilePrincipalHaveFile = field === 'imgFilePrincipal' ? true : undefined;
      this.imgFileCasaDescansoPrincipalHaveFile = field === 'imgFileCasaDescansoPrincipal' ? true : undefined;
      this.imgsCasaDescansoFileHaveFile = field === 'imgsCasaDescansoFile' ? true : undefined;
    } else {
      this.imgFilePrincipalHaveFile = field === 'imgFilePrincipal' ? false : undefined;
      this.imgFileCasaDescansoPrincipalHaveFile = field === 'imgFileCasaDescansoPrincipal' ? false : undefined;
      this.imgsCasaDescansoFileHaveFile = field === 'imgsCasaDescansoFile' ? false : undefined;
    }
  }

  settingRegistrationDate(): void {
    const data = new Date();
    const dataCad = `${data.getDate()}/${data.getMonth() + 1
      }/${data.getFullYear()}`;
    this.formulario.controls.dataCad.setValue(dataCad);
  }
  addingStatusToVolunteer(): void {
    const VoluntaryActive = 'ACTIVE';
    this.formulario.controls.status.setValue(VoluntaryActive);
  }

  findErrors(formulario): void {
    Object.keys(formulario.controls).forEach((key) => {
      const controlErrors: ValidationErrors = formulario.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          console.log(`Key control: ${key}, keyError: ${keyError} ${controlErrors[keyError]}`);
        });
      }
      if (controlErrors instanceof FormGroup) {
        this.findValid(key);
      }

    });
  }
  findAllErrors(): void {
    this.findErrors(this.formulario);
    this.findErrors(this.endereco);
    this.findErrors(this.typeVoluntary);
    this.findErrors(this.localDescanso);
    this.findErrors(this.typeLocalDescanso);
    this.findErrors(this.enderecoLocalDescanso);
    this.findErrors(this.servicosDisponibilizados);
    if (this.imgsCasaDescansoFile.errors) {
      console.log(`Erro imgsCasaDescansoFile ERROR ::: ${this.imgsCasaDescansoFile.errors}`);

    }
  }
  findAllValid(): void {
    this.findValid(this.formulario);
    this.findValid(this.endereco);
    this.findValid(this.typeVoluntary);
    this.findValid(this.localDescanso);
    this.findValid(this.typeLocalDescanso);
    this.findValid(this.enderecoLocalDescanso);
    this.findValid(this.servicosDisponibilizados);

  }

  findValid(formulario: any): void {
    Object.keys(formulario.controls).forEach((key) => {
      const controlValid = formulario.get(key).valid;
      if (!controlValid) {
        console.log(`Key : ${key} keyValid: ${controlValid}`
        );
      }
      if (controlValid instanceof FormGroup) {
        this.findValid(key);
      }
    });
  }

  applyCss(campo: string): {} {
    return this.formValidationControl.showValidations(campo, this.formulario);
  }
  applyCssGroup(campo: string): {} {
    return this.formValidationControl.showValidationsGroup(campo, this.formulario);
  }

  resetImg(): void {
    this.imgFileCasaDescansoPrincipal.reset();
    this.imgFileCasaDescansoPrincipal.setValue(null);
    this.imgFilePrincipal.reset();
    this.imgFilePrincipal.setValue(null);
    this.imgsCasaDescansoFile.reset();
    this.imgsCasaDescansoFile.setValue(null);
  }
  cleanValidationsIFLocalDescanso(): void {
    if (!this.chekbox4CasaDescanso.value) {
      Validating.cleanRequired(this.imgsCasaDescansoFile);
      Validating.cleanRequired(this.imgFileCasaDescansoPrincipal);
      Validating.cleanRequired(this.enderecoLocalDescanso);
      Validating.cleanRequired(this.localDescanso);
    }
  }
  cleanValidationsIF_id(): void {
    if (this.Voluntary._id) {
      Validating.cleanRequired(this.localDescanso);
      Validating.cleanRequired(this.servicosDisponibilizados);
      Validating.cleanRequired(this.imgsCasaDescansoFile);
      this.imgsCasaDescansoFile.setErrors(null);
      Validating.cleanRequired(this.imgFileCasaDescansoPrincipal);
    }
  }
  // quando o cliente clica para atualizar ou cadastrar um voluntário a aplicação chama o guard para

  // ______________________________________GET_________________________________________

  get _id(): AbstractControl {
    return this.formulario.get('_id');
  }
  get nome(): AbstractControl {
    return this.formulario.get('nome');
  }
  get dataNascimento(): AbstractControl {
    return this.formulario.get('dataNascimento');
  }
  get sexo(): AbstractControl {
    return this.formulario.get('sexo');
  }

  get endereco(): AbstractControl {
    return this.formulario.get('endereco');
  }

  get rua(): AbstractControl {
    return this.formulario.get(['endereco', 'rua']);
  }
  get numero(): AbstractControl {
    return this.formulario.get(['endereco', 'numero']);
  }
  get bairro(): AbstractControl {
    return this.formulario.get(['endereco', 'bairro']);
  }
  get cidade(): AbstractControl {
    return this.formulario.get(['endereco', 'cidade']);
  }
  get complemento(): AbstractControl {
    return this.formulario.get(['endereco', 'complemento']);
  }
  get uf(): AbstractControl {
    return this.formulario.get(['endereco', 'uf']);
  }
  get CEP(): AbstractControl {
    return this.formulario.get(['endereco', 'CEP']);
  }
  get profissao(): AbstractControl {
    return this.formulario.get('profissao');
  }
  get telefone(): AbstractControl {
    return this.formulario.get('telefone');
  }
  get telefoneFx(): AbstractControl {
    return this.formulario.get('telefoneFx');
  }
  get EstadoCivil(): AbstractControl {
    return this.formulario.get('EstadoCivil');
  }
  get imgFilePrincipal(): AbstractControl {
    return this.formulario.get('imgFilePrincipal');
  }
  get email(): AbstractControl {
    return this.formulario.get('email');
  }
  get password(): AbstractControl {
    return this.formulario.get('password');
  }
  get password2(): AbstractControl {
    return this.formulario.get('password2');
  }
  get nomeIg(): AbstractControl {
    return this.formulario.get('nomeIg');
  }
  get pastor(): AbstractControl {
    return this.formulario.get('pastor');
  }

  get typeVoluntary(): AbstractControl {
    return this.formulario.get('typeVoluntary');
  }
  get chekbox1Profissao(): AbstractControl {
    return this.formulario.get(['typeVoluntary', 'chekbox1Profissao']);
  }
  get chekbox2Intercessor(): AbstractControl {
    return this.formulario.get(['typeVoluntary', 'chekbox2Intercessor']);
  }
  get chekbox3Cuidador(): AbstractControl {
    return this.formulario.get(['typeVoluntary', 'chekbox3Cuidador']);
  }
  get chekbox4CasaDescanso(): AbstractControl {
    return this.formulario.get(['typeVoluntary', 'chekbox4CasaDescanso']);
  }
  get chekbox5Aconselhamento(): AbstractControl {
    return this.formulario.get('chekbox5Aconselhamento');
  }
  get especialidade(): AbstractControl {
    return this.formulario.get('especialidade');
  }
  get servicoOferecido(): AbstractControl {
    return this.formulario.get('servicoOferecido');
  }
  get imgsCasaDescansoFile(): AbstractControl {
    return this.formulario.get('imgsCasaDescansoFile');
  }
  get imgFileCasaDescansoPrincipal(): AbstractControl {
    return this.formulario.get('imgFileCasaDescansoPrincipal');
  }
  get dataCad(): AbstractControl {
    return this.formulario.get('dataCad');
  }
  get status(): AbstractControl {
    return this.formulario.get('status');
  }
  get localDescanso(): AbstractControl {
    return this.formulario.get('localDescanso');
  }

  get typeLocalDescanso(): AbstractControl {
    return this.formulario.get(['localDescanso', 'typeLocalDescanso']);
  }
  get casaDePraia(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'typeLocalDescanso',
      'casaDePraia',
    ]);
  }
  get casaDeCampo(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'typeLocalDescanso',
      'casaDeCampo',
    ]);
  }
  get pousada(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'typeLocalDescanso',
      'pousada',
    ]);
  }
  get hotel(): AbstractControl {
    return this.formulario.get(['localDescanso', 'typeLocalDescanso', 'hotel']);
  }
  get outros(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'typeLocalDescanso',
      'outros',
    ]);
  }
  get nomeLocalDescanso(): AbstractControl {
    return this.formulario.get(['localDescanso', 'nomeLocalDescanso']);
  }
  get CNPJLocalDescanso(): AbstractControl {
    return this.formulario.get(['localDescanso', 'CNPJLocalDescanso']);
  }
  get enderecoLocalDescanso(): AbstractControl {
    return this.formulario.get(['localDescanso', 'enderecoLocalDescanso']);
  }

  get ruaLocalDescanso(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'enderecoLocalDescanso',
      'ruaLocalDescanso',
    ]);
  }
  get numeroLocalDescanso(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'enderecoLocalDescanso',
      'numeroLocalDescanso',
    ]);
  }
  get complementoLocalDescanso(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'enderecoLocalDescanso',
      'complementoLocalDescanso',
    ]);
  }
  get CEPLocalDescanso(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'enderecoLocalDescanso',
      'CEPLocalDescanso',
    ]);
  }
  get bairroLocalDescanso(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'enderecoLocalDescanso',
      'bairroLocalDescanso',
    ]);
  }
  get cidadeLocalDescanso(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'enderecoLocalDescanso',
      'cidadeLocalDescanso',
    ]);
  }
  get ufLocalDescanso(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'enderecoLocalDescanso',
      'ufLocalDescanso',
    ]);
  }
  get disponibilidadeDuranteAno(): AbstractControl {
    return this.formulario.get(['localDescanso', 'disponibilidadeDuranteAno']);
  }
  get mesesNaoDisponivel(): AbstractControl {
    return this.formulario.get(['localDescanso', 'mesesNaoDisponivel']);
  }
  get mesesNaoDisponivelDescrito(): AbstractControl {
    return this.formulario.get(['localDescanso', 'mesesNaoDisponivelDescrito']);
  }
  get maximoDiariaPg(): AbstractControl {
    return this.formulario.get(['localDescanso', 'maximoDiariaPg']);
  }
  get maximoHospedesPorVez(): AbstractControl {
    return this.formulario.get(['localDescanso', 'maximoHospedesPorVez']);
  }
  get qtFamiliaMes(): AbstractControl {
    return this.formulario.get(['localDescanso', 'qtFamiliaMes']);
  }
  get custoHospedagem(): AbstractControl {
    return this.formulario.get(['localDescanso', 'custoHospedagem']);
  }
  get valorHospedagem(): AbstractControl {
    return this.formulario.get(['localDescanso', 'valorHospedagem']);
  }
  get alimentacao(): AbstractControl {
    return this.formulario.get(['localDescanso', 'alimentacao']);
  }
  get custoAlimentacao(): AbstractControl {
    return this.formulario.get(['localDescanso', 'custoAlimentacao']);
  }
  get valorRefeicoes(): AbstractControl {
    return this.formulario.get(['localDescanso', 'valorRefeicoes']);
  }
  get roupaCama(): AbstractControl {
    return this.formulario.get(['localDescanso', 'roupaCama']);
  }
  get qtQuartos(): AbstractControl {
    return this.formulario.get(['localDescanso', 'qtQuartos']);
  }
  get qtSuites(): AbstractControl {
    return this.formulario.get(['localDescanso', 'qtSuites']);
  }
  get qtCamasCasal(): AbstractControl {
    return this.formulario.get(['localDescanso', 'qtCamasCasal']);
  }
  get qtCamasSolteiro(): AbstractControl {
    return this.formulario.get(['localDescanso', 'qtCamasSolteiro']);
  }
  get servicosDisponibilizados(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados']);
  }
  get piscina(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'servicosDisponibilizados',
      'piscina',
    ]);
  }
  get quadra(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'servicosDisponibilizados',
      'quadra',
    ]);
  }
  get restaurante(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'servicosDisponibilizados',
      'restaurante',
    ]);
  }
  get TV(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'servicosDisponibilizados',
      'TV',
    ]);
  }
  get internet(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'servicosDisponibilizados',
      'internet',
    ]);
  }
  get garagem(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'servicosDisponibilizados',
      'garagem',
    ]);
  }
  get outrosServicosOferecidos(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'servicosDisponibilizados',
      'outrosServicosOferecidos',
    ]);
  }
  get outrosServicosOferecidosDescrito(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'servicosDisponibilizados',
      'outrosServicosOferecidosDescrito',
    ]);
  }
}
