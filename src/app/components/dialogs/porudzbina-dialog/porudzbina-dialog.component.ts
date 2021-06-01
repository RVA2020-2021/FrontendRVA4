import { DobavljacService } from './../../../services/dobavljac.service';
import { Dobavljac } from './../../../models/dobavljac';
import { Porudzbina } from './../../../models/porudzbina';
import { PorudzbinaService } from './../../../services/porudzbina.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-porudzbina-dialog',
  templateUrl: './porudzbina-dialog.component.html',
  styleUrls: ['./porudzbina-dialog.component.css']
})
export class PorudzbinaDialogComponent implements OnInit, OnDestroy {

  public flag: number; //1 add,2 update ili 3 delete
  public dobavljaci: Dobavljac[];
  public subscription: Subscription;
  constructor(public porudzbinaService: PorudzbinaService,
    public dobavljacService: DobavljacService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PorudzbinaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Porudzbina) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    this.subscription=this.dobavljacService.getAllDobavljac().subscribe(data => {
      this.dobavljaci=data;
    }),
    (error: Error) => {
      console.log(error.name+' '+error.message);
    };
  }

  compareTo(a,b){
    return a.id==b.id;
  }

  public add() : void {
    this.porudzbinaService.addPorudzbina(this.data).subscribe(() => {
      this.snackBar.open('Uspesno dodata porudzbina', 'OK', {duration:2500})
    }), (error: Error) => {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom dodavanja porudzbine', 'Zatvori', {duration:2500});
    };
}

public update() : void {
  this.porudzbinaService.updatePorudzbina(this.data).subscribe(() => {
    this.snackBar.open('Uspesno izmenjena porudzbina', 'OK', {duration:2500})
  }), (error: Error) => {
    console.log(error.name+' '+error.message);
    this.snackBar.open('Doslo je do greske prilikom izmene porudzbine', 'Zatvori', {duration:2500});
  };
}

public delete() : void {
  this.porudzbinaService.deletePorudzbina(this.data.id).subscribe(() => {
    this.snackBar.open('Uspesno obrisana porudzbina', 'OK', {duration:2500})
  }), (error: Error) => {
    console.log(error.name+' '+error.message);
    this.snackBar.open('Doslo je do greske prilikom brisanja porudzbine', 'Zatvori', {duration:2500});
  };
}

public cancel(): void {
  this.dialogRef.close();
  this.snackBar.open('Odustali ste od izmene', 'Zatvori', {duration:1000});
}


}
