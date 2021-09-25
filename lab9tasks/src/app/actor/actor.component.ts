import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})

export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];

  section = 1;
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";

  title:string = "";
  year:number = 0;
  mId: string = ""; 
  titleToDel:string = "";

  aYear1: number = 0;
  aYear2: number = 0;

  constructor(private dbService: DatabaseService) {}
  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any) => {
      this.actorsDB = data;
    });
  }

  //lab task get all movies 
  onGetMovies(){
    this.dbService.getMovies().subscribe((data:any)=>{
      this.moviesDB = data;
    });
  }

  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }

  // Update an Actor
  onSelectUpdate(item: any) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }

  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }
  //Delete Actor
  onDeleteActor(item: any) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }

  changeSection(sectionId: any) {
    this.section = sectionId;
    this.resetValues();
  }

  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
    this.mId = "";
    this.title = "";
    this.year = 0;
  }

  //LAB TASKS
  onSaveMovie(){
    let movieObj = {title:this.title,year:this.year};
    this.dbService.addMovie(movieObj).subscribe(res =>{
      this.onGetMovies();
    });
  }

  onDeleteMovie(){
    this.dbService.deleteMovie(this.titleToDel).subscribe(res=>{
      this.onGetMovies();
    });
  }

  delBetweenYear(){
    this.dbService.deleteBetweenYear(this.aYear1,this.aYear2).subscribe((data:any)=>{
      this.onGetMovies();
    });
  }

  onAddActorToMovie() {
    this.dbService.addActorToMovie(this.mId, this.actorId).subscribe((data: any) => {
      this.onGetMovies();
    });
  }
}
