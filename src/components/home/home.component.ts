import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(protected authenticationService: AuthenticationService,
              protected router: Router,
              private toast : HotToastService ) { }

  ngOnInit(): void {
  }


  logout(){
    this.authenticationService.logout().pipe(
        this.toast.observe({
          success: 'Logged-out Successfully',
          loading: 'Loading in .... ',
          error: 'There is an error logging-out'
        })
    ).subscribe(()=>{
      this.router.navigate(['']);
    })
  }
}
