
import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
} from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const categoryRouter = createTRPCRouter({
    getCategoryItems: publicProcedure
        .input(z.object({ name: z.string() }))
        .query(async ({ input }) => {
            const name = input.name.charAt(0).toUpperCase() + input.name.slice(1);
            console.log(name);
            const categoryItems = await prisma.category.findFirst({
                where: {
                    name: name
                },
                include: {
                    products: true,
                },
            });
            const products = await prisma.product.findMany({
                where: {
                    categoryId: categoryItems?.id
                }
            })
            console.log(products);
            return { categoryItems, products };
        }),
});
