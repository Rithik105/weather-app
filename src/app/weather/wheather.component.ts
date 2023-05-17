import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { WeatherModel } from './weather.model';

@Component({
  selector: 'app-wheather',
  templateUrl: './wheather.component.html',
  styleUrls: ['./wheather.component.css']
})
export class WheatherComponent implements OnInit{
  weatherDetails : WeatherModel = {location:{name:"",region:"",localtime:""},current:{temp_c:0,temp_f:0,condition:{text:"",icon:""},wind_mph:0,humidity:0,vis_miles:0,precip_in:0}}
  favState = false;
 selectedTemperatureNotation=''

constructor(private dataService:DataService){}

changeTempNotation(temp:string){
this.selectedTemperatureNotation=temp;
}

ngOnInit(): void {
  console.log("init");
  
  this.selectedTemperatureNotation='c' 
  this.dataService.weatherDataChanged.subscribe((value)=>{
    this.weatherDetails=value
    this.checkFav()
  })
  this.checkFav()
}

checkFav(){

  this.favState= this.dataService.checkFav(this.weatherDetails.location.name)
  
}

onFavPressed(){
console.log(this.favState);

  if(!this.favState){
  this.dataService.addFav(this.weatherDetails.location.name)
  }
  else {
    this.dataService.removeFav(this.weatherDetails.location.name)
  }
  this.checkFav()
}
}
