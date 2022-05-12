import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp} from '@angular/fire/app' 
import { getFirestore, provideFirestore } from '@angular/fire/firestore'
import { getDatabase, provideDatabase } from '@angular/fire/database'
import { AngularFireModule } from '@angular/fire/compat';

import { CommonModule } from '@angular/common';  



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [CommonModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    AngularFireModule.initializeApp(environment.firebase),  
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}