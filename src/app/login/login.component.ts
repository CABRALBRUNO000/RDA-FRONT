import { Router } from '@angular/router';
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
  errorLogin: any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: null,
      password: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  async onSubmit(): Promise<any> {
    try {
      const result = await this.authService.authenticateUser(this.formulario);
      console.log(`Login Efetuado: ${result}`);
      // navego para rota vasia novamente
      const payload = this.authService.getTypeUser();

      switch (payload.type) {
        case 'ADMINISTRATOR':
          this.router.navigate(['/sideBar/Dashboard']);
          break;
        case 'MISSIONARY':
          this.router.navigate([`homeMissionary/${payload.sub}`]);
          break;
        case 'VOLUNTARY':
          this.router.navigate([`homeVoluntary/${payload.sub}`]);
          break;

        default:
          this.router.navigate(['']);
          break;
      }



    } catch (error) {
      console.log(error);
      this.errorLogin = error

    }


    // this.authService.authenticateUser(this.formulario.value);
  }
}
