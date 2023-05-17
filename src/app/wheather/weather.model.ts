export interface WeatherModel{
   location:LocationModel
   current:CurrentModel


}
export interface LocationModel{
name:string;
region:string
localtime:string
}

export interface CurrentModel{
    temp_c:number
    temp_f:number
    condition:{text:string,icon:string}
    wind_mph:number
    humidity:number
    vis_miles:number
    precip_in:number
}