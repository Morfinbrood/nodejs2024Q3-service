import { IArtist } from "src/interfaces/artist.interface";

export class Artist implements IArtist {
    id: string; // uuid v4
    name: string;
    grammy: boolean;
}