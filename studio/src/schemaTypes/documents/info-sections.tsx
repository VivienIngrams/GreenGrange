import { defineField, defineType } from 'sanity'

export const infoSections = defineType({
    name: 'infoSection',
    title: 'Info Section',
    type: 'document',
    fields: [
      defineField({
        name: 'identifier',
        title: 'Identifier',
        type: 'string',
        description: 'A unique identifier for this section (e.g., "renovation", "nearby")',
        validation: (Rule: any) => Rule.required()
      }),
      defineField({
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [{ type: 'block' }],
        validation: (Rule: any) => Rule.required()
      }),
      defineField({
        name: 'linkText',
        title: 'Link Text',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      }),
      
      defineField({
        name: 'order',
        title: 'Display Order',
        type: 'number',
        validation: (Rule: any) => Rule.required()
      })
    ]
})
  