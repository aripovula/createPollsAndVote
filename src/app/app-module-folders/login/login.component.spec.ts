import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
// import { TestStore } from '@testing/utils';
// import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    // const emptyState = { opportunities: { list: { items: [], page: 1, total: 0 } } };
    // const mockStore = new MockStore<MockAppState>(emptyState);
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create LoginComponent', () => {
    expect(component).toBeTruthy();
  });
});
