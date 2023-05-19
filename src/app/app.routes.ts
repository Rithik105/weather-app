import { RouterModule, Routes } from "@angular/router";
import { FavouriteComponent } from "./favourite/favourite.component";
import { RecentComponent } from "./recent/recent.component";
import { WheatherComponent } from "./weather/wheather.component";
import { NgModule } from "@angular/core";

const appRoutes:Routes=[
    {path:"favourite",component:FavouriteComponent},
    {path:"recents",component:RecentComponent},
    {path:"",component:WheatherComponent}
]
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}