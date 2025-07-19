
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';
import { useToast } from '../hooks/use-toast';

const StyleQuizPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: 'lifestyle',
      question: t('styleQuiz.lifestyle.question'),
      options: [
        { value: 'professional', label: t('styleQuiz.lifestyle.professional') },
        { value: 'casual', label: t('styleQuiz.lifestyle.casual') },
        { value: 'active', label: t('styleQuiz.lifestyle.active') },
        { value: 'social', label: t('styleQuiz.lifestyle.social') }
      ]
    },
    {
      id: 'colors',
      question: t('styleQuiz.colors.question'),
      options: [
        { value: 'neutral', label: t('styleQuiz.colors.neutral') },
        { value: 'bold', label: t('styleQuiz.colors.bold') },
        { value: 'pastels', label: t('styleQuiz.colors.pastels') },
        { value: 'dark', label: t('styleQuiz.colors.dark') }
      ]
    },
    {
      id: 'fit',
      question: t('styleQuiz.fit.question'),
      options: [
        { value: 'fitted', label: t('styleQuiz.fit.fitted') },
        { value: 'relaxed', label: t('styleQuiz.fit.relaxed') },
        { value: 'oversized', label: t('styleQuiz.fit.oversized') },
        { value: 'mixed', label: t('styleQuiz.fit.mixed') }
      ]
    },
    {
      id: 'budget',
      question: t('styleQuiz.budget.question'),
      options: [
        { value: 'under50', label: t('styleQuiz.budget.under50') },
        { value: '50to100', label: t('styleQuiz.budget.50to100') },
        { value: '100to200', label: t('styleQuiz.budget.100to200') },
        { value: 'over200', label: t('styleQuiz.budget.over200') }
      ]
    },
    {
      id: 'occasions',
      question: t('styleQuiz.occasions.question'),
      options: [
        { value: 'work', label: t('styleQuiz.occasions.work') },
        { value: 'weekend', label: t('styleQuiz.occasions.weekend') },
        { value: 'evening', label: t('styleQuiz.occasions.evening') },
        { value: 'special', label: t('styleQuiz.occasions.special') }
      ]
    }
  ];

  const handleAnswerSelect = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Complete quiz
      const styleProfile = determineStyleProfile(answers);
      toast({
        title: t('styleQuiz.complete'),
        description: t('styleQuiz.completeMessage', { style: styleProfile })
      });
      navigate('/style-recommendations', { state: { styleProfile, answers } });
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const determineStyleProfile = (answers: Record<string, string>) => {
    // Simple logic to determine style profile
    if (answers.lifestyle === 'professional' && answers.fit === 'fitted') {
      return t('styleQuiz.profiles.classic');
    } else if (answers.colors === 'bold' && answers.fit === 'oversized') {
      return t('styleQuiz.profiles.trendy');
    } else if (answers.lifestyle === 'casual' && answers.colors === 'neutral') {
      return t('styleQuiz.profiles.minimal');
    } else if (answers.lifestyle === 'active') {
      return t('styleQuiz.profiles.sporty');
    } else {
      return t('styleQuiz.profiles.eclectic');
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const hasAnswer = answers[currentQ.id];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('styleQuiz.title')}
            </h1>
            <p className="text-gray-600">
              {t('styleQuiz.description')}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{t('styleQuiz.question')} {currentQuestion + 1} {t('styleQuiz.of')} {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {currentQ.question}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswerSelect(option.value)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    answers[currentQ.id] === option.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('styleQuiz.back')}
            </button>

            <button
              onClick={handleNext}
              disabled={!hasAnswer}
              className="flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {currentQuestion === questions.length - 1 ? t('styleQuiz.finish') : t('styleQuiz.next')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StyleQuizPage;
