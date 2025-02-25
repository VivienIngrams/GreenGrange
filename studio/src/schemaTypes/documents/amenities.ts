import { defineField, defineType } from 'sanity'
import { ListIcon } from '@sanity/icons'

export const amenities = defineType({
  name: 'amenities',
  title: 'Amenities',
  type: 'document',
  icon: ListIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      initialValue: 'Amenities & Features'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2
    }),
    defineField({
      name: 'items',
      title: 'Amenity Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Check', value: 'check' },
                  { title: 'Star', value: 'star' },
                  { title: 'Wifi', value: 'wifi' },
                  { title: 'Car', value: 'car' },
                  { title: 'Bath', value: 'bath' },
                  { title: 'Bed', value: 'bed' }
                ]
              },
              initialValue: 'check'
            })
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'icon'
            }
          }
        }
      ]
    })
  ]
}) 