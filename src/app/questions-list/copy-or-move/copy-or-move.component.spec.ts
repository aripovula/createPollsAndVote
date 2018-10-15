import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyOrMoveComponent } from './copy-or-move.component';

describe('CopyOrMoveComponent', () => {
  let component: CopyOrMoveComponent;
  let fixture: ComponentFixture<CopyOrMoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyOrMoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyOrMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
