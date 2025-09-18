import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pinned } from './pinned';

describe('Pinned', () => {
  let component: Pinned;
  let fixture: ComponentFixture<Pinned>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pinned]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pinned);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
