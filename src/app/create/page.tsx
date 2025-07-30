'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Camera, 
  Calendar, 
  MapPin, 
  Users, 
  QrCode, 
  Copy, 
  Share, 
  CheckCircle,
  Sparkles,
  Heart,
  ArrowLeft,
  ExternalLink,
  Download
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface EventData {
  name: string;
  date: string;
  location: string;
  description: string;
  eventType: string;
  expectedGuests: number;
}

export default function CreateEventPage() {
  const [step, setStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [eventData, setEventData] = useState<EventData>({
    name: '',
    date: '',
    location: '',
    description: '',
    eventType: 'wedding',
    expectedGuests: 50
  });
  const [createdEvent, setCreatedEvent] = useState<any>(null);

  const eventTypes = [
    { value: 'wedding', label: '💒 Wedding', description: 'Wedding ceremonies and receptions' },
    { value: 'birthday', label: '🎂 Birthday', description: 'Birthday parties and celebrations' },
    { value: 'anniversary', label: '💕 Anniversary', description: 'Anniversary celebrations' },
    { value: 'engagement', label: '💍 Engagement', description: 'Engagement parties' },
    { value: 'corporate', label: '🏢 Corporate', description: 'Corporate events and meetings' },
    { value: 'graduation', label: '🎓 Graduation', description: 'Graduation ceremonies' },
    { value: 'other', label: '🎉 Other', description: 'Other celebrations' }
  ];

  const generateEventCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const generateQRCode = (eventCode: string, eventId: string) => {
    const guestUploadLink = `${window.location.origin}/event/${eventId}/upload?code=${eventCode}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(guestUploadLink)}`;
    return { qrCodeUrl, guestUploadLink };
  };

  const handleInputChange = (field: keyof EventData, value: string | number) => {
    setEventData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateEvent = async () => {
    setIsCreating(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const eventId = Date.now().toString();
      const eventCode = generateEventCode();
      const { qrCodeUrl, guestUploadLink } = generateQRCode(eventCode, eventId);
      
      const newEvent = {
        id: eventId,
        ...eventData,
        eventCode,
        qrCodeUrl,
        guestUploadLink,
        createdAt: new Date().toISOString(),
        status: 'active',
        photoCount: 0,
        guestCount: 0
      };
      
      setCreatedEvent(newEvent);
      setStep(3);
      toast.success('🎉 Event created successfully!');
    } catch (error) {
      toast.error('Failed to create event. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const copyToClipboard = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(message);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const shareEvent = () => {
    if (navigator.share && createdEvent) {
      navigator.share({
        title: `Join ${createdEvent.name}`,
        text: `Upload your photos to ${createdEvent.name} using code: ${createdEvent.eventCode}`,
        url: createdEvent.guestUploadLink
      });
    } else {
      copyToClipboard(createdEvent?.guestUploadLink || '', 'Guest upload link copied!');
    }
  };

  const downloadQRCode = () => {
    if (createdEvent?.qrCodeUrl) {
      const link = document.createElement('a');
      link.href = createdEvent.qrCodeUrl;
      link.download = `${createdEvent.name.replace(/\s+/g, '_')}_QR_Code.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('QR Code downloaded!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F2] via-white to-[#FFF9F2]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-rose-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-rose-600 rounded-lg flex items-center justify-center">
                  <Camera className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-rose-800 bg-clip-text text-transparent font-playfair">
                  Wedibox
                </span>
              </div>
            </Link>
            <Badge className="bg-rose-100 text-rose-700 border-rose-200">
              Step {step} of 3
            </Badge>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step 1: Event Details */}
        {step === 1 && (
          <div className="space-y-8">
            <div className="text-center">
              <Badge className="mb-4 bg-rose-100 text-rose-700 border-rose-200">
                <Sparkles className="h-4 w-4 mr-2" />
                Event Details
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-playfair">
                Tell us about your{' '}
                <span className="text-rose-600">celebration</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Share the basic details and we'll create everything you need for photo sharing.
              </p>
            </div>

            <Card className="border-rose-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-playfair">Event Information</CardTitle>
                <CardDescription>
                  Fill in your event details to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="event-name" className="text-sm font-medium text-gray-700 mb-2 block">
                      Event Name *
                    </Label>
                    <Input
                      id="event-name"
                      placeholder="Sarah & Michael's Wedding"
                      value={eventData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="border-rose-200 focus:border-rose-400"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="event-date" className="text-sm font-medium text-gray-700 mb-2 block">
                      Event Date *
                    </Label>
                    <Input
                      id="event-date"
                      type="date"
                      value={eventData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="border-rose-200 focus:border-rose-400"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="event-location" className="text-sm font-medium text-gray-700 mb-2 block">
                    Location *
                  </Label>
                  <Input
                    id="event-location"
                    placeholder="Hotel Grand Palace, Jakarta"
                    value={eventData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="border-rose-200 focus:border-rose-400"
                  />
                </div>

                <div>
                  <Label htmlFor="event-type" className="text-sm font-medium text-gray-700 mb-2 block">
                    Event Type *
                  </Label>
                  <Select value={eventData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
                    <SelectTrigger className="border-rose-200 focus:border-rose-400">
                      <SelectValue placeholder="Choose event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div>
                            <div className="font-medium">{type.label}</div>
                            <div className="text-xs text-gray-500">{type.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="expected-guests" className="text-sm font-medium text-gray-700 mb-2 block">
                    Expected Guests
                  </Label>
                  <Input
                    id="expected-guests"
                    type="number"
                    placeholder="50"
                    value={eventData.expectedGuests}
                    onChange={(e) => handleInputChange('expectedGuests', parseInt(e.target.value) || 0)}
                    className="border-rose-200 focus:border-rose-400"
                  />
                </div>

                <div>
                  <Label htmlFor="event-description" className="text-sm font-medium text-gray-700 mb-2 block">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="event-description"
                    placeholder="Tell us more about your special day..."
                    value={eventData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="border-rose-200 focus:border-rose-400"
                    rows={3}
                  />
                </div>

                <Button
                  onClick={() => setStep(2)}
                  disabled={!eventData.name || !eventData.date || !eventData.location}
                  className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold py-3 text-lg"
                >
                  Continue
                  <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Review & Create */}
        {step === 2 && (
          <div className="space-y-8">
            <div className="text-center">
              <Badge className="mb-4 bg-rose-100 text-rose-700 border-rose-200">
                <CheckCircle className="h-4 w-4 mr-2" />
                Review & Create
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-playfair">
                Ready to create your{' '}
                <span className="text-rose-600">event?</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Review your details and we'll generate everything you need.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Event Summary */}
              <Card className="border-rose-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-playfair">Event Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-rose-500" />
                    <div>
                      <p className="font-medium">{eventData.name}</p>
                      <p className="text-sm text-gray-500">
                        {eventTypes.find(t => t.value === eventData.eventType)?.label}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-rose-500" />
                    <div>
                      <p className="font-medium">{new Date(eventData.date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                      <p className="text-sm text-gray-500">Event date</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-rose-500" />
                    <div>
                      <p className="font-medium">{eventData.location}</p>
                      <p className="text-sm text-gray-500">Venue</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-rose-500" />
                    <div>
                      <p className="font-medium">{eventData.expectedGuests} guests</p>
                      <p className="text-sm text-gray-500">Expected attendance</p>
                    </div>
                  </div>

                  {eventData.description && (
                    <div className="pt-4 border-t border-rose-100">
                      <p className="text-sm text-gray-600">{eventData.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* What You'll Get */}
              <Card className="border-rose-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-playfair">What You'll Get</CardTitle>
                  <CardDescription>
                    Everything you need for seamless photo sharing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
                      <QrCode className="h-4 w-4 text-rose-600" />
                    </div>
                    <div>
                      <p className="font-medium">Unique QR Code</p>
                      <p className="text-sm text-gray-500">For instant guest access</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
                      <Camera className="h-4 w-4 text-rose-600" />
                    </div>
                    <div>
                      <p className="font-medium">Upload Portal</p>
                      <p className="text-sm text-gray-500">Mobile-friendly photo upload</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
                      <Heart className="h-4 w-4 text-rose-600" />
                    </div>
                    <div>
                      <p className="font-medium">Digital Guestbook</p>
                      <p className="text-sm text-gray-500">Messages and memories</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
                      <Users className="h-4 w-4 text-rose-600" />
                    </div>
                    <div>
                      <p className="font-medium">Multi-Album Support</p>
                      <p className="text-sm text-gray-500">Organized photo galleries</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1 border-rose-300 text-rose-600 hover:bg-rose-50"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Edit
              </Button>
              <Button
                onClick={handleCreateEvent}
                disabled={isCreating}
                className="flex-1 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold py-3"
              >
                {isCreating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Event...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Create Event
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && createdEvent && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-playfair">
                Event created{' '}
                <span className="text-rose-600">successfully!</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Your event is ready! Share the QR code or link with your guests to start collecting memories.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* QR Code */}
              <Card className="border-rose-100 shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-playfair">QR Code</CardTitle>
                  <CardDescription>
                    Let guests scan to upload photos instantly
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="bg-white p-6 rounded-xl border-2 border-dashed border-rose-200 inline-block">
                    <img 
                      src={createdEvent.qrCodeUrl} 
                      alt="Event QR Code"
                      className="w-48 h-48 mx-auto"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">Event Code: <span className="font-mono text-rose-600">{createdEvent.eventCode}</span></p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => copyToClipboard(createdEvent.eventCode, 'Event code copied!')}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Code
                      </Button>
                      <Button
                        onClick={downloadQRCode}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download QR
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Event Details & Actions */}
              <Card className="border-rose-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-playfair">{createdEvent.name}</CardTitle>
                  <CardDescription>
                    {new Date(createdEvent.date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Guest Upload Link</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Input 
                          value={createdEvent.guestUploadLink} 
                          readOnly 
                          className="text-xs bg-gray-50" 
                        />
                        <Button
                          onClick={() => copyToClipboard(createdEvent.guestUploadLink, 'Upload link copied!')}
                          variant="outline"
                          size="sm"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={shareEvent}
                        className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700"
                      >
                        <Share className="h-4 w-4 mr-2" />
                        Share Event
                      </Button>
                      <Button
                        onClick={() => window.open(createdEvent.guestUploadLink, '_blank')}
                        variant="outline"
                        className="border-rose-300 text-rose-600 hover:bg-rose-50"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-rose-100">
                    <Link href="/admin">
                      <Button variant="outline" className="w-full">
                        Go to Event Dashboard
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Link href="/">
                <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 