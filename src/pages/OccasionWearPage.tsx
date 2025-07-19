
// import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { Calendar, MapPin, Thermometer, Users } from 'lucide-react';
// import Layout from '../components/Layout';

// const OccasionWearPage = () => {
//   const { t } = useTranslation();
//   const [selectedFilters, setSelectedFilters] = useState({
//     occasion: '',
//     season: '',
//     weather: '',
//     formality: ''
//   });

//   const occasions = [
//     { value: 'wedding', label: t('occasion.types.wedding'), icon: '💒' },
//     { value: 'work', label: t('occasion.types.work'), icon: '💼' },
//     { value: 'party', label: t('occasion.types.party'), icon: '🎉' },
//     { value: 'date', label: t('occasion.types.date'), icon: '💕' },
//     { value: 'casual', label: t('occasion.types.casual'), icon: '👕' },
//     { value: 'sports', label: t('occasion.types.sports'), icon: '🏃‍♀️' },
//     { value: 'travel', label: t('occasion.types.travel'), icon: '✈️' },
//     { value: 'formal', label: t('occasion.types.formal'), icon: '🤵' }
//   ];

//   const seasons = [
//     { value: 'spring', label: t('occasion.seasons.spring'), icon: '🌸' },
//     { value: 'summer', label: t('occasion.seasons.summer'), icon: '☀️' },
//     { value: 'autumn', label: t('occasion.seasons.autumn'), icon: '🍂' },
//     { value: 'winter', label: t('occasion.seasons.winter'), icon: '❄️' }
//   ];

//   const weather = [
//     { value: 'hot', label: t('occasion.weather.hot'), temp: '25°C+' },
//     { value: 'warm', label: t('occasion.weather.warm'), temp: '15-25°C' },
//     { value: 'cool', label: t('occasion.weather.cool'), temp: '5-15°C' },
//     { value: 'cold', label: t('occasion.weather.cold'), temp: '< 5°C' },
//     { value: 'rainy', label: t('occasion.weather.rainy'), temp: '🌧️' }
//   ];

//   const formality = [
//     { value: 'very_casual', label: t('occasion.formality.veryCasual') },
//     { value: 'casual', label: t('occasion.formality.casual') },
//     { value: 'smart_casual', label: t('occasion.formality.smartCasual') },
//     { value: 'formal', label: t('occasion.formality.formal') },
//     { value: 'black_tie', label: t('occasion.formality.blackTie') }
//   ];

//   const handleFilterChange = (category: string, value: string) => {
//     setSelectedFilters(prev => ({
//       ...prev,
//       [category]: prev[category] === value ? '' : value
//     }));
//   };

//   // Mock outfit recommendations based on filters
//   const getRecommendations = () => {
//     const { occasion, season, weather, formality } = selectedFilters;
    
//     if (occasion === 'wedding' && formality === 'formal') {
//       return [
//         { name: t('occasion.outfits.weddingFormal1'), image: '/placeholder.svg', price: '$299' },
//         { name: t('occasion.outfits.weddingFormal2'), image: '/placeholder.svg', price: '$199' }
//       ];
//     } else if (occasion === 'work') {
//       return [
//         { name: t('occasion.outfits.work1'), image: '/placeholder.svg', price: '$149' },
//         { name: t('occasion.outfits.work2'), image: '/placeholder.svg', price: '$129' }
//       ];
//     } else if (season === 'summer' && weather === 'hot') {
//       return [
//         { name: t('occasion.outfits.summer1'), image: '/placeholder.svg', price: '$79' },
//         { name: t('occasion.outfits.summer2'), image: '/placeholder.svg', price: '$89' }
//       ];
//     }
    
//     return [
//       { name: t('occasion.outfits.general1'), image: '/placeholder.svg', price: '$99' },
//       { name: t('occasion.outfits.general2'), image: '/placeholder.svg', price: '$119' }
//     ];
//   };

//   const recommendations = getRecommendations();

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <Calendar className="mx-auto h-12 w-12 text-primary mb-4" />
//             <h1 className="text-4xl font-bold text-gray-900 mb-4">
//               {t('occasion.title')}
//             </h1>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               {t('occasion.description')}
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//             {/* Filters */}
//             <div className="lg:col-span-1 space-y-6">
//               {/* Occasion */}
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <h3 className="text-lg font-semibold mb-4 flex items-center">
//                   <Calendar className="mr-2 h-5 w-5 text-primary" />
//                   {t('occasion.selectOccasion')}
//                 </h3>
//                 <div className="space-y-2">
//                   {occasions.map((occ) => (
//                     <button
//                       key={occ.value}
//                       onClick={() => handleFilterChange('occasion', occ.value)}
//                       className={`w-full flex items-center p-3 rounded-lg border transition-all ${
//                         selectedFilters.occasion === occ.value
//                           ? 'border-primary bg-primary/10 text-primary'
//                           : 'border-gray-200 hover:border-gray-300'
//                       }`}
//                     >
//                       <span className="mr-3 text-lg">{occ.icon}</span>
//                       <span className="text-sm">{occ.label}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Season */}
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <h3 className="text-lg font-semibold mb-4">
//                   {t('occasion.selectSeason')}
//                 </h3>
//                 <div className="grid grid-cols-2 gap-2">
//                   {seasons.map((season) => (
//                     <button
//                       key={season.value}
//                       onClick={() => handleFilterChange('season', season.value)}
//                       className={`flex flex-col items-center p-3 rounded-lg border transition-all ${
//                         selectedFilters.season === season.value
//                           ? 'border-primary bg-primary/10 text-primary'
//                           : 'border-gray-200 hover:border-gray-300'
//                       }`}
//                     >
//                       <span className="text-2xl mb-1">{season.icon}</span>
//                       <span className="text-xs">{season.label}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Weather */}
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <h3 className="text-lg font-semibold mb-4 flex items-center">
//                   <Thermometer className="mr-2 h-5 w-5 text-primary" />
//                   {t('occasion.selectWeather')}
//                 </h3>
//                 <div className="space-y-2">
//                   {weather.map((w) => (
//                     <button
//                       key={w.value}
//                       onClick={() => handleFilterChange('weather', w.value)}
//                       className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
//                         selectedFilters.weather === w.value
//                           ? 'border-primary bg-primary/10 text-primary'
//                           : 'border-gray-200 hover:border-gray-300'
//                       }`}
//                     >
//                       <span className="text-sm">{w.label}</span>
//                       <span className="text-xs text-gray-500">{w.temp}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Formality */}
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <h3 className="text-lg font-semibold mb-4 flex items-center">
//                   <Users className="mr-2 h-5 w-5 text-primary" />
//                   {t('occasion.selectFormality')}
//                 </h3>
//                 <div className="space-y-2">
//                   {formality.map((f) => (
//                     <button
//                       key={f.value}
//                       onClick={() => handleFilterChange('formality', f.value)}
//                       className={`w-full p-3 text-left rounded-lg border transition-all ${
//                         selectedFilters.formality === f.value
//                           ? 'border-primary bg-primary/10 text-primary'
//                           : 'border-gray-200 hover:border-gray-300'
//                       }`}
//                     >
//                       <span className="text-sm">{f.label}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Recommendations */}
//             <div className="lg:col-span-3">
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <h2 className="text-2xl font-semibold mb-6">
//                   {t('occasion.recommendations')}
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                   {recommendations.map((outfit, index) => (
//                     <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
//                       <img 
//                         src={outfit.image} 
//                         alt={outfit.name}
//                         className="w-full h-64 object-cover"
//                       />
//                       <div className="p-4">
//                         <h3 className="font-semibold text-gray-900 mb-2">{outfit.name}</h3>
//                         <div className="flex items-center justify-between">
//                           <span className="text-lg font-bold text-primary">{outfit.price}</span>
//                           <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
//                             {t('occasion.addToCart')}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {Object.values(selectedFilters).every(v => !v) && (
//                   <div className="text-center py-12 text-gray-500">
//                     <Calendar className="mx-auto h-12 w-12 mb-4 opacity-50" />
//                     <p>{t('occasion.selectFilters')}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Location Info */}
//           <div className="mt-12 text-center">
//             <div className="flex items-center justify-center text-gray-600">
//               <MapPin className="h-4 w-4 mr-2" />
//               <span className="text-sm">
//                 📍 {t('occasion.location')}: {t('occasion.tashkent')} | {t('occasion.homeDelivery')}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default OccasionWearPage;
