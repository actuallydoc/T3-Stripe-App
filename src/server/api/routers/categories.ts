import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "@/server/api/trpc";

export const categoriesRouter = createTRPCRouter({
    getCategories: publicProcedure
        .query(({ ctx }) => {
            return ctx.prisma.category.findMany();
        }),

    getSubCategores: publicProcedure.input(z.object({ name: z.string() })).query(({ ctx, input }) => {
        return ctx.prisma.subcategory.findMany({
            where: {
                category: {
                    name: input.name
                }
            },
            include: {
                category: true
            }
        });
    }),

    getSecretMessage: protectedProcedure.query(() => {
        return "you can now see this secret message!";
    }),
});
