export type ProductType = {
    id: number,
    name: string | null,
    desc: string | null,
    price: string | null,
    images: string[] | null
}
export type ProductArray = (ProductType | null)[]; 
