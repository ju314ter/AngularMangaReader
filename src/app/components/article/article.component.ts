import { Component, OnDestroy, OnInit } from "@angular/core";
import * as $ from "jquery";
import { Router, RouterLink, ActivatedRoute, NavigationEnd } from "@angular/router";
import { UserService } from "../../user.service";

@Component({
    selector: "app-article",
    styleUrls: ["./article.component.scss"],
    templateUrl: "./article.component.html"
})


export default class ArticleComponent implements OnInit, OnDestroy {


    response: string;
    navigationSubscription;
    constructor(private router: Router, private user: UserService) {
        this.navigationSubscription = this.router.events.subscribe((event: any) => {
            // If it is a NavigationEnd event re-initalise the component
                if (event instanceof NavigationEnd) {
                    this.ngOnInit();
                }
            });
        }
        ngOnInit() {
            $.get("http://allorigins.me/get?url=" + encodeURIComponent("https://www.readmng.com/") + "&callback=?", function(response) {})
            .then((data) => {
                const filtered = data
                .match(/class=\\\"manga_info\\\" href=\\\"https:\/\/www.readmng.com\/(.*?)\"/g);
                return filtered;
            })
            .then((filtered) => {
                let s: string;
                for (const url of filtered) {
                    s = s + url ;
                }
                // console.log(s);
                return s;
            })
            .then((s) => {
                const data = s
                .match(/https:\/\/www.readmng.com\/(.*?)\"/g);
                console.log(data);
                return data;
            })
            .then((data) => {
                let s = "";
                for (const url of data) {
                    s = s + "</br><a href='" + url.slice(0, -1) + "' >" + url.slice(0, -1) + "</a>";
                }
                $('.view').append(s);
            });
    }
    ngOnDestroy() {
        if (this.navigationSubscription) {
           this.navigationSubscription.unsubscribe();
        }
      }
}
