
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import { Bell, Mail, MessageSquare, Send } from 'lucide-react';

interface Notification {
  id: string;
  type: 'email' | 'whatsapp' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const NotificationCenter = () => {
  const { user, hasFeature } = useAuth();
  const { sendNotification } = useNotifications();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulate some notifications
    const demoNotifications: Notification[] = [
      {
        id: '1',
        type: 'system',
        title: 'Nouveau dossier assigné',
        message: 'Le dossier "Succession Martin" vous a été assigné.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false
      },
      {
        id: '2',
        type: 'email',
        title: 'Email de confirmation',
        message: 'Votre abonnement a été renouvelé avec succès.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        read: true
      }
    ];

    if (hasFeature('whatsapp_notifications')) {
      demoNotifications.push({
        id: '3',
        type: 'whatsapp',
        title: 'Rappel WhatsApp',
        message: 'Rendez-vous avec M. Dubois dans 30 minutes.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: false
      });
    }

    setNotifications(demoNotifications);
  }, [hasFeature]);

  const sendTestNotification = async (type: 'email' | 'whatsapp') => {
    if (!user) return;

    const success = await sendNotification({
      type,
      recipient: type === 'email' ? user.email : user.phone,
      subject: 'Test de notification JURIS',
      message: `Ceci est un test de notification ${type === 'email' ? 'email' : 'WhatsApp'} depuis votre tableau de bord JURIS.`
    });

    if (success) {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type,
        title: `Test ${type === 'email' ? 'Email' : 'WhatsApp'}`,
        message: `Notification ${type} envoyée avec succès.`,
        timestamp: new Date(),
        read: false
      };
      setNotifications(prev => [newNotification, ...prev]);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'whatsapp': return MessageSquare;
      default: return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'blue';
      case 'whatsapp': return 'green';
      default: return 'gray';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <span>Centre de Notifications</span>
        </CardTitle>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => sendTestNotification('email')}
            className="flex items-center space-x-1"
          >
            <Mail className="h-4 w-4" />
            <span>Test Email</span>
          </Button>
          {hasFeature('whatsapp_notifications') && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => sendTestNotification('whatsapp')}
              className="flex items-center space-x-1"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Test WhatsApp</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Aucune notification</p>
          ) : (
            notifications.map((notification) => {
              const IconComponent = getIcon(notification.type);
              const color = getTypeColor(notification.type);
              
              return (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border ${notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'}`}
                >
                  <div className="flex items-start space-x-3">
                    <IconComponent className={`h-5 w-5 text-${color}-500 mt-1`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant={notification.read ? "secondary" : "default"} className="text-xs">
                            {notification.type}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {notification.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
