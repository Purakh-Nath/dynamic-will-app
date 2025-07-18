import { create } from 'zustand';

const useFormStore = create((set) => ({
  personalInfo: {},
  beneficiaries: [],
  assets: {
    bankAccounts: [],
    insurance: [],
    stocks: [],
    mutualFunds: [],
    jewellery: [],
    house: [],
    land: [],
  },
  otherDetails: {},
  setPersonalInfo: (info) => set({ personalInfo: info }),
  setBeneficiaries: (list) => set({ beneficiaries: list }),
  setAssets: (assets) => set({ assets }),
  setOtherDetails: (data) => set({ otherDetails: data }),
}));

export default useFormStore;
