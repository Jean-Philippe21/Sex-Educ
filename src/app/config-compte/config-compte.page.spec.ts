import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfigComptePage } from './config-compte.page';

describe('ConfigComptePage', () => {
  let component: ConfigComptePage;
  let fixture: ComponentFixture<ConfigComptePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigComptePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigComptePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
