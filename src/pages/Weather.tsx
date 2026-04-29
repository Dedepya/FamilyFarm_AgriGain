import { CloudRain, Sun, Wind, Droplets, Thermometer, MapPin, Leaf, Search, Loader2, Cloud, CloudFog, CloudDrizzle, Snowflake, CloudLightning } from 'lucide-react';
import { useState, useEffect } from 'react';

const getWeatherInfo = (code: number) => {
  if (code === 0) return { desc: 'Clear sky', icon: Sun };
  if (code === 1) return { desc: 'Mainly clear', icon: Sun };
  if (code === 2) return { desc: 'Partly cloudy', icon: Cloud };
  if (code === 3) return { desc: 'Overcast', icon: Cloud };
  if ([45, 48].includes(code)) return { desc: 'Fog', icon: CloudFog };
  if ([51, 53, 55, 56, 57].includes(code)) return { desc: 'Drizzle', icon: CloudDrizzle };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { desc: 'Rain', icon: CloudRain };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { desc: 'Snow', icon: Snowflake };
  if ([95, 96, 99].includes(code)) return { desc: 'Thunderstorm', icon: CloudLightning };
  return { desc: 'Unknown', icon: Sun };
};

const getDayName = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export default function Weather() {
  const [locationName, setLocationName] = useState('New Delhi, India');
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWeather = async (lat: number, lon: number, name: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,pressure_msl,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`);
      if (!res.ok) throw new Error('Failed to fetch weather data');
      const data = await res.json();
      setWeatherData(data);
      setLocationName(name);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchLocationByCoords = async (lat: number, lon: number) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      const data = await res.json();
      const city = data.address.city || data.address.town || data.address.village || data.address.county || 'Unknown Location';
      const country = data.address.country || '';
      return `${city}${country ? `, ${country}` : ''}`;
    } catch (err) {
      return 'Current Location';
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}&count=1&language=en&format=json`);
      const data = await res.json();
      
      if (!data.results || data.results.length === 0) {
        throw new Error('Location not found');
      }
      
      const result = data.results[0];
      const name = `${result.name}, ${result.country}`;
      await fetchWeather(result.latitude, result.longitude, name);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const name = await fetchLocationByCoords(latitude, longitude);
          fetchWeather(latitude, longitude, name);
        },
        (err) => {
          console.warn('Geolocation error:', err);
          // Fallback to New Delhi
          fetchWeather(28.6139, 77.2090, 'New Delhi, India');
        }
      );
    } else {
      // Fallback to New Delhi
      fetchWeather(28.6139, 77.2090, 'New Delhi, India');
    }
  }, []);

  const currentInfo = weatherData ? getWeatherInfo(weatherData.current.weather_code) : null;
  const CurrentIcon = currentInfo?.icon || Sun;

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-stone-800 mb-4">Weather Updates</h1>
            <p className="text-lg text-stone-600">Real-time weather forecasts to help you plan your farming activities.</p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-8 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for a city or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <button 
              type="submit"
              disabled={loading || !searchQuery.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
            >
              Search
            </button>
          </form>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 border border-red-100">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
            </div>
          ) : weatherData ? (
            <div className="bg-white rounded-3xl shadow-lg border border-stone-100 overflow-hidden">
              {/* Current Weather Header */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-8 md:p-12">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-8 md:mb-0 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start text-blue-100 mb-2">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span className="text-lg font-medium">{locationName}</span>
                    </div>
                    <h2 className="text-6xl font-bold mb-4">{Math.round(weatherData.current.temperature_2m)}°C</h2>
                    <p className="text-xl text-blue-100 flex items-center justify-center md:justify-start">
                      <CurrentIcon className="w-6 h-6 mr-2" /> {currentInfo?.desc}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 text-blue-100">
                    <div className="flex items-center">
                      <Droplets className="w-8 h-8 mr-3 opacity-80" />
                      <div>
                        <p className="text-sm uppercase tracking-wider opacity-80">Humidity</p>
                        <p className="text-xl font-semibold text-white">{weatherData.current.relative_humidity_2m}%</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Wind className="w-8 h-8 mr-3 opacity-80" />
                      <div>
                        <p className="text-sm uppercase tracking-wider opacity-80">Wind</p>
                        <p className="text-xl font-semibold text-white">{weatherData.current.wind_speed_10m} km/h</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Thermometer className="w-8 h-8 mr-3 opacity-80" />
                      <div>
                        <p className="text-sm uppercase tracking-wider opacity-80">Pressure</p>
                        <p className="text-xl font-semibold text-white">{weatherData.current.pressure_msl} hPa</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <CloudRain className="w-8 h-8 mr-3 opacity-80" />
                      <div>
                        <p className="text-sm uppercase tracking-wider opacity-80">Rain</p>
                        <p className="text-xl font-semibold text-white">{weatherData.current.precipitation} mm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5-Day Forecast */}
              <div className="p-8">
                <h3 className="text-xl font-bold text-stone-800 mb-6">5-Day Forecast</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {weatherData.daily.time.slice(0, 5).map((dateStr: string, index: number) => {
                    const info = getWeatherInfo(weatherData.daily.weather_code[index]);
                    const Icon = info.icon;
                    return (
                      <div key={index} className="bg-stone-50 rounded-2xl p-6 text-center border border-stone-100 hover:border-blue-200 hover:shadow-md transition-all flex flex-col items-center">
                        <p className="text-stone-500 font-medium mb-4">{index === 0 ? 'Today' : getDayName(dateStr)}</p>
                        <Icon className={`w-10 h-10 mb-4 ${info.desc.includes('Rain') || info.desc.includes('Thunderstorm') ? 'text-blue-500' : 'text-orange-500'}`} />
                        <p className="text-2xl font-bold text-stone-800 mb-1">{Math.round(weatherData.daily.temperature_2m_max[index])}°</p>
                        <p className="text-sm text-stone-500">{info.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Farming Advice based on weather */}
              <div className="bg-green-50 p-8 border-t border-green-100">
                <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                  <Leaf className="w-5 h-5 mr-2" /> Farming Advice for Today
                </h3>
                <p className="text-green-700 leading-relaxed">
                  {currentInfo?.desc.includes('Rain') || currentInfo?.desc.includes('Drizzle') 
                    ? "Rain is expected. Avoid spraying pesticides or fertilizers today. Ensure proper drainage in fields to prevent waterlogging."
                    : currentInfo?.desc.includes('Clear') || currentInfo?.desc.includes('Sunny')
                    ? "Conditions are optimal for harvesting and spraying. Soil moisture might deplete faster, so consider irrigation if planting new seedlings."
                    : "Weather is moderate. Good conditions for general farm maintenance and soil preparation."}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
