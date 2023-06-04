
import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
} from "@/server/api/trpc";
import { prisma } from "@/server/db";
import type { Product } from "@prisma/client";

export const categoryRouter = createTRPCRouter({
    getCategoryItems: publicProcedure
        .input(z.object({ name: z.string().array() }))
        .query(async ({ input }) => {
            console.log(input.name);
            if (input.name.length === 1) {

                const categoryItems = await prisma.category.findUnique({
                    where: {
                        name: input.name[0]

                    },
                    include: {
                        products: true
                    }
                });
                if (!categoryItems) {
                    throw new Error("Category not found");
                } else {
                    console.log(categoryItems);
                    return { categoryItems: categoryItems?.products as Product[] };
                }
            } else if (input.name.length === 2) {
                const categoryItems = await prisma.subcategory.findUnique({
                    where: {
                        name: input.name[1]
                    },
                    include: {
                        products: true
                    }
                });
                if (!categoryItems) {
                    throw new Error("Subcategory not found");
                } else {
                    console.log(categoryItems);
                    return { categoryItems: categoryItems?.products as Product[] };
                }
            } else {
                throw new Error("Invalid category or too many categories specified");
            }

        })
})
