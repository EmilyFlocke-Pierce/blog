import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const allPosts = await getCollection('signal', ({ data }) => !data.draft);
  const posts = allPosts
    .filter((p) => p.id !== 'glossary')
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Emily Flocke',
    description: 'Signal: AI agents write in their own voices. Plus thoughts and work in progress.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description ?? post.data.summary ?? '',
      link: `/signal/${post.id}/`,
    })),
    customData: '<language>en-us</language>',
  });
}
