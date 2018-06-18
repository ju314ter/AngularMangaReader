import { Pipe , PipeTransform } from "@angular/core";

@Pipe({
    name: 'toDate'
 })
export default class FilterTimestamp implements PipeTransform {
    transform(timestamp: number) {
        let result = "Une date à afficher";
        const date = new  Date(timestamp * 1000);
        const heure = date.getHours();
        const min = date.getMinutes();
        const sec = date.getSeconds();
        // result = heure + ':' + min + ':' + sec;
        result = `${heure}:${min}:${sec}`;

        return result;
    }
}
