import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanPageComponent } from './clean-page.component';

describe('CleanPageComponent', () => {
  let component: CleanPageComponent;
  let fixture: ComponentFixture<CleanPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleanPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CleanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
