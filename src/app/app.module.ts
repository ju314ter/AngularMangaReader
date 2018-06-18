
// Import module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireFunctionsModule } from 'angularfire2/functions';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

// Import routing
import { ROUTES } from './routes/app.routes';

// Import component
import { AppComponent } from './app.component';
import ArticleComponent from './components/article/article.component';
import MenuComponent from './components/menu/menu.component';
import LoginComponent from './components/login/login.component';
// Pipes
import FilterTimestamp from './pipes/todate.pipe';
import ReaderComponent from './components/reader/reader.component';

// Import providers (services)
import { UserService } from './user.service';
import { AuthguardGuard } from './authguard.guard';


@NgModule({
  // Composant, pipes, directives
  declarations: [
    AppComponent,
    ArticleComponent,
    MenuComponent,
    LoginComponent,
    FilterTimestamp,
    ReaderComponent
  ],
  // Modules
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(ROUTES, {onSameUrlNavigation: 'reload'}),
  ],
  exports:[
    RouterModule
  ],
  // Services
  providers: [UserService, AuthguardGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
