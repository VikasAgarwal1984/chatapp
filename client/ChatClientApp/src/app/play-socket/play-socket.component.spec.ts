import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaySocketComponent } from './play-socket.component';

describe('PlaySocketComponent', () => {
  let component: PlaySocketComponent;
  let fixture: ComponentFixture<PlaySocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaySocketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaySocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
