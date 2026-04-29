import { Bug, ShieldAlert, LeafyGreen } from 'lucide-react';

export default function Pests() {
  const pests = [
    {
      name: "Fall Armyworm",
      affectedCrops: ["Maize", "Sorghum", "Rice"],
      symptoms: "Larvae feed on leaves, creating large, ragged holes. In severe cases, they can defoliate entire plants.",
      solution: "Use biological control agents like Trichogramma wasps. Apply neem-based pesticides or spinosad. Ensure early planting to avoid peak populations.",
      image: "https://loremflickr.com/500/400/caterpillar,pest"
    },
    {
      name: "Aphids",
      affectedCrops: ["Wheat", "Vegetables", "Cotton"],
      symptoms: "Curled, yellowing leaves. Stunted growth. Presence of sticky honeydew on leaves, which may lead to sooty mold.",
      solution: "Introduce natural predators like ladybugs and lacewings. Spray insecticidal soap or neem oil. Avoid excessive nitrogen fertilization.",
      image: "https://loremflickr.com/500/400/aphid,insect"
    },
    {
      name: "Whiteflies",
      affectedCrops: ["Tomatoes", "Cotton", "Beans"],
      symptoms: "Tiny white insects fluttering around plants when disturbed. Leaves turn yellow, dry up, and fall off. Honeydew and sooty mold present.",
      solution: "Use yellow sticky traps to monitor and reduce populations. Apply horticultural oils or insecticidal soaps. Encourage natural enemies like Encarsia formosa.",
      image: "https://loremflickr.com/500/400/whitefly,insect"
    },
    {
      name: "Spider Mites",
      affectedCrops: ["Soybeans", "Cotton", "Vegetables"],
      symptoms: "Tiny yellow or white speckling on leaves. Fine webbing visible on the undersides of leaves or between stems. Leaves may eventually turn bronze or yellow and drop off.",
      solution: "Maintain adequate soil moisture to reduce plant stress. Introduce predatory mites (Phytoseiidae). Apply neem oil, insecticidal soap, or specific miticides if infestation is severe.",
      image: "https://loremflickr.com/500/400/mite,insect"
    },
    {
      name: "Root-knot Nematodes",
      affectedCrops: ["Tomatoes", "Potatoes", "Carrots"],
      symptoms: "Plants appear stunted, yellowed, and wilt easily even with adequate water. Roots show distinct galls or knot-like swellings.",
      solution: "Practice crop rotation with non-host crops like corn or marigolds. Use nematode-resistant crop varieties. Apply organic soil amendments like neem cake to suppress nematode populations.",
      image: "https://loremflickr.com/500/400/root,disease"
    },
    {
      name: "Thrips",
      affectedCrops: ["Onions", "Peppers", "Citrus"],
      symptoms: "Leaves develop a silvery, stippled appearance with tiny black specks (feces). Flowers may be distorted or fail to open properly.",
      solution: "Use blue sticky traps for monitoring. Release predatory bugs like Orius species. Apply spinosad or neem oil early in the morning or late evening.",
      image: "https://loremflickr.com/500/400/thrip,insect"
    },
    {
      name: "Colorado Potato Beetle",
      affectedCrops: ["Potatoes", "Eggplants", "Tomatoes"],
      symptoms: "Adults and larvae chew large holes in leaves, often completely defoliating the plant if left unchecked.",
      solution: "Handpick beetles and larvae for small plots. Use crop rotation and deep mulching. Apply Bacillus thuringiensis var. tenebrionis (Btt) or spinosad for organic control.",
      image: "https://loremflickr.com/500/400/beetle,insect"
    },
    {
      name: "Corn Earworm",
      affectedCrops: ["Corn", "Tomatoes", "Cotton"],
      symptoms: "Larvae feed on the tips of corn ears, damaging kernels and leaving frass. On tomatoes, they bore into the fruit, causing rot.",
      solution: "Apply mineral oil to corn silks just as they begin to brown. Release Trichogramma wasps. Use Bacillus thuringiensis (Bt) sprays during the early larval stages.",
      image: "https://loremflickr.com/500/400/worm,pest"
    }
  ];

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bug className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-stone-800 mb-4">Pest Suggestions</h1>
          <p className="text-lg text-stone-600">Identify common agricultural pests and discover effective, sustainable solutions to protect your crops and maximize yield.</p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {pests.map((pest, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
              <div className="md:w-1/3 h-64 md:h-auto">
                <img 
                  src={pest.image} 
                  alt={pest.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:w-2/3 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-stone-800">{pest.name}</h2>
                  <div className="flex gap-2">
                    {pest.affectedCrops.map(crop => (
                      <span key={crop} className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full font-medium">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="flex items-center text-lg font-semibold text-red-600 mb-2">
                    <ShieldAlert className="w-5 h-5 mr-2" /> Symptoms
                  </h3>
                  <p className="text-stone-600 leading-relaxed pl-7">{pest.symptoms}</p>
                </div>

                <div>
                  <h3 className="flex items-center text-lg font-semibold text-green-700 mb-2">
                    <LeafyGreen className="w-5 h-5 mr-2" /> Recommended Solution
                  </h3>
                  <p className="text-stone-600 leading-relaxed pl-7">{pest.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
