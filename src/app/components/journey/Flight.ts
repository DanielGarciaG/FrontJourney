import { Transport } from "./Transport"

export interface Flight {
    origin: string,
    destination: string,
    price: number
    departureStation: string,
    transport: Transport
}