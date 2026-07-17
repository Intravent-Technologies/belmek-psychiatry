"use client";

import { useState, useRef, useCallback } from "react";

interface UploadZoneProps {
  label: string;
  sublabel: string;
  base64: string | null;
  onUpload: (base64: string) => void;
  onRemove: () => void;
}

function UploadZone({ label, sublabel, base64, onUpload, onRemove }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onUpload(reader.result);
    };
    reader.readAsDataURL(file);
  }, [onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  if (base64) {
    return (
      <div className="relative rounded-xl border border-gray-200 bg-white p-3">
        <img src={base64} alt={label} className="w-full h-48 object-contain rounded-lg" />
        <button type="button" onClick={onRemove}
          className="absolute top-5 right-5 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold hover:bg-red-600 transition-all shadow-md">
          &times;
        </button>
        <p className="text-xs text-gray-500 mt-2 text-center">{label}</p>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`rounded-xl border-2 border-dashed cursor-pointer p-8 flex flex-col items-center justify-center text-center transition-all ${
        dragging ? "border-primary bg-primary/5" : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white"
      }`}
    >
      <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />
      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <p className="text-sm font-semibold text-gray-700">{label}</p>
      <p className="text-xs text-gray-400 mt-1">{sublabel}</p>
    </div>
  );
}

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", dob: "", preference: "",
    street: "", city: "", state: "", zip: "", phone: "", email: "",
    insurance: "", emergencyContact: "", emergencyPhone: "", agreed: false,
  });
  const [insuranceCardFront, setInsuranceCardFront] = useState<string | null>(null);
  const [insuranceCardBack, setInsuranceCardBack] = useState<string | null>(null);

  const [stepErrors, setStepErrors] = useState<string[]>([]);

  const update = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (currentStep: number): string[] => {
    const errors: string[] = [];
    if (currentStep === 1) {
      if (!formData.firstName.trim()) errors.push("First Name is required");
      if (!formData.lastName.trim()) errors.push("Last Name is required");
      if (!formData.dob) errors.push("Date of Birth is required");
      if (!formData.preference) errors.push("Please select an Appointment Preference");
      if (!formData.email.trim()) errors.push("Email is required");
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.push("Please enter a valid email address");
      if (!formData.agreed) errors.push("You must agree to the Privacy Policy");
    }
    return errors;
  };

  const handleNext = () => {
    const errors = validateStep(step);
    if (errors.length > 0) {
      setStepErrors(errors);
      return;
    }
    setStepErrors([]);
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const payload = {
        ...formData,
        insuranceCardFront: insuranceCardFront || null,
        insuranceCardBack: insuranceCardBack || null,
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSending(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm";

  if (submitted) {
    return (
      <div className="glass-card rounded-2xl p-10 text-center">
        <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
        <p className="mt-2 text-gray-600">We&apos;ll contact you within 1-2 business days.</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 md:p-10">
      <div className="flex items-center justify-between mb-10">
        {["Patient Info", "Insurance", "Emergency Contact"].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                step === i + 1
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : i + 1 < step
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-400"
              }`}
            >
              {i + 1 < step ? "✓" : i + 1}
            </div>
            <span className={`text-sm hidden sm:inline font-medium ${step === i + 1 ? "text-primary" : "text-gray-400"}`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Patient Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name *</label>
                <input type="text" required value={formData.firstName} onChange={(e) => update("firstName", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name *</label>
                <input type="text" required value={formData.lastName} onChange={(e) => update("lastName", e.target.value)} className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Date of Birth *</label>
              <input type="date" required value={formData.dob} onChange={(e) => update("dob", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Appointment Preference *</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["Telehealth (Video)", "Morning (9-12pm EST)", "Afternoon (12-3:30pm EST)"].map((opt) => (
                  <button type="button" key={opt} onClick={() => update("preference", opt)}
                    className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                      formData.preference === opt ? "border-primary bg-primary/5 text-primary" : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Street Address</label>
                <input type="text" value={formData.street} onChange={(e) => update("street", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                <input type="text" value={formData.city} onChange={(e) => update("city", e.target.value)} className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
                <select value={formData.state} onChange={(e) => update("state", e.target.value)} className={inputClass}>
                  <option value="">Select state</option>
                  <option value="MD">Maryland</option>
                  <option value="DC">Washington DC</option>
                  <option value="VA">Virginia</option>
                  <option value="DE">Delaware</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">ZIP Code</label>
                <input type="text" value={formData.zip} onChange={(e) => update("zip", e.target.value)} className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                <input type="tel" value={formData.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                <input type="email" required value={formData.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
              </div>
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={formData.agreed} onChange={(e) => update("agreed", e.target.checked)} className="mt-1 rounded border-gray-300 text-primary focus:ring-primary" />
              <span className="text-sm text-gray-600 leading-relaxed">
                I have read and agree to the{" "}
                <a href="/privacy" className="text-primary font-medium hover:underline">Privacy Policy</a>.
              </span>
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Insurance Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Insurance Provider</label>
              <select value={formData.insurance} onChange={(e) => update("insurance", e.target.value)} className={inputClass}>
                <option value="">Select your insurance</option>
                <option value="medicare">Medicare</option>
                <option value="uhc">UnitedHealthcare</option>
                <option value="optum">Optum</option>
                <option value="aetna">Aetna</option>
                <option value="bcbs">Blue Cross Blue Shield</option>
                <option value="cigna">CIGNA</option>
                <option value="oscar">Oscar</option>
                <option value="carelon">Carelon</option>
                <option value="humana">Humana</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Insurance Card Photos</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UploadZone
                  label="Card Front"
                  sublabel="Drag & drop or tap to upload"
                  base64={insuranceCardFront}
                  onUpload={setInsuranceCardFront}
                  onRemove={() => setInsuranceCardFront(null)}
                />
                <UploadZone
                  label="Card Back"
                  sublabel="Drag & drop or tap to upload"
                  base64={insuranceCardBack}
                  onUpload={setInsuranceCardBack}
                  onRemove={() => setInsuranceCardBack(null)}
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Emergency Contact</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input type="text" value={formData.emergencyContact} onChange={(e) => update("emergencyContact", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                <input type="tel" value={formData.emergencyPhone} onChange={(e) => update("emergencyPhone", e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>
        )}

        {(error || stepErrors.length > 0) && (
          <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700">
            {stepErrors.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {stepErrors.map((err) => <li key={err}>{err}</li>)}
              </ul>
            ) : error}
          </div>
        )}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
          {step > 1 ? (
            <button type="button" onClick={() => { setStepErrors([]); setStep(step - 1); }} className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all">
              Back
            </button>
          ) : <div />}
          {step < 3 ? (
            <button type="button" onClick={handleNext} className="px-8 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
              Continue
            </button>
          ) : (
            <button type="submit" disabled={sending} className="px-8 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed">
              {sending ? "Sending..." : "Submit Request"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
