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
        $.get("http://allorigins.me/get?url="
        + encodeURIComponent("https://www.funmanga.com/manga-list/t")
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
            let url: string;
            let urlValue: string;
            const reg = new RegExp("href=\\\\\"http\:\/\/www.funmanga.com\/", "g");
            for ( i = 1; i <= imax; i++) {
                url = result[i];
                urlValue = url.replace("_", " ");
                urlValue = urlValue.replace("-", " ");
                s = "<option value='" + url.slice(0, -2) + "'>" + urlValue.slice(0, -2) + "</option>";
                s = s.replace(reg, "");
                $('#mangaSelector').append(s);
            }
        });
    }
    getManga() {
        $('#chapterSelector').empty();
        $('.viewManga').empty();
        this.chapter = this.chapter.trim();
        $.get("http://allorigins.me/get?url="
        + encodeURIComponent("https://www.readmng.com/" + this.manga + "/" + this.chapter + "/all-pages")
        + "&callback=?", function(response) {  })
        .then((data) => {
            const filtered = data.match(/https\:\/\/www.funmanga.com\/uploads\/(.*?)jpg/g);
            if (!filtered) {
                $('.viewManga').append("Not available yet");
            }
            return filtered;
        })
        .then((filtered) => {
            let s = "";
            for (const url of filtered) {
                s += "<img style='width: 60vw;' src=' " + url + " '>";
            }
            $('.viewManga').append(s);
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
            console.log(filtered);
            let i: number;
            const imax: number = filtered.length;
            let s: string;
            for ( i = 1; i <= imax; i++) {
                s = "<option value=' " + i + " '>" + i + "</option>";
                $('#chapterSelector').append(s);
            }
        })
        .catch(() => {console.log("Erreur"); });
    }
}
