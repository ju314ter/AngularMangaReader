import { Component, OnInit } from "@angular/core";
import { UserService } from "../../user.service";

import * as $ from "jquery";

@Component({
    selector: "app-reader",
    styleUrls: ["./reader.component.scss"],
    templateUrl: "./reader.component.html"
})

export default class ReaderComponent implements OnInit {
    chapter = "1";
    onepage: boolean;
    manga: string;
    listManga = "abcdefghijklmnopqrstuvwxyz";
 constructor(private user: UserService ) {
 }

    ngOnInit() {
        this.user.getUserLoggedIn();
        if (this.user.isUserLoggedIn) {
            console.log("connected");
        } else {
            console.log("non admin");
        }

        // for (let i = 0; i < this.listManga.length ; i++) {

        // }
        $.get("http://allorigins.me/get?url="
        + encodeURIComponent("https://www.funmanga.com/manga-list/a")
        + "&callback=?", function(response) {})
        .then((data) => {
            const listToRetrieve = "href=\\\\\"http\:\/\/www.funmanga.com\/(.*?)\"";
            const reg = new RegExp(listToRetrieve, "g");
            const filtered = data.match(reg);
            return filtered;
        })
        .then((result) => {
            let i: number;
            const imax: number = result.length;
            let s: string;
            const reg = new RegExp("href=\\\\\"http\:\/\/www.funmanga.com\/", "g");
            for ( i = 1; i <= imax; i++) {
                s = "<option value='" + result[i] + "'>" + result[i] + "</option>";
                s = s.replace(reg, "");
                s = s.slice(0, -2);
                $('#mangaSelector').append(s);
            }
        });
    }
    getManga() {
        $('#chapterSelector').empty();
        $('.view').empty();
        this.chapter = this.chapter.trim();
        $.get("http://allorigins.me/get?url="
        + encodeURIComponent("https://www.readmng.com/" + this.manga + "/" + this.chapter + "/all-pages")
        + "&callback=?", function(response) { })
        .then((data) => {
            const filtered = data.match(/https\:\/\/www.funmanga.com\/uploads\/(.*?)jpg/g);
            return filtered;
        })
        .then((filtered) => {
            let s = "";
            for (const url of filtered) {
                s = s + "<img style='width: 60vw;' src=' " + url + " '>";
            }
            $('.view').append(s);
            return s;
        });

        $.get("http://allorigins.me/get?url="
        + encodeURIComponent("https://www.readmng.com/" + this.manga)
        + "&callback=?", function(response) {})
        .then((data) => {
            const mangaToSearch = "https\:\/\/www.readmng.com\/" + this.manga + "\/(.*?)\"";
            const reg = new RegExp(mangaToSearch, "g");
            const filtered = data.match(reg);
            return filtered;
        })
        .then((filtered) => {
            let i: number;
            const imax: number = filtered.length;
            let s: string;
            for ( i = 1; i <= imax; i++) {
                s = "<option value=' " + i + " '>" + i + "</option>";
                $('#chapterSelector').append(s);
            }
        });
    }

}
