export type PaymentMethod = {
    type: string,
    card_number: string;
    cvc: string;
    exp: string;
    address: string;
}

export type BillingAddress = {
    address: string;
    city: string;
    zipcode: string;
    state: string;
}

export type Product = {
    id: string;
    name: string;
    description: string;
}

export type ProductSubscription = {
    product: Product;
    started: number;
    status: string;
    price_id: string;
    customer_id: string;
    manage_link: string;
}

export type Invoice = {
    id: string;
    customer_id: string;
    status: string;
    due: number;
    created: number;
    amount_captured: number;
    hosted_invoice_link: string;
}
