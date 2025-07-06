import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PaymentModal from '@/components/PaymentModal';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import { Check, Crown, Zap, Building, Calendar, Users, FileText, ArrowUp, ArrowDown } from 'lucide-react';

const Subscription = () => {
  const { user, upgradePlan } = useAuth();
  const { sendNotification } = useNotifications();
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    planId: string;
    planName: string;
    price: number;
  }>({
    isOpen: false,
    planId: '',
    planName: '',
    price: 0
  });

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 29,
      icon: Building,
      description: 'Pour petits cabinets',
      features: [
        'Jusqu\'à 10 dossiers',
        'Jusqu\'à 25 clients',
        'Jusqu\'à 50 documents',
        '1 utilisateur',
        'Gestion de base',
        'Support email'
      ],
      limits: {
        cases: 10,
        clients: 25,
        documents: 50,
        users: 1
      },
      popularFeatures: ['Calendrier basique', 'Documents basiques']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 79,
      icon: Crown,
      description: 'Pour cabinets moyens',
      popular: true,
      features: [
        'Jusqu\'à 500 dossiers',
        'Jusqu\'à 1000 clients',
        'Jusqu\'à 5000 documents',
        'Jusqu\'à 5 utilisateurs',
        'Gestion avancée',
        'Automatisation documents',
        'Notifications WhatsApp',
        'Portail client',
        'Suivi du temps',
        'Génération factures',
        'Support prioritaire'
      ],
      limits: {
        cases: 500,
        clients: 1000,
        documents: 5000,
        users: 5
      },
      popularFeatures: ['Templates de dossiers', 'Recherche avancée', 'Facturation automatique']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 149,
      icon: Zap,
      description: 'Pour grands cabinets',
      features: [
        'Dossiers illimités',
        'Clients illimités',
        'Documents illimités',
        'Utilisateurs illimités',
        'Tout Premium inclus',
        'API personnalisée',
        'Intégrations avancées',
        'Rapports avancés',
        'White labeling',
        'Workflows personnalisés',
        'Outils conformité',
        'Analytics avancées',
        'Support 24/7',
        'Formation dédiée'
      ],
      limits: {
        cases: 'unlimited',
        clients: 'unlimited',
        documents: 'unlimited',
        users: 'unlimited'
      },
      popularFeatures: ['API complète', 'Multi-tenant', 'Conformité RGPD']
    }
  ];

  const handleSubscribe = (planId: string, price: number, planName: string) => {
    // If user already has this plan, don't do anything
    if (user?.subscription?.plan === planId && user.subscription.status === 'active') {
      return;
    }
    setPaymentModal({
      isOpen: true,
      planId,
      planName,
      price
    });
  };

  const handlePaymentSuccess = async () => {
    const { planId, planName } = paymentModal;
    // Actually upgrade the plan after payment
    const success = await upgradePlan(planId as 'basic' | 'premium' | 'enterprise');
    if (success && user) {
      await sendNotification({
        type: 'email',
        recipient: user.email,
        subject: 'Confirmation changement de plan JURIS',
        message: `Votre plan ${planName} a été activé avec succès.`
      });
      if (user.phone) {
        await sendNotification({
          type: 'whatsapp',
          recipient: user.phone,
          message: `🎉 Votre nouveau plan JURIS ${planName} est maintenant actif! Profitez de toutes les nouvelles fonctionnalités.`
        });
      }
    }
    setPaymentModal({ ...paymentModal, isOpen: false });
  };

  const currentPlan = user?.subscription?.plan || 'none';
  const isActive = user?.subscription?.status === 'active';

  const getPlanComparison = (planId: string) => {
    const currentPlanIndex = plans.findIndex(p => p.id === currentPlan);
    const targetPlanIndex = plans.findIndex(p => p.id === planId);
    
    if (currentPlanIndex === -1) return 'upgrade';
    if (targetPlanIndex > currentPlanIndex) return 'upgrade';
    if (targetPlanIndex < currentPlanIndex) return 'downgrade';
    return 'current';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Abonnements</h1>
          <p className="text-gray-600 mt-2">Choisissez le plan qui convient à votre cabinet</p>
        </div>

        {user?.subscription && (
          <Card className={`${isActive ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Abonnement Actuel</h3>
                  <p className="text-gray-600">
                    Plan {user.subscription.plan.charAt(0).toUpperCase() + user.subscription.plan.slice(1)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {isActive ? 
                      `Expire le ${new Date(user.subscription.expiresAt).toLocaleDateString('fr-FR')}` :
                      'Abonnement inactif'
                    }
                  </p>
                </div>
                <Badge>
                  {isActive ? 'Actif' : 'Inactif'}
                </Badge>
              </div>
              
              {isActive && user.usage && (
                <div className="mt-4 grid grid-cols-4 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <FileText className="h-6 w-6 mx-auto text-blue-500 mb-1" />
                    <div className="text-sm font-medium">Dossiers</div>
                    <div className="text-xs text-gray-500">
                      {user.usage.cases}/{user.planLimits?.maxCases === 'unlimited' ? '∞' : user.planLimits?.maxCases}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                      <div 
                        className="bg-blue-500 h-1 rounded-full" 
                        style={{ 
                          width: user.planLimits?.maxCases === 'unlimited' ? '20%' : 
                                 `${Math.min((user.usage.cases / (user.planLimits?.maxCases as number)) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <Users className="h-6 w-6 mx-auto text-green-500 mb-1" />
                    <div className="text-sm font-medium">Clients</div>
                    <div className="text-xs text-gray-500">
                      {user.usage.clients}/{user.planLimits?.maxClients === 'unlimited' ? '∞' : user.planLimits?.maxClients}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                      <div 
                        className="bg-green-500 h-1 rounded-full" 
                        style={{ 
                          width: user.planLimits?.maxClients === 'unlimited' ? '20%' : 
                                 `${Math.min((user.usage.clients / (user.planLimits?.maxClients as number)) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <Calendar className="h-6 w-6 mx-auto text-purple-500 mb-1" />
                    <div className="text-sm font-medium">Documents</div>
                    <div className="text-xs text-gray-500">
                      {user.usage.documents}/{user.planLimits?.maxDocuments === 'unlimited' ? '∞' : user.planLimits?.maxDocuments}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                      <div 
                        className="bg-purple-500 h-1 rounded-full" 
                        style={{ 
                          width: user.planLimits?.maxDocuments === 'unlimited' ? '20%' : 
                                 `${Math.min((user.usage.documents / (user.planLimits?.maxDocuments as number)) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <Building className="h-6 w-6 mx-auto text-orange-500 mb-1" />
                    <div className="text-sm font-medium">Utilisateurs</div>
                    <div className="text-xs text-gray-500">
                      {user.usage.users}/{user.planLimits?.maxUsers === 'unlimited' ? '∞' : user.planLimits?.maxUsers}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                      <div 
                        className="bg-orange-500 h-1 rounded-full" 
                        style={{ 
                          width: user.planLimits?.maxUsers === 'unlimited' ? '20%' : 
                                 `${Math.min((user.usage.users / (user.planLimits?.maxUsers as number)) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            const isCurrentPlan = currentPlan === plan.id && isActive;
            const comparison = getPlanComparison(plan.id);
            
            return (
              <Card key={plan.id} className={`relative ${plan.popular ? 'border-amber-400 shadow-lg scale-105' : ''} ${isCurrentPlan ? 'bg-green-50 border-green-300' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge>Plus Populaire</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-full ${plan.popular ? 'bg-amber-100' : 'bg-gray-100'}`}>
                      <IconComponent className={`h-8 w-8 ${plan.popular ? 'text-amber-600' : 'text-gray-600'}`} />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-gray-900">
                    {plan.price}€
                    <span className="text-sm font-normal text-gray-500">/mois</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.popularFeatures && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs font-semibold text-blue-800 mb-1">Fonctionnalités phares:</p>
                      <div className="flex flex-wrap gap-1">
                        {plan.popularFeatures.map((feature, index) => (
                          <span key={index}><Badge>{feature}</Badge></span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Button
                    className={`w-full ${plan.popular ? 'bg-amber-600 hover:bg-amber-700' : ''} ${
                      comparison === 'upgrade' ? 'bg-green-600 hover:bg-green-700' : 
                      comparison === 'downgrade' ? 'bg-orange-600 hover:bg-orange-700' : ''
                    }`}
                    variant={isCurrentPlan ? 'outline' : 'default'}
                    disabled={isCurrentPlan}
                    onClick={() => handleSubscribe(plan.id, plan.price, plan.name)}
                  >
                    {isCurrentPlan ? (
                      'Plan Actuel'
                    ) : comparison === 'upgrade' ? (
                      <span className="flex items-center">
                        <ArrowUp className="h-4 w-4 mr-2" />
                        Passer à {plan.name}
                      </span>
                    ) : comparison === 'downgrade' ? (
                      <span className="flex items-center">
                        <ArrowDown className="h-4 w-4 mr-2" />
                        Rétrograder vers {plan.name}
                      </span>
                    ) : (
                      'Choisir ce plan'
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ ...paymentModal, isOpen: false })}
        onSuccess={handlePaymentSuccess}
        planName={paymentModal.planName}
        amount={paymentModal.price}
      />
    </Layout>
  );
};

export default Subscription;
