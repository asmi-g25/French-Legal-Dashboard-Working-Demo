import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Smartphone, CreditCard, CheckCircle, X } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  planName: string;
  amount: number;
}

const PaymentModal = ({ isOpen, onClose, onSuccess, planName, amount }: PaymentModalProps) => {
  const [step, setStep] = useState<'method' | 'details' | 'processing' | 'success' | 'error'>('method');
  const [progress, setProgress] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [phone, setPhone] = useState('');
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const processingSteps = [
    'Initialisation',
    'Envoi de la demande',
    'En attente de confirmation',
    'Traitement',
    'Succès'
  ];
  const paymentMethods = [
    { id: 'orange', name: 'Orange Money', icon: '🟠', available: true },
    { id: 'mtn', name: 'MTN Mobile Money', icon: '🟡', available: true },
    { id: 'moov', name: 'Moov Money', icon: '🔵', available: true },
    { id: 'card', name: 'Carte Bancaire', icon: '💳', available: true }
  ];
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const cardInputRef = useRef<HTMLInputElement>(null);

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    setError(null);
    setTimeout(() => setStep('details'), 200);
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (selectedMethod === 'card') {
      if (!card.number || !card.expiry || !card.cvv || !card.name) {
        setError('Veuillez remplir tous les champs de la carte.');
        return;
      }
    } else {
      if (!/^\d{8,15}$/.test(phone)) {
        setError('Numéro de téléphone invalide.');
        return;
      }
    }
    processPayment();
  };

  const processPayment = async () => {
    setStep('processing');
    setCurrentStep(0);
    setProgress(0);
    setError(null);
    // Simulate each step
    for (let i = 0; i < processingSteps.length; i++) {
      setCurrentStep(i);
      setProgress((i / (processingSteps.length - 1)) * 100);
      await new Promise(resolve => setTimeout(resolve, 900));
    }
    // Simulate success (90% success rate)
    const success = Math.random() > 0.1;
    if (success) {
      setStep('success');
      setTimeout(() => {
        onSuccess();
        resetModal();
      }, 2000);
    } else {
      setStep('error');
      setError('Le paiement a échoué. Veuillez réessayer.');
    }
  };

  const resetModal = () => {
    setStep('method');
    setProgress(0);
    setSelectedMethod('');
    setPhone('');
    setCard({ number: '', expiry: '', cvv: '', name: '' });
    setError(null);
    setCurrentStep(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Paiement - {planName}
            <Button variant="ghost" size="sm" onClick={resetModal}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        {step === 'method' && (
          <div className="space-y-4">
            <div className="text-center py-4">
              <div className="text-2xl font-bold text-green-600">{amount}€</div>
              <div className="text-sm text-gray-500">par mois</div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Choisissez votre méthode de paiement</h4>
              {paymentMethods.map((method) => (
                <Card 
                  key={method.id}
                  className={`cursor-pointer transition-colors ${
                    selectedMethod === method.id ? 'ring-2 ring-amber-500' : ''
                  }`}
                  onClick={() => handleMethodSelect(method.id)}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{method.icon}</span>
                      <span className="font-medium">{method.name}</span>
                    </div>
                    {method.id === 'card' && <CreditCard className="h-5 w-5 text-gray-400" />}
                    {method.id !== 'card' && <Smartphone className="h-5 w-5 text-gray-400" />}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 'details' && (
          <form className="space-y-4" onSubmit={handleDetailsSubmit}>
            {selectedMethod === 'card' ? (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Numéro de carte</label>
                  <input
                    ref={cardInputRef}
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    maxLength={19}
                    placeholder="1234 5678 9012 3456"
                    value={card.number}
                    onChange={e => setCard({ ...card, number: e.target.value.replace(/[^\d ]/g, '') })}
                    disabled={step === 'processing'}
                  />
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium">Expiration</label>
                    <input
                      type="text"
                      className="w-full border rounded px-3 py-2"
                      maxLength={5}
                      placeholder="MM/AA"
                      value={card.expiry}
                      onChange={e => setCard({ ...card, expiry: e.target.value.replace(/[^\d/]/g, '') })}
                      disabled={step === 'processing'}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium">CVV</label>
                    <input
                      type="password"
                      className="w-full border rounded px-3 py-2"
                      maxLength={4}
                      placeholder="123"
                      value={card.cvv}
                      onChange={e => setCard({ ...card, cvv: e.target.value.replace(/[^\d]/g, '') })}
                      disabled={step === 'processing'}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Nom sur la carte</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    placeholder="Nom complet"
                    value={card.name}
                    onChange={e => setCard({ ...card, name: e.target.value })}
                    disabled={step === 'processing'}
                  />
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <label className="block text-sm font-medium">Numéro de téléphone Mobile Money</label>
                <input
                  ref={phoneInputRef}
                  type="tel"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Ex: 0700000000"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/[^\d]/g, ''))}
                  maxLength={15}
                  disabled={step === 'processing'}
                />
              </div>
            )}
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button className="w-full" type="submit" disabled={step === 'processing'}>
              Payer {amount}€
            </Button>
            <Button className="w-full" variant="ghost" type="button" onClick={resetModal}>
              Annuler
            </Button>
          </form>
        )}

        {step === 'processing' && (
          <div className="text-center py-8 space-y-4">
            <div className="flex justify-center mb-2">
              {selectedMethod === 'card' ? (
                <CreditCard className="h-12 w-12 text-blue-500 animate-pulse" />
              ) : (
                <Smartphone className="h-12 w-12 text-amber-500 animate-bounce" />
              )}
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-full flex justify-between text-xs font-medium mb-2">
                {processingSteps.map((label, idx) => (
                  <span key={label} className={
                    idx === currentStep
                      ? 'text-amber-600'
                      : idx < currentStep
                        ? 'text-green-600'
                        : 'text-gray-400'
                  }>
                    {label}
                  </span>
                ))}
              </div>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-500">{processingSteps[currentStep]}</p>
              <p className="text-xs text-gray-400">{progress.toFixed(0)}% complété</p>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-8 space-y-4">
            <CheckCircle className="h-16 w-16 mx-auto text-green-500" />
            <div>
              <h3 className="font-semibold text-lg text-green-600">Paiement réussi!</h3>
              <p className="text-gray-600">Votre abonnement {planName} est maintenant actif</p>
            </div>
          </div>
        )}

        {step === 'error' && (
          <div className="text-center py-8 space-y-4">
            <X className="h-16 w-16 mx-auto text-red-500" />
            <div>
              <h3 className="font-semibold text-lg text-red-600">Échec du paiement</h3>
              <p className="text-gray-600">{error}</p>
            </div>
            <Button className="w-full" onClick={() => setStep('details')}>Réessayer</Button>
            <Button className="w-full" variant="ghost" onClick={resetModal}>Annuler</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
