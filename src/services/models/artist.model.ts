import { IArtist } from "src/interfaces/artist.interfaces";

export class Artist implements IArtist {
    id: string; // uuid v4
    name: string;
    grammy: boolean;
}