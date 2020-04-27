import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models';
import { Observable, of, Subject } from 'rxjs';
import { merge, startWith, scan } from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor(private userService:UserService) { }
  users:Observable<User[]>;
  modifySubject:Subject<any>;
  mergedObs: Observable<User[]>;
  ngOnInit(): void {
    this.users=this.userService.getAll()
    this.modifySubject=new Subject();
    this.mergedObs = this.users.pipe(merge(this.modifySubject),
      startWith([]),
      scan((acc, val) => {
        if (val.op && val.op==='delete') {
          var index = acc.findIndex((elt) => elt.id === val.id);
          acc.splice(index, 1);
          return acc;
        } else {
          return acc.concat(val);
        }
      }));
  }
  removeUser(i:number,user:User){
    this.userService.removeUser(user.id).subscribe(
      res=>{
        this.modifySubject.next({op:'delete', id: user.id});
      }
    );
  }
}
