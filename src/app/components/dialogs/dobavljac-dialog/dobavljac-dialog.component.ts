import { DobavljacService } from './../../../services/dobavljac.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dobavljac } from 'src/app/models/dobavljac';

@Component({
  selector: 'app-dobavljac-dialog',
  templateUrl: './dobavljac-dialog.component.html',
  styleUrls: ['./dobavljac-dialog.component.css']
})
export class DobavljacDialogComponent implements OnInit {

  public flag: number; //1 add,2 update ili 3 delete

  constructor(public dobavljacService: DobavljacService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DobavljacDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDialog: Dobavljac) { }

  ngOnInit(): void {
  }

  public addDobavljac(): void {
    this.dobavljacService.addDobavljac(this.dataDialog).subscribe(() => {
      this.snackBar.open('Uspesno dodat dobavljac: ' + this.dataDialog.naziv, 'OK', { duration: 2500 })
    }), (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom dodavanja dobavljaca', 'Zatvori', { duration: 2500 });
    };
  }

  public updateDobavljac(): void {
    this.dobavljacService.updateDobavljac(this.dataDialog).subscribe(() => {
      this.snackBar.open('Uspesno izmenjen dobavljac: ' + this.dataDialog.naziv, 'OK', { duration: 2500 })
    }), (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom izmene dobavljaca', 'Zatvori', { duration: 2500 });
    };
  }

  public deleteDobavljac(): void {
    this.dobavljacService.deleteDobavljac(this.dataDialog.id).subscribe(() => {
      this.snackBar.open('Uspesno obrisan dobavljac: ' + this.dataDialog.naziv, 'OK', { duration: 2500 })
    }), (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom brisanja dobavljaca', 'Zatvori', { duration: 2500 });
    };
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmene', 'Zatvori', { duration: 1000 });
  }

}
