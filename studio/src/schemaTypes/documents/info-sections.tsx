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
        name: 'homepageContent',
        title: 'Homepage Preview Content',
        description: 'Brief content shown on the homepage',
        type: 'array',
        of: [{ type: 'block' }],
        validation: (Rule: any) => Rule.required()
      }),
      defineField({
        name: 'pageContent',
        title: 'Full Page Content',
        description: 'Detailed content for the individual page',
        type: 'array',
        of: [
          {
            type: 'block',
            styles: [
              { title: 'Normal', value: 'normal' },
              { title: 'H1', value: 'h1' },
              { title: 'H2', value: 'h2' },
              { title: 'H3', value: 'h3' },
              { title: 'Quote', value: 'blockquote' }
            ],
            lists: [
              { title: 'Bullet', value: 'bullet' },
              { title: 'Numbered', value: 'number' }
            ],
            marks: {
              decorators: [
                { title: 'Strong', value: 'strong' },
                { title: 'Emphasis', value: 'em' },
                { title: 'Code', value: 'code' },
                { title: 'Underline', value: 'underline' },
                { title: 'Strike', value: 'strike-through' }
              ],
              annotations: [
                {
                  name: 'link',
                  type: 'object',
                  title: 'Link',
                  fields: [
                    {
                      name: 'href',
                      type: 'url',
                      title: 'URL'
                    }
                  ]
                }
              ]
            }
          },
          {
            type: 'image',
            options: {
              hotspot: true
            },
            fields: [
              {
                name: 'alt',
                type: 'string',
                title: 'Alternative text',
                description: 'Important for SEO and accessibility.'
              },
              {
                name: 'caption',
                type: 'string',
                title: 'Caption',
                description: 'Optional caption to display below the image'
              }
            ]
          }
        ],
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
  