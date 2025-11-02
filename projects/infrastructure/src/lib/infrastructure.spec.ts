import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Infrastructure } from './infrastructure';

describe('Infrastructure', () => {
  let component: Infrastructure;
  let fixture: ComponentFixture<Infrastructure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Infrastructure]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Infrastructure);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
