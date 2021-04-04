import { Voluntary } from './../../../../../../api-rda/src/shared/voluntary';
import { UploadImageService } from './../../services/upload-image.service';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
  FormControl,
} from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { VoluntaryService } from 'src/app/volunteers/services/voluntary.service';
import { VoluntaryModel } from './../../../shared/voluntary.model';
import { alertAnimation } from './../../../shared/services/alert-animation';
import { AlertService } from './../../../shared/services/alert.service';
import { requiredFileTypeImg } from '../../fileUpload/requiredFileType';
import { timeStamp } from 'console';

@Component({
  selector: 'app-form-cad',
  templateUrl: './form-cad.component.html',
  styleUrls: ['./../../../app.component.css', './form-cad.component.css'],
  providers: [VoluntaryService],
  animations: [alertAnimation],
})
export class FormCadComponent implements OnInit {
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
  samePassword: boolean = null;
  inputPasswordValidity: any;

  hasArchive: boolean = null;
  isCasaDescanso: boolean

  constructor(
    private voluntaryService: VoluntaryService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private uploadImageService: UploadImageService
  ) { }

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
        null,this.Voluntary._id? requiredFileTypeImg(): [Validators.required, requiredFileTypeImg()],
      ],
      email: [this.Voluntary.email, [Validators.required, Validators.email]],
      password: [null,this.Voluntary._id? '': [Validators.required, Validators.minLength(8)],
      ],
      password2: [null, this.Voluntary._id ? '' : [Validators.required]],
      nomeIg: [this.Voluntary.nomeIg, [Validators.required]],
      pastor: [this.Voluntary.pastor, [Validators.required]],
      chekbox1Profissao: [this.Voluntary.chekbox1Profissao],
      chekbox2Intercessor: [this.Voluntary.chekbox2Intercessor],
      chekbox3Cuidador: [this.Voluntary.chekbox3Cuidador],
      chekbox4CasaDescanso: [this.Voluntary.chekbox4CasaDescanso],
      chekbox5Aconselhamento: [this.Voluntary.chekbox5Aconselhamento],
      especialidade: [this.Voluntary.especialidade],
      servicoOferecido: [this.Voluntary.servicoOferecido],
      imgsCasaDescansoFile: [null, [requiredFileTypeImg()]],
      // imgsCasaDescansoFile: [null,  this.isCasaDescanso? Validators.required, requiredFileTypeImg():''],
      imgFileCasaDescansoPrincipal: [null, [requiredFileTypeImg()]],
      // imgFileCasaDescansoPrincipal: [null,  this.isCasaDescanso? [Validators.required, requiredFileTypeImg()]: ''],
      dataCad: [this.Voluntary.dataCad],
      status: [this.Voluntary.status],
    });
  }
 

  async onSubmit() {
    // função executada no clicar do botão principal
    this.brandRadios(); // se pelo menos um radio foi marcado
    if (this.formulario.valid && this.brandRadiosValidator) {
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
      this.settingRegistrationDate()
      this.addingStatusToVolunteer()

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
        'FileIs-invalid':
          this.hasArchive && this.formulario.get(campo).invalid,
        'FileIs-valid':
          !this.formulario.get(campo).invalid && this.hasArchive,
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
  setRadios(e: any, namefield: string) {
    // Pega o valor que está no chekbox e guarda dentro do fomulario para ser submetido quando for concluido o cadastro
    this.formulario.get(namefield).setValue(e.target.checked);
    this.isCasaDescanso = e.target.checked
    console.log("isCasaDescanso", this.isCasaDescanso);
    
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
    let dataCad = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    this.formulario.controls.dataCad.setValue(dataCad);
  }
  addingStatusToVolunteer() {
    let VoluntaryActive = 'ACTIVE'
    this.formulario.controls.status.setValue(VoluntaryActive);
  }

  // quando o cliente clica para atualizar ou cadastrar um voluntário a aplicação chama o guard para
}
