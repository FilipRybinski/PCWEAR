import { trigger, style, transition, query, group, animateChild, animate, keyframes} from '@angular/animations';
export const RouteSlideIn =
trigger('routeAnimations', [
  transition('ForumPage <=> ThreadPage', [
    style({ position: 'relative'}),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      })
    ], { optional: true }),
    query(':enter', [
      style({ transform: 'translate3d(-3000px, 0, 0)' })
    ], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        animate(
            '500ms 0ms',
            keyframes([
              style({ opacity: 1, transform: 'translateX(0)', easing: 'ease', offset: 0 }),
              style({ opacity: 0, transform: 'translateX(-100%)', easing: 'ease', offset: 1 })
            ])
          )
      ], { optional: true }),
      query(':enter', [
        animate(
            '500ms 300ms',
            keyframes([
              style({ transform: 'translateX(-100%)', easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 0 }),
              style({ transform: 'translateX(0)', easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 1 })
            ])
          ),
      ], { optional: true }),
    ]),
  ]),
  transition('*<=>*', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ opacity:0,scale:0 })
    ], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        animate('500ms ease-in-out', style({ opacity:0,scale:0}))
      ], { optional: true }),
      query(':enter', [
        animate('500ms ease-in-out', style({ opacity:1,scale:1 }))
      ], { optional: true }),
    ]),
  ])
]);