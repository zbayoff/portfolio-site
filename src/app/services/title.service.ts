import { Injectable } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

const APP_TITLE = 'NoDice!';
const SEPARATOR = ' > ';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) { }

  static ucFirst(string) {
    if (!string) { return string; }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  init() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => route.firstChild),
      switchMap(route => route.data),
      map((data) => {
        if (data.title) {
          // If a route has a title set (e.g. data: {title: "Foo"}) then we use it
          return data.title;
        } else {
          // If not, we do a little magic on the url to create an approximation
          return 'Zach Bayoff | Web Developer | ' + this.router.url.split('/').reduce((acc, frag) => {
            if (acc && frag) {
              acc += SEPARATOR;
            }
            return this.router.url.split('/').reduce((acc, frag) => {
              if (acc && frag) { acc += SEPARATOR; }
              return acc + TitleService.ucFirst(frag);
            });
          });
        }
      })
    )
      .subscribe((pathString) => this.titleService.setTitle(`${pathString}`));
  }
}
