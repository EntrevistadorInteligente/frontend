import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextoChatComponent } from './chat/text-chat/text-chat.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { AudioChatComponent } from './chat/audio-chat/audio-chat.component';
import { VideoChatComponent } from './chat/video-chat/video-chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TextoChatComponent, VideoChatComponent, AudioChatComponent],
  imports: [
    CommonModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DialogModule,
    ToastModule,
  ],
  exports: [TextoChatComponent],
})
export class Paso3Module {}
