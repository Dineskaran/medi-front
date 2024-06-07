import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseDutyComponent } from './nurse-duty.component';

describe('NurseDutyComponent', () => {
  let component: NurseDutyComponent;
  let fixture: ComponentFixture<NurseDutyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseDutyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NurseDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
