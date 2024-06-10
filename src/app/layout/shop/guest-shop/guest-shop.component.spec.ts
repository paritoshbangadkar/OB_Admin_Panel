import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestShopComponent } from './guest-shop.component';

describe('GuestShopComponent', () => {
  let component: GuestShopComponent;
  let fixture: ComponentFixture<GuestShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
