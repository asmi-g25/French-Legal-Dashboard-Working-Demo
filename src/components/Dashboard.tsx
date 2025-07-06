
import React from 'react';
import StatsCards from '@/components/StatsCards';
import RecentCases from '@/components/RecentCases';
import UpcomingTasks from '@/components/UpcomingTasks';
import QuickActions from '@/components/QuickActions';
import PlanLimitsDisplay from '@/components/PlanLimitsDisplay';
import NotificationCenter from '@/components/NotificationCenter';
import PlanFeatureChecker from '@/components/PlanFeatureChecker';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Zap, Building, TrendingUp, Users, FileText, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { user, hasFeature } = useAuth();

  const getPlanIcon = (plan?: string) => {
    switch (plan) {
      case 'enterprise': return Zap;
      case 'premium': return Crown;
      case 'basic': return Building;
      default: return Building;
    }
  };

  const PlanIcon = getPlanIcon(user?.subscription?.plan);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Tableau de bord
          </h1>
          <p className="text-slate-600 mt-1">
            Vue d'ensemble de votre cabinet juridique
          </p>
        </div>
        <div className="text-right">
          {user?.subscription && (
            <div className="flex items-center space-x-2 mb-2">
              <PlanIcon className="h-5 w-5 text-amber-600" />
              <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                Plan {user.subscription.plan.charAt(0).toUpperCase() + user.subscription.plan.slice(1)}
              </Badge>
            </div>
          )}
          <p className="text-sm text-slate-500">
            Dernière mise à jour
          </p>
          <p className="text-sm font-medium text-slate-700">
            {new Date().toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>

      <StatsCards />
      
      {/* Plan limits for subscribed users */}
      {user?.subscription && <PlanLimitsDisplay />}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PlanFeatureChecker feature="basic_case_management" action="create_case">
            <RecentCases />
          </PlanFeatureChecker>
          
          <PlanFeatureChecker feature="advanced_case_management" plan="premium" showPreview>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-amber-600" />
                  <span>Gestion Avancée des Dossiers</span>
                  <Badge className="bg-amber-100 text-amber-800">Premium</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Templates Automatiques</h4>
                    <p className="text-blue-700 text-sm">Créez des dossiers avec des modèles prédéfinis</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Workflow Personnalisé</h4>
                    <p className="text-green-700 text-sm">Automatisez vos processus métier</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Suivi Avancé</h4>
                    <p className="text-purple-700 text-sm">Tableaux de bord et analytics détaillés</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">Intégrations</h4>
                    <p className="text-orange-700 text-sm">Connectez vos outils favoris</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </PlanFeatureChecker>

          <PlanFeatureChecker feature="api_access" plan="enterprise" showPreview>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  <span>API et Intégrations Enterprise</span>
                  <Badge className="bg-purple-100 text-purple-800">Enterprise</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg">
                    <h4 className="font-semibold text-indigo-800 mb-2">API REST Complète</h4>
                    <p className="text-indigo-700 text-sm">Accès programmatique à toutes vos données</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg">
                    <h4 className="font-semibold text-pink-800 mb-2">Webhooks</h4>
                    <p className="text-pink-700 text-sm">Notifications en temps réel</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg">
                    <h4 className="font-semibold text-teal-800 mb-2">White Labeling</h4>
                    <p className="text-teal-700 text-sm">Personnalisez l'interface avec votre marque</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </PlanFeatureChecker>
        </div>
        
        <div className="space-y-6">
          <PlanFeatureChecker feature="basic_calendar" action="add_client">
            <UpcomingTasks />
          </PlanFeatureChecker>
          
          <PlanFeatureChecker feature="whatsapp_notifications" plan="premium" showPreview>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>🔔</span>
                  <span>Notifications Avancées</span>
                  <Badge className="bg-green-100 text-green-800">Premium</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 bg-green-50 rounded">
                    <span>📱</span>
                    <span className="text-sm">Notifications WhatsApp</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded">
                    <span>📧</span>
                    <span className="text-sm">Emails automatiques</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-purple-50 rounded">
                    <span>⏰</span>
                    <span className="text-sm">Rappels intelligents</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </PlanFeatureChecker>
          
          {hasFeature('email_notifications') || hasFeature('whatsapp_notifications') ? (
            <NotificationCenter />
          ) : null}
        </div>
      </div>

      <PlanFeatureChecker feature="basic_case_management">
        <QuickActions />
      </PlanFeatureChecker>
    </div>
  );
};

export default Dashboard;
