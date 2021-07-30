// Este service controla o comportamento e seta os estilos dos alerts. estes alertes tem sua aparência configurado pelo css do componente
import { Injectable } from '@angular/core';
import {
  trigger,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export let alertAnimation: AnimationTriggerMetadata = trigger('torrada', [
  state(
    'show',
    style({
      visibility: 'visible',
      right: '1%',
      top: '50%',

    })
  ),
  state(
    'hide',
    style({
      right: '-80%',
      visibility: 'hidden'
    })
  ),
  transition('hide => show', animate('1s ease')),
  transition('show => hide', animate('1s ease')),
]);

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alertState: string;
  typeAlert: any;

  constructor() {}

  public toggle(view?: String) {
    if (view == 'show') {
      this.alertState = 'show';
    }
    if (view == 'hide') {
      this.alertState = 'hide';
    }
    if (view == undefined || view == null || view == '') {
      if (this.alertState == 'hide') {
        this.alertState = 'show';
      } else {
        this.alertState = 'hide';
      }
    }



    return this.alertState;
  }

  public content(text: string) {
    let content = document.getElementById('text');
    content.textContent = text;
  }
  public style(style: string) {
    switch (style) {
      case 'success':
        this.typeAlert = 'success';
        break;

      case 'warning':
        this.typeAlert = 'warning';
        break;

      case 'information':
        this.typeAlert = 'information';
        break;

      case 'danger':
        this.typeAlert = 'danger';
        break;
    }
    return this.typeAlert;
  }
}
