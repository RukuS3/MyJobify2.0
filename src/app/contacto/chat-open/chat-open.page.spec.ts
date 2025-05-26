import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatOpenPage } from './chat-open.page';

describe('ChatOpenPage', () => {
  let component: ChatOpenPage;
  let fixture: ComponentFixture<ChatOpenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatOpenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
