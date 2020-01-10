import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TrabajadorService } from '../../services/trabajador/trabajador.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-perfif',
  templateUrl: './perfif.component.html',
  styles: []
})
export class PerfifComponent implements OnInit {

  public trabajadorData:any;

  constructor(
    private rutaActiva: ActivatedRoute,
    private _trabajadorService: TrabajadorService,
    public dialog: MatDialog,
  ) { 
    this.getDataTrabajador();
  }

  ngOnInit() {

  }

  openDialog(){
    var dialogRef : MatDialogRef<any>;
    dialogRef = this.dialog.open(ModalComponent, {
      width: '800px',
      data: this.trabajadorData
     });

    dialogRef.componentInstance.outpt.subscribe(resp  => {
      this.trabajadorData.nombre = resp.nombre;
      this.trabajadorData.apellidos = resp.apellidos;
      this.trabajadorData.correo = resp.correo;
      this.trabajadorData.salario = resp.salario;
    })   

  }

  getDataTrabajador(){
    this._trabajadorService.getTrabajador(this.rutaActiva.snapshot.params.id)
        .subscribe(resp=>{
          this.trabajadorData = resp.data[0];
        })
  }


}
