import { useForm, useFieldArray } from 'react-hook-form';
import useFormStore from '../hooks/useFormStore';

import { Plus, Trash2, Users, ArrowLeft, ArrowRight, User, Heart, CreditCard, MapPin, Calendar } from "lucide-react"

export default function StepBeneficiaries({ onNext, onBack }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { beneficiaries: [{}] },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "beneficiaries",
  })

  const setBeneficiaries = useFormStore((s) => s.setBeneficiaries)

  const onSubmit = (data) => {
    setBeneficiaries(data.beneficiaries)
    onNext()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Beneficiaries Information</h2>
          <p className="text-emerald-100">Add your beneficiaries and their details</p>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Beneficiaries List */}
            <div className="space-y-6">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200 hover:border-emerald-300 transition-all duration-200"
                >
                  {/* Beneficiary Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-emerald-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">Beneficiary {index + 1}</h3>
                    </div>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors duration-200 group"
                      >
                        <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">Remove</span>
                      </button>
                    )}
                  </div>

                  {/* Form Fields Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <User className="w-4 h-4 mr-2 text-emerald-600" />
                        Full Name
                      </label>
                      <input
                        {...register(`beneficiaries.${index}.name`)}
                        placeholder="Enter full name"
                        className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
                      />
                    </div>

                    {/* Relationship Field */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <Heart className="w-4 h-4 mr-2 text-emerald-600" />
                        Relationship
                      </label>
                      <input
                        {...register(`beneficiaries.${index}.relationship`)}
                        placeholder="e.g., Spouse, Child, Parent"
                        className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
                      />
                    </div>

                    {/* ID Number Field */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <CreditCard className="w-4 h-4 mr-2 text-emerald-600" />
                        PAN or Aadhar
                      </label>
                      <input
                        {...register(`beneficiaries.${index}.idNo`)}
                        placeholder="Enter PAN or Aadhar number"
                        className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
                      />
                    </div>

                    {/* Address Field */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
                        Address
                      </label>
                      <input
                        {...register(`beneficiaries.${index}.address`)}
                        placeholder="Enter complete address"
                        className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
                      />
                    </div>

                    {/* Age Field */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 mr-2 text-emerald-600" />
                        Age
                      </label>
                      <input
                        type="number"
                        {...register(`beneficiaries.${index}.age`)}
                        placeholder="Enter age"
                        min="0"
                        max="120"
                        className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Beneficiary Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => append({})}
                className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5" />
                <span>Add Another Beneficiary</span>
              </button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={onBack}
                className="flex items-center space-x-2 px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
          <p className="text-sm text-gray-500 text-center">
            You can add multiple beneficiaries and modify them later if needed
          </p>
        </div>
      </div>
    </div>
  )
}
