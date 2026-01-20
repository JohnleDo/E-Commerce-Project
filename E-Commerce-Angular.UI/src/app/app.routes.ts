import { Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsManageComponent } from './pages/products-manage/products-manage.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ProductsListComponent
    },
    {   
        path: 'cart',
        component: CartComponent
    },
    {   
        path: 'manage',
        component: ProductsManageComponent
    },
    {   
        path: 'login',
        component: LoginComponent
    }
];
