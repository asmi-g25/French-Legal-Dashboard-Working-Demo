
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Phone, Mail, MapPin, User, Filter } from 'lucide-react';

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const clients = [
    {
      id: 'C001',
      name: 'Sophie Martin',
      email: 'sophie.martin@email.com',
      phone: '01 23 45 67 89',
      address: '15 rue de la République, 75001 Paris',
      type: 'Particulier',
      activeCases: 2,
      totalCases: 3,
      lastContact: '2024-06-14',
      status: 'Actif'
    },
    {
      id: 'C002',
      name: 'Jean Petit',
      email: 'jean.petit@email.com',
      phone: '01 98 76 54 32',
      address: '45 avenue des Champs, 75008 Paris',
      type: 'Particulier',
      activeCases: 1,
      totalCases: 1,
      lastContact: '2024-06-13',
      status: 'Actif'
    },
    {
      id: 'C003',
      name: 'TechCorp SARL',
      email: 'contact@techcorp.fr',
      phone: '01 55 44 33 22',
      address: '100 boulevard Haussmann, 75009 Paris',
      type: 'Entreprise',
      activeCases: 0,
      totalCases: 5,
      lastContact: '2024-06-10',
      status: 'Inactif'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Particulier': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Entreprise': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Inactif': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Gestion des Clients
          </h1>
          <Button className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 shadow-lg">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Client
          </Button>
        </div>

        <Card className="shadow-xl border-slate-200">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-amber-50 border-b border-slate-200">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher par nom, email, téléphone..."
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
            <div className="grid gap-6">
              {clients.map((client) => (
                <Card key={client.id} className="hover:shadow-lg transition-all duration-300 border-slate-200 bg-gradient-to-r from-white to-amber-50/30">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="bg-gradient-to-r from-amber-100 to-amber-200 rounded-full p-2">
                            <User className="h-5 w-5 text-amber-700" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-slate-800">{client.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className={`${getTypeColor(client.type)} border font-medium`}>{client.type}</Badge>
                              <Badge className={`${getStatusColor(client.status)} border font-medium`}>{client.status}</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-amber-600" />
                            <span>{client.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-amber-600" />
                            <span>{client.phone}</span>
                          </div>
                          <div className="flex items-start space-x-2 md:col-span-2">
                            <MapPin className="h-4 w-4 mt-0.5 text-amber-600" />
                            <span>{client.address}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6 mt-4 text-sm">
                          <div>
                            <span className="text-slate-500">Dossiers actifs: </span>
                            <span className="font-medium text-slate-700">{client.activeCases}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Total dossiers: </span>
                            <span className="font-medium text-slate-700">{client.totalCases}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Dernier contact: </span>
                            <span className="font-medium text-slate-700">{new Date(client.lastContact).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">#{client.id}</span>
                        <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                          Voir Profil
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Clients;
