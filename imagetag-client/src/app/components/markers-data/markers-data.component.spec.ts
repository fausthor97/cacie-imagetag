import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MarkersDataComponent } from './markers-data.component';

describe('MarkersDataComponent', () => {
  let component: MarkersDataComponent;
  let fixture: ComponentFixture<MarkersDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkersDataComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MarkersDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
