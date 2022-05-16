import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateContenuPage } from './create-contenu.page';

describe('CreateContenuPage', () => {
  let component: CreateContenuPage;
  let fixture: ComponentFixture<CreateContenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateContenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
