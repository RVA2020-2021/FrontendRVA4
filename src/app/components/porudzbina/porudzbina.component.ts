import { Porudzbina } from './../../models/porudzbina';
import { MatDialog } from '@angular/material/dialog';
import { Dobavljac } from './../../models/dobavljac';
import { PorudzbinaService } from './../../services/porudzbina.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { PorudzbinaDialogComponent } from '../dialogs/porudzbina-dialog/porudzbina-dialog.component';

@Component({
  selector: 'app-porudzbina',
  templateUrl: './porudzbina.component.html',
  styleUrls: ['./porudzbina.component.css']
})
export class PorudzbinaComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'datumPorucivanja', 'isporuceno','iznos', 'placeno', 'actions'];
  dataSource: MatTableDataSource<Porudzbina>;
  subscription: Subscription;
  selektovanaPorudzbina: Porudzbina;

  constructor(private porudzbinaService: PorudzbinaService, private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.subscription=this.porudzbinaService.getAllPorudzbina()
       .subscribe(dataPorudzbina => {
           this.dataSource=new MatTableDataSource(dataPorudzbina);
       }),
       (error:Error) => {console.log(error.name+' '+error.message)}
 }

 public openDialog(flag:number,id?:number, datum?:Date, isporuceno?:Date, iznos?:number, placeno?:Boolean, dobavljac?:Dobavljac):void{
  const dialogRef=this.dialog.open(PorudzbinaDialogComponent, {data:{id, datum, isporuceno, iznos, placeno, dobavljac}});
  dialogRef.componentInstance.flag=flag;

  dialogRef.afterClosed().subscribe(res=>{
    if (res===1){
      //ponovo ucitaj podatke
      this.loadData();
    }
  })
}

  public selectRow(row: any){
    this.selektovanaPorudzbina=row;
    console.log(this.selektovanaPorudzbina);
  }

}
