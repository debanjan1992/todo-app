import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "",
        pathMatch: "full",
        loadComponent: () => import("./pages/todo/todo.component").then(c => c.TodoComponent)
    }
];
