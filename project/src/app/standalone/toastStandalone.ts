import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "../app.component";
import { provideAnimations } from "@angular/platform-browser/animations";

import { provideToastr } from "ngx-toastr";

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ],
});
