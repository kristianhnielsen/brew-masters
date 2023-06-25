import { DatetimeDefinition, Image, PortableTextBlock } from "@sanity/types";
import { client } from "./client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type Post = {
  authorName: string;
  authorSlug: string;
  title: string;
  slug: string;
  publishedAt: string;
  summary: string;
  body: PortableTextBlock[];
  image: Image;
};

type Author = {
  slug: string;
  name: string;
  bio: PortableTextBlock[];
  image: Image;
};

const postProps = `{
    "authorName": author->name,
    "authorSlug": author->slug.current,
    "authorImage": author -> image.asset -> url,
    title,
    "slug": slug.current,
    publishedAt,
    summary,
    body,
    "image": mainImage.asset->url,

}`;

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getPosts(): Promise<Post[]> {
  const posts = await client.fetch(`*[_type == "post"]${postProps}`);
  return posts;
}

export async function getPostFromAuthor(authorName: string): Promise<Post[]> {
  const posts = await client.fetch(
    `*[_type == "post" && author->name == "${authorName}"]${postProps}`
  );
  return posts;
}

export async function getAuthors(): Promise<Author[]> {
  const authors = await client.fetch(`*[_type == "author"]{
    name,
    "slug": slug.current,
    bio,
    "image": image.asset->url
  }`);
  return authors;
}

export async function getAuthor(name: string): Promise<Author> {
  const author = await client.fetch(`*[_type == "author" && name == "${name}"]{
    name,
    "slug": slug.current,
    bio,
    "image": image.asset->url
  }`);
  return author;
}
