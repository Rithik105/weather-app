import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  weatherDetails:any
  tab="home"
  cityName=""
  date:string|null=""
   datepipe:DatePipe = new DatePipe('en-US')
  constructor(private dataService:DataService){}

  ngOnInit(): void {
    this.dataService.getCityData("udupi")
    this.dataService.weatherDataChanged.subscribe(
      (data)=>{
      this.date=this.datepipe.transform(data.location.localtime,"EEE, dd MMM YYYY  h:mm a ")
  }
  )
  }

  searchButton(){
    this.dataService.addToRecentList(this.cityName)
  this.dataService.getCityData(this.cityName)
  this.dataService.weatherDataChanged.subscribe((data)=>{
      this.date=this.datepipe.transform(data.location.localtime,"EEE, dd MMM YYYY  h:mm a ")
      
  })
  this.tab="home"
  }

  textInput(event:any){
    this.cityName=event.target.value
  }

 changeTab(tab:string){
  this.tab=tab;
 }
 
}
