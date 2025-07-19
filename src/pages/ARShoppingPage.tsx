
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera, Smartphone, Box, Eye, Download, RotateCcw } from 'lucide-react';
import Layout from '../components/Layout';
import { useToast } from '../hooks/use-toast';

const ARShoppingPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isARActive, setIsARActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const arProducts = [
    {
      id: 1,
      name: t('ar.products.sunglasses'),
      category: 'accessories',
      price: '$159',
      image: '/placeholder.svg',
      arModel: 'sunglasses-model.glb'
    },
    {
      id: 2,
      name: t('ar.products.watch'),
      category: 'accessories',
      price: '$299',
      image: '/placeholder.svg',
      arModel: 'watch-model.glb'
    },
    {
      id: 3,
      name: t('ar.products.hat'),
      category: 'accessories',
      price: '$89',
      image: '/placeholder.svg',
      arModel: 'hat-model.glb'
    },
    {
      id: 4,
      name: t('ar.products.necklace'),
      category: 'jewelry',
      price: '$199',
      image: '/placeholder.svg',
      arModel: 'necklace-model.glb'
    }
  ];

  const startARSession = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsARActive(true);
        toast({
          title: t('ar.sessionStarted'),
          description: t('ar.sessionStartedDesc')
        });
      }
    } catch (error) {
      toast({
        title: t('ar.error'),
        description: t('ar.cameraPermissionError'),
        variant: 'destructive'
      });
    }
  };

  const stopARSession = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsARActive(false);
    setSelectedProduct(null);
  };

  const tryOnProduct = (product: any) => {
    setSelectedProduct(product);
    if (!isARActive) {
      startARSession();
    }
    toast({
      title: t('ar.tryingOn'),
      description: t('ar.tryingOnDesc', { product: product.name })
    });
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        
        // Download the image
        const link = document.createElement('a');
        link.download = `ar-try-on-${Date.now()}.jpg`;
        link.href = canvas.toDataURL();
        link.click();
        
        toast({
          title: t('ar.photoSaved'),
          description: t('ar.photoSavedDesc')
        });
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Box className="mx-auto h-12 w-12 text-primary mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('ar.title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('ar.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* AR View */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="aspect-video bg-gray-900 relative">
                  {isARActive ? (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover transform scale-x-[-1]"
                      />
                      
                      {/* AR Overlay */}
                      {selectedProduct && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/20 rounded-lg p-4 text-white">
                            <div className="text-center">
                              <Box className="mx-auto h-8 w-8 mb-2" />
                              <p className="text-sm">
                                {t('ar.tryingOn')}: {selectedProduct.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* AR Controls */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                        <button
                          onClick={capturePhoto}
                          className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors"
                          title={t('ar.capturePhoto')}
                        >
                          <Camera className="h-6 w-6 text-gray-900" />
                        </button>
                        <button
                          onClick={stopARSession}
                          className="bg-red-500/90 backdrop-blur-sm p-3 rounded-full hover:bg-red-600 transition-colors text-white"
                          title={t('ar.stopSession')}
                        >
                          <RotateCcw className="h-6 w-6" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full text-white">
                      <div className="text-center">
                        <Smartphone className="mx-auto h-16 w-16 mb-4 opacity-50" />
                        <h3 className="text-xl font-semibold mb-2">{t('ar.startSession')}</h3>
                        <p className="text-gray-300 mb-6">{t('ar.selectProduct')}</p>
                        <button
                          onClick={startARSession}
                          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          <Camera className="inline mr-2 h-5 w-5" />
                          {t('ar.enableCamera')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Instructions */}
                <div className="p-6 bg-gray-50">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {t('ar.howToUse')}
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                    <li>{t('ar.step1')}</li>
                    <li>{t('ar.step2')}</li>
                    <li>{t('ar.step3')}</li>
                    <li>{t('ar.step4')}</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Product Selection */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <Eye className="mr-2 h-6 w-6 text-primary" />
                  {t('ar.tryOnProducts')}
                </h2>

                <div className="space-y-4">
                  {arProducts.map((product) => (
                    <div 
                      key={product.id}
                      className={`border-2 rounded-lg p-4 transition-all cursor-pointer ${
                        selectedProduct?.id === product.id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => tryOnProduct(product)}
                    >
                      <div className="flex items-center space-x-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                          <p className="text-lg font-semibold text-primary">{product.price}</p>
                        </div>
                      </div>
                      
                      {selectedProduct?.id === product.id && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="flex items-center text-sm text-primary">
                            <Eye className="mr-1 h-4 w-4" />
                            {t('ar.currentlyTrying')}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* AR Features */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  {t('ar.features')}
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {t('ar.featureRealtime')}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {t('ar.featureAccurate')}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {t('ar.featureCapture')}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {t('ar.featureShare')}
                  </li>
                </ul>
              </div>

              {/* Device Requirements */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-medium text-yellow-800 mb-2">
                  {t('ar.requirements')}
                </h4>
                <p className="text-sm text-yellow-700">
                  {t('ar.requirementsDesc')}
                </p>
              </div>
            </div>
          </div>

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </Layout>
  );
};

export default ARShoppingPage;
