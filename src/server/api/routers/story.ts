import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const storyRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        messages: z.array(
          z.object({
            text: z.string(),
            side: z.enum(["left", "right"]),
            order: z.number(),
          }),
        ),
        title: z.string(),
        leftVoiceId: z.string(),
        rightVoiceId: z.string(),
        videoUrl: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.chatStory.create({
        data: {
          title: input.title,
          leftVoiceId: input.leftVoiceId,
          rightVoiceId: input.rightVoiceId,
          videoUrl: input.videoUrl,
          userId: ctx.session.user.id,
          messages: {
            create: input.messages.map((message) => ({
              content: message.text,
              side: message.side,
              order: message.order,
            })),
          },
        },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.chatStory.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        messages: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.chatStory.findUnique({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        include: {
          messages: {
            orderBy: {
              order: "asc",
            },
          },
        },
      });
    }),
});
