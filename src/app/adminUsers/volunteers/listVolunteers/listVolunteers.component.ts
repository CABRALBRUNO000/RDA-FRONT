import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { VoluntaryModel } from 'src/app/shared/entities/voluntary.model';
import {UserService} from '../../../services/users.service'


@Component({
  selector: 'app-ListVolunteers',
  templateUrl: './listVolunteers.component.html',
  styleUrls: ['./listVolunteers.component.css'],
  providers: [UserService]
})
export class ListVolunteersComponent implements OnInit {

  public volunteers: VoluntaryModel[];
  public volunteers$: Observable<VoluntaryModel[]>;
  public voluntary: VoluntaryModel;
  public volunteersObservable: Observable<VoluntaryModel[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();
  constructor( private VoluntaryService: UserService,
    private route: ActivatedRoute) { }

    transformationImg = [{ "height": "300", "width": "400" }];

    ngOnInit(): void {
      this.volunteers$ = this.VoluntaryService.getUsers();
      

      this.volunteersObservable = this.subjectPesquisa
        .pipe(debounceTime(1000))
        .pipe(distinctUntilChanged())
        .pipe(
          switchMap((termo: string) => {
            return this.VoluntaryService.searchUser(termo);
          })
        );

      this.volunteersObservable.subscribe(
        (volunteers: VoluntaryModel[]) => (this.volunteers = volunteers),
        (error: any) => console.log(error),
        () => console.log('Evento concluido')
      );
    }

    public pesquisa(termoDaPesquisa: string): void {
      this.subjectPesquisa.next(termoDaPesquisa);
    }

}
