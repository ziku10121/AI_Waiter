import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiHomeComponent } from './ai-home.component';

describe('AiHomeComponent', () => {
  let component: AiHomeComponent;
  let fixture: ComponentFixture<AiHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AiHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
