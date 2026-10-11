import {defineField, defineType} from 'sanity'

const WEAVES = ['Banarasi', 'Kanjeevaram', 'Paithani', 'Chanderi', 'Organza', 'Georgette', 'Cotton', 'Silk', 'Tissue', 'Embroidered', 'Printed', 'Woven', 'Other']
const COLOURS = ['Red', 'Pink', 'Purple', 'Blue', 'Green', 'Yellow', 'Orange', 'Gold', 'Cream', 'White', 'Grey', 'Black', 'Multicolour']

export default defineType({
  name: 'saree',
  title: 'Saree',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Saree name',
      type: 'string',
      description: 'For example: Purple Paithani Silk Saree',
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      description: 'The first photo is shown in the shop. Add more to show in the close-up view.',
      of: [{type: 'image', options: {hotspot: true}}],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'inStock',
      title: 'In stock',
      type: 'boolean',
      description: 'Turn off when the saree is sold. It will show a "Sold out" label on the website.',
      initialValue: true,
    }),
    defineField({
      name: 'price',
      title: 'Price (AUD)',
      type: 'number',
      description: 'Leave empty to show "Price on request".',
      validation: (r) => r.min(0),
    }),
    defineField({
      name: 'weave',
      title: 'Weave',
      type: 'string',
      options: {list: WEAVES},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'colour',
      title: 'Main colour',
      type: 'string',
      options: {list: COLOURS},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'One or two sentences shown when a customer taps the saree.',
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first in the shop. Leave empty to show newest first.',
    }),
  ],
  orderings: [
    {title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
    {title: 'Newest first', name: 'createdDesc', by: [{field: '_createdAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'name', media: 'images.0', inStock: 'inStock', price: 'price', weave: 'weave'},
    prepare({title, media, inStock, price, weave}) {
      const p = typeof price === 'number' ? `A$${price}` : 'Price on request'
      return {title, media, subtitle: `${inStock === false ? 'SOLD OUT · ' : ''}${weave || ''} · ${p}`}
    },
  },
})
