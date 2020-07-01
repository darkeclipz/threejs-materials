import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextureInputComponent } from './texture-input.component';

describe('TextureUploaderComponent', () => {
  let component: TextureInputComponent;
  let fixture: ComponentFixture<TextureInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextureInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextureInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
