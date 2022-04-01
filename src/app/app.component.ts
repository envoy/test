import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { makeServer } from './server';
import { AppService } from './app.service';
import { Location } from './models/location';
import { Group } from './models/group';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'angular-location-picker';
  groups: Group[] = [];
  locations: Location[] = [];

  ngOnInit() {
    makeServer();
    this.getLocations();
    this.getGroups();
  }

  constructor(
    private appService: AppService,
  ) {}

  getLocations(): void {
    this.appService.getLocations()
    .subscribe({
      next: (response: any) => {
        this.locations = response.locations;
      },
      error: (error: any) => console.error('Could not retrieve locations 😩: ', error)
   });
  }

  getGroups(): void {
    this.appService.getGroups()
      .subscribe({
        next: (response: any) => {
          this.groups = response.groups;
        },
        error: (error: any) => console.error('Could not retrieve groups 😩: ', error)
    });
  }
}
