import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdmistionComponent } from './home-admistion.component';

describe('HomeAdmistionComponent', () => {
  let component: HomeAdmistionComponent;
  let fixture: ComponentFixture<HomeAdmistionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAdmistionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeAdmistionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
