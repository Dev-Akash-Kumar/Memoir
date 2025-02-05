import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'journal/list',
    loadComponent: () =>
      import('./Journal/list/list.component').then((m) => m.ListComponent),
  },
  {
    path: 'journal/add',
    loadComponent: () =>
      import('./Journal/add/add.component').then((m) => m.AddComponent),
  },
  {
    path: 'journal/edit/:id',
    loadComponent: () =>
      import('./Journal/edit/edit.component').then((m) => m.EditComponent),
  },
];
