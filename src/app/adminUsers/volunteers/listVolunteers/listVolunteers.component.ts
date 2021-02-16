import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { VoluntaryModel } from 'src/app/shared/voluntary.model';
import {VoluntaryService} from '../../../volunteers/services/voluntary.service'


@Component({
  selector: 'app-ListVolunteers',
  templateUrl: './listVolunteers.component.html',
  styleUrls: ['./listVolunteers.component.css'],
  providers: [VoluntaryService]
})
export class ListVolunteersComponent implements OnInit {

  public volunteers: VoluntaryModel[];
  public volunteers$: Observable<VoluntaryModel[]>;
  public voluntary: VoluntaryModel;
  public volunteersObservable: Observable<VoluntaryModel[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();
  constructor( private VoluntaryService: VoluntaryService,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
    
      this.volunteers$ = this.VoluntaryService.getVolunteers();

      this.volunteersObservable = this.subjectPesquisa
        .pipe(debounceTime(1000))
        .pipe(distinctUntilChanged())
        .pipe(
          switchMap((termo: string) => {
            return this.VoluntaryService.pesquisaVoluntary(termo);
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
