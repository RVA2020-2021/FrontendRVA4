import { Porudzbina } from './../../models/porudzbina';
import { MatDialog } from '@angular/material/dialog';
import { Dobavljac } from './../../models/dobavljac';
import { PorudzbinaService } from './../../services/porudzbina.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { PorudzbinaDialogComponent } from '../dialogs/porudzbina-dialog/porudzbina-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-porudzbina',
  templateUrl: './porudzbina.component.html',
  styleUrls: ['./porudzbina.component.css']
})
export class PorudzbinaComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'datumPorucivanja', 'isporuceno','iznos', 'placeno','dobavljac', 'actions'];
  dataSource: MatTableDataSource<Porudzbina>;
  subscription: Subscription;
  selektovanaPorudzbina: Porudzbina;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

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


           // pretraga po nazivu ugnježdenog objekta
         this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'dobavljac' ? currentTerm + data.dobavljac.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        // sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'dobavljac': return data.dobavljac.naziv.toLocaleLowerCase();
            default: return data[property];
          }
        };
        
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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

  applyFilter(filterValue: string) {
  
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;

  }

}
