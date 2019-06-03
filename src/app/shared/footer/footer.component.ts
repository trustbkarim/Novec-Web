import { Component } from '@angular/core';

declare var $:any;

@Component({
    selector: 'footer-cmp',
    templateUrl: 'footer.component.html'
})

export class FooterComponent{
    date : Date = new Date();
}
