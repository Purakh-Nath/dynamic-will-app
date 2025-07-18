import { useForm } from 'react-hook-form';
import useFormStore from '../hooks/useFormStore';

import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Shield,
  Users,
  Eye,
  CheckCircle,
  ScrollText,
  UserCheck,
  Calendar,
  MapPin,
  User,
} from "lucide-react"

export default function StepAdditionalDetails({ onNext, onBack }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

  const setOtherDetails = useFormStore((s) => s.setOtherDetails)

  const onSubmit = (data) => {
    setOtherDetails(data)
    onNext()
  }

  const inputClass =
    "w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"

  const textareaClass =
    "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400 resize-none"

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 px-8 py-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Additional Details</h2>
          <p className="text-orange-100">Complete your will with final details and confirmations</p>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Residue Clause Section */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <ScrollText className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Residue Clause</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Specify what happens to any remaining assets not mentioned above
              </p>
              <textarea
                {...register("residueClause")}
                placeholder="If not mentioned above, remaining assets go to..."
                rows={4}
                className={textareaClass}
              />
            </div>

            {/* Guardian Information Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Guardian Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 mr-2 text-blue-600" />
                    Guardian Name
                  </label>
                  <input
                    {...register("guardianName")}
                    placeholder="Enter guardian's full name"
                    className={inputClass.replace("orange", "blue")}
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Users className="w-4 h-4 mr-2 text-blue-600" />
                    Relation to Children
                  </label>
                  <input
                    {...register("guardianRelation")}
                    placeholder="e.g., Uncle, Aunt, Grandparent"
                    className={inputClass.replace("orange", "blue")}
                  />
                </div>
              </div>
            </div>

            {/* Executors Section */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Executors</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                People responsible for carrying out the instructions in your will
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 mr-2 text-green-600" />
                    Primary Executor
                  </label>
                  <input
                    {...register("executor1")}
                    placeholder="Enter primary executor's name"
                    className={inputClass.replace("orange", "green")}
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 mr-2 text-green-600" />
                    Secondary Executor (Optional)
                  </label>
                  <input
                    {...register("executor2")}
                    placeholder="Enter secondary executor's name"
                    className={inputClass.replace("orange", "green")}
                  />
                </div>
              </div>
            </div>

            {/* Witnesses Section */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Eye className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Witnesses</h3>
              </div>
              <p className="text-sm text-gray-600 mb-6">Two witnesses are required to validate your will</p>

              {/* Witness 1 */}
              <div className="bg-white rounded-lg p-4 border border-purple-200 mb-6">
                <h4 className="text-md font-semibold text-gray-700 mb-4 flex items-center">
                  <User className="w-4 h-4 mr-2 text-purple-600" />
                  Witness 1
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Full Name</label>
                    <input
                      {...register("witness1.name")}
                      placeholder="Enter witness name"
                      className={inputClass.replace("orange", "purple")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      Address
                    </label>
                    <input
                      {...register("witness1.address")}
                      placeholder="Enter complete address"
                      className={inputClass.replace("orange", "purple")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-600">
                      <Calendar className="w-3 h-3 mr-1" />
                      Date
                    </label>
                    <input
                      type="date"
                      {...register("witness1.date")}
                      className={inputClass.replace("orange", "purple")}
                    />
                  </div>
                </div>
              </div>

              {/* Witness 2 */}
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <h4 className="text-md font-semibold text-gray-700 mb-4 flex items-center">
                  <User className="w-4 h-4 mr-2 text-purple-600" />
                  Witness 2
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Full Name</label>
                    <input
                      {...register("witness2.name")}
                      placeholder="Enter witness name"
                      className={inputClass.replace("orange", "purple")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      Address
                    </label>
                    <input
                      {...register("witness2.address")}
                      placeholder="Enter complete address"
                      className={inputClass.replace("orange", "purple")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-600">
                      <Calendar className="w-3 h-3 mr-1" />
                      Date
                    </label>
                    <input
                      type="date"
                      {...register("witness2.date")}
                      className={inputClass.replace("orange", "purple")}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation Section */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border-2 border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    {...register("confirmation")}
                    className="w-5 h-5 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                  />
                  <CheckCircle className="w-6 h-6 text-orange-600" />
                </div>
                <label className="text-gray-700 font-medium">
                  I confirm that all the above details are correct and complete.
                </label>
              </div>
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
                className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Complete</span>
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
            Please review all information carefully before completing your will
          </p>
        </div>
      </div>
    </div>
  )
}
