import { Component, OnDestroy, OnInit } from "@angular/core";
import * as $ from "jquery";
import { Router, RouterLink, ActivatedRoute, NavigationEnd } from "@angular/router";
import { UserService } from "../../user.service";

@Component({
    selector: "app-article",
    styleUrls: ["./article.component.scss"],
    templateUrl: "./article.component.html"
})


export default class ArticleComponent implements OnInit, OnDestroy{


    response : string;
    navigationSubscription;
    constructor(private router:Router, private user:UserService){
        this.navigationSubscription = this.router.events.subscribe((event: any) => { // If it is a NavigationEnd event re-initalise the component 
            if (event instanceof NavigationEnd) {this.ngOnInit()}
            });
        }
        ngOnInit(){
        $.get("http://allorigins.me/get?url=" + encodeURIComponent("https://www.readmng.com/") + "&callback=?", function(response) {})
          .then((data)=>{
              let filtered = data
              .match(/class=\\\"manga_info\\\" href=\\\"https:\/\/www.readmng.com\/(.*?)\"/g);
              return filtered; 
          })
          .then((filtered)=>{
              let s :string = "";
              for(let url of filtered){
                  s= s+ url + " ";
              }
              return s;
          })
          .then((s)=>{
              let data = s
              .match(/https:\/\/www.readmng.com\/(.*?)\"/g);
              return data;
          })
          .then((data)=>{
              let s :string = "";
              for(let url of data){
                  s= s+ "</br><a href='"+ url.slice(0, -1) +"' >" + url.slice(0, -1) + "</a>";
                  $('.view').append(s);
              }
          })
          
          .catch(()=>{console.log('Erreur') });
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
