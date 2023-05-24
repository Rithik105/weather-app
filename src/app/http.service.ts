import {HttpClient} from "@angular/common/http"
import { Injectable } from "@angular/core";
import { LocationModel, WeatherModel } from "./weather.model";


@Injectable({
    providedIn:"root"
})
export class HttpService{
 constructor(private http:HttpClient) {}
 
 FetchWeatherData(city:string){
    return this.http.get<WeatherModel>(`https://api.weatherapi.com/v1/current.json?key=ccec4479ced04aeca23153343230405&q=${city}&aqi=no`,
    )
 }

 FetchCityName(value:string){
    return this.http.get<LocationModel[]>(`https://api.weatherapi.com/v1/search.json?key=ccec4479ced04aeca23153343230405&q=${value}`)
 }


}