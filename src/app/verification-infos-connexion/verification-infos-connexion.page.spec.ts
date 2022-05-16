import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerificationInfosConnexionPage } from './verification-infos-connexion.page';

describe('VerificationInfosConnexionPage', () => {
  let component: VerificationInfosConnexionPage;
  let fixture: ComponentFixture<VerificationInfosConnexionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationInfosConnexionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerificationInfosConnexionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
