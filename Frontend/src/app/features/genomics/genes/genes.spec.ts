import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenesComponent } from './genes';

describe('Genes', () => {
  let component: GenesComponent;
  let fixture: ComponentFixture<GenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
