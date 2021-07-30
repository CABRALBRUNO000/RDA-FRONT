import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AdminService } from './../admin.service';
import { AdministratorModel } from 'src/app/shared/entities/administrator.model';
@Component({
  selector: 'app-listAdminUsers',
  templateUrl: './listAdminUsers.component.html',
  styleUrls: ['./listAdminUsers.component.css'],
  providers:[AdminService]
})
export class ListAdminUsersComponent implements OnInit {
  public administrators: AdministratorModel[];
  public administrators$: Observable<AdministratorModel[]>;
  public administrator: AdministratorModel;
  public administratorsObservable: Observable<AdministratorModel[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(
    private administratorService: AdminService,
    private route: ActivatedRoute
  ) { }
  transformationImg = [{ "height": "300", "width": "400" }];
  ngOnInit(): void {
    this.administrators$ = this.administratorService.getAdministrators()

    this.administratorsObservable = this.subjectPesquisa
    .pipe(debounceTime(1000))
    .pipe(distinctUntilChanged())
    .pipe(
      switchMap((termo: string) => {
        return this.administratorService.searchAdministrators(termo);
      })
    );

    this.administratorsObservable.subscribe(
      (administrators: AdministratorModel[]) => (this.administrators = administrators),
      (error: any) => console.log(error),
      () => console.log('Evento concluido')
    );
  }

  public pesquisa(termoDaPesquisa: string): void {
    this.subjectPesquisa.next(termoDaPesquisa);
  }

}
