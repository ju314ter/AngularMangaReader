import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { Route } from '@angular/compiler/src/core';
import { Router, NavigationEnd, RouterLink, ActivatedRoute, } from '@angular/router';
import { UserService } from '../../user.service';


@Component({
    selector: 'app-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})

export default class LoginComponent implements OnInit,OnDestroy {
    // Attributs
    pseudonyme: string;
    mail: string;
    navigationSubscription;
    // constructeur
    constructor(private router : Router, private user: UserService) {
        this.navigationSubscription = this.router.events.subscribe((event: any) => { // If it is a NavigationEnd event re-initalise the component 
            if (event instanceof NavigationEnd) {this.ngOnInit()}
            });
            console.log(this.user.isUserLoggedIn)
        }
        
        ngOnInit(){
            if(this.user.isUserLoggedIn){
                $('.login').css('display','none');
            }
        }
    // méthode
    seConnecter() {
        if (this.pseudonyme == 'admin' && this.mail == 'admin'){
            this.user.setUserLoggedIn();
            console.log(this.user)
            this.router.navigate(['/'+this.pseudonyme]);
            console.log("success")
        } else {
            console.log(this.user);
        }
        $('.login').fadeOut();
    }

    ngOnDestroy() {
        // avoid memory leaks here by cleaning up after ourselves. If we  
        // don't then we will continue to run our initialiseInvites()   
        // method on every navigationEnd event.
        if (this.navigationSubscription) {  
           this.navigationSubscription.unsubscribe();
        }
      }
}
