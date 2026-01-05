import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { updateOrderToPaid } from "@/lib/actions/order.actions";

export async function POST(req: NextRequest) {
  try {
    // Build the webhook event
    console.log("WEBHOOK CALLED AT:", new Date().toISOString());
    const event = await Stripe.webhooks.constructEvent(
      await req.text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
    console.log("Event type:", event.type);

    // Check for successful payment
    if (
      event.type === "payment_intent.succeeded" ||
      event.type === "charge.succeeded"
    ) {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("Payment Intent ID:", paymentIntent.id);
      console.log("Order ID:", paymentIntent.metadata.orderId);

      // Update order status
      console.log("Calling updateOrderToPaid now");
      await updateOrderToPaid({
        orderId: paymentIntent.metadata.orderId!,
        paymentResult: {
          id: paymentIntent.id,
          status: "COMPLETED",
          email_address: paymentIntent.receipt_email || "",
          pricePaid: (paymentIntent.amount / 100).toFixed(2),
        },
      });
      console.log("updateOrderToPaid finished");

      return NextResponse.json({
        message: "updateOrderToPaid was successful",
      });
    }

    return NextResponse.json({
      message: "event is not charge.succeeded",
    });
  } catch (error) {
    console.error("WEBHOOK ERROR:", error);

    return NextResponse.json({ error: "failed" }, { status: 400 });
  }
}
