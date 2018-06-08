import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemInputComponent } from './problem-input.component';

describe('ProblemInputComponent', () => {
  let component: ProblemInputComponent;
  let fixture: ComponentFixture<ProblemInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
