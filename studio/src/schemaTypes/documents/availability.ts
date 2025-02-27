import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const availability = defineType({
  name: 'availability',
  title: 'Availability Calendar',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      initialValue: 'Availability Calendar'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      initialValue: 'Dates marked in red are unavailable'
    }),
    defineField({
      name: 'unavailablePeriods',
      title: 'Unavailable Periods',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'dateRange',
          fields: [
            {
              name: 'from',
              type: 'date',
              title: 'From',
              validation: Rule => Rule.required()
            },
            {
              name: 'to',
              type: 'date',
              title: 'To',
              validation: Rule => Rule.required()
            },
            {
              name: 'note',
              type: 'string',
              title: 'Note (Optional)'
            }
          ],
          preview: {
            select: {
              from: 'from',
              to: 'to',
              note: 'note'
            },
            prepare({ from, to, note }) {
              return {
                title: `${from} → ${to}`,
                subtitle: note || 'No note'
              }
            }
          }
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    }
  }
}) 