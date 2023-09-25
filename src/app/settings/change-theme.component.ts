import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ColorSchemeService } from 'src/theming.service';

@Component({
    selector: 'app-setting-change-theme',
    templateUrl: './change-theme.component.html',
    styleUrls: ['./change-theme.component.css'],
})
export class ChangeThemeComponent {
    darkModeOn = true;

    constructor(public colorSchemeService: ColorSchemeService) {
        this.darkModeOn = colorSchemeService.currentActive() === 'dark';
    }

    public setTheme(event: MatSlideToggleChange): void {
        const checked = event.checked;
        let theme = 'dark';
        if (checked === false) {
            theme = 'light';
        }

        this.colorSchemeService.update(theme);
    }
}
