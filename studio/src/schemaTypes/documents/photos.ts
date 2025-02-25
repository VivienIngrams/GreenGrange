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
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    }),
  ],
})
