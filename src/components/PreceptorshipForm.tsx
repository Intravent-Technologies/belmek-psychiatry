"use client";

import { useState } from "react";

export default function PreceptorshipForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [stepErrors, setStepErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    school: "",
    program: "",
    expectedGraduation: "",
    clinicalHours: "",
    startDate: "",
    endDate: "",
    clinicalInterests: [] as string[],
    previousExperience: "",
    goals: "",
    additionalInfo: "",
  });

  const update = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleClinicalInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      clinicalInterests: prev.clinicalInterests.includes(interest)
        ? prev.clinicalInterests.filter((i) => i !== interest)
        : [...prev.clinicalInterests, interest],
    }));
  };

  const clinicalInterestOptions = [
    "ADHD",
    "Anxiety Disorders",
    "Depression",
    "Bipolar Disorder",
    "PTSD & Trauma",
    "Pediatric Psychiatry",
    "Adolescent Psychiatry",
    "Adult Psychiatry",
    "Medication Management",
    "Crisis Intervention",
  ];

  const validate = (): string[] => {
    const errors: string[] = [];
    if (!formData.firstName.trim()) errors.push("First Name is required");
    if (!formData.lastName.trim()) errors.push("Last Name is required");
    if (!formData.email.trim()) errors.push("Email is required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.push("Please enter a valid email address");
    if (!formData.school.trim()) errors.push("School/University is required");
    if (!formData.program.trim()) errors.push("Program name is required");
    if (!formData.expectedGraduation) errors.push("Expected graduation date is required");
    if (!formData.startDate) errors.push("Desired start date is required");
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (errors.length > 0) {
      setStepErrors(errors);
      return;
    }
    setStepErrors([]);
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/preceptorship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly at info@belmekwellness.com.");
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
        <h3 className="text-2xl font-bold text-gray-900">Application Received!</h3>
        <p className="mt-2 text-gray-600">Thank you for your interest. We&apos;ll review your application and contact you within 3-5 business days.</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 md:p-10">
      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {/* Personal Information */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h3>
            <div className="space-y-5">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                  <input type="email" required value={formData.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                  <input type="tel" value={formData.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
                </div>
              </div>
            </div>
          </div>

          {/* Educational Background */}
          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Educational Background</h3>
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">School / University *</label>
                  <input type="text" required value={formData.school} onChange={(e) => update("school", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Program Name *</label>
                  <input type="text" required placeholder="e.g., PMHNP-BC" value={formData.program} onChange={(e) => update("program", e.target.value)} className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Expected Graduation Date *</label>
                  <input type="date" required value={formData.expectedGraduation} onChange={(e) => update("expectedGraduation", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Clinical Hours Completed</label>
                  <input type="text" placeholder="e.g., 250 hours" value={formData.clinicalHours} onChange={(e) => update("clinicalHours", e.target.value)} className={inputClass} />
                </div>
              </div>
            </div>
          </div>

          {/* Preceptorship Details */}
          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Preceptorship Details</h3>
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Desired Start Date *</label>
                  <input type="date" required value={formData.startDate} onChange={(e) => update("startDate", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Desired End Date</label>
                  <input type="date" value={formData.endDate} onChange={(e) => update("endDate", e.target.value)} className={inputClass} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Clinical Interests</label>
                <div className="flex flex-wrap gap-2">
                  {clinicalInterestOptions.map((interest) => (
                    <button
                      type="button"
                      key={interest}
                      onClick={() => toggleClinicalInterest(interest)}
                      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                        formData.clinicalInterests.includes(interest)
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Additional Information</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Previous Clinical Experience</label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe your relevant clinical experience..."
                  value={formData.previousExperience}
                  onChange={(e) => update("previousExperience", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Goals for This Preceptorship</label>
                <textarea
                  rows={3}
                  placeholder="What do you hope to gain from this experience?"
                  value={formData.goals}
                  onChange={(e) => update("goals", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Anything Else You&apos;d Like Us to Know</label>
                <textarea
                  rows={3}
                  placeholder="Any additional information or questions..."
                  value={formData.additionalInfo}
                  onChange={(e) => update("additionalInfo", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>

        {stepErrors.length > 0 && (
          <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700">
            <ul className="list-disc list-inside space-y-1">
              {stepErrors.map((err) => <li key={err}>{err}</li>)}
            </ul>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8">
          <button
            type="submit"
            disabled={sending}
            className="w-full px-8 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}
