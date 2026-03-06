import React, { useMemo, useState, useEffect } from 'react';
import {
  MapPin,
  Plane,
  Mountain,
  Camera,
  Coffee,
  Train,
  Heart,
  Users,
  Sparkles,
  Loader2,
  Utensils,
  Landmark,
  Sun,
  ChevronDown,
  ExternalLink,
  Martini,
  Fish,
  Flame,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeDay, setActiveDay] = useState(0);
  const [packingList, setPackingList] = useState('');
  const [isGeneratingPacking, setIsGeneratingPacking] = useState(false);
  const [dailyTips, setDailyTips] = useState({});
  const [loadingTipDay, setLoadingTipDay] = useState(null);

  const tripDate = useMemo(() => new Date('2026-08-22T00:00:00').getTime(), []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = tripDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tripDate]);

  const itinerary = [
    {
      date: '08/22',
      title: 'Arrival in Cusco',
      city: 'Cusco',
      desc: 'Acclimatization, first walks through the historic center, and your first contact with the Andean atmosphere.',
      highlight: 'History, altitude, and colonial charm.',
      icon: MapPin,
      tags: ['Acclimatization', 'Historic center', 'Culture'],
    },
    {
      date: '08/23',
      title: 'Exploring Cusco',
      city: 'Cusco',
      desc: 'A day for markets, archaeological sites, churches, stone streets, and local cuisine.',
      highlight: 'The cradle of Peruvian history.',
      icon: Camera,
      tags: ['Archaeology', 'Markets', 'Food'],
    },
    {
      date: '08/24',
      title: 'Cusco and Preparation Day',
      city: 'Cusco',
      desc: 'Final adaptation day, rest, organizing your backpack, and getting ready for the trail.',
      highlight: 'Breathe, adjust your pace, and prepare your body.',
      icon: Coffee,
      tags: ['Rest', 'Planning', 'Pre-trek'],
    },
    {
      date: '08/25',
      title: 'Inca Trail, Day 1',
      city: 'Peruvian Andes',
      desc: 'Start of a 4-day journey on ancestral paths through mountains and Inca ruins.',
      highlight: 'The adventure truly begins.',
      icon: Mountain,
      tags: ['Trekking', 'Andes', 'Adventure'],
    },
    {
      date: '08/26',
      title: 'Inca Trail, Day 2',
      city: 'Peruvian Andes',
      desc: 'The most challenging stretch of the crossing: altitude, resilience, and breathtaking views.',
      highlight: 'Strength, altitude, and epic landscapes.',
      icon: Mountain,
      tags: ['Altitude', 'Challenge', 'Scenery'],
    },
    {
      date: '08/27',
      title: 'Inca Trail, Day 3',
      city: 'Peruvian Andes',
      desc: 'A transition through mountains, forest, and ruins, experiencing the trail’s different microclimates.',
      highlight: 'The trail reveals all its diversity.',
      icon: Mountain,
      tags: ['Ruins', 'Microclimates', 'Nature'],
    },
    {
      date: '08/28',
      title: 'Machu Picchu and Sacred Valley',
      city: 'Machu Picchu / Ollantaytambo',
      desc: 'Arrival at the most iconic place of the trip, followed by descent to the Sacred Valley.',
      highlight: 'Peru’s greatest symbol.',
      icon: Landmark,
      tags: ['Machu Picchu', 'Iconic', 'Heritage'],
    },
    {
      date: '08/29',
      title: 'Sacred Valley',
      city: 'Ollantaytambo and surroundings',
      desc: 'A day immersed in Inca villages, local markets, handicrafts, culture, and authentic experiences.',
      highlight: 'The living soul of Andean Peru.',
      icon: Users,
      tags: ['Villages', 'Markets', 'Local culture'],
    },
    {
      date: '08/30',
      title: 'Humantay Lake',
      city: 'Cusco Region',
      desc: 'A nature and altitude excursion to an intense-blue lake surrounded by mountains.',
      highlight: 'One of the most striking landscapes of the route.',
      icon: Sun,
      tags: ['Nature', 'Altitude', 'Views'],
    },
    {
      date: '08/31',
      title: 'Travel to Arequipa',
      city: 'Arequipa',
      desc: 'Transfer to the White City, known for architecture, volcanic scenery, and cultural life.',
      highlight: 'A complete change of pace and landscape.',
      icon: Train,
      tags: ['Transport', 'White City', 'Architecture'],
    },
    {
      date: '09/01',
      title: 'Discovering Arequipa',
      city: 'Arequipa',
      desc: 'A day to explore plazas, monasteries, viewpoints, and the elegant charm of the city.',
      highlight: 'Culture, volcanic stone, and urban beauty.',
      icon: Camera,
      tags: ['Historic center', 'Culture', 'Viewpoints'],
    },
    {
      date: '09/02',
      title: 'Arequipa and Gastronomy',
      city: 'Arequipa',
      desc: 'A focus on southern Peruvian flavors before heading to Nazca.',
      highlight: 'A delicious pause in the itinerary.',
      icon: Utensils,
      tags: ['Food', 'Local experience', 'Southern Peru'],
    },
    {
      date: '09/03',
      title: 'Nazca Lines and Oasis',
      city: 'Nazca / Huacachina',
      desc: 'Flight over the Nazca geoglyphs, then continue toward the desert oasis.',
      highlight: 'Archaeological mystery and a dramatic shift in scenery.',
      icon: Plane,
      tags: ['Scenic flight', 'Nazca', 'Desert'],
    },
    {
      date: '09/04',
      title: 'Huacachina and Lima Transfer',
      city: 'Huacachina / Lima',
      desc: 'Buggy rides, sandboarding, dunes, and sunset before heading to the capital.',
      highlight: 'Desert adventure with cinematic vibes.',
      icon: Mountain,
      tags: ['Buggy', 'Sandboard', 'Sunset'],
    },
    {
      date: '09/05',
      title: 'Arrival in Lima',
      city: 'Lima',
      desc: 'A lighter phase of the trip with charming neighborhoods, sea views, and city life.',
      highlight: 'The vacation after the adventure.',
      icon: MapPin,
      tags: ['Miraflores', 'Barranco', 'Capital'],
    },
    {
      date: '09/06',
      title: 'Gastronomic Lima',
      city: 'Lima',
      desc: 'Experience top-tier Peruvian cuisine, cafés, and restaurants to end the trip in style.',
      highlight: 'Flavors that become memories.',
      icon: Heart,
      tags: ['Fine dining', 'Restaurants', 'Farewell'],
    },
    {
      date: '09/07',
      title: 'Return Home',
      city: 'Lima → Brazil',
      desc: 'End of Peru Trip, with bags full of stories, photos, and lifelong memories.',
      highlight: 'The closing of an epic journey.',
      icon: Plane,
      tags: ['Return', 'Memories', 'Trip end'],
    },
  ];

  const bourdainSpots = [
    {
      category: 'Tony Footsteps',
      city: 'Lima',
      name: 'Astrid y Gastón',
      vibe: 'The strongest link to Bourdain’s Peru goes through Gastón Acurio, one of the chefs who helped project Peruvian cuisine to the world.',
      why: 'A classic of Peruvian fine dining, perfect for a special tribute dinner to Anthony.',
      link: 'https://astridygaston.com/',
      icon: Utensils,
    },
    {
      category: 'Tony Footsteps',
      city: 'Cusco',
      name: 'Mercado de San Pedro',
      vibe: 'Vibrant, intense, local, and unfiltered. Exactly the kind of place that fits Bourdain’s curious eye.',
      why: 'Great for tasting local ingredients and seeing daily local life up close.',
      link: 'https://www.peru.travel/attractions/san-pedro-market',
      icon: Fish,
    },
    {
      category: 'Same vibe',
      city: 'Lima',
      name: 'Isolina Taberna Peruana',
      vibe: 'Old-house atmosphere, hearty food, tavern soul, and a no-fuss attitude. Very Bourdain in spirit.',
      why: 'Ideal to dive into classic Lima cuisine without excessive formality.',
      link: 'https://isolina.pe/',
      icon: Flame,
    },
    {
      category: 'Same vibe',
      city: 'Lima',
      name: 'Maido',
      vibe: 'If you want contemporary Peruvian culinary power, Maido is a must-stop.',
      why: 'Perfect for a big night with top-level Nikkei cuisine.',
      link: 'https://maido.pe/',
      icon: Sparkles,
    },
    {
      category: 'Same vibe',
      city: 'Lima',
      name: 'Central',
      vibe: 'More than a restaurant, it feels like a culinary expedition through Peru’s ecosystems.',
      why: 'For travelers who want to understand Peru through ingredients and altitudes.',
      link: 'https://centralrestaurante.com.pe/en/',
      icon: Landmark,
    },
    {
      category: 'Same vibe',
      city: 'Moray, Sacred Valley',
      name: 'MIL Centro',
      vibe: 'A place where food becomes territory, connecting altitude, community, technique, and Andean ancestry.',
      why: 'Perfect fit for the Sacred Valley stretch and for a deeper Peru experience.',
      link: 'https://milcentro.pe/en/',
      icon: Mountain,
    },
    {
      category: 'Same vibe',
      city: 'Cusco',
      name: 'Chicha por Gastón Acurio',
      vibe: 'An elegant way to taste regional Cusco cuisine signed by a major Peruvian culinary figure.',
      why: 'Excellent option for a strong dinner in Cusco.',
      link: 'https://chicha.com.pe/en/cusco/',
      icon: Utensils,
    },
    {
      category: 'Same vibe',
      city: 'Cusco',
      name: 'Museo del Pisco',
      vibe: 'Less restaurant, more bohemian ritual. Great for long conversations and celebratory drinks.',
      why: 'A good call for cocktails and diving into pisco culture.',
      link: 'https://english.museodelpisco.org/',
      icon: Martini,
    },
    {
      category: 'Same vibe',
      city: 'Arequipa',
      name: 'Picantería La Mundial',
      vibe: 'Arequipa asks for fire, tradition, heavy pots, and food with personality.',
      why: 'Great place to experience the soul of Arequipa cuisine in a more rooted style.',
      link: 'https://picanterialamundial.com.pe/',
      icon: Flame,
    },
  ];

  const travelers = [
    { name: 'Vitor', role: 'Explorer', color: 'from-sky-500 to-blue-600' },
    { name: 'Carina', role: 'Adventurer', color: 'from-pink-500 to-rose-600' },
    { name: 'Julia', role: 'The Conqueror', color: 'from-emerald-500 to-green-600' },
    { name: 'Kyle', role: 'The Outsider', color: 'from-amber-500 to-orange-600' },
  ];

  const tipBank = {
    'Arrival in Cusco': 'On your first day in Cusco, take it easy, drink plenty of water, and avoid heavy effort because of altitude.',
    'Exploring Cusco': 'Try local dishes in markets and notice how the city blends Inca foundations with colonial architecture.',
    'Cusco and Preparation Day': 'Pack in layers, since temperatures can change a lot between morning, afternoon, and night.',
    'Inca Trail, Day 1': 'Starting at a conservative pace helps a lot. The trail rewards consistency more than speed.',
    'Inca Trail, Day 2': 'Day two is usually the toughest, so light food and hydration make a big difference.',
    'Inca Trail, Day 3': 'Observe changes in vegetation along the trail; they show the Andes’ unique microclimates.',
    'Machu Picchu and Sacred Valley': 'Reaching Machu Picchu after the trail makes the experience even more symbolic and emotional.',
    'Sacred Valley': 'In Sacred Valley villages, take your time with textiles, ceramics, and artisan products made by local communities.',
    'Humantay Lake': 'Leave early, use sun protection, and respect your pace—the altitude matters even on short routes.',
    'Travel to Arequipa': 'Arequipa has a different energy from Cusco: more urban, elegant, and tied to volcanic-stone architecture.',
    'Discovering Arequipa': 'The contrast between white facades and surrounding volcanoes is especially beautiful late in the afternoon.',
    'Arequipa and Gastronomy': 'Arequipa’s cuisine has its own personality, with stronger and more traditional dishes.',
    'Nazca Lines and Oasis': 'The Nazca flight is short, so arrive organized to enjoy every minute.',
    'Huacachina and Lima Transfer': 'In Huacachina, sunset is often one of the most memorable moments, especially from the dune tops.',
    'Arrival in Lima': 'Barranco and Miraflores offer two great sides of Lima: one bohemian, one classic and coastal.',
    'Gastronomic Lima': 'Lima is ideal for ending the trip with ceviches, tasting menus, and excellent cafés.',
    'Return Home': 'The last day is perfect for reviewing photos, writing memories, and saving favorite spots for a next trip.',
  };

  const handleGenerateTip = async (index, day) => {
    setLoadingTipDay(index);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setDailyTips((prev) => ({ ...prev, [index]: tipBank[day.title] || 'Enjoy the day slowly and leave room for good surprises along the way.' }));
    setLoadingTipDay(null);
  };

  const handleGeneratePackingList = async () => {
    setIsGeneratingPacking(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setPackingList(`- Layered clothing: base layer, fleece, windbreaker, and warmer jacket
- Breathable T-shirts and comfortable trekking pants
- Broken-in hiking boots or trail shoes
- Reinforced socks and extras
- Cap, beanie, and light gloves
- Sunglasses and sunscreen
- Daypack for trail days
- Water bottle or hydration system
- Personal meds and altitude-related items
- Waterproof jacket
- Lighter clothes for Huacachina and Lima
- Power bank, documents, and travel insurance
- Lip balm and moisturizer
- Practical snacks for transfers`);
    setIsGeneratingPacking(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1800&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 via-neutral-950/40 to-neutral-950" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <Badge className="mb-5 rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-1 text-amber-200">
              Peru Trip 2026
            </Badge>
            <h1 className="text-5xl font-black tracking-tight md:text-7xl">
              A journey across Peru,
              <span className="block text-amber-300">food, adventure, history, and culture</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-200 md:text-xl">
              Cusco, Inca Trail, Machu Picchu, Sacred Valley, Arequipa, Nazca, Huacachina, and Lima in a trip designed to experience Peru in full.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 max-w-3xl">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
              ].map((item) => (
                <Card key={item.label} className="rounded-3xl border-white/10 bg-white/10 text-white backdrop-blur-md">
                  <CardContent className="p-5 text-center">
                    <div className="text-3xl font-black md:text-4xl">{String(item.value).padStart(2, '0')}</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.25em] text-neutral-300">{item.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        <section className="-mt-10 grid gap-6 md:grid-cols-4">
          {travelers.map((person, index) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * index }}
            >
              <Card className="rounded-3xl border-white/10 bg-white/5 text-white shadow-2xl backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${person.color}`}>
                    <Heart className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold">{person.name}</h3>
                  <p className="mt-1 text-sm text-neutral-300">{person.role}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-4">
          {[
            { icon: Utensils, title: 'Gastronomy', text: 'From Lima’s fine dining to the traditional flavors of southern Peru.' },
            { icon: Mountain, title: 'Adventure', text: 'Inca Trail, altitude, Andean lakes, desert, and sandboarding.' },
            { icon: Landmark, title: 'History', text: 'Inca world, colonial cities, and archaeological mysteries.' },
            { icon: Sparkles, title: 'Culture', text: 'Markets, villages, crafts, architecture, and local daily life.' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="rounded-3xl border-white/10 bg-neutral-900 text-white">
                <CardContent className="p-6">
                  <Icon className="h-8 w-8 text-amber-300" />
                  <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-300">{item.text}</p>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="mt-16">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">Itinerary</p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">Days, cities, and experiences</h2>
            </div>
            <Badge className="w-fit rounded-full border border-amber-300/20 bg-amber-400/10 px-4 py-2 text-amber-200">
              August 22 to September 07
            </Badge>
          </div>

          <div className="space-y-4">
            {itinerary.map((day, index) => {
              const Icon = day.icon;
              const isActive = activeDay === index;

              return (
                <motion.div
                  key={day.date + day.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Card
                    className={`overflow-hidden rounded-3xl border transition-all duration-300 ${
                      isActive
                        ? 'border-emerald-400/40 bg-emerald-500/10'
                        : 'border-white/10 bg-white/5 hover:bg-white/[0.07]'
                    }`}
                  >
                    <CardContent className="p-0">
                      <button
                        className="w-full p-5 text-left md:p-6"
                        onClick={() => setActiveDay(isActive ? -1 : index)}
                      >
                        <div className="flex items-start gap-4 md:gap-6">
                          <div className="min-w-[76px] rounded-2xl bg-white/10 px-3 py-3 text-center">
                            <div className="text-[10px] uppercase tracking-[0.2em] text-emerald-300">Day {index + 1}</div>
                            <div className="mt-1 text-lg font-black">{day.date}</div>
                          </div>

                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="text-xl font-bold md:text-2xl">{day.title}</h3>
                              <Badge className="rounded-full bg-white/10 text-neutral-200">{day.city}</Badge>
                            </div>
                            <p className="mt-2 text-sm leading-6 text-neutral-300 md:text-base">{day.highlight}</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className={`flex h-11 w-11 items-center justify-center rounded-full ${isActive ? 'bg-emerald-300 text-emerald-950' : 'bg-white/10 text-neutral-200'}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <ChevronDown className={`hidden h-5 w-5 text-neutral-400 transition-transform md:block ${isActive ? 'rotate-180' : ''}`} />
                          </div>
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28 }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-white/10 px-5 pb-6 pt-5 md:px-6">
                              <p className="max-w-3xl text-neutral-200 leading-7">{day.desc}</p>

                              <div className="mt-4 flex flex-wrap gap-2">
                                {day.tags.map((tag) => (
                                  <Badge key={tag} className="rounded-full bg-white/10 text-neutral-200">{tag}</Badge>
                                ))}
                              </div>

                              <div className="mt-6">
                                {!dailyTips[index] && loadingTipDay !== index && (
                                  <Button
                                    onClick={() => handleGenerateTip(index, day)}
                                    className="rounded-full bg-emerald-500 text-white hover:bg-emerald-400"
                                  >
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Show day tip
                                  </Button>
                                )}

                                {loadingTipDay === index && (
                                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-neutral-200">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Looking up a special tip...
                                  </div>
                                )}

                                {dailyTips[index] && (
                                  <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4 text-sm leading-7 text-emerald-50">
                                    <div className="mb-2 flex items-center gap-2 font-semibold text-amber-200">
                                      <Sparkles className="h-4 w-4" />
                                      Day tip
                                    </div>
                                    <p>{dailyTips[index]}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-amber-200">Live Like Bourdain</p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">Eat Peru with soul, curiosity, and personality</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-neutral-300 md:text-base">
              This section brings together places directly connected to Anthony Bourdain’s time in Peru, plus experiences with a similar energy: identity, history, technique, and honest food.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {bourdainSpots.map((spot) => {
              const Icon = spot.icon;
              const featured = spot.category === 'Tony Footsteps';

              return (
                <Card
                  key={spot.name}
                  className={`rounded-3xl border text-white ${featured ? 'border-amber-300/30 bg-amber-400/10' : 'border-white/10 bg-white/5'}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${featured ? 'bg-amber-300 text-neutral-950' : 'bg-white/10 text-white'}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge className={`rounded-full ${featured ? 'bg-amber-300 text-neutral-950' : 'bg-white/10 text-neutral-200'}`}>
                        {spot.category}
                      </Badge>
                    </div>

                    <p className="mt-5 text-xs uppercase tracking-[0.22em] text-emerald-300">{spot.city}</p>
                    <h3 className="mt-2 text-2xl font-black">{spot.name}</h3>
                    <p className="mt-4 text-sm leading-7 text-neutral-200">{spot.vibe}</p>

                    <div className="mt-5 rounded-2xl bg-black/20 p-4 text-sm leading-7 text-neutral-300">
                      <span className="font-semibold text-white">Why it belongs in your itinerary:</span> {spot.why}
                    </div>

                    <a
                      href={spot.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                    >
                      Open place
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-3xl border-amber-300/20 bg-amber-400/10 text-white">
            <CardContent className="p-8">
              <p className="text-sm uppercase tracking-[0.25em] text-amber-200">Packing</p>
              <h3 className="mt-3 text-3xl font-black">Smart list for microclimates</h3>
              <p className="mt-4 max-w-2xl text-neutral-200 leading-7">
                From Cusco’s altitude to Huacachina’s desert, this route crosses very different environments. Generate a quick suggestion to pack with confidence.
              </p>

              {!packingList ? (
                <Button
                  onClick={handleGeneratePackingList}
                  disabled={isGeneratingPacking}
                  className="mt-6 rounded-full bg-amber-500 text-neutral-950 hover:bg-amber-400"
                >
                  {isGeneratingPacking ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  {isGeneratingPacking ? 'Generating list...' : 'Generate packing list'}
                </Button>
              ) : (
                <div className="mt-6 rounded-2xl bg-black/20 p-5 text-sm leading-7 text-neutral-100 whitespace-pre-wrap">
                  {packingList}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-white/10 bg-white/5 text-white overflow-hidden">
            <div className="h-full">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Laguna_Humantay%2C_Per%C3%BA.jpg"
                alt="Humantay Lake in Peru"
                className="h-64 w-full object-cover"
              />
              <CardContent className="p-8">
                <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">Trip essence</p>
                <h3 className="mt-3 text-2xl font-black">A route designed to truly feel Peru</h3>
                <p className="mt-4 text-neutral-300 leading-7">
                  This route combines the historical weight of Cusco, the grandeur of the Inca Trail, the authenticity of the Sacred Valley, the sophistication of Arequipa, Nazca’s mystery, Huacachina’s adventure, and a gastronomic finale in Lima.
                </p>
              </CardContent>
            </div>
          </Card>
        </section>

        <section className="mt-16">
          <Card className="rounded-[2rem] border-white/10 bg-gradient-to-br from-neutral-900 to-neutral-950 text-white overflow-hidden">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-8 md:p-10">
                <p className="text-sm uppercase tracking-[0.25em] text-amber-200">Wrap-up</p>
                <h2 className="mt-3 text-3xl font-black md:text-4xl">A trip to remember for many years</h2>
                <p className="mt-5 max-w-2xl text-neutral-300 leading-8">
                  This is more than an itinerary. It is a crossing through historic cities, mountains, deserts, flavors, and encounters. A site to store expectations now—and memories later.
                </p>
              </div>
              <div className="flex items-end justify-center bg-white/5 p-8">
                <div className="text-center">
                  <Mountain className="mx-auto h-14 w-14 text-amber-300" />
                  <p className="mt-4 text-lg font-semibold">Peru Trip 2026</p>
                  <p className="mt-2 text-sm text-neutral-400">Vitor, Carina, Julia and Kyle</p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
