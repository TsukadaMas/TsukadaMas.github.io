import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesprofileComponent } from './gamesprofile.component';

describe('GamesprofileComponent', () => {
  let component: GamesprofileComponent;
  let fixture: ComponentFixture<GamesprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
