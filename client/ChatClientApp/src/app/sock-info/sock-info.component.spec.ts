import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SockInfoComponent } from './sock-info.component';

describe('SockInfoComponent', () => {
  let component: SockInfoComponent;
  let fixture: ComponentFixture<SockInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SockInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SockInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
