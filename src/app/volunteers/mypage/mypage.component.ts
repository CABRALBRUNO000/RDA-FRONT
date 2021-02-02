import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { VoluntaryModel } from 'src/app/shared/voluntary.model';
import { VoluntaryService } from '../services/voluntary.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css'],
  providers: [VoluntaryService],
})
export class MypageComponent implements OnInit {


  public Voluntary: VoluntaryModel;
  public idVoluntary: number;
  img: any;

  constructor(
    private VoluntaryService: VoluntaryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.Voluntary = this.route.snapshot.data['voluntary'];
    console.log('o que vem do guard', this.Voluntary);

  //  this.getVoluntaryMyPage();
  }

  // public async getVoluntaryMyPage() {
  //   this.idVoluntary = await this.route.snapshot.params['id'];
  //   try {
  //     await this.VoluntaryService.getVolunteersPorId(
  //       this.idVoluntary
  //     ).subscribe(
  //       (resposta) => (this.Voluntary = resposta),
  //       (error) => error
  //     );
  //   } catch (error) {
  //     (error) => error;
  //   }
  // }
}
