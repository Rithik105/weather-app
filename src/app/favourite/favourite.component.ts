import { Component, OnInit } from '@angular/core';
import { WeatherModel } from '../wheather/weather.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
favList:any[] = []

constructor(private dataServices:DataService){}

ngOnInit(): void {
   this.dataServices.getFavList()
  this.dataServices.favUpdated.subscribe((data)=>{
    this.favList=data
  })
}

onFavPressed(city:string){
  this.dataServices.removeFav(city)
}

}
