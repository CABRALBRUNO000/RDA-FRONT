import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VoluntaryService } from 'src/app/volunteers/services/voluntary.service';

import { requiredFileTypeImg } from '../../fileUpload/requiredFileType';
import { alertAnimation } from './../../../shared/services/alert-animation';
import { AlertService } from './../../../shared/services/alert.service';
import { VoluntaryModel } from './../../../shared/voluntary.model';
import { UploadImageService } from './../../services/upload-image.service';

@Component({
  selector: 'app-form-cad',
  templateUrl: './form-cad.component.html',
  styleUrls: ['./form-cad.component.css'],
  providers: [VoluntaryService],
  animations: [alertAnimation],
})
export class FormCadComponent implements OnInit, OnChanges {
  alertState: string = 'hide';

  public Voluntary: VoluntaryModel;
  public formulario: FormGroup; // formulario em questão

  alertSuccess: boolean = true;
  alertDanger: boolean;
  alertMessage: string;
  alertActivated: any;
  alertStyle: any;
  style: any;
  brandRadiosValidator: boolean = undefined;
  brandRadiosValidatorLocalDescanso: boolean = undefined;
  samePassword: boolean = null;
  inputPasswordValidity: any;
  disponibilidadeAno: string =
    'Sim, o local estará disponível durante todo o ano';
    // custoHospedagem: string = 'Não, o local será disponibilizado gratuitamente';
    custoHospedagem: string = 'Haverá algum custo de hospedagem?';
    comercioAlimetacao: string = 'O local providencia algum tipo de alimentação?';
  custoAlimetacao: string = 'haverá algum custo de alimentação?';

  hasArchive: boolean = null;
  isCasaDescanso: boolean;

  constructor(
    private voluntaryService: VoluntaryService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private uploadImageService: UploadImageService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  setMensagem(field: string) {
    if (field == 'disponibilidadeDuranteAno') {
      this.disponibilidadeAno =
        this.formulario.value.localDescanso.disponibilidadeDuranteAno == true
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
    if (field == 'custoHospedagem') {
      this.custoHospedagem =
        this.formulario.value.localDescanso.custoHospedagem == false
          ? 'Não, o local será disponibilizado gratuitamente'
          : 'Sim, o Missionário terá custos de Hospedagem';
      if (!this.formulario.value.localDescanso.custoHospedagem) {
        this.formulario.get(['localDescanso', 'valorHospedagem']).setValue('');
      }
    }
    if (field == 'alimentacao') {
      this.comercioAlimetacao =
        this.formulario.value.localDescanso.alimentacao == true
          ? 'Sim, o local Comercializa alimentos'
          : 'Não, o local não Comercializa alimentos';
    }
    if (field == 'custoAlimentacao') {
      this.custoAlimetacao =
        this.formulario.value.localDescanso.custoAlimentacao == true
          ? 'Sim, Será cobrado o que for consumido'
          : 'Não, para este hóspede não haverão custos de alimentação';

    }
  }

  public toggle(view?: String) {
    this.alertState = this.alertService.toggle(view);
  }

  ngOnInit(): void {
    this.Voluntary = this.route.snapshot.data['voluntary']; // recebe os dados capturados do guard e guarda na variável voluntary

    this.formulario = this.formBuilder.group({
      _id: this.Voluntary._id,
      nome: [
        this.Voluntary.nome,
        [Validators.required, Validators.minLength(3)],
      ],
      dataNascimento: [this.Voluntary.dataNascimento, [Validators.required]],

      sexo: [this.Voluntary.sexo, [Validators.required]],

      rua: [this.Voluntary.rua],
      numero: [this.Voluntary.numero],
      bairro: [this.Voluntary.bairro],
      cidade: [this.Voluntary.cidade],
      complemento: [this.Voluntary.complemento],
      uf: [this.Voluntary.uf],
      CEP: [this.Voluntary.CEP],

      profissao: [this.Voluntary.profissao, [Validators.required]],
      telefone: [this.Voluntary.telefone, [Validators.required]],
      telefoneFx: [this.Voluntary.telefoneFx],
      EstadoCivil: [this.Voluntary.estadoCivil],
      //imgFilePrincipal: [null, [Validators.required, requiredFileTypeImg()]],
      imgFilePrincipal: [
        null,
        this.Voluntary._id
          ? requiredFileTypeImg()
          : [Validators.required, requiredFileTypeImg()],
      ],
      email: [this.Voluntary.email, [Validators.required, Validators.email]],
      password: [
        null,
        this.Voluntary._id
          ? ''
          : [Validators.required, Validators.minLength(8)],
      ],
      password2: [null, this.Voluntary._id ? '' : [Validators.required]],
      nomeIg: [this.Voluntary.nomeIg, [Validators.required]],
      pastor: [this.Voluntary.pastor, [Validators.required]],
      chekbox1Profissao: [this.Voluntary.chekbox1Profissao],
      chekbox2Intercessor: [this.Voluntary.chekbox2Intercessor],
      chekbox3Cuidador: [this.Voluntary.chekbox3Cuidador],
      chekbox4CasaDescanso: [true], //this.Voluntary.chekbox4CasaDescanso],
      chekbox5Aconselhamento: [this.Voluntary.chekbox5Aconselhamento],
      especialidade: [this.Voluntary.especialidade],
      servicoOferecido: [this.Voluntary.servicoOferecido],
      imgsCasaDescansoFile: [null, [requiredFileTypeImg()]],
      // imgsCasaDescansoFile: [null,  this.isCasaDescanso? Validators.required, requiredFileTypeImg():''],
      imgFileCasaDescansoPrincipal: [null, [requiredFileTypeImg()]],
      // imgFileCasaDescansoPrincipal: [null,  this.isCasaDescanso? [Validators.required, requiredFileTypeImg()]: ''],
      dataCad: [this.Voluntary.dataCad],
      status: [this.Voluntary.status],
      localDescanso: this.formBuilder.group({
        casaDePraia: [this.Voluntary.localDescanso.casaDePraia],
        casaDeCampo: [this.Voluntary.localDescanso.casaDeCampo],
        pousada: [this.Voluntary.localDescanso.pousada],
        hotel: [this.Voluntary.localDescanso.hotel],
        outros: [this.Voluntary.localDescanso.outros],
        nomeLocalDescanso: [this.Voluntary.localDescanso.nomeLocalDescanso],
        CNPJLocalDescanso: [this.Voluntary.localDescanso.CNPJLocalDescanso],
        ruaLocalDescanso: [this.Voluntary.localDescanso.ruaLocalDescanso],
        numeroLocalDescanso: [this.Voluntary.localDescanso.numeroLocalDescanso],
        complementoLocalDescanso: [
          this.Voluntary.localDescanso.complementoLocalDescanso,
        ],
        CEPLocalDescanso: [this.Voluntary.localDescanso.CEPLocalDescanso],
        bairroLocalDescanso: [this.Voluntary.localDescanso.bairroLocalDescanso],
        cidadeLocalDescanso: [this.Voluntary.localDescanso.cidadeLocalDescanso],
        ufLocalDescanso: [this.Voluntary.localDescanso.ufLocalDescanso],
        disponibilidadeDuranteAno: [
          this.Voluntary.localDescanso.disponibilidadeDuranteAno,
        ], //switch
        mesesNaoDisponivel: [this.Voluntary.localDescanso.mesesNaoDisponivel], // tentar criar um select que possa selecionar mais de um ítem
        mesesNaoDisponivelDescrito: [
          this.Voluntary.localDescanso.mesesNaoDisponivelDescrito,
        ], // tentar criar um select que possa selecionar mais de um ítem
        maximoDiariaPg: [this.Voluntary.localDescanso.maximoDiariaPg], // tipo moeda
        maximoHospedesPorVez: [
          this.Voluntary.localDescanso.maximoHospedesPorVez,
        ], //number
        qtFamiliaMes: [this.Voluntary.localDescanso.qtFamiliaMes], // number
        custoHospedagem: [this.Voluntary.localDescanso.custoHospedagem], //switch
        valorHospedagem: [this.Voluntary.localDescanso.valorHospedagem], // if custoHospedagem
        alimentacao: [this.Voluntary.localDescanso.alimentacao], //switch
        custoAlimentacao: [this.Voluntary.localDescanso.custoAlimentacao], // if alimentacao //switch
        valorRefeicoes: [this.Voluntary.localDescanso.valorRefeicoes], // if alimentacao
        roupaCama: [this.Voluntary.localDescanso.roupaCama], //switch
        qtQuartos: [this.Voluntary.localDescanso.qtQuartos], //number
        qtSuites: [this.Voluntary.localDescanso.qtSuites], //number
        qtCamas: [this.Voluntary.localDescanso.qtCamas], //number
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
            this.Voluntary.localDescanso.servicosDisponibilizados.outros,
          ],
          outrosServicosOferecidosDescrito: [
            this.Voluntary.localDescanso.servicosDisponibilizados
              .outrosServicosOferecidos,
          ], //if outros
        }),
      }),
    });
    console.log(this.formulario.controls);
  }

  async onSubmit() {
    // função executada no clicar do botão principal
    this.brandRadios(); // se pelo menos um radio foi marcado
    if (
      this.formulario.valid &&
      this.brandRadiosValidator &&
      this.brandRadiosValidatorLocalDescanso
    ) {
      //só entra neste if se passar por todas as validações
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
      Object.keys(this.formulario.controls).forEach((campo) => {
        const controle = this.formulario.get(campo);
        controle.markAsTouched();
      });

      //    this.hasArchive = true;
    }
  }

  //atualiza os dados dos voluntarios
  public UpdateVoluntaryCTRL(VoluntaryDataFormUpdated: VoluntaryModel) {
    this.voluntaryService.updateVoluntaryID(VoluntaryDataFormUpdated).subscribe(
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

        if (error.StatusCode == 413) {
          this.activAlert(
            'danger',
            `Os dados do ${this.formulario.value.nome} não puderam ser alterados :: ALGUMAS DAS IMAGENS ENVIADAS ESTÁ  EXCEDENDO O TAMANHO PERMITIDO, REVEJA `
          );
        }
        if (error.StatusCode == 400) {
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
  public salveVoluntaryCTRL() {
    if (this.formulario !== undefined) {
      this.settingRegistrationDate();
      this.addingStatusToVolunteer();

      this.voluntaryService.saveVoluntary(this.formulario.value).subscribe(
        (voluntary) => {
          this.activAlert(
            'success',
            `os dados de ${this.formulario.value.nome} foram cadastrados com sucesso!`
          ),
            console.log(
              `Os dados do ${this.Voluntary.nome} foram salvos com sucesso`
            );
          this.formulario.reset(); // reseta formulário
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

  public activAlert(typeAlert: string, mensagem: string) {
    (this.alertState = this.alertService.toggle('show')),
      this.alertService.content(mensagem),
      (this.style = this.alertService.style(typeAlert));

    setTimeout(() => {
      //fecha o alert após 15 segundos
      this.toggle('hide');
    }, 15000);
  }
  // FUNÇÃO DE ESTILIZAÇÃO DE ALERTS
  public typeStyle() {
    let alertStyle = this.alertService.style('');
    return {
      success: alertStyle == 'success',
      warning: alertStyle == 'warning',
      information: alertStyle == 'information',
      danger: alertStyle == 'danger',
    };
  }

  // FUNÇÕES DE VALIDAÇÃO DE FORMULÁRIO

  public aplicaCss(campo: string) {
    if (
      campo == 'imgFilePrincipal' ||
      campo == 'imgFileCasaDescansoPrincipal' ||
      campo == 'imgsCasaDescansoFile'
    ) {
      return {
        'FileIs-invalid': this.hasArchive && this.formulario.get(campo).invalid,
        'FileIs-valid': !this.formulario.get(campo).invalid && this.hasArchive,
      };
    }
    if (campo == 'password2') {
      return {
        'is-invalid':
          !this.samePassword &&
          (this.formulario.get(campo).touched ||
            this.formulario.get(campo).dirty),
        'is-valid': this.samePassword,
      };
    }
    return {
      'is-invalid':
        this.formulario.get(campo).invalid &&
        (this.formulario.get(campo).touched ||
          this.formulario.get(campo).dirty),
      'is-valid': this.formulario.get(campo).valid,
    };
  }

  // controle radios
  public brandRadios() {
    if (
      this.formulario.value.chekbox1Profissao |
      this.formulario.value.chekbox2Intercessor |
      this.formulario.value.chekbox3Cuidador |
      this.formulario.value.chekbox4CasaDescanso
    ) {
      this.brandRadiosValidator = true;
    } else {
      this.brandRadiosValidator = false;
      console.log('nenhum radio foi selecionado');
    }
  }

  brandRadiosLocalDescanso() {
    if (
      this.formulario.value.localDescanso.casaDePraia |
      this.formulario.value.localDescanso.casaDeCampo |
      this.formulario.value.localDescanso.pousada |
      this.formulario.value.localDescanso.hotel |
      this.formulario.value.localDescanso.outros
    ) {
      this.brandRadiosValidatorLocalDescanso = true;
    } else {
      this.brandRadiosValidatorLocalDescanso = false;
      console.log('nenhum radio local de descanso foi selecionado');
    }
  }

  setRadios(e: any, namefield: string) {
    // Pega o valor que está no chekbox e guarda dentro do fomulario para ser submetido quando for concluido o cadastro
    if (
      namefield == 'casaDePraia' ||
      namefield == 'casaDeCampo' ||
      namefield == 'pousada' ||
      namefield == 'hotel' ||
      namefield == 'outros'
    ) {
      if (namefield == 'casaDePraia')
        console.log(this.formulario.controls.localDescanso);
      if (namefield == 'casaDeCampo')
        console.log(this.formulario.value.localDescanso.casaDeCampo);
      if (namefield == 'pousada')
        console.log(this.formulario.value.localDescanso.pousada);
      if (namefield == 'hotel')
        console.log(this.formulario.value.localDescanso.hotel);
      if (namefield == 'outros')
        console.log(this.formulario.value.localDescanso.outros);
    } else {
      this.formulario.get(namefield).setValue(e.target.checked);
      this.isCasaDescanso = e.target.checked;
    }
  }

  // função compara se o valor inserido este neste input password2 é igual ao inserido no input password
  password2Comparator(e) {
    let password2 = e.target.value;
    if (this.formulario.value.password === password2) {
      this.samePassword = true;
    } else {
      this.samePassword = false;
    }
    console.log(this.samePassword);
  }

  onFileSelect(event, field: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files as File;
      this.formulario.get(field).setValue(file);
      this.hasArchive = true;
    } else {
      this.hasArchive = false;
    }
  }

  settingRegistrationDate() {
    let data = new Date();
    let dataCad = `${data.getDate()}/${
      data.getMonth() + 1
    }/${data.getFullYear()}`;
    this.formulario.controls.dataCad.setValue(dataCad);
  }
  addingStatusToVolunteer() {
    let VoluntaryActive = 'ACTIVE';
    this.formulario.controls.status.setValue(VoluntaryActive);
  }

  // quando o cliente clica para atualizar ou cadastrar um voluntário a aplicação chama o guard para
}
