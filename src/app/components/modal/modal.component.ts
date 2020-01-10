import { Component, OnInit, Inject, Output,EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CargoService } from '../../services/cargo/cargo.service';
import { TrabajadorService } from '../../services/trabajador/trabajador.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: []
})
export class ModalComponent implements OnInit {

  public enviarTrabajador:FormGroup = new FormGroup({
    'id': new FormControl(null,[Validators.required]),
    'nombre': new FormControl(null,[Validators.required]),
    'apellidos': new FormControl(null,[Validators.required]),
    'correo': new FormControl(null,[Validators.required,Validators.email]),
    'salario': new FormControl(null,[Validators.required]),
    'idCargo': new FormControl(null,[Validators.required]),
    'cargo': new FormControl(null,[Validators.required])
  });

  public buttonName:string;

  public metodoEjecutar:number;

  public cargos:any[];
  @Output() outpt = new EventEmitter();

  constructor(
    public _cargosService: CargoService,
    public _trabajadorService: TrabajadorService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 

    this.getCargos();

    if(data != null){
      this.buttonName = 'Aceptar';
      this.metodoEjecutar = 1;
      this.enviarTrabajador.get('id').setValue(this.data.id);
      this.enviarTrabajador.get('nombre').setValue(this.data.nombre);
      this.enviarTrabajador.get('apellidos').setValue(this.data.apellidos);
      this.enviarTrabajador.get('correo').setValue(this.data.correo);
      this.enviarTrabajador.get('salario').setValue(this.data.salario);
      this.enviarTrabajador.get('idCargo').setValue(this.data.idCargo);
      this.enviarTrabajador.get('cargo').setValue(this.data.idCargo);

      console.log('LLEGO DATA');
      console.log(this.enviarTrabajador.value);
    }else{
      this.buttonName = 'Crear';
      this.metodoEjecutar = 0;
    }

  }

  ngOnInit() {

  }
  
  cancelar(){
    this.dialogRef.close();
  }

  selectCargo(e){
    this.enviarTrabajador.get('idCargo').setValue(e.value);
  }
  
  getCargos(){
    this._cargosService.getCargos()
    .subscribe(resp =>{
      this.cargos = resp.data;
      console.log(this.cargos)
    })
  }
  
  updateOrCreateTrabajador(){
    if(this.metodoEjecutar == 1){
      if(this.enviarTrabajador.valid){
        // this.avisarUpdate();
        this._trabajadorService.putTrabajador(this.enviarTrabajador.value)
          .subscribe(resp =>{
            this.avisarUpdate();
          },
          err=>{
            console.log(err);
          })
      }
    }else{
      this._trabajadorService.postTrabajador(this.enviarTrabajador.value)
          .subscribe(resp =>{
            this.avisarCreate();
          });
    }
  }

  avisarUpdate(){
    this.outpt.emit(this.enviarTrabajador.value);
    this.dialogRef.close();
  }

  avisarCreate(){
    this.outpt.emit(this.enviarTrabajador.value);
    this.dialogRef.close();
  }

}
