import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SousRubriqueComponent } from './sous-rubrique.component';

describe('SousRubriqueComponent', () => {
  let component: SousRubriqueComponent;
  let fixture: ComponentFixture<SousRubriqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SousRubriqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SousRubriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
