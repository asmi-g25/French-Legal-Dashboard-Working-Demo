import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Mail, MessageSquare, Phone, Send } from 'lucide-react';

const Communications = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const communications = [
    {
      id: 'COMM-001',
      type: 'Email',
      subject: 'Confirmation audience du 20 juin',
      client: 'Sophie Martin',
      from: 'Me. Dubois',
      to: 'sophie.martin@email.com',
      date: '2024-06-15 14:30',
      status: 'Envoyé',
      priority: 'Haute'
    },
    {
      id: 'COMM-002',
      type: 'WhatsApp',
      subject: 'Documents à fournir',
      client: 'Jean Petit',
      from: 'Secrétaire',
      to: '+33 1 98 76 54 32',
      date: '2024-06-15 10:15',
      status: 'Lu',
      priority: 'Moyenne'
    },
    {
      id: 'COMM-003',
      type: 'Email',
      subject: 'Facture consultation mai 2024',
      client: 'TechCorp SARL',
      from: 'Cabinet',
      to: 'contact@techcorp.fr',
      date: '2024-06-14 16:45',
      status: 'Envoyé',
      priority: 'Basse'
    },
    {
      id: 'COMM-004',
      type: 'Téléphone',
      subject: 'Appel de suivi - Expertise',
      client: 'Famille Dupont',
      from: 'Me. Bernard',
      to: '+33 1 44 55 66 77',
      date: '2024-06-14 09:20',
      status: 'Terminé',
      priority: 'Moyenne'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Email': return 'bg-blue-100 text-blue-800';
      case 'WhatsApp': return 'bg-green-100 text-green-800';
      case 'Téléphone': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Envoyé': return 'bg-blue-100 text-blue-800';
      case 'Lu': return 'bg-green-100 text-green-800';
      case 'Terminé': return 'bg-gray-100 text-gray-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Haute': return 'bg-red-100 text-red-800';
      case 'Moyenne': return 'bg-orange-100 text-orange-800';
      case 'Basse': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Email': return Mail;
      case 'WhatsApp': return MessageSquare;
      case 'Téléphone': return Phone;
      default: return Mail;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Communications</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Nouvel Email
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <MessageSquare className="h-4 w-4 mr-2" />
              WhatsApp Business
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 rounded-lg p-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">127</p>
                  <p className="text-sm text-gray-600">Emails envoyés</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 rounded-lg p-2">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-sm text-gray-600">Messages WhatsApp</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 rounded-lg p-2">
                  <Phone className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-sm text-gray-600">Appels téléphoniques</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 rounded-lg p-2">
                  <Send className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-sm text-gray-600">Cette semaine</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Historique des Communications</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher communications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {communications.map((comm) => {
                const IconComponent = getTypeIcon(comm.type);
                return (
                  <div key={comm.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`p-2 rounded-lg ${getTypeColor(comm.type).replace('text-', 'bg-').replace('800', '100')}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{comm.subject}</h3>
                            <Badge className={getTypeColor(comm.type)}>{comm.type}</Badge>
                            <Badge className={getPriorityColor(comm.priority)}>{comm.priority}</Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Client: </span>
                              {comm.client}
                            </div>
                            <div>
                              <span className="font-medium">De: </span>
                              {comm.from}
                            </div>
                            <div>
                              <span className="font-medium">À: </span>
                              {comm.to}
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-sm text-gray-500">
                              {new Date(comm.date).toLocaleString('fr-FR')}
                            </span>
                            <Badge className={getStatusColor(comm.status)}>{comm.status}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-500">#{comm.id}</span>
                        <Button variant="outline" size="sm">Voir Détails</Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Communications;
