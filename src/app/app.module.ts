import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { routingComponents } from './app-routing.module'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersModule } from './users/users.module';
import { ProductComponent } from './product/product.component';

import { FooterComponent } from './footer/footer.component';
import { HandleRowsPipe } from './handle-rows.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    routingComponents,
    ProductComponent,
    FooterComponent,
    HandleRowsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsersModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
