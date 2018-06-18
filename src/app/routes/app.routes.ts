import { Routes } from "@angular/router";
import ArticleComponent from "../components/article/article.component";
import ReaderComponent from "../components/reader/reader.component";
import { AuthguardGuard } from "../authguard.guard";
import LoginComponent from "../components/login/login.component";


export const ROUTES: Routes = [
    {
        path: "",
        component: LoginComponent,
        runGuardsAndResolvers: 'always',
    },
    {
        path: ":name",
        component: ArticleComponent,
        runGuardsAndResolvers: 'always',
        canActivate:[AuthguardGuard]
    },  
    {
        path: "manga/reader",
        component: ReaderComponent,
        runGuardsAndResolvers: 'always',
    }
];
