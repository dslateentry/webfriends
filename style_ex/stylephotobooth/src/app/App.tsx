import { useState } from 'react';
import EntranceScreen from './components/EntranceScreen';
import UploadScreen from './components/UploadScreen';
import CustomizationScreen from './components/CustomizationScreen';
import FinalScreen from './components/FinalScreen';
import imgBackground from 'figma:asset/aeeb52841d7ad4fc94c74c18e722924c7fe1fc34.png';

type Screen = 'entrance' | 'upload' | 'customize' | 'final';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('entrance');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [finalPhotoUrl, setFinalPhotoUrl] = useState<string | null>(null);

  const handleStart = () => {
    setCurrentScreen('upload');
  };

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setUploadedImages([]);
    setCurrentScreen('customize');
  };

  const handleMultipleImagesUpload = (imageUrls: string[]) => {
    setUploadedImages(imageUrls);
    setUploadedImage(imageUrls[0]);
    setCurrentScreen('customize');
  };

  const handleFinalize = (photoUrl: string) => {
    setFinalPhotoUrl(photoUrl);
    setCurrentScreen('final');
  };

  const handleRestart = () => {
    setCurrentScreen('entrance');
    setUploadedImage(null);
    setFinalPhotoUrl(null);
  };

  const handleBack = () => {
    if (currentScreen === 'upload') {
      setCurrentScreen('entrance');
    } else if (currentScreen === 'customize') {
      setCurrentScreen('upload');
    } else if (currentScreen === 'final') {
      setCurrentScreen('customize');
    }
  };

  return (
    <div className="min-h-screen relative">
      {currentScreen !== 'entrance' && (
        <div className="fixed inset-0 z-0">
          <img 
            src={imgBackground}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="relative z-10">
        {currentScreen === 'entrance' && <EntranceScreen onStart={handleStart} />}
        {currentScreen === 'upload' && (
          <UploadScreen 
            onImageUpload={handleImageUpload} 
            onMultipleImagesUpload={handleMultipleImagesUpload} 
            onBack={handleBack} 
          />
        )}
        {currentScreen === 'customize' && uploadedImage && (
          <CustomizationScreen 
            imageUrl={uploadedImage}
            imageUrls={uploadedImages.length > 0 ? uploadedImages : undefined}
            onFinalize={handleFinalize} 
            onBack={handleBack} 
          />
        )}
        {currentScreen === 'final' && finalPhotoUrl && (
          <FinalScreen 
            photoUrl={finalPhotoUrl} 
            onRestart={handleRestart} 
            onBack={handleBack} 
          />
        )}
      </div>
    </div>
  );
}