
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Filter, FileText, Calendar, User } from 'lucide-react';

const Cases = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const cases = [
    {
      id: '2024-001',
      title: 'Divorce Martin vs. Martin',
      client: 'Sophie Martin',
      status: 'En cours',
      priority: 'Haute',
      dateCreated: '15/01/2024',
      nextHearing: '20/06/2024',
      lawyer: 'Me. Dubois',
      description: 'Procédure de divorce contentieux avec garde d\'enfants'
    },
    {
      id: '2024-002',
      title: 'Succession Famille Petit',
      client: 'Jean Petit',
      status: 'En attente',
      priority: 'Moyenne',
      dateCreated: '20/01/2024',
      nextHearing: '25/06/2024',
      lawyer: 'Me. Bernard',
      description: 'Succession complexe avec biens immobiliers'
    },
    {
      id: '2024-003',
      title: 'Contrat Commercial - TechCorp',
      client: 'TechCorp SARL',
      status: 'Terminé',
      priority: 'Basse',
      dateCreated: '10/01/2024',
      nextHearing: null,
      lawyer: 'Me. Dubois',
      description: 'Rédaction et négociation contrat commercial'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'En attente': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Terminé': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Haute': return 'bg-red-100 text-red-800 border-red-200';
      case 'Moyenne': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Basse': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Gestion des Dossiers
          </h1>
          <Button className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 shadow-lg">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Dossier
          </Button>
        </div>

        <Card className="shadow-xl border-slate-200">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-amber-50 border-b border-slate-200">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher par titre, client, numéro..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-300 focus:border-amber-500"
                />
              </div>
              <Button variant="outline" className="border-slate-300 hover:border-amber-500 hover:bg-amber-50">
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {cases.map((case_) => (
                <div key={case_.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-white hover:bg-gradient-to-r hover:from-white hover:to-amber-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="font-semibold text-xl text-slate-800">{case_.title}</h3>
                        <Badge className={`${getPriorityColor(case_.priority)} border font-medium`}>{case_.priority}</Badge>
                        <Badge className={`${getStatusColor(case_.status)} border font-medium`}>{case_.status}</Badge>
                      </div>
                      <p className="text-slate-600 mb-4 leading-relaxed">{case_.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-500">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-amber-600" />
                          <span>{case_.client}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-amber-600" />
                          <span>{case_.lawyer}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-amber-600" />
                          <span>Créé: {case_.dateCreated}</span>
                        </div>
                        {case_.nextHearing && (
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-amber-600" />
                            <span>Audience: {case_.nextHearing}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">#{case_.id}</span>
                      <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                        Voir Détails
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Cases;
