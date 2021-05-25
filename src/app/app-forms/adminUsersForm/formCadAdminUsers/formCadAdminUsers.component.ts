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

@Component({
  selector: 'app-formCadAdminUsers',
  templateUrl: './formCadAdminUsers.component.html',
  styleUrls: ['./formCadAdminUsers.component.css', './../../app-forms.css'],
  animations: [alertAnimation],
})
export class FormCadAdminUsersComponent implements OnInit {
  public formulario: FormGroup; // formulario em questão
  public Adminstrator: AdministratorModel;
  alertState: string = 'hide'
  style: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService,

  ) { }

  ngOnInit() {
    this.Adminstrator = this.route.snapshot.data.adminstrator // recebe os dados capturados do guard e guarda na variável voluntary

    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: [null],
      password2: [null]
    },
      {
        validator: [
          Validating.equalPasswords
        ]
      } as AbstractControlOptions

    )
  }
  onSubmit() { }


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
}
