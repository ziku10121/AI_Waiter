import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiOrderComponent } from './ai-order.component';

describe('AiOrderComponent', () => {
  let component: AiOrderComponent;
  let fixture: ComponentFixture<AiOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AiOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
