import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeJsViewerComponent } from './three-js-viewer.component';

describe('ThreeJsViewerComponent', () => {
  let component: ThreeJsViewerComponent;
  let fixture: ComponentFixture<ThreeJsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeJsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeJsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
