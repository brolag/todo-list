import { z } from "zod";

export const todoListItemSchema = z.object({
    id: z.number().optional(),
    text: z.string(),
    done: z.boolean().optional(),
});

export type TodoListItem = z.infer<typeof todoListItemSchema>;

