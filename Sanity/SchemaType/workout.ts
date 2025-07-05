import { defineType, defineField } from 'sanity'
import { ClipboardList } from 'lucide-react'

export default defineType({
  name: 'workout',
  title: 'Workout',
  type: 'document',
  icon: ClipboardList,
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID',
      description: 'Clerk user ID of the person who performed this workout',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'date',
      title: 'Workout Date',
      description: 'Date and time when the workout took place',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'duration',
      title: 'Duration (seconds)',
      description: 'Total length of the workout in seconds',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: 'exercises',
      title: 'Exercises',
      description: 'List of exercises performed in this workout',
      type: 'array',
      of: [
        defineField({
          name: 'exerciseEntry',
          title: 'Exercise Entry',
          type: 'object',
          fields: [
            defineField({
              name: 'exerciseRef',
              title: 'Exercise',
              description: 'Reference to an exercise document',
              type: 'reference',
              to: [{ type: 'exercise' }],
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'sets',
              title: 'Sets',
              description: 'One object per set detailing reps and weight',
              type: 'array',
              of: [
                defineField({
                  name: 'exerciseSet',
                  title: 'Exercise Set',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'reps',
                      title: 'Repetitions',
                      description: 'The number of repetitions performed in this set',
                      type: 'number',
                      validation: (Rule) => Rule.required().min(0),
                    }),
                    defineField({
                      name: 'weight',
                      title: 'Weight',
                      description: 'The weight used for this set',
                      type: 'number',
                      validation: (Rule) => Rule.min(0),
                    }),
                    defineField({
                      name: 'weightUnit',
                      title: 'Weight Unit',
                      description: 'The unit of measurement for the weight',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Pounds (lbs)', value: 'lbs' },
                          { title: 'Kilograms (kg)', value: 'kg' },
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'lbs',
                    }),
                  ],
                  preview: {
                    select: {
                      reps: 'reps',
                      weight: 'weight',
                      weightUnit: 'weightUnit',
                    },
                    prepare({ reps, weight, weightUnit }) {
                      return {
                        title: `${reps} reps @ ${weight}${weightUnit}`,
                      }
                    },
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],

  preview: {
    select: {
      date: 'date',
      duration: 'duration',
      exercises: 'exercises',
    },
    prepare({ date, duration, exercises }) {
      const workoutDate = date
        ? new Date(date).toLocaleDateString()
        : 'No date'
      const durationMinutes = duration
        ? Math.round(duration / 60)
        : 0
      const totalSets = Array.isArray(exercises)
        ? exercises.reduce(
            (sum, entry) =>
              sum + (Array.isArray(entry.sets) ? entry.sets.length : 0),
            0
          )
        : 0

      return {
        title: `Workout on ${workoutDate}`,
        subtitle: `${durationMinutes} min • ${totalSets} set${totalSets !== 1 ? 's' : ''}`,
      }
    },
  },
})