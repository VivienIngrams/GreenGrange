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
`);

export const getPhotosQuery = defineQuery(`
  *[_type == "photos" && slug == $slug][0] {
    "images": images[].asset->url
  }
`);

export const getInfoSectionsQuery = defineQuery(`
  *[_type == "infoSection"] | order(order asc) {
    title,
    identifier,
    homepageContent,
    linkText,
    "image": {
      "src": image.asset->url,
      "alt": image.alt
    }
  }
`);

export const getInfoSectionByIdQuery = defineQuery(`
  *[_type == "infoSection" && identifier == $identifier][0] {
    title,
    identifier,
    homepageContent,
    pageContent,
    linkText,
    order,
    "image": {
      "src": image.asset->url,
      "alt": image.alt
    }
  }
`);

export const getNextInfoSectionQuery = defineQuery(`
  *[_type == "infoSection" && order > $order] | order(order asc) [0] {
    title,
    identifier,
    linkText
  }
`);

export const getFirstInfoSectionQuery = defineQuery(`
  *[_type == "infoSection"] | order(order asc) [0] {
    title,
    identifier,
    linkText
  }
`);

export const getAvailabilityQuery = defineQuery(`
  *[_type == "availability"][0] {
    title,
    description,
    unavailablePeriods[] {
      from,
      to,
      note
    }
  }
`);