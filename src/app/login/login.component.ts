import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from './usuario';
import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public usuario: Usuario = new Usuario();
  public formulario: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      email: 'admin',
      password: ['123', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(){
    this.authService.authenticateUser(this.formulario.value)
   
    
  }
}
