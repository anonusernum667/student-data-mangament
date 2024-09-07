import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateadminsComponent } from './createadmins.component';

describe('CreateadminsComponent', () => {
  let component: CreateadminsComponent;
  let fixture: ComponentFixture<CreateadminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateadminsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateadminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
