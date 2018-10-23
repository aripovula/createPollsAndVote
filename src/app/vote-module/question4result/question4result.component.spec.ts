import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Question4resultComponent } from './question4result.component';

describe('Question4resultComponent', () => {
  let component: Question4resultComponent;
  let fixture: ComponentFixture<Question4resultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Question4resultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Question4resultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
