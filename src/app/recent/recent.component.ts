import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit{
  recentList:any[] = []
constructor(private dataService:DataService){}

ngOnInit(): void {
  this.dataService.getRecentList()
  this.dataService.recentUpdated.subscribe((data)=>{
    this.recentList=data
  })
}

}
