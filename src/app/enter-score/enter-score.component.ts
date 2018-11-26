import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-enter-score',
  templateUrl: './enter-score.component.html',
  styleUrls: ['./enter-score.component.css']
})
export class EnterScoreComponent implements OnInit {

  divisions = [];
  teams = [];
  selectedDivision: string;
  selectedTeam1: string;
  selectedTeam2: string;
  winner: any;
  matchParticipants = [];
  score: any;
  data: any;
  matchData: any[] = [];
  constructor(private service: DataService, private router: Router) {
    this.divisions = [];
    this.teams = [];
    this.selectedDivision = undefined;
    this.selectedTeam1 = undefined;
    this.selectedTeam2 = undefined;
    this.winner = undefined;
    this.matchParticipants = [];
    this.score = undefined;
    this.data = undefined;
    this.matchData = [];
  }

  resetData() {

  }

  getData() {
    this.service.getData.pipe(first()).subscribe((r: any) => {
      this.data = JSON.parse(r);
      console.log(this.data);
      this.loadDivisions();
    });
  }

  ngOnInit() {
    this.getData();
  }

  divSelector() {
    return this.data.divisions.filter(x => x.name == this.selectedDivision)[0];
  }

  loadDivisions() {
    this.divisions = this.data.divisions.map(x => {
      return { label: x.name, value: x.name };
    });
  }

  loadMatches() {
    this.matchData = this.divSelector().matches;
  }

  loadTeams(division: string) {
    this.teams = this.divSelector().teams.map(x => {
      return { label: x, value: x };
    });
  }

  divisionChange(event: any) {
    this.selectedDivision = event.value;
    this.loadTeams(this.selectedDivision);
    this.loadMatches();

    console.log(this.teams);
  }

  teamChange(event: any) {
    if (this.selectedTeam1 == undefined || this.selectedTeam2 == undefined) {
      return;
    }

    this.matchParticipants = [
      { label: this.selectedTeam1, value: this.selectedTeam1 },
      { label: this.selectedTeam2, value: this.selectedTeam2 }
    ]
  }

  submit() {
    let matchData = {
      team1: this.selectedTeam1,
      team2: this.selectedTeam2,
      score: this.score,
      winner: this.winner
    };
    this.divSelector().matches.push(matchData);
    this.saveData();
    // this.router.navigate(['/']);
  }

  delete(row: any) {
    console.log(row);
    let idx = this.divSelector().matches.indexOf(row);
    if (idx > -1) {
      this.divSelector().matches.splice(idx, 1);
      this.saveData();
    }
  }

  saveData() {
    this.service.saveData(this.data).pipe(first()).subscribe(r => {
      console.log('Save successful');
      this.getData();
    });
  }

  columnData: any[] = [
    { label: 'Team 1', value: 'team1' },
    { label: 'Team 2', value: 'team2' },
    { label: 'Winner', value: 'winner' },
    { label: 'Score', value: 'score' }
  ];



}
