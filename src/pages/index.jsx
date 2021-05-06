import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'

import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
// import { createCheckoutSession } from "next-stripe/client";

const Scene = dynamic(() => import('@/scenes/Scene'), {
  ssr: false,
})

const Page = ({ title }) => {
  useStore.setState({ title })
  return (
    <>
      <Scene r3f/>
    </>
  )
}

export default Page

export async function getServerSideProps() {

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
  });

  const prices = await stripe.prices.list({
    active: true,
    limit: 10,
    expand: ["data.product"],
  });
  console.log(prices);

  return { props: { prices: prices.data, title: 'Index' } };

}
