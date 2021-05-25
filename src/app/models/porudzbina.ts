import { Dobavljac } from './dobavljac';
export class Porudzbina {
    id:number;
    datum:Date;
    isporuceno:Date;
    iznos:number;
    placeno: Boolean;
    dobavljac: Dobavljac; 
}