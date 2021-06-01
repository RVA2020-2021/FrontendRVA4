import { StavkaPorudzbineDialogComponent } from './../dialogs/stavka-porudzbine-dialog/stavka-porudzbine-dialog.component';
import { Artikl } from './../../models/artikl';
import { StavkaPorudzbineService } from './../../services/stavka-porudzbine.service';
import { StavkaPorudzbine } from './../../models/stavka-porudzbine';
import { Porudzbina } from './../../models/porudzbina';
import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-stavka-porudzbine',
  templateUrl: './stavka-porudzbine.component.html',
  styleUrls: ['./stavka-porudzbine.component.css']
})
export class StavkaPorudzbineComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selektovanaPorudzbina: Porudzbina;
  displayedColumns = ['id', 'redniBroj', 'kolicina', 'jedinicaMere', 'cena', 'porudzbina', 'artikl', 'actions'];
  dataSource: MatTableDataSource<StavkaPorudzbine>;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  subscription: Subscription;

  constructor(private stavkaPorudzbineService: StavkaPorudzbineService, private dialog: MatDialog) { }

  ngOnChanges(): void {
    this.loadData();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  public loadData() {
    this.subscription = this.stavkaPorudzbineService.getStavkeZaPorudzbinu(this.selektovanaPorudzbina.id)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);

        // pretraga po nazivu ugnježdenog objekta
        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'artikl' ? currentTerm + data.artikl.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        // sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'artikl': return data.artikl.naziv.toLocaleLowerCase();
            default: return data[property];
          }
        };

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
  }

  public openDialog(flag: number, id?: number, redniBroj?: number, kolicina?: number, jedinicaMere?: string, cena?: number, porudzbina?: Porudzbina, artikl?: Artikl) {
    const dialogRef = this.dialog.open(StavkaPorudzbineDialogComponent, { data: { id, redniBroj, kolicina, jedinicaMere, cena, porudzbina, artikl } });
    dialogRef.componentInstance.flag = flag;

    if (flag === 1) {
      dialogRef.componentInstance.data.porudzbina = this.selektovanaPorudzbina;
    }
    dialogRef.afterClosed().subscribe(res => {
      if (res === 1) {
        //ponovo ucitaj podatke
        this.loadData();
      }
    })
  }

  applyFilter(filterValue: string) {

    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;

  }

}
