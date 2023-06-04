
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


            const categoryItems = await prisma.category.findUnique({
                where: {
                    name: input.name.toLowerCase()

                },
                include: {
                    products: true
                }
            });

            return { categoryItems: categoryItems?.products };
        }),


    getSubCategoryItems: publicProcedure.input(z.object({ name: z.string() })).query(async ({ input }) => {
        const categoryItems = await prisma.subcategory.findUnique({
            where: {
                name: input.name.toLowerCase()

            },
            include: {
                products: true
            }
        });

        return { categoryItems: categoryItems?.products };
    }),
});
