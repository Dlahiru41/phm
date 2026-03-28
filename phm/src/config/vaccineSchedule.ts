// Sri Lanka National Immunization Schedule - Vaccine Data
export const sriLankaVaccineSchedule = [
  {
    vaccineId: 'vaccine_bcg',
    name: 'BCG (Bacillus Calmette-Guérin)',
    manufacturer: 'Serum Institute of India / Multiple',
    dosageInfo: 'Single dose: 0.05 ml (intradermal)',
    recommendedAge: 0, // At birth
    intervalDays: 0,
    description:
      'Prevention of tuberculosis. Preferably administered within 24 hours of birth before leaving hospital. If scar not present, 2nd dose could be offered after 6 months, up to 5 years.',
    isActive: true,
    notes: 'Give at birth if possible, preferably within first 24 hours',
  },
  {
    vaccineId: 'vaccine_opv1',
    name: 'OPV 1 (Oral Polio Vaccine - Dose 1)',
    manufacturer: 'Bharat Biotech / Serum Institute',
    dosageInfo: '2 drops orally',
    recommendedAge: 2, // 2 months
    intervalDays: 60, // 2 months from BCG
    description: 'First dose of polio vaccination. Given at 2 months of age.',
    isActive: true,
    notes: 'Schedule: 2 months, 4 months, 6 months, 18 months, 4-6 years',
  },
  {
    vaccineId: 'vaccine_pentavalent1',
    name: 'Pentavalent 1 (DPT + HepB + Hib)',
    manufacturer: 'Serum Institute of India',
    dosageInfo: '0.5 ml intramuscular injection',
    recommendedAge: 2, // 2 months
    intervalDays: 60,
    description:
      'Combined vaccine providing protection against Diphtheria, Pertussis, Tetanus, Hepatitis B, and Haemophilus influenzae type b. First dose at 2 months.',
    isActive: true,
    notes: 'DPT schedule: 2, 4, 6 months, then booster at 18 months',
  },
  {
    vaccineId: 'vaccine_opv2',
    name: 'OPV 2 (Oral Polio Vaccine - Dose 2)',
    manufacturer: 'Bharat Biotech / Serum Institute',
    dosageInfo: '2 drops orally',
    recommendedAge: 4, // 4 months
    intervalDays: 60,
    description: 'Second dose of polio vaccination.',
    isActive: true,
    notes: 'Given at 4 months of age',
  },
  {
    vaccineId: 'vaccine_pentavalent2',
    name: 'Pentavalent 2 (DPT + HepB + Hib)',
    manufacturer: 'Serum Institute of India',
    dosageInfo: '0.5 ml intramuscular injection',
    recommendedAge: 4, // 4 months
    intervalDays: 60,
    description: 'Second dose of combined pentavalent vaccine.',
    isActive: true,
    notes: 'Given at 4 months of age',
  },
  {
    vaccineId: 'vaccine_opv3',
    name: 'OPV 3 (Oral Polio Vaccine - Dose 3)',
    manufacturer: 'Bharat Biotech / Serum Institute',
    dosageInfo: '2 drops orally',
    recommendedAge: 6, // 6 months
    intervalDays: 60,
    description: 'Third dose of polio vaccination.',
    isActive: true,
    notes: 'Given at 6 months of age',
  },
  {
    vaccineId: 'vaccine_pentavalent3',
    name: 'Pentavalent 3 (DPT + HepB + Hib)',
    manufacturer: 'Serum Institute of India',
    dosageInfo: '0.5 ml intramuscular injection',
    recommendedAge: 6, // 6 months
    intervalDays: 60,
    description: 'Third dose of combined pentavalent vaccine.',
    isActive: true,
    notes: 'Given at 6 months of age',
  },
  {
    vaccineId: 'vaccine_mmr',
    name: 'MMR (Measles, Mumps, Rubella)',
    manufacturer: 'Serum Institute of India / PPSV',
    dosageInfo: '0.5 ml subcutaneous injection',
    recommendedAge: 9, // 9 months
    intervalDays: 90,
    description:
      'Combined live attenuated vaccine for prevention of measles, mumps, and rubella. Given at 9 months of age.',
    isActive: true,
    notes: 'Important for prevention of measles and congenital rubella syndrome',
  },
  {
    vaccineId: 'vaccine_je',
    name: 'JE (Japanese Encephalitis)',
    manufacturer: 'Serum Institute of India',
    dosageInfo: '0.5 ml intramuscular injection',
    recommendedAge: 12, // 12 months
    intervalDays: 90,
    description:
      'Inactivated Japanese Encephalitis vaccine. Given at 12 months of age to protect against viral encephalitis.',
    isActive: true,
    notes: 'Important in endemic areas of Sri Lanka',
  },
  {
    vaccineId: 'vaccine_dpt_booster',
    name: 'DPT Booster (Diphtheria, Pertussis, Tetanus)',
    manufacturer: 'Serum Institute of India',
    dosageInfo: '0.5 ml intramuscular injection',
    recommendedAge: 18, // 18 months
    intervalDays: 360, // 12 months after 3rd pentavalent dose
    description:
      'Booster dose of DPT vaccine at 18 months to maintain immunity against diphtheria, pertussis, and tetanus.',
    isActive: true,
    notes: 'First booster dose; second booster given at 4-6 years',
  },
  {
    vaccineId: 'vaccine_hepatitis_b_birth',
    name: 'Hepatitis B Birth Dose',
    manufacturer: 'Serum Institute of India',
    dosageInfo: '10 mcg (0.5 ml) intramuscular injection',
    recommendedAge: 0, // At birth
    intervalDays: 0,
    description:
      'Single dose of hepatitis B vaccine given at birth to prevent mother-to-child transmission of hepatitis B virus.',
    isActive: true,
    notes: 'Given within 24 hours of birth',
  },
  {
    vaccineId: 'vaccine_typhoid',
    name: 'Typhoid (Typhi CV)',
    manufacturer: 'Bharat Biotech',
    dosageInfo: '0.5 ml intramuscular or subcutaneous injection',
    recommendedAge: 24, // 2 years / 24 months
    intervalDays: 365,
    description:
      'Conjugate vaccine for prevention of typhoid fever. Recommended in high-risk areas and before travel to endemic regions.',
    isActive: true,
    notes: 'Optional, recommended for high-risk populations',
  },
];

export type VaccineScheduleEntry = (typeof sriLankaVaccineSchedule)[0];

