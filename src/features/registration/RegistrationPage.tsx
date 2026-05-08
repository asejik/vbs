import { useForm, useFieldArray, Controller } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, User, Baby, Sparkles } from 'lucide-react'
import { registrationSchema } from './registrationSchema'
import type { RegistrationFormData } from './registrationSchema'
import { usePaystackPayment } from 'react-paystack'
import { useSubmitRegistration } from './api/useSubmitRegistration'
import { ProcessingOverlay } from './components/ProcessingOverlay'
import { SuccessView } from './components/SuccessView'
import { useState, useMemo, useEffect } from 'react'
import { Input, Select, TextArea } from './components/FormFields'
import { LocationToggle } from './components/LocationToggle'
import { InterestPicker } from './components/InterestPicker'
import { CheckoutSummary } from './components/CheckoutSummary'
import { SectionReveal } from '../../shared/ui'

const GENDER_OPTIONS = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
]

export function RegistrationPage() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema) as any,
    defaultValues: {
      location: 'Ilorin',
      parent: {
        fullName: '',
        email: '',
        contactNumber: '',
        church: '',
        homeAddress: '',
        referral: '',
      },
      consent: false,
      children: [
        {
          fullName: '',
          dob: '',
          gender: 'Male',
          age: 0,
          currentClass: '',
          interests: [],
          medicalInfo: '',
        },
      ],
    },
    mode: 'onChange',
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'children',
  })

  const location = watch('location')
  const children = watch('children')

  const submitRegistration = useSubmitRegistration()
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Scroll to top when success happens to ensure the message isn't cut off
  useEffect(() => {
    if (isSuccess) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [isSuccess])

  const basePrice = location === 'Ilorin' ? 20000 : 30000
  const flatFee = location === 'Ilorin' ? 406 : 610
  
  const totalBaseAmount = children.length * basePrice
  const totalPaystackAmount = children.length > 0 ? totalBaseAmount + flatFee : 0
  const amountInKobo = totalPaystackAmount * 100

  const subaccount =
    location === 'Ilorin'
      ? import.meta.env.VITE_PAYSTACK_ILORIN_SUBACCOUNT
      : import.meta.env.VITE_PAYSTACK_LAGOS_SUBACCOUNT

  const [reference] = useState(() => (new Date()).getTime().toString())

  const paystackConfig = useMemo(() => ({
    reference,
    email: watch('parent.email') || 'guest@vbs.com',
    amount: amountInKobo,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '',
    subaccount: subaccount || undefined,
  }), [reference, amountInKobo, subaccount, watch('parent.email')])

  const initializePayment = usePaystackPayment(paystackConfig)

  const onSubmit: SubmitHandler<RegistrationFormData> = (data) => {
    const isBypass = import.meta.env.VITE_BYPASS_PAYMENT === 'true'

    const handleSaveData = (reference: string) => {
      submitRegistration.mutate(
        {
          formData: data,
          transactionData: {
            campus: data.location,
            amount: totalPaystackAmount,
            reference: reference,
          },
        },
        {
          onSuccess: () => {
            setIsSuccess(true)
            setErrorMessage(null)
          },
          onError: (err) => {
            setErrorMessage(`Saving data failed: ${err.message}. Please check your Supabase configuration.`)
          }
        }
      )
    }

    if (isBypass) {
      // Skip Paystack and use a dummy reference
      console.log('Bypassing payment for testing...')
      handleSaveData(`TEST_BYPASS_${Date.now()}`)
      return
    }

    // 1. Init Paystack
    initializePayment({
      onSuccess: (transaction) => {
        handleSaveData(transaction.reference)
      },
      onClose: () => {
        console.log('Payment window closed.')
      },
    })
  }

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-cream pb-32">
        <SuccessView />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-cream pb-32 relative">
      {submitRegistration.isPending && <ProcessingOverlay />}

      {/* Error Message Toast */}
      {errorMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-coral text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4"
          >
            <p className="text-sm font-medium">{errorMessage}</p>
            <button onClick={() => setErrorMessage(null)} className="p-1 hover:bg-white/10 rounded">✕</button>
          </motion.div>
        </div>
      )}
      {/* ── Hero Banner ── */}
      <section className="bg-gradient-to-br from-grape to-ocean py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-3xl"
          >
            🚀
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
            Join the <span className="text-sunshine">Adventure!</span>
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Fill out the form below to secure a spot for your kids in VBS 2026.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 -mt-12">
        <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-8">
          {/* ── Location Section ── */}
          <SectionReveal>
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <Controller
                control={control}
                name="location"
                render={({ field }) => (
                  <LocationToggle
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </SectionReveal>

          {/* ── Parent Section ── */}
          <SectionReveal delay={0.1}>
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-sunshine/20 flex items-center justify-center text-sunshine-dark">
                  <User className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-slate-800">
                  Parent/Guardian Info
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  {...register('parent.fullName')}
                  error={errors.parent?.fullName?.message}
                  required
                />
                <Input
                  label="Email Address"
                  placeholder="john@example.com"
                  type="email"
                  {...register('parent.email')}
                  error={errors.parent?.email?.message}
                  required
                />
                <Input
                  label="Contact Number"
                  placeholder="0707 690 8384"
                  {...register('parent.contactNumber')}
                  error={errors.parent?.contactNumber?.message}
                  required
                />
                <Input
                  label="Church"
                  placeholder="Your Church Name"
                  {...register('parent.church')}
                  error={errors.parent?.church?.message}
                  required
                />
                <div className="sm:col-span-2">
                  <Input
                    label="Home Address"
                    placeholder="123 VBS Street, City"
                    {...register('parent.homeAddress')}
                    error={errors.parent?.homeAddress?.message}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <Input
                    label="How did you hear about The Atrium VBS?"
                    placeholder="Social Media, Friend, Church..."
                    {...register('parent.referral')}
                    error={errors.parent?.referral?.message}
                    required
                  />
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* ── Children Section ── */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {fields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  className="bg-white rounded-3xl p-8 shadow-xl relative overflow-hidden"
                >
                  {/* Decorative badge */}
                  <div className="absolute top-0 right-0 px-6 py-2 bg-slate-50 text-slate-400 font-heading font-bold text-xs rounded-bl-2xl">
                    Child #{index + 1}
                  </div>

                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-grape/10 flex items-center justify-center text-grape">
                        <Baby className="w-5 h-5" />
                      </div>
                      <h2 className="text-2xl font-heading font-bold text-slate-800">
                        Child Information
                      </h2>
                    </div>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="p-2 text-coral hover:bg-coral/10 rounded-lg transition-colors cursor-pointer"
                        title="Remove Child"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      placeholder="Kid's Full Name"
                      {...register(`children.${index}.fullName`)}
                      error={errors.children?.[index]?.fullName?.message}
                      required
                    />
                    <Input
                      label="Date of Birth"
                      type="date"
                      {...register(`children.${index}.dob`)}
                      error={errors.children?.[index]?.dob?.message}
                      required
                    />
                    <Select
                      label="Gender"
                      options={GENDER_OPTIONS}
                      {...register(`children.${index}.gender`)}
                      error={errors.children?.[index]?.gender?.message}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Age (3-16)"
                        type="number"
                        placeholder="Age"
                        {...register(`children.${index}.age`)}
                        error={errors.children?.[index]?.age?.message}
                        required
                      />
                      <Input
                        label="Current Class"
                        placeholder="Grade 1"
                        {...register(`children.${index}.currentClass`)}
                        error={errors.children?.[index]?.currentClass?.message}
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Controller
                        control={control}
                        name={`children.${index}.interests`}
                        render={({ field }) => (
                          <InterestPicker
                            selected={field.value}
                            onChange={field.onChange}
                            error={errors.children?.[index]?.interests?.message}
                          />
                        )}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <TextArea
                        label="Allergies / Special Notes / Medical Info"
                        placeholder="Any information our leaders should know..."
                        {...register(`children.${index}.medicalInfo`)}
                        error={errors.children?.[index]?.medicalInfo?.message}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* ── Add Child Button ── */}
            <motion.button
              type="button"
              onClick={() =>
                append({
                  fullName: '',
                  dob: '',
                  gender: 'Male',
                  age: 0,
                  currentClass: '',
                  interests: [],
                  medicalInfo: '',
                })
              }
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-6 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-heading font-bold flex items-center justify-center gap-3 hover:border-grape hover:text-grape hover:bg-grape/5 transition-all group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-grape group-hover:text-white transition-colors">
                <Plus className="w-5 h-5" />
              </div>
              Add Another Child
            </motion.button>
          </div>

          <SectionReveal delay={0.2}>
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
              <div className="flex items-start gap-4">
                <div className="pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    {...register('consent')}
                    className="w-5 h-5 rounded border-slate-300 text-grape focus:ring-grape cursor-pointer"
                  />
                </div>
                <label htmlFor="consent" className="text-sm text-slate-600 leading-relaxed cursor-pointer">
                  I consent to the collection and processing of my personal data and my child's information
                  in accordance with the <a href="/privacy" className="text-grape font-bold hover:underline">Privacy Policy</a>.
                  I understand this data is used for safety, group placement, and the VBS 2026 experience.
                </label>
              </div>
              {errors.consent && (
                <p className="mt-2 text-xs text-coral font-medium ml-9">
                  {errors.consent.message}
                </p>
              )}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.3}>
            <div className="bg-sunshine/10 rounded-3xl p-6 flex gap-4 border border-sunshine/20">
              <Sparkles className="w-6 h-6 text-sunshine-dark shrink-0" />
              <p className="text-sm text-sunshine-dark leading-relaxed">
                <strong>Important:</strong> Please ensure all information is accurate. This data
                is used for safety, group placement, and providing the best experience
                for your child.
              </p>
            </div>
          </SectionReveal>
          <CheckoutSummary
            childCount={children.length}
            location={location}
            isValid={isValid}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </main>
  )
}
