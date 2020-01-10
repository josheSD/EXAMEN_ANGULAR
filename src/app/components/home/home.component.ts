import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, PageEvent, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { TrabajadorService } from '../../services/trabajador/trabajador.service';
import { CargoService } from '../../services/cargo/cargo.service';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  public SubmitData = new MatTableDataSource<any>();
  public SubmitTotalCount : number;
  @ViewChild('SubmitPaginator',{static:true}) SubmitPaginator : MatPaginator;
  @ViewChild('SubmitFilter',{static:true}) SubmitFilter : ElementRef;
  
  public mostrarData:boolean = false;

  public SubmitDisplayColumns = ['nombre','salario','estado','cargo','ver','borrar'];
  public SubmitCurrentPage : PageEvent = {
    pageIndex : 0,
    pageSize : 5,
    length: null
  }

  public cargos:any[] = [];

  constructor(
    public _trabajadoresService : TrabajadorService,
    public _cargosService: CargoService,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit() {
    this.getTrabajadores();
  }

  openDialog(proceso?:number,trabajador?:any){
    var dialogRef : MatDialogRef<any>;
    if(proceso == 1){
       dialogRef = this.dialog.open(ModalComponent, {
        width: '800px',
        data: trabajador
      });
    }

    if(proceso == 0){
      dialogRef = this.dialog.open(ModalComponent, {
        width: '800px',
        data: null
      });
    }

    dialogRef.componentInstance.outpt.subscribe(resp  => {
      let lista: any[] = this.SubmitData.data;
      lista.push(resp);
      this.SubmitData = new MatTableDataSource(lista);
    })    

  }

  getTrabajadores(){
    this._trabajadoresService.getTrabajadores()
      .subscribe(resp=> {
        this.SubmitData = new MatTableDataSource(resp.data);
        this.mostrarData = true;
      });
  }

  borrarTrabajador(id:any){
    this._trabajadoresService.deleteTrabajador(id)
    .subscribe(resp =>{
           let lista: any[] = this.SubmitData.data;
           lista = lista.filter(item => item.id != id)
           this.SubmitData = new MatTableDataSource(lista);
        })
  }

}
