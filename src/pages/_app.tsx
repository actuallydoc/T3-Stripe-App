import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
} from '@stripe/react-stripe-js';
import Layout from "components/Layout";
import { shoppingCartSlice } from "@/../stores/shoppingCartStore";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux'

import store from "@/../stores/shoppingCartStore";

//Public key that will be used on the frontend
//Your need a elements context provider from stripe to give access to the stripePromise in the components
const stripePromise = loadStripe("pk_test_51NCkvbLgP5qE4oZv3UhPKaOkkKhHLAtgU2zPIRAbLsD7Z3jObbFGLrSAypZhxrcBNU3SwAGvlDOpLW11JRQw3L8F00QFSOMotz");

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Elements stripe={stripePromise}>
          <Layout>
            <Component {...pageProps} />
          </Layout>

        </Elements>
      </SessionProvider>
    </Provider>
  );
};

export default api.withTRPC(MyApp);
