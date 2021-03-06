import { Component, OnInit } from '@angular/core';

import { portfolio_list } from '../../data/portfolio.model';

import { Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  portfolioList = portfolio_list;

  constructor(private meta: Meta) {
    this.meta.addTags([
      { charset: 'utf-8' },
      { name: 'description', content: 'Hi, I\'m Zach - A web developer with skills in HTML5, CSS3, Javascript, Angular, WordPress and much more. Based in Brooklyn, NY.' },
      { name: 'robots', content: 'index, follow' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge, chrome=1' },
      { name: 'author', content: 'Zach Bayoff' },
      { name: 'copyright', content: 'Zach Bayoff' },
      { name: 'keywords', content: 'Web developer, front-end developer, brooklyn' }
    ]);
  }

  ngOnInit() {
  }

}
