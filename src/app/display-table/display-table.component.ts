import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../data.service';
import { first } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'display-table',
  templateUrl: './display-table.component.html',
  styleUrls: ['./display-table.component.css']
})
export class DisplayTableComponent implements OnInit {

  //main app data with everything
  divisions: any;

  //master data showing divisions and everything
  masterData: any[] = [];
  teams: any[];

  //data for table
  data: any[];

  //main toggle to render tabs
  renderTabs: boolean = false;

  //need to know first division so we set it as selected
  firstDivision: string = '';


  columnData: any[] = [
    { label: 'Team', value: 'team' },
    { label: 'Record', value: 'record' },
    { label: 'Points', value: 'points' },
    { label: '%', value: 'percentage' }
  ];

  constructScores() {
    let divLength = this.divisions.length;
    this.masterData = [];
    for (let i = 0; i < divLength; i++) {
      let division = this.divisions[i];
      let divisionName = division.name;
      if (i == 0) this.firstDivision = divisionName;
      let teams = this.teams.filter(x => x.divisionName == divisionName)[0].teams;
      let matches = division.matches;
      let divisionTblData = {} as any;
      divisionTblData.name = divisionName;
      divisionTblData.results = [];
      for (let tm = 0; tm < teams.length; tm++) {
        let thisTeam = {} as any;
        thisTeam.name = teams[tm];
        divisionTblData.results.push(this.calcTeamPoints(matches, teams[tm]));
      }
      divisionTblData.results = divisionTblData.results.sort(this.sort);
      this.masterData.push(divisionTblData);
    }
  }

  calcTeamPoints(matches: any[], teamName: string) {
    let wins = 0;
    let losses = 0;
    let points = 0;
    let totalPoints = 0;

    for (let i = 0; i < matches.length; i++) {
      let thisMatch = matches[i];
      if (thisMatch.team1 == teamName || thisMatch.team2 == teamName) {
        let score = thisMatch.score.split('-');
        if (thisMatch.winner == teamName) {
          wins++;
          points += +score[0];
        } else {
          losses++;
          points += +score[1];
        }
        totalPoints += +score[0] + +score[1]
      }
    }

    let pctNumber = ((points / totalPoints) * 100);

    let percentage = isNaN(pctNumber) ? '-' : pctNumber.toFixed(0);


    let returnObj = {
      team: teamName,
      points,
      record: `${wins}-${losses}`,
      percentage
    }
    return returnObj;
  }

  constructor(private service: DataService) {
    this.data = [];
  }

  seedData() {
    return;
    combineLatest(this.service.loadData(), this.service.loadTeams())
      .pipe(first()).subscribe(r => {
        this.initData();
      })
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.initData();
  }

  initData() {
    combineLatest(this.service.getTeams(), this.service.getData)
      .subscribe(([teams, divisions]) => {
        this.teams = JSON.parse(teams as any);
        this.divisions = JSON.parse(divisions as any);
        this.constructScores();
      });
  }

  sort(a: any, b: any) {
    if (a.points == b.points) {
      let aPct = +a.percentage;
      let bPct = +b.percentage;
      if (isNaN(bPct)) return -11;
      if (isNaN(aPct) && !isNaN(bPct)) return 1;

      return aPct > bPct ? -1 : 1;
    }
    return a.points > b.points ? -1 : 1;
  }

}
