"use client";

import { useState } from "react";

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

  const update = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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

        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700">
            {error}
          </div>
        )}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
          {step > 1 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all">
              Back
            </button>
          ) : <div />}
          {step < 3 ? (
            <button type="button" onClick={() => setStep(step + 1)} className="px-8 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
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
