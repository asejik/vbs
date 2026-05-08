import { z } from 'zod'

export const INTERESTS = [
  'Cooking',
  'Baking',
  'AI Animation',
  'Crocheting',
  'Fashion Illustration',
  'Cinematography',
  'Graphic Design',
  'Arts and Craft',
] as const

export const registrationSchema = z.object({
  location: z.enum(['Ilorin', 'Lagos']),
  consent: z.boolean().refine(val => val === true, {
    message: 'You must consent to the privacy policy to continue',
  }),
  parent: z.object({
    fullName: z.string().min(3, 'Full name is required').max(100),
    church: z.string().min(2, 'Church name is required').max(100),
    contactNumber: z.string().min(10, 'Valid contact number is required').max(20),
    email: z.string().email('Valid email is required'),
    homeAddress: z.string().min(5, 'Home address is required').max(200),
    referral: z.string().min(2, 'Please tell us how you heard about us').max(100),
  }),
  children: z.array(
    z.object({
      fullName: z.string().min(3, 'Full name is required').max(100),
      dob: z.string().min(1, 'Date of birth is required'),
      gender: z.enum(['Male', 'Female', 'Other']),
      age: z.coerce.number().min(3, 'Minimum age is 3').max(16, 'Maximum age is 16'),
      currentClass: z.string().min(1, 'Current class is required').max(50),
      interests: z
        .array(z.string())
        .length(2, 'Please select exactly 2 interests'),
      medicalInfo: z.string().max(1000).optional(),
    })
  ).min(1, 'At least one child is required').max(10, 'Max 10 children allowed'),
})

export type RegistrationFormData = z.infer<typeof registrationSchema>
