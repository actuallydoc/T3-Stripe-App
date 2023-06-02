
import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const categoryRouter = createTRPCRouter({
    getCategoryItems: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {

            const categoryItems = await prisma.category.findFirst({
                where: {
                    name: input.id.toUpperCase(),
                },
                include: {
                    products: true,
                },
            });
            return { categoryItems };
        }),
});
