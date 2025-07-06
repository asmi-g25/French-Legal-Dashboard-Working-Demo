import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, Plus, ChevronLeft, ChevronRight, User } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = [
    {
      id: 1,
      title: 'Audience Tribunal - Divorce Martin',
      date: '2024-06-16',
      time: '14:30',
      duration: '2h',
      type: 'Audience',
      client: 'Sophie Martin',
      location: 'Tribunal de Grande Instance',
      lawyer: 'Me. Dubois'
    },
    {
      id: 2,
      title: 'Consultation Client - Succession Petit',
      date: '2024-06-17',
      time: '10:00',
      duration: '1h',
      type: 'Consultation',
      client: 'Jean Petit',
      location: 'Cabinet',
      lawyer: 'Me. Bernard'
    },
    {
      id: 3,
      title: 'Expertise Judiciaire - Affaire Dupont',
      date: '2024-06-18',
      time: '09:00',
      duration: '3h',
      type: 'Expertise',
      client: 'Famille Dupont',
      location: '15 rue de la Paix, Paris',
      lawyer: 'Me. Dubois'
    },
    {
      id: 4,
      title: 'Rendez-vous Négociation',
      date: '2024-06-19',
      time: '15:00',
      duration: '1h30',
      type: 'Négociation',
      client: 'TechCorp SARL',
      location: 'Cabinet',
      lawyer: 'Me. Bernard'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Audience': return 'bg-red-100 text-red-800';
      case 'Consultation': return 'bg-blue-100 text-blue-800';
      case 'Expertise': return 'bg-purple-100 text-purple-800';
      case 'Négociation': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const todayEvents = events.filter(event => 
    new Date(event.date).toDateString() === new Date().toDateString()
  );

  const upcomingEvents = events.filter(event => 
    new Date(event.date) > new Date()
  ).slice(0, 5);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Calendrier</h1>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Rendez-vous
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5" />
                    <span>Juin 2024</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                    <div key={day} className="text-center font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 30 }, (_, i) => {
                    const day = i + 1;
                    const hasEvent = events.some(event => 
                      new Date(event.date).getDate() === day
                    );
                    const isToday = day === new Date().getDate();
                    
                    return (
                      <div
                        key={day}
                        className={`
                          p-2 text-center cursor-pointer rounded-lg border
                          ${isToday ? 'bg-blue-100 border-blue-300 text-blue-800' : 'border-gray-200 hover:bg-gray-50'}
                          ${hasEvent ? 'font-semibold' : ''}
                        `}
                      >
                        {day}
                        {hasEvent && <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1"></div>}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Aujourd'hui</CardTitle>
              </CardHeader>
              <CardContent>
                {todayEvents.length > 0 ? (
                  <div className="space-y-3">
                    {todayEvents.map(event => (
                      <div key={event.id} className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                          <span className="text-sm text-gray-500">{event.time}</span>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.client}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Aucun rendez-vous aujourd'hui</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prochains Rendez-vous</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex items-center justify-between mb-1">
                        <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(event.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-900 text-sm mb-1">{event.title}</h4>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{event.lawyer}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;
