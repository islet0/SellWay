
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Ruler, User, TrendingUp, Info } from 'lucide-react';
import Layout from '../components/Layout';
import { useToast } from '../hooks/use-toast';

const SizeRecommendationsPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [measurements, setMeasurements] = useState({
    height: '',
    weight: '',
    chest: '',
    waist: '',
    hips: '',
    bodyType: ''
  });
  const [recommendations, setRecommendations] = useState<any>(null);

  const bodyTypes = [
    { value: 'pear', label: t('sizeRec.bodyTypes.pear') },
    { value: 'apple', label: t('sizeRec.bodyTypes.apple') },
    { value: 'hourglass', label: t('sizeRec.bodyTypes.hourglass') },
    { value: 'rectangle', label: t('sizeRec.bodyTypes.rectangle') },
    { value: 'inverted_triangle', label: t('sizeRec.bodyTypes.invertedTriangle') }
  ];

  const handleInputChange = (field: string, value: string) => {
    setMeasurements(prev => ({ ...prev, [field]: value }));
  };

  const generateRecommendations = () => {
    // Simple recommendation logic
    const { height, weight, chest, waist, hips, bodyType } = measurements;
    
    if (!height || !weight || !bodyType) {
      toast({
        title: t('sizeRec.incompleteForm'),
        description: t('sizeRec.fillRequired'),
        variant: 'destructive'
      });
      return;
    }

    const heightNum = parseInt(height);
    const weightNum = parseInt(weight);
    const bmi = weightNum / ((heightNum / 100) ** 2);

    let size = 'M';
    if (bmi < 18.5) size = 'S';
    else if (bmi > 25) size = 'L';
    else if (bmi > 30) size = 'XL';

    const recs = {
      generalSize: size,
      topSize: size,
      bottomSize: size,
      shoeSize: Math.round(heightNum / 6.6), // Rough estimate
      recommendations: [
        t('sizeRec.recommendations.general', { size }),
        bodyType === 'pear' ? t('sizeRec.recommendations.pear') : '',
        bodyType === 'apple' ? t('sizeRec.recommendations.apple') : '',
        t('sizeRec.recommendations.fabric')
      ].filter(Boolean)
    };

    setRecommendations(recs);
    toast({
      title: t('sizeRec.success'),
      description: t('sizeRec.successMessage')
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Ruler className="mx-auto h-12 w-12 text-primary mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('sizeRec.title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('sizeRec.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <User className="mr-2 h-6 w-6 text-primary" />
                {t('sizeRec.measurements')}
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('sizeRec.height')} (cm) *
                    </label>
                    <input
                      type="number"
                      value={measurements.height}
                      onChange={(e) => handleInputChange('height', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="170"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('sizeRec.weight')} (kg) *
                    </label>
                    <input
                      type="number"
                      value={measurements.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="65"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('sizeRec.chest')} (cm)
                    </label>
                    <input
                      type="number"
                      value={measurements.chest}
                      onChange={(e) => handleInputChange('chest', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="90"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('sizeRec.waist')} (cm)
                    </label>
                    <input
                      type="number"
                      value={measurements.waist}
                      onChange={(e) => handleInputChange('waist', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="70"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('sizeRec.hips')} (cm)
                    </label>
                    <input
                      type="number"
                      value={measurements.hips}
                      onChange={(e) => handleInputChange('hips', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="95"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('sizeRec.bodyType')} *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {bodyTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => handleInputChange('bodyType', type.value)}
                        className={`p-3 text-sm rounded-lg border-2 transition-all ${
                          measurements.bodyType === type.value
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={generateRecommendations}
                  className="w-full py-3 px-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  {t('sizeRec.generateRec')}
                </button>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <TrendingUp className="mr-2 h-6 w-6 text-primary" />
                {t('sizeRec.yourRecommendations')}
              </h2>

              {recommendations ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{recommendations.topSize}</div>
                      <div className="text-sm text-gray-600">{t('sizeRec.topSize')}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{recommendations.bottomSize}</div>
                      <div className="text-sm text-gray-600">{t('sizeRec.bottomSize')}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{recommendations.shoeSize}</div>
                      <div className="text-sm text-gray-600">{t('sizeRec.shoeSize')}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">{t('sizeRec.personalizedTips')}</h3>
                    <ul className="space-y-2">
                      {recommendations.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Info className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Ruler className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>{t('sizeRec.fillForm')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SizeRecommendationsPage;
