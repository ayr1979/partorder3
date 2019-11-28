import { Photo } from './photo';

export interface partslist
{
    id: number;
    partName: string;
    partDescription: string;
    partUrl: string;
    sku: string;
    inStock: boolean;
    isActive: boolean;
    photos?: Photo[];
    userId?: number;
    added: Date;
    url: string;    

}