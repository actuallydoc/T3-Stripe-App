import { exampleRouter } from "@/server/api/routers/example";
import { createTRPCRouter } from "@/server/api/trpc";
import { paymentRouter } from "./routers/payment";
import { productsRouter } from "./routers/products";
import { categoriesRouter } from "./routers/categories";
import { categoryRouter } from "./routers/category";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  payment: paymentRouter,
  products: productsRouter,
  category: categoryRouter,
  categories: categoriesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
