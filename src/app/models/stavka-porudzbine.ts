import { Porudzbina } from './porudzbina';
import { Artikl } from './artikl';
export class StavkaPorudzbine {
    id:number;
    cena:number;
    jedinicaMere: string;
    kolicina: number;
    redniBroj: number;
    artikl:Artikl;
    porudzbina: Porudzbina
}