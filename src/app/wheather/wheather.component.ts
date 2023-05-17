import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-wheather',
  templateUrl: './wheather.component.html',
  styleUrls: ['./wheather.component.css']
})
export class WheatherComponent implements OnInit{
  weatherDetails : any 
  favState = false;
 selectedTemperatureNotation=''

constructor(private dataService:DataService){}

changeTempNotation(temp:string){
this.selectedTemperatureNotation=temp;
}

ngOnInit(): void {
  this.selectedTemperatureNotation='c' 
  this.dataService.weatherDataChanged.subscribe((value)=>{
    this.weatherDetails=value
    this.checkFav()
  })
  this.weatherDetails = this.dataService.getStoredData()
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
