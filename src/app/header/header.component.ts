import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
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

  burgerMenuPressed(opened:boolean){
    if(opened){
      const burgermenu = document.getElementById("menu-container-mobile")?.style.setProperty('margin','0px -1000px')
    }
    else{
      const burgermenu = document.getElementById("menu-container-mobile")?.style.setProperty('margin','0px 0px')
    }
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
