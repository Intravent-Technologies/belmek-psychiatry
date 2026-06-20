const insurances = [
  "Medicare", "UnitedHealthcare", "Optum", "Aetna",
  "Blue Cross Blue Shield", "CIGNA", "Oscar", "Carelon",
  "Coventry", "MultiPlan", "Humana", "Johns Hopkins",
];

export default function InsuranceGrid() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[#faf9f6] to-white">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            Insurance
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Insurance Accepted</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We work with a wide range of insurance plans to make care accessible.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {insurances.map((insurance) => (
            <div
              key={insurance}
              className="glass-card rounded-xl px-4 py-5 flex items-center justify-center text-center hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <span className="text-sm font-semibold text-gray-700">{insurance}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Don&apos;t see your insurance?{" "}
            <a href="/contact" className="text-primary font-semibold hover:underline">Contact us</a> to verify your coverage.
          </p>
        </div>
      </div>
    </section>
  );
}
