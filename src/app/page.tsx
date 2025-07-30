'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Camera, 
  QrCode, 
  Upload, 
  Heart, 
  Users, 
  Shield, 
  Zap, 
  Star,
  Play,
  Pause,
  Maximize,
  Check,
  ArrowRight,
  Sparkles,
  Gift,
  Clock,
  Download
} from 'lucide-react';
import Image from 'next/image';

export default function WediboxHomepage() {
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-rotating testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Sarah & Michael",
      event: "Wedding - Jakarta",
      text: "Wedibox made our wedding photo sharing so easy! Guests loved the QR code feature.",
      rating: 5
    },
    {
      name: "Rina Santoso",
      event: "Birthday Party",
      text: "No apps, no fuss. Just memories. Perfect for my 25th birthday celebration!",
      rating: 5
    },
    {
      name: "PT Mandiri Corp",
      event: "Company Anniversary",
      text: "Professional solution for our corporate event. Original quality guaranteed!",
      rating: 5
    }
  ];

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-rose-400" />,
      title: "Instant Event Creation",
      description: "Create your event in just 10 seconds. Auto-generated QR code and shareable links ready instantly.",
      highlight: "10 Seconds Setup"
    },
    {
      icon: <Camera className="h-8 w-8 text-rose-400" />,
      title: "Guest-Friendly Uploads",
      description: "Mobile-first interface with drag & drop. No apps needed - just scan and upload!",
      highlight: "No Apps Required"
    },
    {
      icon: <Heart className="h-8 w-8 text-rose-400" />,
      title: "Digital Guestbook",
      description: "Message wall with guest reactions. Capture wishes and memories forever.",
      highlight: "Interactive Messages"
    },
    {
      icon: <Users className="h-8 w-8 text-rose-400" />,
      title: "Multi-Album Support",
      description: "Organize photos by ceremony, reception, or custom albums with privacy controls.",
      highlight: "Smart Organization"
    },
    {
      icon: <Play className="h-8 w-8 text-rose-400" />,
      title: "Wedding Slideshow",
      description: "Auto-rotating gallery with beautiful transitions and fullscreen mode.",
      highlight: "Cinematic Experience"
    },
    {
      icon: <Shield className="h-8 w-8 text-rose-400" />,
      title: "Full Quality Uploads",
      description: "Original resolution guaranteed. EXIF data preserved. Your memories, pixel perfect.",
      highlight: "Original Quality"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      features: [
        "1 Active Event",
        "Up to 100 Photos",
        "Basic Albums",
        "QR Code Sharing",
        "7 Days Storage"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Premium",
      price: "99",
      period: "per event",
      features: [
        "Unlimited Events",
        "Unlimited Photos",
        "Custom Albums",
        "Advanced Privacy",
        "Lifetime Storage",
        "HD Slideshow",
        "Guest Analytics",
        "Premium Support"
      ],
      cta: "Go Premium",
      popular: true
    }
  ];

  const faqs = [
    {
      question: "How quickly can I create an event?",
      answer: "Just 10 seconds! Enter your event name and date, and we'll generate everything else automatically including QR codes and shareable links."
    },
    {
      question: "Do guests need to download an app?",
      answer: "No! Guests simply scan the QR code or visit the link. Everything works directly in their web browser."
    },
    {
      question: "What photo quality do you support?",
      answer: "We preserve original resolution and EXIF data. Your photos remain pixel-perfect as the day they were taken."
    },
    {
      question: "Can I organize photos into different albums?",
      answer: "Yes! Create custom albums like 'Ceremony', 'Reception', 'Behind the Scenes' with individual privacy settings."
    },
    {
      question: "How long are photos stored?",
      answer: "Free accounts get 7 days. Premium events include lifetime storage with unlimited access."
    }
  ];

  const handleCreateEvent = () => {
    setIsCreatingEvent(true);
    // Simulate event creation
    setTimeout(() => {
      setIsCreatingEvent(false);
      // Redirect to event creation or show success
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F2] via-white to-[#FFF9F2]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-rose-600 rounded-lg flex items-center justify-center">
                <Camera className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-rose-800 bg-clip-text text-transparent" style={{fontFamily: 'Playfair Display, serif'}}>
                Wedibox
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-rose-600 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-rose-600 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-700 hover:text-rose-600 transition-colors">Stories</a>
              <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700">
                Start Free
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-rose-100 text-rose-700 border-rose-200 px-4 py-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 mr-2" />
              No apps. No fuss. Just memories.
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight" style={{fontFamily: 'Playfair Display, serif'}}>
              Your photos. Your guests.{' '}
              <span className="bg-gradient-to-r from-rose-600 to-rose-800 bg-clip-text text-transparent">
                One perfect album.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Create stunning photo albums for weddings, birthdays, and celebrations. 
              Guests upload instantly via QR code. No apps required.
            </p>

            {/* Quick Create Event */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-rose-100 max-w-2xl mx-auto mb-12">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{fontFamily: 'Playfair Display, serif'}}>
                  Create Event in 10 Seconds
                </h3>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>Lightning fast setup</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="event-name" className="text-sm font-medium text-gray-700 mb-2 block">
                    Event Name
                  </Label>
                  <Input 
                    id="event-name"
                    placeholder="Sarah & Michael's Wedding"
                    className="border-rose-200 focus:border-rose-400"
                  />
                </div>
                <div>
                  <Label htmlFor="event-date" className="text-sm font-medium text-gray-700 mb-2 block">
                    Event Date
                  </Label>
                  <Input 
                    id="event-date"
                    type="date"
                    className="border-rose-200 focus:border-rose-400"
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleCreateEvent}
                disabled={isCreatingEvent}
                className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold py-4 text-lg rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                {isCreatingEvent ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Creating magic...
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5 mr-3" />
                    Create Event Now
                    <ArrowRight className="h-5 w-5 ml-3" />
                  </>
                )}
              </Button>
              
              {isCreatingEvent && (
                <div className="mt-4 text-center text-sm text-gray-500">
                  Generating QR code and shareable links...
                </div>
              )}
            </div>

            {/* Demo Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
                <div className="text-center mb-6">
                  <Badge className="bg-green-100 text-green-700 border-green-200 mb-4">
                    <Check className="h-4 w-4 mr-2" />
                    Live Demo
                  </Badge>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    See Wedibox in Action
                  </h4>
                  <p className="text-gray-600">
                    Watch how guests can instantly share photos
                  </p>
                </div>
                
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Demo Video Placeholder</p>
                    <p className="text-sm text-gray-400">Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-rose-100 text-rose-700 border-rose-200">
              ✨ Core Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{fontFamily: 'Playfair Display, serif'}}>
              Everything you need for perfect{' '}
              <span className="text-rose-600">photo sharing</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed for celebrations, built for memories. Every feature crafted to make photo sharing effortless and beautiful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-rose-100 hover:border-rose-200 hover:-translate-y-2">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-rose-50 rounded-xl group-hover:bg-rose-100 transition-colors">
                      {feature.icon}
                    </div>
                    <Badge className="bg-rose-100 text-rose-700 text-xs">
                      {feature.highlight}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900" style={{fontFamily: 'Playfair Display, serif'}}>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-[#FFF9F2] to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-rose-100 text-rose-700 border-rose-200">
              💝 Simple Pricing
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{fontFamily: 'Playfair Display, serif'}}>
              Start free, upgrade when you're{' '}
              <span className="text-rose-600">ready</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Begin with our generous free plan. Upgrade to Premium for unlimited events and lifetime storage.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-rose-400 shadow-xl' : 'border-rose-100'} hover:shadow-lg transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-4 py-1">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2" style={{fontFamily: 'Playfair Display, serif'}}>
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price === "0" ? "Free" : `$${plan.price}`}
                    </span>
                    {plan.price !== "0" && (
                      <span className="text-gray-500 text-lg ml-2">
                        /{plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">
                    {plan.name === "Free" ? "Perfect for trying Wedibox" : "Unlimited celebrations"}
                  </p>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full py-3 font-semibold ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white' 
                        : 'border-rose-300 text-rose-600 hover:bg-rose-50'
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-rose-100 text-rose-700 border-rose-200">
              ❤️ Happy Celebrations
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{fontFamily: 'Playfair Display, serif'}}>
              Stories from our{' '}
              <span className="text-rose-600">community</span>
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Card className="border-rose-100 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-xl text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonials[currentTestimonial].text}"
                </p>
                
                <div>
                  <h4 className="font-bold text-gray-900 text-lg" style={{fontFamily: 'Playfair Display, serif'}}>
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-gray-500">
                    {testimonials[currentTestimonial].event}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Testimonial indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-rose-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-[#FFF9F2] to-rose-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-rose-100 text-rose-700 border-rose-200">
              🤔 Got Questions?
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{fontFamily: 'Playfair Display, serif'}}>
              Frequently asked{' '}
              <span className="text-rose-600">questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-rose-100 hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900" style={{fontFamily: 'Playfair Display, serif'}}>
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-rose-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{fontFamily: 'Playfair Display, serif'}}>
            Ready to create your first event?
          </h2>
          <p className="text-xl mb-8 text-rose-100">
            Join thousands of celebrations using Wedibox. Start collecting memories today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-rose-600 hover:bg-gray-50 font-semibold px-8 py-4">
              <Camera className="h-5 w-5 mr-2" />
              Create Free Event
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-rose-600 font-semibold px-8 py-4">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-rose-600 rounded-lg flex items-center justify-center">
                  <Camera className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-bold" style={{fontFamily: 'Playfair Display, serif'}}>
                  Wedibox
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your photos. Your guests. One perfect album.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Wedibox. All rights reserved. Made with ❤️ for celebrations.</p>
          </div>
        </div>
      </footer>

      {/* Mobile FAB */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 rounded-full w-14 h-14 shadow-lg"
          onClick={handleCreateEvent}
        >
          <Camera className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}