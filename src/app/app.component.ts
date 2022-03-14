import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import {LoadingService} from "./service/loading.service";
import {delay} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'CoreUI Free Angular Admin Template';
  loading: boolean = false;

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private _loading: LoadingService,
    private spinner: NgxSpinnerService
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
        if (this.loading) {
          this.spinner.show()
        }else {
          this.spinner.hide()
        }
      });
  }

  ngOnInit(): void {
    this.listenToLoading()
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}
