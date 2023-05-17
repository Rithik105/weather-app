import {HttpClient} from "@angular/common/http"
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { WeatherModel } from "./wheather/weather.model";


@Injectable({
    providedIn:"root"
})
export class HttpService{
 constructor(private http:HttpClient) {}
 
 FetchData(city:string){
    return this.http.get<WeatherModel>(`https://api.weatherapi.com/v1/current.json?key=ccec4479ced04aeca23153343230405&q=${city}&aqi=no`,
    )
 }


}