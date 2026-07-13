import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventasJsonServer } from './preventas-json-server';

describe('PreventasJsonServer', () => {
  let component: PreventasJsonServer;
  let fixture: ComponentFixture<PreventasJsonServer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreventasJsonServer],
    }).compileComponents();

    fixture = TestBed.createComponent(PreventasJsonServer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
