import { amenities } from './documents/amenities'
import { infoSections } from './documents/info-sections'
import { photos } from './documents/photos'
// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Documents
  amenities,
  photos,
  infoSections,
]
