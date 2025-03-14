import { defineField, defineType } from 'sanity'

export const photos = defineType({
  name: 'photos',
  title: 'Photos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      initialValue: 'Photos'
    }),
    defineField({
      name: 'slug',
      title: 'Identifier',
      type: 'string',
      description: 'A unique identifier for this section (e.g., "renovation", "nearby")',
      validation: (Rule: any) => Rule.required()
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    }),
  ],
})
