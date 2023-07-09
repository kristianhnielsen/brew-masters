import { Image, PortableTextBlock } from "@sanity/types";
import { client } from "./client";

type Post = {
  authorName: string;
  authorSlug: string;
  authorImage: Image;
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

type Product = {
  name: string;
  slug: string;
  highlight: boolean;
  price: number;
  image: Image;
  type: string;
  description: string;
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

const productProps = `{
    name,
    "slug": slug.current,
    price,
    highlight,
    "image": image.asset -> url,
    "type": type -> title,
    description,
  }`;

const authorProps = `{
    name,
    "slug": slug.current,
    bio,
    "image": image.asset->url
  }`;

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getPosts(): Promise<Post[]> {
  const posts = await client.fetch(
    `*[_type == "post"] | order(publishedAt desc, title)${postProps}`
  );
  return posts;
}

export async function getPostFromAuthor(authorName: string): Promise<Post[]> {
  const posts = await client.fetch(
    `*[_type == "post" && author->name == "${authorName}"] | order(publishedAt desc, title)${postProps}`
  );
  return posts;
}

export async function getAuthors(): Promise<Author[]> {
  const authors = await client.fetch(`*[_type == "author"]${authorProps}`);
  return authors;
}

export async function getAuthor(name: string): Promise<Author> {
  const author = await client.fetch(
    `*[_type == "author" && name == "${name}"]${authorProps}`
  );
  return author;
}

export async function getProducts(): Promise<Product[]> {
  const products = await client.fetch(
    `*[_type == "product"] | order(highlight desc) ${productProps}`
  );
  return products;
}

export async function getProductsOfType(type: string): Promise<Product[]> {
  const products = await client.fetch(
    `*[_type == "product" && type -> title == "${type}"] | order(highlight desc) ${productProps}`
  );
  return products;
}
