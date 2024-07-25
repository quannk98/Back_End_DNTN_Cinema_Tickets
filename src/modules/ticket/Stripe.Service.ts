import { ConflictException, Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentDto } from './dto/payment.dto';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async createPaymentIntent(paymentDto: PaymentDto): Promise<any> {
    const payment = await this.stripe.paymentIntents.create({
      amount: paymentDto.amount,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: { name: paymentDto.name },
    });
    if (!payment) {
      return 'Payment Falied';
    }
    const clientSecret = payment.client_secret;
    return clientSecret;
  }
}
