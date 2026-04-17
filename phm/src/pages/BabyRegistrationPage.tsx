import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../services/DataService';
import { AuthService } from '../services/AuthService';
import { PhmLayout } from '../components/PhmLayout';


export const BabyRegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    birthWeight: '',
    birthHeight: '',
    motherName: '',
    motherNIC: '',
    fatherName: '',
    fatherNIC: '',
    address: '',
    district: '',
    dsDivision: '',
    gnDivision: '',
    parent_whatsapp_number: '',
  });
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [lastRegisteredChild, setLastRegisteredChild] = useState<{
    childId: string;
    registrationNumber: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  } | null>(null);
  const [error, setError] = useState('');
  const [assignedGnDivision, setAssignedGnDivision] = useState<string>('');
  const [loadingArea, setLoadingArea] = useState(true);
  const navigate = useNavigate();

  // Initialize GN Division from PHM's assigned area on component mount
  useEffect(() => {
    const initializeGnDivision = async () => {
      try {
        setLoadingArea(true);
        const assignedArea = await dataService.getAssignedArea();

        if (assignedArea) {
          setAssignedGnDivision(assignedArea);
          setFormData((prevData) => ({
            ...prevData,
            gnDivision: assignedArea,
          }));
        } else {
          setError('Unable to determine your assigned GN Division. Please contact administrator.');
        }
      } catch (err) {
        console.error('Error initializing GN Division:', err);
        setError('Failed to load your assigned area. Please try again.');
      } finally {
        setLoadingArea(false);
      }
    };

    initializeGnDivision();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const weight = parseFloat(formData.birthWeight);
    const height = parseFloat(formData.birthHeight);
    if (isNaN(weight) || isNaN(height)) {
      setError('Please enter valid birth weight and height.');
      return;
    }
    try {
      const currentUser = AuthService.getCurrentUser();
      const phmId = (currentUser as { phmId?: string })?.phmId ?? currentUser?.userId;
      const areaCode = (currentUser as { areaCode?: string })?.areaCode;
      const res = await dataService.registerChild({
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        birthWeight: weight,
        birthHeight: height,
        motherName: formData.motherName,
        motherNIC: formData.motherNIC,
        fatherName: formData.fatherName,
        fatherNIC: formData.fatherNIC,
        district: formData.district,
        dsDivision: formData.dsDivision,
        gnDivision: formData.gnDivision,
        address: formData.address,
        ...(phmId && { phmId }),
        ...(areaCode && { areaCode }),
        ...(formData.parent_whatsapp_number?.trim() && {
          parent_whatsapp_number: formData.parent_whatsapp_number.trim(),
        }),
      });
      if (res?.registrationNumber) {
        setRegistrationNumber(res.registrationNumber);
        setLastRegisteredChild({
          childId: res.childId ?? (res as { child_id?: string }).child_id ?? '',
          registrationNumber: res.registrationNumber,
          firstName: formData.firstName,
          lastName: formData.lastName,
          dateOfBirth: formData.dateOfBirth,
        });
      } else {
        setError('Registration failed. Server did not return a registration number.');
      }
    } catch (err: unknown) {
      let message = 'Registration failed. Please check your details and try again.';
      if (err && typeof err === 'object' && 'message' in err && typeof (err as { message: unknown }).message === 'string') {
        message = (err as { message: string }).message;
        const apiErr = err as { details?: Array<{ field?: string; message?: string }>; statusCode?: number; responseBody?: unknown };
        if (apiErr.statusCode === 422 && (apiErr.details?.length || apiErr.responseBody)) {
          const detailsStr = apiErr.details?.map((d) => d.field ? `${d.field}: ${d.message ?? 'invalid'}` : d.message).join('; ');
          if (detailsStr) message = `${message} ${detailsStr}`;
          else if (apiErr.responseBody && typeof apiErr.responseBody === 'object') {
            message = `${message} (Response: ${JSON.stringify(apiErr.responseBody)})`;
          }
        }
      }
      setError(message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (registrationNumber) {
    return (
      <PhmLayout activeNav="register-baby" showBackToDashboard={true}>
        <div className="w-full max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="mb-6">
                <span className="material-symbols-outlined text-6xl text-green-500">check_circle</span>
              </div>
              <h2 className="text-3xl font-bold text-[#0d141b] dark:text-white mb-2">Baby Registered Successfully!</h2>
              <p className="text-[#4c739a] dark:text-slate-400">The child has been registered in the system.</p>
            </div>

            <div className="bg-primary/10 border-2 border-primary rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary text-2xl">badge</span>
                <p className="text-sm font-bold text-primary uppercase tracking-wider">Registration Number</p>
              </div>
              <p className="text-2xl font-black text-[#0d141b] dark:text-white">{registrationNumber}</p>
              <p className="text-sm text-[#4c739a] dark:text-slate-400 mt-2">
                Please provide this registration number to the parents so they can link this child to their account.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {lastRegisteredChild && (
                <button
                  onClick={() => navigate('/view-area-children', { state: { newlyRegistered: lastRegisteredChild } })}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-colors"
                >
                  <span className="material-symbols-outlined">groups</span>
                  View Area Children
                </button>
              )}
              <button
                onClick={() => {
                  setRegistrationNumber('');
                  setLastRegisteredChild(null);
                  setFormData({
                    firstName: '', lastName: '', dateOfBirth: '', gender: '',
                    birthWeight: '', birthHeight: '', motherName: '', motherNIC: '',
                    fatherName: '', fatherNIC: '', address: '', district: '',
                    dsDivision: '', gnDivision: assignedGnDivision, parent_whatsapp_number: '',
                  });
                }}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 border-2 border-primary text-primary text-sm font-bold hover:bg-primary/5 transition-colors"
              >
                <span className="material-symbols-outlined">add</span>
                Register Another Child
              </button>
              <button
                onClick={() => navigate('/phm-dashboard')}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors"
              >
                <span className="material-symbols-outlined">dashboard</span>
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </PhmLayout>
    );
  }

  return (
    <PhmLayout activeNav="register-baby" showBackToDashboard={true}>
      <div className="w-full max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-[#0d141b] dark:text-white mb-2">Register New Baby</h1>
          <p className="text-[#4c739a] dark:text-slate-400">Enter child demographic details to register in the system.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">First Name *</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Last Name *</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Date of Birth *</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Gender *</p>
                <select
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Birth Weight (kg) *</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  type="number"
                  step="0.01"
                  name="birthWeight"
                  value={formData.birthWeight}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Birth Height (cm) *</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  type="number"
                  step="0.1"
                  name="birthHeight"
                  value={formData.birthHeight}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          </div>

          <div className="border-t border-[#e7edf3] dark:border-slate-700 pt-6 mb-6">
            <h3 className="text-lg font-bold text-[#0d141b] dark:text-white mb-4">Parent Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex flex-col">
                  <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Mother's Name *</p>
                  <input
                    className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <div>
                <label className="flex flex-col">
                  <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Mother's NIC *</p>
                  <input
                    className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                    type="text"
                    name="motherNIC"
                    value={formData.motherNIC}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <div>
                <label className="flex flex-col">
                  <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Father's Name</p>
                  <input
                    className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div>
                <label className="flex flex-col">
                  <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Father's NIC</p>
                  <input
                    className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                    type="text"
                    name="fatherNIC"
                    value={formData.fatherNIC}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="flex flex-col">
                  <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Parent WhatsApp Number *</p>
                  <input
                    className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                    type="tel"
                    name="parent_whatsapp_number"
                    value={formData.parent_whatsapp_number}
                    onChange={handleChange}
                    placeholder="+94771234567"
                    required
                  />
                  <p className="text-xs text-[#4c739a] dark:text-slate-400 mt-1">
                    Required. Used when the parent links this child via WhatsApp OTP (e.g. +94 for Sri Lanka).
                  </p>
                </label>
              </div>
            </div>
          </div>

          <div className="border-t border-[#e7edf3] dark:border-slate-700 pt-6 mb-6">
            <h3 className="text-lg font-bold text-[#0d141b] dark:text-white mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="flex flex-col">
                  <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">District *</p>
                  <select
                    className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select District</option>
                    <option value="Galle">Galle</option>
                  </select>
                </label>
              </div>

              <div>
                <label className="flex flex-col">
                  <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">MOH Division *</p>
                  <select
                    className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                    name="dsDivision"
                    value={formData.dsDivision}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select MOH Division</option>
                    <option value="Galle">Galle</option>
                  </select>
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="flex flex-col">
                  <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">GN Division (Assigned)</p>
                  {loadingArea ? (
                    <div className="w-full rounded-lg border border-[#cfdbe7] dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-12 px-4 flex items-center">
                      <p className="text-[#4c739a] dark:text-slate-400 text-sm">Loading your assigned area...</p>
                    </div>
                  ) : assignedGnDivision ? (
                    <div className="w-full rounded-lg border border-[#cfdbe7] dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-12 px-4 flex items-center">
                      <p className="text-[#0d141b] dark:text-white text-sm font-medium">{assignedGnDivision}</p>
                    </div>
                  ) : (
                    <div className="w-full rounded-lg border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/20 h-12 px-4 flex items-center">
                      <p className="text-red-600 dark:text-red-400 text-sm">Unable to load assigned area</p>
                    </div>
                  )}
                  <p className="text-xs text-[#4c739a] dark:text-slate-400 mt-2">
                    Your GN Division is automatically assigned based on your PHM account setup and cannot be changed manually.
                  </p>
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="flex flex-col">
                  <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Full Address *</p>
                  <textarea
                    className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-24 px-4 py-3 text-sm resize-none"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/phm-dashboard')}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 border-2 border-[#cfdbe7] dark:border-slate-700 text-[#4c739a] dark:text-slate-400 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined">save</span>
              Register Baby
            </button>
          </div>
        </form>
      </div>
    </PhmLayout>
  );
};
