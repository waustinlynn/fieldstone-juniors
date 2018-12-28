import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { DataService } from '../data.service';
import * as env from '../../environments/environment';

@Component({
  selector: 'bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.css']
})
export class BracketComponent implements OnInit {

  constructor(private service: DataService) { }

  data: TreeNode[] = [];
  teams: any[] = [];
  pdfSrc: string = `${env.environment.apiUrl}/bracket`;

  ngOnInit() {
    // this.service.getBracket().subscribe(r => console.log(r));

  }

  // ngOnInit() {
  //   let rootNode = {} as TreeNode;
  //   rootNode.label = '';
  //   rootNode.expanded = true;
  //   rootNode.children = [];
  //   rootNode.data = {} as any;
  //   rootNode.data.round = 'Championship';
  //   this.data[0] = rootNode;
  //   this.service.getTeams().subscribe((r: any) => {
  //     JSON.parse(r).forEach(division => {
  //       this.teams = this.teams.concat(division.teams);
  //     });
  //     this.teams = this.teams.filter((el, idx) => idx < 8);
  //     this.teams.forEach(tm => {
  //       let nodeData = { label: tm } as TreeNode;
  //       nodeData.data = {} as any;
  //       nodeData.data.round = 'Round of 8';
  //       rootNode.children.push(nodeData);
  //     })
  //   });

  // }

}
