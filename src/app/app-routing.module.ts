import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaptureComponent } from './components/capture/capture.component';
import { DniComponent } from './components/dni/dni.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { PruebaClienteComponent } from './components/prueba-cliente/prueba-cliente.component';
import { SelfieComponent } from './components/selfie/selfie.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '/instructions' },
/*   { path: '', pathMatch: 'full', redirectTo: '/pruebaCliente' }, */
  { path: 'instructions', component: InstructionsComponent },
  { path: 'dni', component: DniComponent },
  { path: 'selfie', component: SelfieComponent},
  { path: 'capture', component: CaptureComponent},
  { path: 'pruebaCliente', component: PruebaClienteComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
