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
import { TabViewModule } from 'primeng/tabview';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { PdfViewerModule } from 'ng2-pdf-viewer';

import { EnterScoreComponent } from './enter-score/enter-score.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataService } from './data.service';
import { RulesComponent } from './rules/rules.component';
import { BracketComponent } from './bracket/bracket.component';
import { AlFileUploadComponent } from './al-file-upload/al-file-upload.component';

const routes: Routes = [
  { path: 'admin', component: EnterScoreComponent },
  { path: '', component: DashboardComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    DisplayTableComponent,
    EnterScoreComponent,
    DashboardComponent,
    RulesComponent,
    BracketComponent,
    AlFileUploadComponent,
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
    OrganizationChartModule,
    InputTextModule,
    TabViewModule,
    FileUploadModule,
    ToastModule,
    PdfViewerModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DataService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
