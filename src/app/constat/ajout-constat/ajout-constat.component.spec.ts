import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutConstatComponent } from './ajout-constat.component';

describe('AjoutConstatComponent', () => {
  let component: AjoutConstatComponent;
  let fixture: ComponentFixture<AjoutConstatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutConstatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutConstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
