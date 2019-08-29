import { Component } from '@angular/core';
import { FooterService } from 'app/Services/footer.service';

declare var $:any;

@Component({
    selector: 'footer-cmp',
    templateUrl: 'footer.component.html'
})

export class FooterComponent 
{

    constructor(public footer : FooterService)
    { }

    date : Date = new Date();
}
