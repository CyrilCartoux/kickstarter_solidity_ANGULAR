import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTxhashComponent } from './show-txhash.component';

describe('ShowTxhashComponent', () => {
  let component: ShowTxhashComponent;
  let fixture: ComponentFixture<ShowTxhashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTxhashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTxhashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
