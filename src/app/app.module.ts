import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { DisplayTableComponent } from './display-table/display-table.component';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { EnterScoreComponent } from './enter-score/enter-score.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataService } from './data.service';

const routes: Routes = [
  { path: 'admin', component: EnterScoreComponent },
  { path: '', component: DashboardComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    DisplayTableComponent,
    EnterScoreComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    TableModule,
    DropdownModule,
    SelectButtonModule,
    InputTextModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
