import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtiklService } from 'src/app/services/artikl.service';
import { Artikl } from 'src/app/models/artikl';

@Component({
  selector: 'app-artikl-dialog',
  templateUrl: './artikl-dialog.component.html',
  styleUrls: ['./artikl-dialog.component.css']
})
export class ArtiklDialogComponent implements OnInit {

  public flag: number; //1 add,2 update ili 3 delete

  constructor(public artiklService: ArtiklService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ArtiklDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDialog: Artikl) { }

  ngOnInit(): void {
  }

  public addArtikl() : void {
      this.artiklService.addArtikl(this.dataDialog).subscribe(() => {
        this.snackBar.open('Uspesno dodat artikl: '+this.dataDialog.naziv, 'OK', {duration:2500})
      }), (error: Error) => {
        console.log(error.name+' '+error.message);
        this.snackBar.open('Doslo je do greske prilikom dodavanja artikla', 'Zatvori', {duration:2500});
      };
  }

  public updateArtikl() : void {
    this.artiklService.updateArtikl(this.dataDialog).subscribe(() => {
      this.snackBar.open('Uspesno izmenjen artikl: '+this.dataDialog.naziv, 'OK', {duration:2500})
    }), (error: Error) => {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom izmene artikla', 'Zatvori', {duration:2500});
    };
  }

  public deleteArtikl() : void {
    this.artiklService.deleteArtikl(this.dataDialog.id).subscribe(() => {
      this.snackBar.open('Uspesno obrisan artikl: '+this.dataDialog.naziv, 'OK', {duration:2500})
    }), (error: Error) => {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom brisanja artikla', 'Zatvori', {duration:2500});
    };
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmene', 'Zatvori', {duration:1000});
  }

}
