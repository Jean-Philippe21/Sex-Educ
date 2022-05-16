import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreMessageriePage } from './pre-messagerie.page';

describe('PreMessageriePage', () => {
  let component: PreMessageriePage;
  let fixture: ComponentFixture<PreMessageriePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreMessageriePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreMessageriePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
