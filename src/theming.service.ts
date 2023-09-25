import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ColorSchemeService {
    private renderer: Renderer2;
    public colorScheme: string;
    public themeChanged = new Subject<string>();
    // Define prefix for more clear and readable styling classes in scss files

    constructor(rendererFactory: RendererFactory2) {
        // Create new renderer from renderFactory, to make it possible to use renderer2 in a service
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    detectPrefersColorScheme() {
        // Detect if prefers-color-scheme is supported
        if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
            // Set colorScheme to Dark if prefers-color-scheme is dark. Otherwise set to light.
            this.colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
                .matches
                ? 'dark'
                : 'light';
        } else {
            // If browser dont support prefers-color-scheme, set it as default to dark
            this.colorScheme = 'dark';
        }
    }

    setColorScheme(scheme: string) {
        this.colorScheme = scheme;
        // Save prefers-color-scheme to localStorage
        localStorage.setItem('prefers-color', scheme);
        this.themeChanged.next(scheme);
    }

    getColorScheme() {
        // Check if any prefers-color-scheme is stored in localStorage
        if (localStorage.getItem('prefers-color')) {
            // Save prefers-color-scheme from localStorage
            this.colorScheme = localStorage.getItem('prefers-color');
        } else {
            // If no prefers-color-scheme is stored in localStorage, Try to detect OS default prefers-color-scheme
            this.detectPrefersColorScheme();
        }
    }

    load() {
        this.getColorScheme();
        this.renderer.addClass(document.body, this.colorScheme + '-theme');
    }

    update(scheme: string) {
        this.setColorScheme(scheme);
        // Remove the old color-scheme class
        this.renderer.removeClass(
            document.body,
            (this.colorScheme === 'dark' ? 'light' : 'dark') + '-theme'
        );
        // Add the new / current color-scheme class
        this.renderer.addClass(document.body, scheme + '-theme');
    }

    currentActive() {
        return this.colorScheme;
    }
}
