import { ArtiklService } from './../../../services/artikl.service';
import { StavkaPorudzbineService } from './../../../services/stavka-porudzbine.service';
import { StavkaPorudzbine } from './../../../models/stavka-porudzbine';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Artikl } from 'src/app/models/artikl';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stavka-porudzbine-dialog',
  templateUrl: './stavka-porudzbine-dialog.component.html',
  styleUrls: ['./stavka-porudzbine-dialog.component.css']
})
export class StavkaPorudzbineDialogComponent implements OnInit, OnDestroy {

  flag: number;
  artikli: Artikl[];
  artiklSubscription: Subscription;

  constructor(public stavkaPorudzbineService: StavkaPorudzbineService,
    public artiklService: ArtiklService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StavkaPorudzbineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StavkaPorudzbine) { }

  ngOnDestroy(): void {
    this.artiklSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.artiklSubscription=this.artiklService.getAllArtikls()
      .subscribe(artikli => {
        this.artikli=artikli;
      }),
      (error: Error) => {
        console.log(error.name+' '+error.message);
      }

  }

  compareTo(a,b){
    return a.id==b.id;
  }

  public add() : void {
    this.stavkaPorudzbineService.addStavkaPor(this.data).subscribe(() => {
      this.snackBar.open('Uspesno dodata stavka', 'OK', {duration:2500})
    }), (error: Error) => {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom dodavanja stavke', 'Zatvori', {duration:2500});
    };
}

public update() : void {
  this.stavkaPorudzbineService.updateStavkaPor(this.data).subscribe(() => {
    this.snackBar.open('Uspesno izmenjena stavka', 'OK', {duration:2500})
  }), (error: Error) => {
    console.log(error.name+' '+error.message);
    this.snackBar.open('Doslo je do greske prilikom izmene stavke', 'Zatvori', {duration:2500});
  };
}

public delete() : void {
  this.stavkaPorudzbineService.deleteStavkaPor(this.data.id).subscribe(() => {
    this.snackBar.open('Uspesno obrisana stavka', 'OK', {duration:2500})
  }), (error: Error) => {
    console.log(error.name+' '+error.message);
    this.snackBar.open('Doslo je do greske prilikom brisanja stavke', 'Zatvori', {duration:2500});
  };
}

public cancel(): void {
  this.dialogRef.close();
  this.snackBar.open('Odustali ste od izmene', 'Zatvori', {duration:1000});
}

}
