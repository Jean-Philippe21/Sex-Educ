import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FluxVideoPage } from './flux-video.page';

describe('FluxVideoPage', () => {
  let component: FluxVideoPage;
  let fixture: ComponentFixture<FluxVideoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluxVideoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FluxVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
