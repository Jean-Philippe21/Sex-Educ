import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublicationDiscussionPage } from './publication-discussion.page';

describe('PublicationDiscussionPage', () => {
  let component: PublicationDiscussionPage;
  let fixture: ComponentFixture<PublicationDiscussionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationDiscussionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicationDiscussionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
