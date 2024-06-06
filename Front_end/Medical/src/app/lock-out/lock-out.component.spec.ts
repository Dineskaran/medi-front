import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockOutComponent } from './lock-out.component';

describe('LockOutComponent', () => {
  let component: LockOutComponent;
  let fixture: ComponentFixture<LockOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LockOutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LockOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
