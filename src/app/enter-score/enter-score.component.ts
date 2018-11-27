import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-enter-score',
  templateUrl: './enter-score.component.html',
  styleUrls: ['./enter-score.component.css']
})
export class EnterScoreComponent implements OnInit {

  authorized: boolean = false;
  password: string;
  error: string = '';
  divisions = [];
  divisionsMap = [];
  teams = [];
  teamsMap = [];
  selectedDivision: string;
  selectedTeam1: string;
  selectedTeam2: string;
  winner: any;
  matchParticipants = [];
  score: any;
  matchData: any[] = [];
  constructor(private service: DataService, private router: Router) {

  }

  resetData() {
    this.divisions = [];
    this.divisionsMap = [];
    this.teams = [];
    this.teamsMap = [];
    this.selectedDivision = undefined;
    this.selectedTeam1 = undefined;
    this.selectedTeam2 = undefined;
    this.winner = undefined;
    this.matchParticipants = [];
    this.score = undefined;
    this.matchData = [];
  }

  getData() {
    this.resetData();
    combineLatest(this.service.getData, this.service.getTeams())
      .pipe(first())
      .subscribe(([divisions, teams]) => {
        this.divisions = JSON.parse(divisions as any);
        this.teams = JSON.parse(teams as any);
        this.loadDivisions();
      })
  }

  unlock() {
    if (this.password == 'fs-jrs') {
      this.authorized = true;
    } else {
      this.error = 'Invalid password';
    }
  }

  ngOnInit() {
    this.getData();
  }

  divSelector() {
    return this.divisions.filter(x => x.name == this.selectedDivision)[0];
  }

  loadDivisions() {
    this.divisionsMap = this.divisions.map(x => {
      return { label: x.name, value: x.name };
    });
  }

  loadMatches() {
    this.matchData = this.divSelector().matches;
  }

  loadTeams(division: string) {
    this.teamsMap = this.teams
      .filter(x => x.divisionName == division)[0]
      .teams
      .map(x => {
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
    this.service.saveData(this.divisions).pipe(first()).subscribe(r => {
      console.log('Save successful');
    });
  }

  columnData: any[] = [
    { label: 'Team 1', value: 'team1' },
    { label: 'Team 2', value: 'team2' },
    { label: 'Winner', value: 'winner' },
    { label: 'Score', value: 'score' }
  ];



}
