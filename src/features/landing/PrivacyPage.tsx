import { motion } from 'framer-motion'
import { SectionReveal } from '../../shared/ui'

export function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream py-20 px-4">
      <SectionReveal className="max-w-3xl mx-auto bg-white rounded-3xl p-10 shadow-xl border border-slate-100">
        <h1 className="text-3xl font-heading font-black text-slate-800 mb-6">Privacy Policy</h1>
        <div className="space-y-6 text-slate-600 leading-relaxed">
          <p>
            Your privacy is important to us. It is The Atrium Church's policy to respect your privacy 
            regarding any information we may collect from you across our website, for the purpose of VBS 2026.
          </p>
          <h2 className="text-xl font-heading font-bold text-slate-800">1. Information We Collect</h2>
          <p>
            We collect personal data such as names, contact information, and medical details for the 
            sole purpose of ensuring the safety and proper grouping of children during the Vacation Bible School event.
          </p>
          <h2 className="text-xl font-heading font-bold text-slate-800">2. How We Use Information</h2>
          <p>
            The information collected is used for registration, communication with parents/guardians, 
            emergency contact, and catering to specific medical or dietary needs.
          </p>
          <h2 className="text-xl font-heading font-bold text-slate-800">3. Data Security</h2>
          <p>
            We only retain collected information for as long as necessary to provide you with the 
            requested service. What data we store, we'll protect within commercially acceptable 
            means to prevent loss and theft, as well as unauthorized access, disclosure, copying, 
            use or modification.
          </p>
          <h2 className="text-xl font-heading font-bold text-slate-800">4. Third-Party Services</h2>
          <p>
            We use Supabase for data storage and Paystack for secure payment processing. Each 
            service has its own privacy policy regarding the data shared with them.
          </p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-8 border-t border-slate-100 mt-10"
          >
            <p className="text-sm text-slate-400">Last updated: May 6, 2026</p>
          </motion.div>
        </div>
      </SectionReveal>
    </main>
  )
}
