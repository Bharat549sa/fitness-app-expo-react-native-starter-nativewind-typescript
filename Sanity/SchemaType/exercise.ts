import { defineField, defineType } from 'sanity';
import { Dumbbell } from 'lucide-react';

export default defineType({
  name: 'exercise',
  title: 'Exercise',
  type: 'document',
  icon: Dumbbell,
  fields: [
    defineField({
      name: 'name',
      title: 'Exercise Name',
      description: 'The name of the exercise that will be displayed to users',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'A detailed description explaining how to perform the exercise',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      description: 'Select how challenging this exercise is',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
      },
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineField({
          type: 'image',
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description:
                'Description of the exercise image for accessibility and SEO purposes',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Exercise Image',
      description: 'An image showing the proper form or demonstration of the exercise',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description:
            'Description of the exercise image for accessibility and SEO purposes',
        },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      description: 'A URL link to a video demonstration of the exercise',
      type: 'url',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      description: 'Toggle to show or hide this exercise from the app',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'difficulty',
      media: 'image',
    },
  },
});
