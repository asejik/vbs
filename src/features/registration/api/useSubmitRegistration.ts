import { useMutation } from '@tanstack/react-query'
import { supabase } from '../../../shared/utils/supabase'
import type { RegistrationFormData } from '../registrationSchema'

interface SubmitRegistrationPayload {
  formData: RegistrationFormData
  transactionData: {
    campus: 'Ilorin' | 'Lagos'
    amount: number
    reference: string
  }
}

export function useSubmitRegistration() {
  return useMutation({
    mutationFn: async ({ formData, transactionData }: SubmitRegistrationPayload) => {
      const { parent, children } = formData

      // 1. Insert Parent
      const { data: parentData, error: parentError } = await supabase
        .from('parents')
        .insert({
          full_name: parent.fullName,
          email: parent.email,
          contact_number: parent.contactNumber,
          home_address: parent.homeAddress,
          church: parent.church,
          referral_source: parent.referral,
        })
        .select('id')
        .single()

      if (parentError) throw new Error(`Parent insertion failed: ${parentError.message}`)

      const parentId = parentData.id

      // 2. Insert Children
      const childrenPayload = children.map(child => ({
        parent_id: parentId,
        full_name: child.fullName,
        dob: child.dob,
        gender: child.gender,
        age: child.age,
        current_class: child.currentClass,
        interests: child.interests,
        allergies_medical: child.medicalInfo || '',
      }))

      const { error: childrenError } = await supabase
        .from('children')
        .insert(childrenPayload)

      if (childrenError) throw new Error(`Children insertion failed: ${childrenError.message}`)

      // 3. Insert Transaction
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          parent_id: parentId,
          campus: transactionData.campus,
          amount: transactionData.amount,
          reference: transactionData.reference,
          payment_verified: false,
        })

      if (transactionError) throw new Error(`Transaction insertion failed: ${transactionError.message}`)

      // 4. Webhook Post
      const webhookUrl = import.meta.env.VITE_GAS_WEBHOOK_URL
      if (webhookUrl) {
        const webhookPayload = {
          secret: import.meta.env.VITE_WEBHOOK_SECRET,
          parent: {
            fullName: parent.fullName,
            email: parent.email,
            contactNumber: parent.contactNumber,
            homeAddress: parent.homeAddress,
            church: parent.church,
            referral: parent.referral,
          },
          children: children.map(child => ({
            fullName: child.fullName,
            dob: child.dob,
            gender: child.gender,
            age: child.age,
            currentClass: child.currentClass,
            interests: Array.isArray(child.interests) ? child.interests.join(', ') : 'None',
            allergiesMedical: child.medicalInfo || 'None',
          })),
          transaction: {
            campus: transactionData.campus,
            amount: transactionData.amount / children.length, // Send individual child price for bookkeeping
            reference: transactionData.reference,
          }
        }

        try {
          await fetch(webhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'text/plain',
            },
            body: JSON.stringify(webhookPayload),
          })
        } catch (e) {
          console.error("Webhook failed to send, but proceeding:", e)
        }
      }

      return true
    }
  })
}
