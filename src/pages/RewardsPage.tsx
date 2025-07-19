
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Gift, Star, Trophy, Crown, Zap, Users } from 'lucide-react';
import Layout from '../components/Layout';
import { useApp } from '../contexts/AppContext';

const RewardsPage = () => {
  const { t } = useTranslation();
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user rewards data
  const userRewards = {
    points: 1250,
    tier: 'silver',
    nextTierPoints: 2000,
    lifetimeSpent: 450.00,
    referrals: 3
  };

  const tiers = [
    { name: 'Bronze', min: 0, color: 'text-amber-600', icon: Star },
    { name: 'Silver', min: 1000, color: 'text-gray-500', icon: Trophy },
    { name: 'Gold', min: 2000, color: 'text-yellow-500', icon: Crown },
    { name: 'Platinum', min: 5000, color: 'text-purple-600', icon: Zap }
  ];

  const rewards = [
    { points: 100, reward: t('rewards.items.discount5'), type: 'discount' },
    { points: 250, reward: t('rewards.items.freeShipping'), type: 'shipping' },
    { points: 500, reward: t('rewards.items.discount10'), type: 'discount' },
    { points: 1000, reward: t('rewards.items.exclusiveAccess'), type: 'access' },
    { points: 1500, reward: t('rewards.items.discount20'), type: 'discount' },
    { points: 2000, reward: t('rewards.items.personalStylist'), type: 'service' }
  ];

  const activities = [
    { action: t('rewards.activities.purchase'), points: '+50', date: '2024-01-15' },
    { action: t('rewards.activities.review'), points: '+10', date: '2024-01-14' },
    { action: t('rewards.activities.referral'), points: '+100', date: '2024-01-12' },
    { action: t('rewards.activities.socialShare'), points: '+5', date: '2024-01-10' }
  ];

  const getCurrentTier = () => {
    return tiers.find(tier => 
      userRewards.points >= tier.min && 
      userRewards.points < (tiers[tiers.indexOf(tier) + 1]?.min || Infinity)
    ) || tiers[0];
  };

  const getProgressToNextTier = () => {
    const currentTierIndex = tiers.indexOf(getCurrentTier());
    if (currentTierIndex === tiers.length - 1) return 100;
    
    const nextTier = tiers[currentTierIndex + 1];
    const currentTier = tiers[currentTierIndex];
    const progress = ((userRewards.points - currentTier.min) / (nextTier.min - currentTier.min)) * 100;
    return Math.min(progress, 100);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Gift className="mx-auto h-12 w-12 text-primary mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('rewards.title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('rewards.description')}
            </p>
          </div>

          {/* User Status Overview */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{userRewards.points}</div>
                <div className="text-sm text-gray-600">{t('rewards.currentPoints')}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  {React.createElement(getCurrentTier().icon, { 
                    className: `h-8 w-8 ${getCurrentTier().color}` 
                  })}
                </div>
                <div className="text-sm text-gray-600">{getCurrentTier().name} {t('rewards.member')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">${userRewards.lifetimeSpent}</div>
                <div className="text-sm text-gray-600">{t('rewards.lifetimeSpent')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{userRewards.referrals}</div>
                <div className="text-sm text-gray-600">{t('rewards.referrals')}</div>
              </div>
            </div>

            {/* Progress to Next Tier */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">{t('rewards.progressToNext')}</span>
                <span className="text-sm text-gray-500">
                  {userRewards.points} / {userRewards.nextTierPoints}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-primary to-purple-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressToNextTier()}%` }}
                />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'overview', label: t('rewards.tabs.overview') },
                  { id: 'redeem', label: t('rewards.tabs.redeem') },
                  { id: 'earn', label: t('rewards.tabs.earn') },
                  { id: 'history', label: t('rewards.tabs.history') }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">{t('rewards.membershipTiers')}</h3>
                <div className="space-y-4">
                  {tiers.map((tier) => (
                    <div key={tier.name} className="flex items-center p-4 border rounded-lg">
                      {React.createElement(tier.icon, { 
                        className: `h-6 w-6 ${tier.color} mr-3` 
                      })}
                      <div>
                        <div className="font-medium">{tier.name}</div>
                        <div className="text-sm text-gray-600">{tier.min}+ {t('rewards.points')}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">{t('rewards.quickRewards')}</h3>
                <div className="space-y-3">
                  {rewards.slice(0, 4).map((reward, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">{reward.reward}</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-primary mr-2">{reward.points} pts</span>
                        <button 
                          disabled={userRewards.points < reward.points}
                          className="px-3 py-1 bg-primary text-white text-xs rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          {t('rewards.redeem')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'redeem' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6">{t('rewards.availableRewards')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 text-center">
                    <div className="text-2xl font-bold text-primary mb-2">{reward.points}</div>
                    <div className="text-sm text-gray-600 mb-4">{t('rewards.points')}</div>
                    <div className="font-medium mb-4">{reward.reward}</div>
                    <button 
                      disabled={userRewards.points < reward.points}
                      className="w-full py-2 px-4 bg-primary text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                    >
                      {userRewards.points >= reward.points ? t('rewards.redeem') : t('rewards.notEnoughPoints')}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'earn' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6">{t('rewards.earnMore')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-green-600 font-semibold">$1</span>
                    </div>
                    <div>
                      <div className="font-medium">{t('rewards.earnPoints.purchase')}</div>
                      <div className="text-sm text-gray-600">{t('rewards.earnPoints.purchaseDesc')}</div>
                    </div>
                  </div>
                  <div className="flex items-center p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Star className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">{t('rewards.earnPoints.review')}</div>
                      <div className="text-sm text-gray-600">{t('rewards.earnPoints.reviewDesc')}</div>
                    </div>
                  </div>
                  <div className="flex items-center p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">{t('rewards.earnPoints.referral')}</div>
                      <div className="text-sm text-gray-600">{t('rewards.earnPoints.referralDesc')}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/10 to-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4">{t('rewards.memberBenefits')}</h4>
                  <ul className="space-y-2 text-sm">
                    <li>✓ {t('rewards.benefits.exclusiveDeals')}</li>
                    <li>✓ {t('rewards.benefits.earlyAccess')}</li>
                    <li>✓ {t('rewards.benefits.freeShipping')}</li>
                    <li>✓ {t('rewards.benefits.birthdayBonus')}</li>
                    <li>✓ {t('rewards.benefits.personalStylist')}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6">{t('rewards.recentActivity')}</h3>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border-b border-gray-100">
                    <div>
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-gray-600">{activity.date}</div>
                    </div>
                    <div className="text-green-600 font-semibold">{activity.points}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RewardsPage;
