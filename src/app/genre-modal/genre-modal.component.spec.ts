import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreModalComponent } from './genre-modal.component';

describe('GenreModalComponent', () => {
  let component: GenreModalComponent;
  let fixture: ComponentFixture<GenreModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenreModalComponent]
    });
    fixture = TestBed.createComponent(GenreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
