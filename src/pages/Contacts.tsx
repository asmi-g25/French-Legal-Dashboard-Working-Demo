import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Phone, Mail, MapPin, User, Building, Scale } from 'lucide-react';

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const contacts = [
    {
      id: 'CONT-001',
      name: 'Me. Philippe Durand',
      type: 'Avocat',
      company: 'Cabinet Durand & Associés',
      phone: '+33 1 42 33 44 55',
      email: 'p.durand@cabinet-durand.fr',
      address: '25 rue Saint-Honoré, 75001 Paris',
      speciality: 'Droit des affaires',
      lastContact: '2024-06-10'
    },
    {
      id: 'CONT-002',
      name: 'Marie Lefèvre',
      type: 'Expert-comptable',
      company: 'Expertise Comptable Lefèvre',
      phone: '+33 1 45 67 89 12',
      email: 'marie.lefevre@ec-lefevre.com',
      address: '78 avenue de la République, 75011 Paris',
      speciality: 'Comptabilité générale',
      lastContact: '2024-06-08'
    },
    {
      id: 'CONT-003',
      name: 'Dr. François Martin',
      type: 'Expert médical',
      company: 'Cabinet Médical Martin',
      phone: '+33 1 56 78 90 23',
      email: 'f.martin@cabinet-medical.fr',
      address: '12 boulevard Voltaire, 75011 Paris',
      speciality: 'Médecine légale',
      lastContact: '2024-06-05'
    },
    {
      id: 'CONT-004',
      name: 'Sophie Moreau',
      type: 'Huissier',
      company: 'Étude Moreau',
      phone: '+33 1 67 89 01 34',
      email: 's.moreau@etude-moreau.fr',
      address: '89 rue de Rivoli, 75004 Paris',
      speciality: 'Recouvrement',
      lastContact: '2024-06-03'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Avocat': return 'bg-blue-100 text-blue-800';
      case 'Expert-comptable': return 'bg-green-100 text-green-800';
      case 'Expert médical': return 'bg-purple-100 text-purple-800';
      case 'Huissier': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Avocat': return Scale;
      case 'Expert-comptable': return Building;
      case 'Expert médical': return User;
      case 'Huissier': return User;
      default: return User;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Carnet de Contacts</h1>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Contact
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 rounded-lg p-2">
                  <Scale className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-sm text-gray-600">Avocats</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 rounded-lg p-2">
                  <Building className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-gray-600">Experts-comptables</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 rounded-lg p-2">
                  <User className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-gray-600">Experts médicaux</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 rounded-lg p-2">
                  <User className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">6</p>
                  <p className="text-sm text-gray-600">Huissiers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher par nom, spécialité, entreprise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {contacts.map((contact) => {
                const IconComponent = getTypeIcon(contact.type);
                return (
                  <Card key={contact.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className={`p-3 rounded-lg ${getTypeColor(contact.type).replace('text-', 'bg-').replace('800', '100')}`}>
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-lg text-gray-900">{contact.name}</h3>
                              <Badge className={getTypeColor(contact.type)}>{contact.type}</Badge>
                            </div>
                            <p className="text-gray-600 mb-3 font-medium">{contact.company}</p>
                            <p className="text-sm text-gray-600 mb-3">{contact.speciality}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                              <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <span>{contact.phone}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4" />
                                <span>{contact.email}</span>
                              </div>
                              <div className="flex items-start space-x-2 md:col-span-2">
                                <MapPin className="h-4 w-4 mt-0.5" />
                                <span>{contact.address}</span>
                              </div>
                            </div>

                            <div className="mt-4 text-sm">
                              <span className="text-gray-500">Dernier contact: </span>
                              <span className="font-medium">
                                {new Date(contact.lastContact).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-500">#{contact.id}</span>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">Voir Profil</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Contacts;
