import { DobavljacService } from './../../services/dobavljac.service';
import { Dobavljac } from './../../models/dobavljac';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DobavljacDialogComponent } from '../dialogs/dobavljac-dialog/dobavljac-dialog.component';

@Component({
  selector: 'app-dobavljac',
  templateUrl: './dobavljac.component.html',
  styleUrls: ['./dobavljac.component.css']
})
export class DobavljacComponent implements OnInit {

  constructor(private dobavljacService: DobavljacService,
    private dialog: MatDialog) { }

ngOnDestroy(): void {
  this.subscription.unsubscribe;
}

displayedColumns = ['id', 'naziv', 'adresa','kontakt', 'action'];
dataSource: MatTableDataSource<Dobavljac>;
subscription:Subscription; 

ngOnInit(): void {
  this.loadData();
}

public loadData(){
   this.subscription=this.dobavljacService.getAllDobavljac()
      .subscribe(dataDobavljac => {
          //console.log(dataDobavljac);
          this.dataSource=new MatTableDataSource(dataDobavljac);
      }),
      (error:Error) => {console.log(error.name+' '+error.message)}
}

public openDialog(flag:number,id?:number, naziv?:string, adresa?:string, kontakt?:string):void{
    const dialogRef=this.dialog.open(DobavljacDialogComponent, {data:{id, naziv,adresa,kontakt}});
    dialogRef.componentInstance.flag=flag;

    dialogRef.afterClosed().subscribe(res=>{
      if (res===1){
        //ponovo ucitaj podatke
        this.loadData();
      }
    })
}

}
