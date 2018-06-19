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
            return s;
        })
        .then((s) => {
            const reg = new RegExp("href=\\\\\"http\:\/\/www.funmanga.com\/", "g");
            const data = s.match(/https:\/\/www.readmng.com\/(.*?)\"/g);
            console.log(data);
            return data;
        })
        .then((data) => {
            let s = "";
            const reg = new RegExp("https\:\/\/www.readmng.com\/", "g");
            for (const url of data) {
                s = s + "</br><a style='color: black; text-decoration: none;' href='" + url.slice(0, -1) + "' >" + url.slice(0, -2) + "</a>";
                s = s.replace(reg, "");
                s = s.replace("-", " ");
                s = s.replace("_", " ");
            }
            $('.view').append(s);
        });

        this.navigationSubscription = this.router.events.subscribe((event: any) => {
            // If it is a NavigationEnd event re-initalise the component
                if (event instanceof NavigationEnd) {
                    this.ngOnInit();
                }
            });
        }

    ngOnInit() {
    }
    ngOnDestroy() {
        if (this.navigationSubscription) {
           this.navigationSubscription.unsubscribe();
        }
      }
}
