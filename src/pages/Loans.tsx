import { FileText, CheckCircle, IndianRupee } from 'lucide-react';

export default function Loans() {
  const schemes = [
    {
      title: "PM-KISAN Samman Nidhi",
      description: "Under the scheme, an income support of 6,000/- per year in three equal installments will be provided to small and marginal farmer families having combined land holding/ownership of upto 2 hectares.",
      eligibility: ["Small and marginal farmers", "Land holding up to 2 hectares"],
      amount: "₹6,000 / year",
      link: "https://pmkisan.gov.in/"
    },
    {
      title: "Kisan Credit Card (KCC)",
      description: "The Kisan Credit Card scheme aims to provide adequate and timely credit support from the banking system under a single window with flexible and simplified procedure to the farmers for their cultivation and other needs.",
      eligibility: ["All farmers - individuals / joint borrowers", "Tenant farmers, oral lessees & share croppers"],
      amount: "Up to ₹3 Lakhs",
      link: "https://www.myscheme.gov.in/schemes/kcc"
    },
    {
      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      description: "A comprehensive crop insurance scheme to provide insurance coverage and financial support to the farmers in the event of failure of any of the notified crop as a result of natural calamities, pests & diseases.",
      eligibility: ["All farmers growing notified crops in a notified area", "Loanee farmers (compulsory) and non-loanee farmers (voluntary)"],
      amount: "Varies by crop",
      link: "https://pmfby.gov.in/"
    },
    {
      title: "Agriculture Infrastructure Fund (AIF)",
      description: "A medium-long term debt financing facility for investment in viable projects for post-harvest management infrastructure and community farming assets through interest subvention and financial support.",
      eligibility: ["Primary Agricultural Credit Societies (PACS)", "Farmer Producer Organizations (FPOs)", "Agri-entrepreneurs and Startups"],
      amount: "Up to ₹2 Crores",
      link: "https://agriinfra.dac.gov.in/"
    },
    {
      title: "Dairy Entrepreneurship Development Scheme (DEDS)",
      description: "Aims to generate self-employment and provide infrastructure for the dairy sector. It assists in setting up modern dairy farms and provides subsidies for purchasing milch animals.",
      eligibility: ["Farmers, individual entrepreneurs, NGOs", "Organized groups like SHGs and Dairy Cooperative Societies"],
      amount: "25% to 33.33% Subsidy",
      link: "https://www.nabard.org/content1.aspx?id=591&catid=23&mid=23"
    },
    {
      title: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
      description: "Focuses on improving water use efficiency at the farm level through Micro Irrigation (Drip and Sprinkler Irrigation systems) to enhance crop productivity and ensure 'Per Drop More Crop'.",
      eligibility: ["Farmers with cultivable land", "Members of Cooperative Societies and FPOs"],
      amount: "Up to 55% Subsidy",
      link: "https://pmksy.gov.in/"
    },
    {
      title: "National Livestock Mission (NLM)",
      description: "Designed to ensure quantitative and qualitative improvement in livestock production systems and capacity building of all stakeholders. Offers subsidies for poultry, sheep, goat, and pig farming.",
      eligibility: ["Individuals, FPOs, SHGs, JLGs", "State Government agencies and cooperatives"],
      amount: "Up to 50% Subsidy",
      link: "https://nlm.udyamimitra.in/"
    }
  ];

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-stone-800 mb-4">Loans & Schemes</h1>
          <p className="text-lg text-stone-600">Explore various government schemes and financial assistance programs available to support your farming journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <IndianRupee className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">Financial Support</h3>
            <p className="text-stone-500 text-sm">Access to credit and direct benefit transfers.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 text-center">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">Easy Documentation</h3>
            <p className="text-stone-500 text-sm">Simplified processes for quick approvals.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">Government Backed</h3>
            <p className="text-stone-500 text-sm">100% authentic and verified schemes.</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Available Schemes</h2>
          {schemes.map((scheme, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <h3 className="text-2xl font-bold text-green-800">{scheme.title}</h3>
                <span className="bg-orange-100 text-orange-800 px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  {scheme.amount}
                </span>
              </div>
              <p className="text-stone-600 mb-6 leading-relaxed">{scheme.description}</p>
              
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                <h4 className="font-semibold text-stone-800 mb-2">Eligibility:</h4>
                <ul className="list-disc list-inside space-y-1 text-stone-600 text-sm">
                  {scheme.eligibility.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6 flex justify-end">
                <a 
                  href={scheme.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors inline-block"
                >
                  Apply Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
