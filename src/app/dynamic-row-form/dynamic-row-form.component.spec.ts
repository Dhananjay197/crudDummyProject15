import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicRowFormComponent } from './dynamic-row-form.component';

describe('DynamicRowFormComponent', () => {
  let component: DynamicRowFormComponent;
  let fixture: ComponentFixture<DynamicRowFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicRowFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicRowFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
