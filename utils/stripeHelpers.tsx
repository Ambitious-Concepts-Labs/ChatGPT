import Stripe from 'stripe';
import { v4 as uuidv4 } from "uuid";

import { BillingAddress, Invoice, PaymentMethod, Product, ProductSubscription } from './types';
import { UserAuth } from '../app/authContext';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const stripe = new Stripe(String(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY), {
    apiVersion: '2023-08-16',
});

/*
    Get all payments for a user 
*/
export async function getInvoices(customerEmail: string): Promise<Invoice[] | null> {

    let results: Invoice[] = []

    const customers = await stripe.customers.list({
        email: customerEmail
    })

    for (var cus of customers.data) {
        const payments = await getInvoicesForCustomerId(cus.id);
        if (payments) {
            results.push(...payments)
        }
    }
    return results;
}

export async function getInvoicesForCustomerId(customerId: string): Promise<Invoice[] | null> {
    let results: Invoice[] = [];

    let charges = await stripe.invoices.list(
        { customer: customerId }
    );

    charges.data.map((item, index) => (
        results.push({
            amount_captured: item.amount_paid,
            created: item.created,
            due: item.due_date ? item.due_date : 0,
            customer_id: customerId,
            status: String(item.status),
            hosted_invoice_link: String(item.hosted_invoice_url),
            id: item.id
        })
    ))
    return results;
}

/*
    Get the billing address of a customer
*/

export async function getBillingAddress(customerId: string): Promise<BillingAddress | null> {
    let customer = await stripe.customers.retrieve(customerId, { expand: ['address'] });

    return {
        //@ts-ignore
        address: "" + customer.address?.line1,
        //@ts-ignore
        city: "" + customer.address?.city,
        //@ts-ignore
        zipcode: "" + customer.address?.postal_code,
        //@ts-ignore
        state: "" + customer.address?.state
    } as BillingAddress
}

/*
    Get all payment methods
*/
export async function getPaymentMethods(customerId: string): Promise<PaymentMethod[]> {

    let results: PaymentMethod[] = [];

    let methods = await stripe.paymentMethods.list({
        customer: customerId
    });

    methods.data.map((item, index) => (
        item.card &&
        results.push({
            type: item.card.brand,
            card_number: item.card.last4,
            cvc: "" + item.card.checks?.cvc_check,
            exp: "" + item.card.exp_month + "/" + item.card.exp_year,
            address: "" + item.card.checks?.address_line1_check
        })
    ))

    return results;
}

/*
    Get all active products
*/
export async function getProducts(): Promise<Product[]> {
    let results: Product[] = [];
    (await stripe.products.list({ active: true })).data.map((item) => results.push({
        id: item.id,
        name: item.name,
        description: "" + item.description,
    }))
    return results;
}

export async function getAllSubscriptions(): Promise<Stripe.Subscription[]> {
    const subscriptions = await stripe.subscriptions.list({
        status: 'active',
        expand: ['data.customer', 'data.schedule'],
        limit: 5
    })
    return subscriptions.data;
}

/*
    Get all subscriptions for a customer
*/
export async function getSubscriptions(customerEmail: string, returnLink: string): Promise<ProductSubscription[]> {

    let result: ProductSubscription[] = [];
    const customers = await stripe.customers.list({
        email: customerEmail
    })

    for (var cus of customers.data) {
        const subs = await getSubscriptionsForCustomerId(cus.id, returnLink);
        result.push(...subs)
    }

    return result;
}


export async function getSubscriptionsForCustomerId(customerId: string, returnLink: string): Promise<ProductSubscription[]> {

    let result: ProductSubscription[] = [];

    const subscriptions = await stripe.subscriptions.list({
        customer: String(customerId),
        status: 'active'
    })

    for (var sub of subscriptions.data) {
        if (sub.items.data) {
            const item = sub.items.data.at(0);
            if (item?.price) {
                if (item.price.product) {
                    const product = await stripe.products.retrieve(String(item?.price.product));
                    result.push({
                        product: {
                            name: product.name,
                            id: product.id,
                            description: "" + product.description
                        },
                        started: sub.start_date,
                        status: sub.status,
                        price_id: item.price.id,
                        customer_id: "" + sub.customer,
                        manage_link: "" + (await generateCustomerPortalLink("" + sub?.customer, returnLink)),
                    })
                }
            }
        }
    }

    return result;
}


/*
    Create customer if one dosn't exist
*/
export async function getCustomer(userId: string) {
    const { user, id, getUser } = UserAuth();

    // const user = await prisma.user.findFirst({ where: { id: userId } });

    const customers = await stripe.customers.list({
        email: "" + user?.email
    })

    if (customers.data.length > 0 && !user?.stripe_customer_id) {

        const updated_user: any = await updateDoc(doc(db, "users", id), {
            stripe_customer_id: customers.data[0].id,
            api_key: "secret_" + uuidv4()
        });

        return updated_user?.stripe_customer_id
    }

    if (!user?.api_key) {
        await updateDoc(doc(db, "users", id), {
            api_key: "secret_" + uuidv4()
        });
    }

    if (!user?.stripe_customer_id) {
        const customer = await stripe.customers.create({
            email: String(user?.email),
            name: user?.name ?? "No name"
        })

        await updateDoc(doc(db, "users", id), {
            stripe_customer_id: customer.id,
        });
    }
    const user2 = await getUser(id);
    return user2?.stripe_customer_id;
}

/*
    Generate a customer portal
*/
export async function generateCustomerPortalLink(customerId: string, redirectUrl: string) {

    try {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: redirectUrl,
        });
        return portalSession.url;
    } catch (error) {
        return null;
    }
}

export async function generateCheckoutLink(priceId: string, domain: string, customer: string) {

    const checkout = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: String(priceId),
                quantity: 1
            }
        ],
        customer_update: {
            address: 'auto'
        },
        customer: customer,
        mode: 'subscription',
        success_url: `${domain}?success=true`,
        cancel_url: `${domain}?canceled=true`,
        automatic_tax: { enabled: true },
    })

    return checkout.url
}



async function impl_getStripeProducts() {
    try {
        const products = await stripe.products.list({ expand: ['data.default_price'], active: true });
        return products.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

async function impl_getStripePricesForStripeProduct(productId: string) {
    try {
        const prices = await stripe.prices.list({
            product: productId,
        });
        return prices.data;
    } catch (error) {
        console.error('Error fetching prices:', error);
        throw error;
    }
}

export async function getProductsWithRecurringPrices(): Promise<Stripe.Product[]> {
    const products = await impl_getStripeProducts();
    const productsWithRecurringPrices: Stripe.Product[] = [];

    for (const product of products) {
        const prices = await impl_getStripePricesForStripeProduct(product.id);

        if (prices.some(price => price.recurring)) {
            productsWithRecurringPrices.push(product);
        }
    }

    return productsWithRecurringPrices;

}

export async function mrr() {
  // Get the current date
  const currentDate = new Date();

  // Calculate the start and end dates for the current month
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  // Retrieve active subscriptions within the current month
  const subscriptions = await stripe.subscriptions.list({
    created: {
      gte: Math.floor(startDate.getTime() / 1000), // Convert to seconds
      lte: Math.floor(endDate.getTime() / 1000)
    },
    status: 'active',
    expand: ['data.plan']
  });

  // Calculate the MRR
  let mrr = 0;
  subscriptions.data.forEach(subscription => {
    //@ts-ignore
    mrr += subscription.plan.amount / 100; // Amount is in cents, so divide by 100 to get dollars
  });

  return mrr;
}

export async function payments() {
  const twentyFourHoursAgo = Math.floor(Date.now() / 1000) - 24 * 60 * 60;

  try {
    const paymentIntents = await stripe.paymentIntents.list({
      created: {
        gte: twentyFourHoursAgo,
      },
    });

    const paymentCount = paymentIntents.data.length;
    let paymentAmount = 0;

    paymentIntents.data.forEach((paymentIntent) => {
      paymentAmount += paymentIntent.amount / 100; // Convert cents to dollars
    });

    return {
      count: paymentCount,
      amount: paymentAmount,
    };
  } catch (error) {
    throw new Error('Error fetching payment data: ' + error);
  }
}
