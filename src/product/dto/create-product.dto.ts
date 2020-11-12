import { IsString } from 'class-validator';

export class CreateProductDTO {
    id?: number;
    name: string 
    description:string
    price:number 

}
