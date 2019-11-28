import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolvers/lists.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { PartsListResolver} from './_resolvers/part-list.resolver';
import { PartsListComponent } from './parts/parts-list/parts-list.component';
import { RegisterPartComponent } from './registerpart/registerpart.component';
import { RegisterComponent } from './register/register.component';
import { SearchcompanyComponent } from './searchcompany/searchcompany.component';
import { PartsDetailComponent } from './parts/parts-detail/parts-detail.component';
import { PartsEditComponent} from './parts/parts-edit/parts-edit.component';
import { PartsDetailResolver } from './_resolvers/part-detail.resolver';

export const appRoutes: Routes = [
    
    {path: 'registerpart', component:RegisterPartComponent},
    {path: 'partslist', component: PartsListComponent, resolve: {partslist: PartsListResolver},
    {path: 'partslist/:id', component: PartsListComponent, resolve: {partslist: PartsListResolver}},
    {path: 'registercustomer', component: RegisterComponent},
    {path: 'searchcompany', component: SearchcompanyComponent, resolve: {users:MemberListResolver, parts:PartsListResolver}},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            
            {path: 'members/:id', component: MemberDetailComponent,
                resolve: {user: MemberDetailResolver}},
            {path: 'member/edit', component: MemberEditComponent,
                resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
            {path: 'messages', component: MessagesComponent, resolve: {messages: MessagesResolver}},
            {path: 'lists', component: ListsComponent, resolve: {users: ListsResolver}},

            {path: 'orderpart/:id', component: PartsDetailComponent, resolve: {orderparts: PartsDetailResolver}},
            {path: 'orderpart/edit/:id', component: PartsEditComponent, resolve: {orderparts: PartsDetailResolver}}


        ]
    },
    

    {path: '**', redirectTo: 'partslist', pathMatch: 'full'},
    
];
