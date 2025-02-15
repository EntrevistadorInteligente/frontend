import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/shared/services/layout/layout.service';

@Component({
  selector: 'app-mode',
  templateUrl: './mode.component.html',
  styleUrls: ['./mode.component.scss']
})
export class ModeComponent implements OnInit {

  dark: boolean;

  constructor(public layout: LayoutService) {
    this.dark = this.layout.config.settings.layout_version === 'dark-only';
  }
  
  ngOnInit(): void {
  }

  toggleDarkMode() {
    this.layout.toggleDarkMode();
    this.dark = this.layout.config.settings.layout_version === 'dark-only';
  }

}
