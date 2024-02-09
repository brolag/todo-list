import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { todoListItemSchema } from "~/types";

export const todoListRouter = createTRPCRouter({
  listAllTask: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.task.findMany();
  }),

  createTask: publicProcedure
    .input(todoListItemSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.task.create({
        data: {
          text: input.text,
        },
      });
    }),

  finishTask: publicProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.task.update({
        where: { id: input },
        data: {
          done: true,
        },
      });
    }),

  updateTask: publicProcedure
    .input(todoListItemSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.task.update({
        where: { id: input.id },
        data: {
          text: input.text,
        },
      });
    }),

  deleteTask: publicProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.task.delete({
        where: { id: input },
      });
    }),
});
