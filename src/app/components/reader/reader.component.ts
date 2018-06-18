import { Component, OnInit } from "@angular/core";
import { UserService } from "../../user.service";

import * as $ from "jquery";

@Component({
    selector: "app-reader",
    styleUrls: ["./reader.component.scss"],
    templateUrl: "./reader.component.html"
})

export default class ReaderComponent implements OnInit{
    chapter : string = "1";
    page: string;
    onepage: boolean;
    manga : string;
 constructor(private user: UserService){
 }

    ngOnInit(){
        this.user.getUserLoggedIn();
        if(this.user.isUserLoggedIn){
            console.log("connected")
        }
        else {
            console.log("non admin")
        }

    }
    getManga(){
        console.log("manga : "+this.manga+" chapitre : "+this.chapter)
        $.get("http://allorigins.me/get?url=" + encodeURIComponent("https://www.readmng.com/"+this.manga+"/"+this.chapter+"/all-pages") + "&callback=?", function(response) {})
        .then((data)=>{
            let filtered = data
            .match(/https\:\/\/www.funmanga.com\/uploads\/(.*?)jpg/g);
            return filtered;
        })
        .then((filtered)=>{
            let s :string = "";
            for(let url of filtered){
                s = s + "<img style='width: 80vw;' src=' " + url +" '>";
            }
            $('.view').empty();
            $('.view').append(s);
            return s;
        })

        $.get("http://allorigins.me/get?url=" + encodeURIComponent("https://www.readmng.com/"+this.manga) + "&callback=?", function(response) {})
        .then((data)=>{
            let filtered = data
            .match(/https\:\/\/www.readmng.com\/tower-of-god\/(.*?)\"/g);
            console.log(filtered)
            return filtered;
        })
        // .then((data)=>{
        //     let nbChapter = data.slice()
        //     console.log(nbChapter)
        //     return nbChapter;
        // })
        .then((filtered)=>{
            console.log(filtered.length)
            let numChapter :string = "";
            let i : number;
            let imax : number = filtered.length
            let s : string;
            for(i=1; i<=imax; i++){
                s = "<option value=' " + i +" '>"+ i + "</option>";
                $('#chapterSelector').append(s);
            }
        })
    }

}
