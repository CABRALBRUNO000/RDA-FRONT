import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Validating } from './../../util/validacoes';
import { AdministratorModel } from './../../../shared/entities/administrator.model';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { alertAnimation } from 'src/app/shared/services/alert-animation';
import { FormValidationControl } from '../../services/form-validation-control.service';
import { threadId } from 'worker_threads';
import { AdminService } from '../../../adminUsers/admin.service';

@Component({
  selector: 'app-formCadAdminUsers',
  templateUrl: './formCadAdminUsers.component.html',
  styleUrls: ['./formCadAdminUsers.component.css', './../../app-forms.css'],
  animations: [alertAnimation],
})
export class FormCadAdminUsersComponent implements OnInit {
  public formulario: FormGroup; // formulario em questão
  public Adminstrator: AdministratorModel;
  alertState = 'hide';
  style: any;
  imgAdminHaveFile: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private formValidationControl: FormValidationControl,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.Adminstrator = this.route.snapshot.data.adminstrator; // recebe os dados capturados do guard e guarda na variável voluntary

    this.formulario = this.formBuilder.group(
      {
        nome: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ],
        ],
        typeUser: ['ADMINISTRATOR'],
        email: ['', [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        password2: [null],
        dataCad: [null],
        status: [null],
        sexo: [null],
        dataNascimento: [null],
        imgAdmin: [null, [Validating.requiredFileTypeImg]]
      },
      {
        validator: [Validating.equalPasswords],
      } as AbstractControlOptions
    );
  }
  onSubmit(): void {
    this.formValidationControl.findValid(this.formulario);
    this.formValidationControl.findErrors(this.formulario);

    if (this.formulario.valid) {
      this.salveAdminCTRL();
    } else {
      this.activAlert('danger', 'Atenção, preencha os campos obrigatórios');
      console.log('formulario invalido');
      console.log('valid do formulario ::::', this.formulario.valid);
      this.formulario.markAllAsTouched();
      this.formulario.markAsPristine();
    }
  }
  public salveAdminCTRL(): void {
    if (this.formulario !== undefined) {
      this.settingRegistrationDate();
      this.addingStatusToAdministrators();

      this.adminService.saveAdministrators(this.formulario.value).subscribe(
        (adminUser) => {
          this.activAlert(
            'success',
            `os dados de ${this.nome} foram cadastrados com sucesso!`
          ),
            console.log(`Os dados do ${this.nome} foram salvos com sucesso`);
          this.formulario.reset(); // reseta formulário
        },
        (error) => {
          this.activAlert(
            'danger',
            'Por algum motivo os dados não puderam ser salvos'
          );
          console.error(
            `Os dados do ${this.nome} não puderam ser salvos: => Relatório: ${error}`
          );
        }
      );
    }
  }

  // FUNÇÕES DE CONTROLE DE VALIDAÇÃO
  applyCss(campo: string): {} {
    return this.formValidationControl.showValidations(campo, this.formulario);
  }
  applyCssGroup(campo: string): {} {
    return {
      'is-invalidRadios':
        this.formulario.get(campo).touched && this.formulario.get(campo).errors,
      'is-validRadios':
        this.formulario.get(campo).touched &&
        !this.formulario.get(campo).errors,
    };
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
  // FUNÇÕES DE CONTROLES DE ALERTS
  public toggle(view?: string): void {
    this.alertState = this.alertService.toggle(view);
  }
  public activAlert(typeAlert: string, mensagem: string): void {
    (this.alertState = this.alertService.toggle('show')),
      this.alertService.content(mensagem),
      (this.style = this.alertService.style(typeAlert));

    setTimeout(() => {
      // fecha o alert após 15 segundos
      this.toggle('hide');
    }, 15000);
  }

  settingRegistrationDate(): void {
    const data = new Date();
    const dataCad = `${data.getDate()}/${
      data.getMonth() + 1
    }/${data.getFullYear()}`;
    this.formulario.controls.dataCad.setValue(dataCad);
  }
  addingStatusToAdministrators(): void {
    const administrators = 'ACTIVE';
    this.formulario.controls.status.setValue(administrators);
  }
// adicina a imagem ao formulario
  onFileSelect(event, field: string): void {
    if (event.target.files.length > 0) {
      const file = event.target.files as File;
      if (file.name){}
      this.imgAdmin.setValue(file);
      console.log(this.imgAdmin);
      this.imgAdminHaveFile = field === 'imgAdmin' ? true : undefined;
    } else {
      this.imgAdminHaveFile = field === 'imgAdmin' ? false : undefined;
    }
  }

  get password(): AbstractControl {
    return this.formulario.get('password');
  }
  get password2(): AbstractControl {
    return this.formulario.get('password2');
  }
  get nome(): AbstractControl {
    return this.formulario.get('nome');
  }
  get email(): AbstractControl {
    return this.formulario.get('email');
  }
  get imgAdmin(): AbstractControl {
    return this.formulario.get('imgAdmin');
  }
}
