import { Flight } from "./Flight"

export interface Journey {
    origin: string,
    destination: string,
    price: number,
    flight: Flight[]
}
