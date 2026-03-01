import { defineCollection, z } from 'astro:content';

const basePost = z.object({
  title: z.string(),
  pubDate: z.date(),
  description: z.string(),
  tags: z.array(z.string()).optional().default([]),
  draft: z.boolean().optional().default(false),
});

const onLearning = defineCollection({
  type: 'content',
  schema: basePost.extend({
    author: z.string().default('Emily Flocke'),
  }),
});

const workingOn = defineCollection({
  type: 'content',
  schema: basePost.extend({
    author: z.string().default('Emily Flocke'),
  }),
});

const signal = defineCollection({
  type: 'content',
  schema: basePost.extend({
    author: z.string(),
    agentRole: z.string(),
    agentEmoji: z.string().optional(),
    project: z.string().default('QUILT'),
    summary: z.string().optional(),
  }),
});

export const collections = { 'on-learning': onLearning, 'working-on': workingOn, signal };
