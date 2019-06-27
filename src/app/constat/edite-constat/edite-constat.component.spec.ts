import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeConstatComponent } from './edite-constat.component';

describe('EditeConstatComponent', () => {
  let component: EditeConstatComponent;
  let fixture: ComponentFixture<EditeConstatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditeConstatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditeConstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
