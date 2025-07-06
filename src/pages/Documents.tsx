import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Upload, FileText, Download, Eye, Folder } from 'lucide-react';

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const documents = [
    {
      id: 'DOC001',
      name: 'Contrat_Divorce_Martin.pdf',
      type: 'PDF',
      size: '2.4 MB',
      case: 'Divorce Martin vs. Martin',
      uploadedBy: 'Me. Dubois',
      uploadDate: '2024-06-15',
      category: 'Contrat',
      status: 'Approuvé'
    },
    {
      id: 'DOC002',
      name: 'Testament_Succession_Petit.docx',
      type: 'DOCX',
      size: '1.8 MB',
      case: 'Succession Famille Petit',
      uploadedBy: 'Me. Bernard',
      uploadDate: '2024-06-14',
      category: 'Testament',
      status: 'En révision'
    },
    {
      id: 'DOC003',
      name: 'Facture_Consultation_052024.pdf',
      type: 'PDF',
      size: '256 KB',
      case: 'TechCorp - Contrat Commercial',
      uploadedBy: 'Secrétaire',
      uploadDate: '2024-06-13',
      category: 'Facture',
      status: 'Envoyé'
    },
    {
      id: 'DOC004',
      name: 'Pièces_Jointes_Audience.zip',
      type: 'ZIP',
      size: '5.2 MB',
      case: 'Divorce Martin vs. Martin',
      uploadedBy: 'Me. Dubois',
      uploadDate: '2024-06-12',
      category: 'Pièces jointes',
      status: 'Archivé'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PDF': return 'bg-red-100 text-red-800';
      case 'DOCX': return 'bg-blue-100 text-blue-800';
      case 'ZIP': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approuvé': return 'bg-green-100 text-green-800';
      case 'En révision': return 'bg-yellow-100 text-yellow-800';
      case 'Envoyé': return 'bg-blue-100 text-blue-800';
      case 'Archivé': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Documents</h1>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Upload className="h-4 w-4 mr-2" />
            Télécharger Document
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 rounded-lg p-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1,243</p>
                  <p className="text-sm text-gray-600">Total Documents</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 rounded-lg p-2">
                  <Folder className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-sm text-gray-600">Dossiers Actifs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 rounded-lg p-2">
                  <Upload className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-sm text-gray-600">Uploads ce mois</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 rounded-lg p-2">
                  <Eye className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">456</p>
                  <p className="text-sm text-gray-600">Vues totales</p>
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
                  placeholder="Rechercher documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Document</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Dossier</th>
                    <th className="text-left py-3 px-4">Taille</th>
                    <th className="text-left py-3 px-4">Téléchargé par</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Statut</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">{doc.name}</p>
                            <p className="text-sm text-gray-500">{doc.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getTypeColor(doc.type)}>{doc.type}</Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{doc.case}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{doc.size}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{doc.uploadedBy}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(doc.uploadDate).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Documents;
