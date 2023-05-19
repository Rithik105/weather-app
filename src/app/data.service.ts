import { EventEmitter, Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { WeatherModel } from "./weather.model";

@Injectable({
    providedIn:"root"
})
export class DataService{
    favCityList:string[] = []
    recentCityList=new Set<string>()
     favWeatherList : WeatherModel[]=[]
     recentWeatherList : WeatherModel[]=[]
    weatherDataChanged=new EventEmitter<WeatherModel>()
    favUpdated = new EventEmitter<WeatherModel[]>()
    recentUpdated = new EventEmitter<WeatherModel[]>()
    weatherData :any
   constructor(private httpService:HttpService){}

   getCityData(city:string){
    this.httpService.FetchData(city).subscribe((data:WeatherModel)=>{
        this.weatherData = data
        this.weatherData.isFav=false
        this.weatherDataChanged.emit(data)
        })
   }

   getStoredData(){
    if(this.weatherData){
        return this.weatherData
    }
    else{
        return {isFav:false,location:{name:"",region:"",localtime:""},current:{temp_c:0,temp_f:0,condition:{text:"",icon:""},wind_mph:0,humidity:0,vis_miles:0,precip_in:0}}
    }
    
   }
    
   addFav(city:string){
    this.favCityList.push(city)
   }

   removeFav(city:string){
    const index=this.favCityList.indexOf(city)
    this.favCityList.splice(index,1)
    this.getFavList()
   }

   checkFav(city:string){
    return this.favCityList.includes(city)
   }
    
   getFavList(){
    this.favWeatherList=[]
    if(this.favCityList.length==0){
        this.favUpdated.emit(this.favWeatherList)
    }
    else{
    this.favCityList.forEach((value, index) => {
        this.httpService.FetchData(value).subscribe((data:WeatherModel)=>{
            this.favWeatherList.push(data)
            if(index==this.favCityList.length-1){
                this.favUpdated.emit(this.favWeatherList)  
            }
        })
    });}
   }

   addToRecentList(city:string){
    this.recentCityList.add(city)
    console.log(this.recentCityList);
   }

   getRecentList(){
    console.log(this.recentCityList);
    this.recentWeatherList=[]
    if(this.recentCityList.size==0){
        this.recentUpdated.emit(this.recentWeatherList)
    }
    else{
    this.recentCityList.forEach((value) =>{
        this.httpService.FetchData(value).subscribe((data:WeatherModel)=>{
            data.isFav=this.checkFav(data.location.name)
            this.recentWeatherList.push(data)
           this.recentUpdated.emit(this.recentWeatherList)  
            
        })
    });}


   }
   


}