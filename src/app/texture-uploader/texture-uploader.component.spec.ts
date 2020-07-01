import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextureUploaderComponent } from './texture-uploader.component';

describe('TextureUploaderComponent', () => {
  let component: TextureUploaderComponent;
  let fixture: ComponentFixture<TextureUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextureUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextureUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
