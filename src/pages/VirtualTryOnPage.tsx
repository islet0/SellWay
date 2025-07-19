
import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera, Upload, Download, RotateCcw, Palette, Shirt, CreditCard, MapPin } from 'lucide-react';
import Layout from '../components/Layout';
import { useToast } from '../hooks/use-toast';

const VirtualTryOnPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [skinTone, setSkinTone] = useState<string>('#F5DEB3');
  const [selectedClothing, setSelectedClothing] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('blue');
  const [showCheckout, setShowCheckout] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const skinTones = [
    { name: 'Fair', color: '#F5DEB3', description: t('virtualTryOn.fairSkin') },
    { name: 'Light', color: '#DDB99F', description: t('virtualTryOn.lightSkin') },
    { name: 'Medium', color: '#C08B5C', description: t('virtualTryOn.mediumSkin') },
    { name: 'Olive', color: '#A67B5B', description: t('virtualTryOn.oliveSkin') },
    { name: 'Dark', color: '#8B4513', description: t('virtualTryOn.darkSkin') },
    { name: 'Deep', color: '#654321', description: t('virtualTryOn.deepSkin') }
  ];

  const clothingItems = [
    { 
      id: 1, 
      name: t('virtualTryOn.redShirt'), 
      image: '/placeholder.svg', 
      type: 'shirt',
      price: 29.99,
      colors: ['red', 'blue', 'black', 'white'],
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    { 
      id: 2, 
      name: t('virtualTryOn.blueJacket'), 
      image: '/placeholder.svg', 
      type: 'jacket',
      price: 89.99,
      colors: ['blue', 'black', 'navy', 'gray'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    { 
      id: 3, 
      name: t('virtualTryOn.greenDress'), 
      image: '/placeholder.svg', 
      type: 'dress',
      price: 59.99,
      colors: ['green', 'black', 'red', 'blue'],
      sizes: ['XS', 'S', 'M', 'L']
    },
    { 
      id: 4, 
      name: t('virtualTryOn.blackSuit'), 
      image: '/placeholder.svg', 
      type: 'suit',
      price: 199.99,
      colors: ['black', 'navy', 'charcoal', 'brown'],
      sizes: ['38', '40', '42', '44', '46']
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      toast({
        title: t('virtualTryOn.cameraError'),
        description: t('virtualTryOn.cameraErrorMessage'),
        variant: 'destructive'
      });
    }
  }, [toast, t]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setSelectedImage(imageDataUrl);
        stopCamera();
      }
    }
  }, [stopCamera]);

  const processVirtualTryOn = async () => {
    if (!selectedImage || !selectedClothing) {
      toast({
        title: t('virtualTryOn.missingRequirements'),
        description: t('virtualTryOn.selectImageAndClothing'),
        variant: 'destructive'
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast({
      title: t('virtualTryOn.processComplete'),
      description: t('virtualTryOn.processCompleteMessage')
    });
    
    setIsProcessing(false);
    setShowCheckout(true);
  };

  const handlePurchase = () => {
    const selectedItem = clothingItems.find(item => item.id.toString() === selectedClothing);
    if (selectedItem) {
      toast({
        title: t('virtualTryOn.addedToCart'),
        description: `${selectedItem.name} - ${selectedSize} - ${selectedColor}`
      });
      setShowCheckout(false);
    }
  };

  const downloadResult = () => {
    if (selectedImage) {
      const link = document.createElement('a');
      link.href = selectedImage;
      link.download = `virtual-try-on-${Date.now()}.jpg`;
      link.click();
    }
  };

  const resetAll = () => {
    setSelectedImage(null);
    setSelectedClothing(null);
    setSkinTone('#F5DEB3');
    setSelectedSize('M');
    setSelectedColor('blue');
    setShowCheckout(false);
    stopCamera();
  };

  const selectedItem = clothingItems.find(item => item.id.toString() === selectedClothing);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Header Section */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {t('virtualTryOn.title')}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('virtualTryOn.description')}
              </p>
              <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                {t('virtualTryOn.location')}: {t('virtualTryOn.tashkent')}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Try-On Area */}
            <div className="xl:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-semibold flex items-center">
                    <Camera className="mr-3 h-6 w-6 text-primary" />
                    {t('virtualTryOn.yourPhoto')}
                  </h2>
                </div>

                {/* Image Display Area */}
                <div className="p-6">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-6 flex items-center justify-center overflow-hidden relative">
                    {selectedImage ? (
                      <>
                        <img 
                          src={selectedImage} 
                          alt="User" 
                          className="w-full h-full object-cover"
                        />
                        {selectedItem && showCheckout && (
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className="bg-white/90 rounded-lg p-4 text-center">
                              <Shirt className="mx-auto h-8 w-8 text-primary mb-2" />
                              <p className="font-medium">{t('virtualTryOn.trying')} {selectedItem.name}</p>
                              <p className="text-sm text-gray-600">{selectedSize} - {selectedColor}</p>
                            </div>
                          </div>
                        )}
                      </>
                    ) : stream ? (
                      <video 
                        ref={videoRef}
                        autoPlay 
                        playsInline
                        className="w-full h-full object-cover transform scale-x-[-1]"
                      />
                    ) : (
                      <div className="text-center text-gray-500">
                        <Camera className="mx-auto h-16 w-16 mb-4 text-gray-400" />
                        <p className="text-lg font-medium">{t('virtualTryOn.noImageSelected')}</p>
                        <p className="text-sm">{t('virtualTryOn.uploadOrCapture')}</p>
                      </div>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="flex flex-wrap gap-3 justify-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      ref={fileInputRef}
                      className="hidden"
                    />
                    
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all shadow-md"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {t('virtualTryOn.uploadImage')}
                    </button>

                    {!stream ? (
                      <button
                        onClick={startCamera}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md"
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        {t('virtualTryOn.startCamera')}
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={capturePhoto}
                          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
                        >
                          <Camera className="mr-2 h-4 w-4" />
                          {t('virtualTryOn.capturePhoto')}
                        </button>
                        <button
                          onClick={stopCamera}
                          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-md"
                        >
                          {t('virtualTryOn.stopCamera')}
                        </button>
                      </>
                    )}

                    <button
                      onClick={resetAll}
                      className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all shadow-md"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      {t('virtualTryOn.reset')}
                    </button>
                  </div>
                </div>

                <canvas ref={canvasRef} className="hidden" />
              </div>
            </div>

            {/* Controls Sidebar */}
            <div className="space-y-6">
              {/* Skin Tone Selection */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Palette className="mr-2 h-5 w-5 text-primary" />
                  {t('virtualTryOn.skinTone')}
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {skinTones.map((tone) => (
                    <button
                      key={tone.name}
                      onClick={() => setSkinTone(tone.color)}
                      className={`flex items-center p-3 rounded-lg border-2 transition-all ${
                        skinTone === tone.color 
                          ? 'border-primary bg-primary/10 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div 
                        className="w-6 h-6 rounded-full mr-3 border-2 border-white shadow-sm"
                        style={{ backgroundColor: tone.color }}
                      />
                      <div className="text-left">
                        <div className="font-medium text-sm">{tone.name}</div>
                        <div className="text-xs text-gray-500">{tone.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Clothing Selection */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Shirt className="mr-2 h-5 w-5 text-primary" />
                  {t('virtualTryOn.selectClothing')}
                </h3>
                
                <div className="space-y-3">
                  {clothingItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedClothing(item.id.toString())}
                      className={`w-full flex items-center p-4 rounded-lg border-2 transition-all ${
                        selectedClothing === item.id.toString()
                          ? 'border-primary bg-primary/10 shadow-md'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover mr-4"
                      />
                      <div className="text-left flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500 capitalize">{item.type}</div>
                        <div className="text-lg font-bold text-primary">${item.price}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size & Color Selection */}
              {selectedItem && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {t('virtualTryOn.customization')}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('virtualTryOn.size')}
                      </label>
                      <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {selectedItem.sizes.map((size) => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('virtualTryOn.color')}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-3 py-1 rounded-full text-sm capitalize transition-all ${
                              selectedColor === color
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={processVirtualTryOn}
                  disabled={isProcessing || !selectedImage || !selectedClothing}
                  className="w-full py-3 px-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {t('virtualTryOn.processing')}
                    </div>
                  ) : (
                    t('virtualTryOn.tryOn')
                  )}
                </button>

                {showCheckout && selectedItem && (
                  <button
                    onClick={handlePurchase}
                    className="w-full py-3 px-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all shadow-lg flex items-center justify-center"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    {t('virtualTryOn.addToCart')} - ${selectedItem.price}
                  </button>
                )}

                {selectedImage && (
                  <button
                    onClick={downloadResult}
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {t('virtualTryOn.downloadResult')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VirtualTryOnPage;
