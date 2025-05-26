import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatPreviewPage } from './chat-preview.page';

describe('ChatPreviewPage', () => {
  let component: ChatPreviewPage;
  let fixture: ComponentFixture<ChatPreviewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPreviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
