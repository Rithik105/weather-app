import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationModel } from '../weather.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  cityNames:LocationModel[]=[]
  weatherDetails:any
  tab="home"
  cityName=""
  date:string|null=""
   datepipe:DatePipe = new DatePipe('en-US')
  constructor(private dataService:DataService,private router:Router,private currentRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.dataService.getCityData("udupi")
    this.dataService.weatherDataChanged.subscribe(
      (data)=>{
      this.date=this.datepipe.transform(data.location.localtime,"EEE, dd MMM YYYY  h:mm a ")
  }
 
  )
  this.dataService.cityNamesUpdated.subscribe(
    (data)=>{
      this.cityNames=data
      
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
    if(this.cityName!=""){
    this.dataService.getCityName(this.cityName)
    }
  }

 changeTab(tab:string,mobile:boolean){
  if(mobile){
    this.router.navigate([tab],{
      relativeTo:this.currentRoute
    })
    this.tab=tab;
    const burgermenu = document.getElementById("menu-container-mobile")?.style.setProperty('margin','0px -1000px')
  }
  else{
    this.router.navigate([tab],{
      relativeTo:this.currentRoute
    })
    this.tab=tab;
  }
 
 }
}
