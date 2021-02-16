import { trigger, AnimationTriggerMetadata, state, style, transition, animate } from '@angular/animations';
import { AlertService } from './alert.service';
let alertService = AlertService

export let alertAnimation:AnimationTriggerMetadata ;
export let expandableMenu:AnimationTriggerMetadata;


  alertAnimation = trigger('torrada',[
    state('show', style({
      bottom:'40px'
    })),
    state('hide', style({
      bottom:'-100%'
    })),
    transition('hide => show', animate('1s ease')),
    transition('show => hide', animate('1s ease'))
  ]);

expandableMenu = trigger('expandable',[
  transition(':enter', [   // :enter is alias to 'void => *'
    style({opacity:0}),
    animate(500, style({marginTop:'2px',opacity:1})) 
  ]),
  transition(':leave', [   // :leave is alias to '* => void'
    animate(500, style({marginTop:'0px',opacity:0})) 
  ]),

 
])



// expandableMenu = trigger('expandable',[
//   state('open', style({
//   marginTop:'-0px'
//   })), 
//   state('closed', style({
//     marginTop:'80px'
//   })),
//   transition('open => closed', animate('1s ease')),
//   transition('closed => open', animate('1s ease')),
// ])
