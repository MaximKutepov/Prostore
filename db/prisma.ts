// db.ts
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library"; // <-- use Decimal from runtime
import ws from "ws";

// Enable WebSocket for Neon in Node.js
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaNeon({ connectionString });

export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        needs: { price: true },
        compute(product: { price: Decimal }) {
          return product.price.toString();
        },
      },
      rating: {
        needs: { rating: true },
        compute(product: { rating: Decimal }) {
          return product.rating.toString();
        },
      },
    },
    cart: {
      itemsPrice: {
        needs: { itemsPrice: true },
        compute(cart: { itemsPrice: Decimal }) {
          return cart.itemsPrice.toString();
        },
      },
      shippingPrice: {
        needs: { shippingPrice: true },
        compute(cart: { shippingPrice: Decimal }) {
          return cart.shippingPrice.toString();
        },
      },
      taxPrice: {
        needs: { taxPrice: true },
        compute(cart: { taxPrice: Decimal }) {
          return cart.taxPrice.toString();
        },
      },
      totalPrice: {
        needs: { totalPrice: true },
        compute(cart: { totalPrice: Decimal }) {
          return cart.totalPrice.toString();
        },
      },
    },
    order: {
      itemsPrice: {
        needs: { itemsPrice: true },
        compute(order: { itemsPrice: Decimal }) {
          return order.itemsPrice.toString();
        },
      },
      shippingPrice: {
        needs: { shippingPrice: true },
        compute(order: { shippingPrice: Decimal }) {
          return order.shippingPrice.toString();
        },
      },
      taxPrice: {
        needs: { taxPrice: true },
        compute(order: { taxPrice: Decimal }) {
          return order.taxPrice.toString();
        },
      },
      totalPrice: {
        needs: { totalPrice: true },
        compute(order: { totalPrice: Decimal }) {
          return order.totalPrice.toString();
        },
      },
    },
    orderItem: {
      price: {
        needs: { price: true },
        compute(orderItem: { price: Decimal }) {
          return orderItem.price.toString();
        },
      },
    },
  },
});
