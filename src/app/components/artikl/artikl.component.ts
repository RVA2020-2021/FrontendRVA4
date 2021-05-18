import { ArtiklDialogComponent } from './../dialogs/artikl-dialog/artikl-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Artikl } from 'src/app/models/artikl';
import { ArtiklService } from 'src/app/services/artikl.service';

@Component({
  selector: 'app-artikl',
  templateUrl: './artikl.component.html',
  styleUrls: ['./artikl.component.css']
})
export class ArtiklComponent implements OnInit, OnDestroy {

  constructor(private artiklService: ArtiklService,
      private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }

  displayedColumns = ['id', 'naziv', 'proizvodjac', 'action'];
  dataSource: MatTableDataSource<Artikl>;
  subscription:Subscription; 

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
     this.subscription=this.artiklService.getAllArtikls()
        .subscribe(dataArtikl => {
            //console.log(dataArtikl);
            this.dataSource=new MatTableDataSource(dataArtikl);
        }),
        (error:Error) => {console.log(error.name+' '+error.message)}
  }

  public openDialog(flag:number,id?:number,naziv?:string, proizvodjac?:string):void{
      const dialogRef=this.dialog.open(ArtiklDialogComponent, {data:{id, naziv, proizvodjac}});
      dialogRef.componentInstance.flag=flag;

      dialogRef.afterClosed().subscribe(res=>{
        if (res===1){
          //ponovo ucitaj podatke
          this.loadData();
        }
      })
  }

}
