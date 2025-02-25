import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);



export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`);


export const getAmenitiesQuery = defineQuery(`
  *[_type == "amenities"][0] {
    title,
    description,
    items[] {
      name,
      icon
    }
  }
`)

export const getPhotosQuery = defineQuery(`
  *[_type == "photos"][0] {
    "images": images[].asset->url
  }
`)
