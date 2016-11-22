import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { RouterModule }   from '@angular/router';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import {HomeComponent} from "./home.component";


import { GridComponent } from './components/grid.component';
import {LargeArrayService} from "./shared/LargeArray.service";
import { ShowDataOnceComponent } from './components/showdataonce/showdataonce.component';
import { ShowInfiniteScrollComponent } from './components/showinfinitescroll/showinfinitescroll.component';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { ShowLiveRenderComponent } from './components/showliverender/showliverender.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    GridComponent,
    ShowDataOnceComponent,
    ShowInfiniteScrollComponent,
    ShowLiveRenderComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    FormsModule,
    HttpModule,
    RouterModule,
    InfiniteScrollModule,


    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'showdataonce', component: ShowDataOnceComponent},
      { path: 'infinitscroll', component: ShowInfiniteScrollComponent},
      { path: 'liverender', component: ShowLiveRenderComponent},


      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [LargeArrayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
