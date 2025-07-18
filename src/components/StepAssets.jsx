import { useForm } from 'react-hook-form';
import useFormStore from '../hooks/useFormStore';

import { useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Shield,
  TrendingUp,
  PieChart,
  Gem,
  Home,
  MapPin,
  ChevronDown,
  ChevronUp,
  Wallet,
} from "lucide-react"

export default function StepAssets({ onNext, onBack }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

  const setAssets = useFormStore((s) => s.setAssets)
  const [expandedSections, setExpandedSections] = useState({
    bank: true,
    insurance: false,
    stocks: false,
    mutual: false,
    jewellery: false,
    house: false,
    land: false,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const onSubmit = (data) => {
    const structuredAssets = {
      bankAccounts: [{ ...data.bank1 }, { ...data.bank2 }],
      insurance: [{ ...data.insurance1 }, { ...data.insurance2 }],
      stocks: [{ ...data.stock1 }, { ...data.stock2 }],
      mutualFunds: [{ ...data.mutual1 }, { ...data.mutual2 }],
      jewellery: [{ ...data.jewel1 }, { ...data.jewel2 }],
      house: [{ ...data.house1 }],
      land: [{ ...data.land1 }],
    }
    setAssets(structuredAssets)
    onNext()
  }

  const inputClass =
    "w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"

  const SectionHeader = ({ title, icon: Icon, sectionKey, count }) => (
    <button
      type="button"
      onClick={() => toggleSection(sectionKey)}
      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 rounded-xl border-2 border-purple-200 transition-all duration-200"
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
          <Icon className="w-5 h-5 text-purple-600" />
        </div>
        <div className="text-left">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{count} entries</p>
        </div>
      </div>
      {expandedSections[sectionKey] ? (
        <ChevronUp className="w-5 h-5 text-purple-600" />
      ) : (
        <ChevronDown className="w-5 h-5 text-purple-600" />
      )}
    </button>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Assets & Investments</h2>
          <p className="text-purple-100">Manage your financial assets and property details</p>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Bank Accounts Section */}
            <div className="space-y-4">
              <SectionHeader title="Bank Accounts" icon={Building2} sectionKey="bank" count="2" />
              {expandedSections.bank && (
                <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                  {/* Bank Account 1 */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-md font-semibold text-gray-700 mb-4">Account 1</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <input {...register("bank1.bankName")} placeholder="Bank Name" className={inputClass} />
                      <input {...register("bank1.accountNumber")} placeholder="Account Number" className={inputClass} />
                      <input {...register("bank1.remark")} placeholder="Type / Remark" className={inputClass} />
                      <input
                        {...register("bank1.beneficiary")}
                        placeholder="Beneficiary's Name"
                        className={inputClass}
                      />
                      <input type="number" {...register("bank1.share")} placeholder="% Share" className={inputClass} />
                    </div>
                  </div>
                  {/* Bank Account 2 */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-md font-semibold text-gray-700 mb-4">Account 2</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <input {...register("bank2.bankName")} placeholder="Bank Name" className={inputClass} />
                      <input {...register("bank2.accountNumber")} placeholder="Account Number" className={inputClass} />
                      <input {...register("bank2.remark")} placeholder="Type / Remark" className={inputClass} />
                      <input
                        {...register("bank2.beneficiary")}
                        placeholder="Beneficiary's Name"
                        className={inputClass}
                      />
                      <input type="number" {...register("bank2.share")} placeholder="% Share" className={inputClass} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Insurance Section */}
            <div className="space-y-4">
              <SectionHeader title="Insurance Policies" icon={Shield} sectionKey="insurance" count="2" />
              {expandedSections.insurance && (
                <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                  {/* Insurance 1 */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-md font-semibold text-gray-700 mb-4">Policy 1</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <input {...register("insurance1.name")} placeholder="Policy Name" className={inputClass} />
                      <input {...register("insurance1.number")} placeholder="Policy Number" className={inputClass} />
                      <input {...register("insurance1.remark")} placeholder="Type / Remark" className={inputClass} />
                      <input
                        {...register("insurance1.beneficiary")}
                        placeholder="Beneficiary's Name"
                        className={inputClass}
                      />
                      <input
                        type="number"
                        {...register("insurance1.share")}
                        placeholder="% Share"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  {/* Insurance 2 */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-md font-semibold text-gray-700 mb-4">Policy 2</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <input {...register("insurance2.name")} placeholder="Policy Name" className={inputClass} />
                      <input {...register("insurance2.number")} placeholder="Policy Number" className={inputClass} />
                      <input {...register("insurance2.remark")} placeholder="Type / Remark" className={inputClass} />
                      <input
                        {...register("insurance2.beneficiary")}
                        placeholder="Beneficiary's Name"
                        className={inputClass}
                      />
                      <input
                        type="number"
                        {...register("insurance2.share")}
                        placeholder="% Share"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stocks Section */}
            <div className="space-y-4">
              <SectionHeader title="Stocks" icon={TrendingUp} sectionKey="stocks" count="2" />
              {expandedSections.stocks && (
                <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                  {/* Stock 1 */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-md font-semibold text-gray-700 mb-4">Stock Account 1</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <input {...register("stock1.broker")} placeholder="Brokerage Firm" className={inputClass} />
                      <input
                        {...register("stock1.accountNumber")}
                        placeholder="Account Number"
                        className={inputClass}
                      />
                      <input {...register("stock1.remark")} placeholder="Type / Remark" className={inputClass} />
                      <input
                        {...register("stock1.beneficiary")}
                        placeholder="Beneficiary's Name"
                        className={inputClass}
                      />
                      <input type="number" {...register("stock1.share")} placeholder="% Share" className={inputClass} />
                    </div>
                  </div>
                  {/* Stock 2 */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-md font-semibold text-gray-700 mb-4">Stock Account 2</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <input {...register("stock2.broker")} placeholder="Brokerage Firm" className={inputClass} />
                      <input
                        {...register("stock2.accountNumber")}
                        placeholder="Account Number"
                        className={inputClass}
                      />
                      <input {...register("stock2.remark")} placeholder="Type / Remark" className={inputClass} />
                      <input
                        {...register("stock2.beneficiary")}
                        placeholder="Beneficiary's Name"
                        className={inputClass}
                      />
                      <input type="number" {...register("stock2.share")} placeholder="% Share" className={inputClass} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mutual Funds Section */}
            <div className="space-y-4">
              <SectionHeader title="Mutual Funds" icon={PieChart} sectionKey="mutual" count="2" />
              {expandedSections.mutual && (
                <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                  {/* Mutual Fund 1 */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-md font-semibold text-gray-700 mb-4">MF Account 1</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <input {...register("mutual1.distributor")} placeholder="MF Distributor" className={inputClass} />
                      <input
                        {...register("mutual1.accountNumber")}
                        placeholder="Account Number"
                        className={inputClass}
                      />
                      <input {...register("mutual1.remark")} placeholder="Type / Remark" className={inputClass} />
                      <input
                        {...register("mutual1.beneficiary")}
                        placeholder="Beneficiary's Name"
                        className={inputClass}
                      />
                      <input
                        type="number"
                        {...register("mutual1.share")}
                        placeholder="% Share"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  {/* Mutual Fund 2 */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-md font-semibold text-gray-700 mb-4">MF Account 2</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <input {...register("mutual2.distributor")} placeholder="MF Distributor" className={inputClass} />
                      <input
                        {...register("mutual2.accountNumber")}
                        placeholder="Account Number"
                        className={inputClass}
                      />
                      <input {...register("mutual2.remark")} placeholder="Type / Remark" className={inputClass} />
                      <input
                        {...register("mutual2.beneficiary")}
                        placeholder="Beneficiary's Name"
                        className={inputClass}
                      />
                      <input
                        type="number"
                        {...register("mutual2.share")}
                        placeholder="% Share"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Jewellery Section */}
            <div className="space-y-4">
              <SectionHeader title="Jewellery" icon={Gem} sectionKey="jewellery" count="2" />
              {expandedSections.jewellery && (
                <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                  {/* Jewellery 1 */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-md font-semibold text-gray-700 mb-4">Jewellery Item 1</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <input {...register("jewel1.type")} placeholder="Type of Jewellery" className={inputClass} />
                      <input {...register("jewel1.invoice")} placeholder="Invoice Number" className={inputClass} />
                      <input {...register("jewel1.remark")} placeholder="Type / Remark" className={inputClass} />
                      <input
                        {...register("jewel1.beneficiary")}
                        placeholder="Beneficiary's Name"
                        className={inputClass}
                      />
                      <input type="number" {...register("jewel1.share")} placeholder="% Share" className={inputClass} />
                    </div>
                  </div>
                  {/* Jewellery 2 */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-md font-semibold text-gray-700 mb-4">Jewellery Item 2</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <input {...register("jewel2.type")} placeholder="Type of Jewellery" className={inputClass} />
                      <input {...register("jewel2.invoice")} placeholder="Invoice Number" className={inputClass} />
                      <input {...register("jewel2.remark")} placeholder="Type / Remark" className={inputClass} />
                      <input
                        {...register("jewel2.beneficiary")}
                        placeholder="Beneficiary's Name"
                        className={inputClass}
                      />
                      <input type="number" {...register("jewel2.share")} placeholder="% Share" className={inputClass} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* House Section */}
            <div className="space-y-4">
              <SectionHeader title="House Property" icon={Home} sectionKey="house" count="1" />
              {expandedSections.house && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-md font-semibold text-gray-700 mb-4">House Property</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <input {...register("house1.name")} placeholder="Name of Property" className={inputClass} />
                      <input
                        {...register("house1.registration")}
                        placeholder="Registration Number"
                        className={inputClass}
                      />
                      <input {...register("house1.remark")} placeholder="Type / Remark" className={inputClass} />
                      <input
                        {...register("house1.beneficiary")}
                        placeholder="Beneficiary's Name"
                        className={inputClass}
                      />
                      <input type="number" {...register("house1.share")} placeholder="% Share" className={inputClass} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Land Section */}
            <div className="space-y-4">
              <SectionHeader title="Land Property" icon={MapPin} sectionKey="land" count="1" />
              {expandedSections.land && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-md font-semibold text-gray-700 mb-4">Land Property</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <input {...register("land1.name")} placeholder="Name of Land" className={inputClass} />
                      <input
                        {...register("land1.registration")}
                        placeholder="Registration Number"
                        className={inputClass}
                      />
                      <input {...register("land1.remark")} placeholder="Type / Remark" className={inputClass} />
                      <input
                        {...register("land1.beneficiary")}
                        placeholder="Beneficiary's Name"
                        className={inputClass}
                      />
                      <input type="number" {...register("land1.share")} placeholder="% Share" className={inputClass} />
                    </div>
                  </div>
                </div>
              )}
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
                className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed"
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
            All asset information is securely stored and can be updated later
          </p>
        </div>
      </div>
    </div>
  )
}
