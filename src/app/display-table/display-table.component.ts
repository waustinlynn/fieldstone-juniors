import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'display-table',
  templateUrl: './display-table.component.html',
  styleUrls: ['./display-table.component.css']
})
export class DisplayTableComponent implements OnInit {

  columnData: any[] = [
    { label: 'Team', value: 'teamName' },
    { label: 'Record', value: 'record' },
    { label: 'Points', value: 'points' },
    { label: '%', value: 'percentage' }
  ];

  referenceColumns = this.columnData.map(r => r.value);

  // displayedColumns: string[] = [
  //   'teamName',
  //   'record',
  //   'points',
  //   'percentage'
  // ];

  data: any[] = [
    { teamName: 'Rockers', record: '2-1', percentage: '67%', points: 6 },
    { teamName: 'Players', record: '1-2', percentage: '57%', points: 3 }
  ];



  constructor(private service: DataService) { }

  ngOnInit() {
    console.log(this.service.getData);
  }

}
