import { Component } from "@angular/core";

@Component({
    selector: "app-menu",
    styleUrls: ["./menu.component.scss"],
    templateUrl: "./menu.component.html"
})

export default class MenuComponent {
    lien = [];
    constructor() {
        this.lien[0] = 'Home';
        this.lien[1] = 'Directory';
        this.lien[2] = 'Reader';
    }
}
