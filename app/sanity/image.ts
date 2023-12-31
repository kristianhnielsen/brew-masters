import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";
import { Image } from "@sanity/types";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export function urlFor(source: Image) {
  return builder.image(source);
}
