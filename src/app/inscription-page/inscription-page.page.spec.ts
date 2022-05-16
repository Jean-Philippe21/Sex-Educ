import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InscriptionPagePage } from './inscription-page.page';

describe('InscriptionPagePage', () => {
  let component: InscriptionPagePage;
  let fixture: ComponentFixture<InscriptionPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscriptionPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InscriptionPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
