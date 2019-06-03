import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstatComponent } from './constat.component';

describe('ConstatComponent', () => {
  let component: ConstatComponent;
  let fixture: ComponentFixture<ConstatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
