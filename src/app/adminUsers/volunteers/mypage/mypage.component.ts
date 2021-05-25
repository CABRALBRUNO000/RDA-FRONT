
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { VoluntaryModel } from 'src/app/shared/entities/voluntary.model';
import { UserService } from '../../../services/users.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css'],
  providers: [UserService],
})
export class MypageComponent implements OnInit {


  public Voluntary: VoluntaryModel;
  public idVoluntary: number;
  img: any;
  transformationImg = [{ "height": "221", "width": "400" }];
  transformationImgCasaDescanso = [{ "height": "400", "width": "500" }];

  slides= []
  constructor(
    private VoluntaryService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.Voluntary = this.route.snapshot.data['voluntary'];
    console.log('o que vem do guard', this.Voluntary);
   this.slides = this.Voluntary.urlsImage.urlImgsCasaDescanso

  }

}
