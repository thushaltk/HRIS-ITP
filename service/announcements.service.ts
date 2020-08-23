import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Announcements } from '../models/announcements.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AnnouncementService{
  announcementsChanged = new Subject<Announcements[]>();
  private announcementsArr: Announcements[] = [];

  constructor(private http: HttpClient){}

  getAnnouncement(){
    this.http.get<{message: string, announcements: any}>('http://localhost:3000/api/announcements')
      .pipe(map((announcementData) => {
          return announcementData.announcements.map(announcement => {
            return{
              title: announcement.title,
              date: announcement.date,
              content: announcement.content,
              priority: announcement.priority,
              validity: announcement.validity,
              id: announcement._id
            };
          });
      }))
      .subscribe((transformedAnnouncements) => {
        this.announcementsArr = transformedAnnouncements;
        this.announcementsChanged.next(this.announcementsArr.slice());
      });
    return this.announcementsArr.slice();
  }

  addAnnouncement(announcement: Announcements){
    const announcementArray: Announcements = {
      id: announcement.id,
      title: announcement.title,
      date: announcement.date,
      content: announcement.content,
      priority: announcement.priority,
      validity: announcement.validity
    };
    this.http.post<{message: string}>('http://localhost:3000/api/announcements', announcementArray)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.announcementsArr.push(announcementArray);
        this.announcementsChanged.next(this.announcementsArr.slice());
      });

  }

  deleteAnnouncement(announcementID: string){
    this.http.delete("http://localhost:3000/api/announcements/" + announcementID)
      .subscribe(() => {
        console.log('Deleted');
      })
  }
}
