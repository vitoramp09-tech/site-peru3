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
    { date: '22/08', title: 'Chegada em Cusco', city: 'Cusco', desc: 'Aclimatação, primeiros passeios pelo centro histórico e contato inicial com a atmosfera andina.', highlight: 'História, altitude e charme colonial.', icon: MapPin, tags: ['Aclimatação', 'Centro histórico', 'Cultura'] },
    { date: '23/08', title: 'Explorando Cusco', city: 'Cusco', desc: 'Dia para mercados, sítios arqueológicos, igrejas, ruas de pedra e gastronomia local.', highlight: 'O berço da história peruana.', icon: Camera, tags: ['Arqueologia', 'Mercados', 'Gastronomia'] },
    { date: '24/08', title: 'Cusco e Preparativos', city: 'Cusco', desc: 'Último dia de adaptação, descanso, organização da mochila e preparação para a trilha.', highlight: 'Respirar, ajustar o ritmo e preparar o corpo.', icon: Coffee, tags: ['Descanso', 'Planejamento', 'Pré-trilha'] },
    { date: '25/08', title: 'Trilha Inca, Dia 1', city: 'Andes peruanos', desc: 'Início da jornada de 4 dias por trilhas ancestrais entre montanhas e ruínas incas.', highlight: 'A aventura começa de verdade.', icon: Mountain, tags: ['Trekking', 'Andes', 'Aventura'] },
    { date: '26/08', title: 'Trilha Inca, Dia 2', city: 'Andes peruanos', desc: 'Trecho mais desafiador da travessia, com altitude, superação e visuais impressionantes.', highlight: 'Força, altitude e paisagens épicas.', icon: Mountain, tags: ['Altitude', 'Desafio', 'Paisagem'] },
    { date: '27/08', title: 'Trilha Inca, Dia 3', city: 'Andes peruanos', desc: 'Transição entre montanhas, mata e ruínas, vivendo os diferentes microclimas do caminho.', highlight: 'A trilha revela toda a sua diversidade.', icon: Mountain, tags: ['Ruínas', 'Microclimas', 'Natureza'] },
    { date: '28/08', title: 'Machu Picchu e Vale Sagrado', city: 'Machu Picchu / Ollantaytambo', desc: 'Chegada ao lugar mais icônico da viagem, seguida de descida para o Vale Sagrado.', highlight: 'O grande símbolo do Peru.', icon: Landmark, tags: ['Machu Picchu', 'Ícone', 'Patrimônio'] },
    { date: '29/08', title: 'Vale Sagrado', city: 'Ollantaytambo e arredores', desc: 'Dia de imersão em vilarejos incas, feiras, artesanato, cultura local e experiências mais raiz.', highlight: 'A alma viva do Peru andino.', icon: Users, tags: ['Vilarejos', 'Feirinhas', 'Cultura local'] },
    { date: '30/08', title: 'Lagoa Humantay', city: 'Região de Cusco', desc: 'Passeio de natureza e altitude para uma lagoa de cor intensa cercada por montanhas.', highlight: 'Uma das paisagens mais impactantes da rota.', icon: Sun, tags: ['Natureza', 'Altitude', 'Visual'] },
    { date: '31/08', title: 'Ida para Arequipa', city: 'Arequipa', desc: 'Deslocamento para a Cidade Branca, famosa por sua arquitetura, cenário vulcânico e vida cultural.', highlight: 'Mudança de ritmo e de paisagem.', icon: Train, tags: ['Transporte', 'Cidade Branca', 'Arquitetura'] },
    { date: '01/09', title: 'Descobrindo Arequipa', city: 'Arequipa', desc: 'Dia para explorar praças, mosteiros, mirantes e o charme elegante da cidade.', highlight: 'Cultura, pedra vulcânica e beleza urbana.', icon: Camera, tags: ['Centro histórico', 'Cultura', 'Mirantes'] },
    { date: '02/09', title: 'Arequipa e Gastronomia', city: 'Arequipa', desc: 'Foco nos sabores do sul peruano e nos últimos momentos antes de seguir para Nazca.', highlight: 'Uma pausa deliciosa no roteiro.', icon: Utensils, tags: ['Comida', 'Experiência local', 'Sul do Peru'] },
    { date: '03/09', title: 'Linhas de Nazca e Oásis', city: 'Nazca / Huacachina', desc: 'Sobrevoo dos geoglifos de Nazca e sequência da viagem rumo ao deserto e ao oásis.', highlight: 'Mistério arqueológico e mudança total de cenário.', icon: Plane, tags: ['Sobrevoo', 'Nazca', 'Deserto'] },
    { date: '04/09', title: 'Huacachina e Ida a Lima', city: 'Huacachina / Lima', desc: 'Dia de buggy, sandboard, dunas e pôr do sol antes do deslocamento para a capital.', highlight: 'Aventura no deserto com clima cinematográfico.', icon: Mountain, tags: ['Buggy', 'Sandboard', 'Pôr do sol'] },
    { date: '05/09', title: 'Chegada em Lima', city: 'Lima', desc: 'Entrada na fase mais leve da viagem, com bairros charmosos, mar e vida urbana.', highlight: 'As férias das férias.', icon: MapPin, tags: ['Miraflores', 'Barranco', 'Capital'] },
    { date: '06/09', title: 'Lima Gastronômica', city: 'Lima', desc: 'Dia para viver a alta gastronomia peruana, explorar cafés, restaurantes e encerrar a viagem em grande estilo.', highlight: 'Sabores que viram memória.', icon: Heart, tags: ['Alta gastronomia', 'Restaurantes', 'Despedida'] },
    { date: '07/09', title: 'Retorno para Casa', city: 'Lima → Brasil', desc: 'Fim da Peru Trip, com bagagens cheias de histórias, fotos e lembranças para a vida toda.', highlight: 'Encerramento de uma jornada épica.', icon: Plane, tags: ['Retorno', 'Memórias', 'Fim da viagem'] },
  ];

  const bourdainSpots = [
    { category: 'Pegadas do Tony', city: 'Lima', name: 'Astrid y Gastón', vibe: 'A conexão mais direta com o universo do Bourdain no Peru passa por Gastón Acurio, um dos grandes nomes que ajudaram a projetar a cozinha peruana para o mundo. É um lugar para viver a sofisticação peruana com peso histórico.', why: 'Clássico da alta gastronomia peruana, perfeito para um jantar especial de homenagem ao Anthony.', link: 'https://astridygaston.com/', icon: Utensils },
    { category: 'Pegadas do Tony', city: 'Cusco', name: 'Mercado de San Pedro', vibe: 'Mercado vibrante, intenso, local e sem filtro, exatamente o tipo de lugar que conversa com o olhar curioso do Bourdain. Mais do que comer, é sobre sentir o ritmo real da cidade.', why: 'Ótimo para provar ingredientes, ver a rotina local e buscar uma experiência mais crua e autêntica.', link: 'https://www.peru.travel/attractions/san-pedro-market', icon: Fish },
    { category: 'Mesma vibe', city: 'Lima', name: 'Isolina Taberna Peruana', vibe: 'Tem clima de casa antiga, comida farta, alma de taberna e aquela energia de lugar onde o importante é comer muito bem e beber melhor ainda. Totalmente Bourdain na atitude.', why: 'Ideal para mergulhar na cozinha limeña tradicional sem formalidade excessiva.', link: 'https://isolina.pe/', icon: Flame },
    { category: 'Mesma vibe', city: 'Lima', name: 'Maido', vibe: 'Se a ideia é viver a potência contemporânea da gastronomia peruana, Maido entra como parada obrigatória. É refinado, criativo e representa Lima no topo do mundo gastronômico.', why: 'Perfeito para uma noite grande da viagem, com cozinha nikkei de altíssimo nível.', link: 'https://maido.pe/', icon: Sparkles },
    { category: 'Mesma vibe', city: 'Lima', name: 'Central', vibe: 'Mais do que um restaurante, é quase uma expedição culinária pelos ecossistemas do Peru. Tem o tipo de profundidade territorial e narrativa que certamente conversa com a forma como Bourdain enxergava comida e lugar.', why: 'Experiência para quem quer entender o Peru através dos ingredientes e das altitudes.', link: 'https://centralrestaurante.com.pe/en/', icon: Landmark },
    { category: 'Mesma vibe', city: 'Moray, Vale Sagrado', name: 'MIL Centro', vibe: 'Talvez seja o lugar que mais transforma a refeição em território. Em plena região de Moray, ele conecta altitude, comunidade, técnica e ancestralidade andina.', why: 'Combina perfeitamente com o trecho do Vale Sagrado e com a proposta de viver o Peru mais profundamente.', link: 'https://milcentro.pe/en/', icon: Mountain },
    { category: 'Mesma vibe', city: 'Cusco', name: 'Chicha por Gastón Acurio', vibe: 'Uma forma muito elegante de provar a cozinha regional de Cusco com assinatura de um nome fundamental da gastronomia peruana. Tem raiz, técnica e respeito pelo território.', why: 'Excelente escolha para uma noite forte em Cusco, já entrando no espírito da viagem.', link: 'https://chicha.com.pe/en/cusco/', icon: Utensils },
    { category: 'Mesma vibe', city: 'Cusco', name: 'Museo del Pisco', vibe: 'Menos restaurante, mais ritual etílico e boêmio. É o tipo de parada que encaixa muito bem em uma noite de viagem com bons drinks, conversa longa e clima de celebração.', why: 'Boa pedida para drinks e para entrar mais fundo no universo do pisco.', link: 'https://english.museodelpisco.org/', icon: Martini },
    { category: 'Mesma vibe', city: 'Arequipa', name: 'Picantería La Mundial', vibe: 'Arequipa pede fogo, tradição, panelas pesadas e comida de personalidade. A picantería entrega justamente essa cozinha forte, regional e sem maquiagem.', why: 'Ótimo lugar para viver a alma gastronômica arequipenha em clima mais raiz.', link: 'https://picanterialamundial.com.pe/', icon: Flame },
  ];

  const travelers = [
    { name: 'Vitor', role: 'Explorador', color: 'from-sky-500 to-blue-600' },
    { name: 'Carina', role: 'Aventureira', color: 'from-pink-500 to-rose-600' },
    { name: 'Julia', role: 'A Conquistadora', color: 'from-emerald-500 to-green-600' },
    { name: 'Kyle', role: 'O Forasteiro', color: 'from-amber-500 to-orange-600' },
  ];

  const tipBank = {
    'Chegada em Cusco': 'No primeiro dia em Cusco, o ideal é ir com calma, beber bastante água e evitar esforço excessivo por causa da altitude.',
    'Explorando Cusco': 'Prove pratos locais em mercados e repare como a cidade mistura base inca com construções coloniais em quase cada rua.',
    'Cusco e Preparativos': 'Separe roupas em camadas, porque a temperatura pode mudar bastante entre manhã, tarde e noite.',
  };

  const handleGenerateTip = async (index, day) => {
    setLoadingTipDay(index);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setDailyTips((prev) => ({ ...prev, [index]: tipBank[day.title] || 'Curtam o dia com calma e deixem espaço para surpresas boas no caminho.' }));
    setLoadingTipDay(null);
  };

  const handleGeneratePackingList = async () => {
    setIsGeneratingPacking(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setPackingList(`- Roupas em camadas: segunda pele, fleece, corta-vento e casaco mais quente\n- Camisetas respiráveis e calças confortáveis para trekking\n- Bota ou tênis de trilha já amaciado\n- Meias reforçadas e extras\n- Boné, gorro e luvas leves\n- Óculos de sol e protetor solar\n- Mochila de ataque para os dias de trilha\n- Garrafa de água ou sistema de hidratação\n- Remédios pessoais e itens para altitude\n- Jaqueta impermeável\n- Roupa mais leve para Huacachina e Lima\n- Power bank, documentos e seguro viagem\n- Protetor labial e hidratante\n- Lanches práticos para deslocamentos`);
    setIsGeneratingPacking(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1800&q=80')" }} />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 via-neutral-950/40 to-neutral-950" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">
            <Badge className="mb-5 rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-1 text-amber-200">Peru Trip 2026</Badge>
            <h1 className="text-5xl font-black tracking-tight md:text-7xl">Uma jornada pelo Peru,<span className="block text-amber-300">gastronomia, aventura, história e cultura</span></h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-200 md:text-xl">Cusco, Trilha Inca, Machu Picchu, Vale Sagrado, Arequipa, Nazca, Huacachina e Lima em uma viagem desenhada para viver o Peru por inteiro.</p>
            <div className="mt-10 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
              {[{ label: 'Dias', value: timeLeft.days }, { label: 'Horas', value: timeLeft.hours }, { label: 'Minutos', value: timeLeft.minutes }, { label: 'Segundos', value: timeLeft.seconds }].map((item) => (
                <Card key={item.label} className="rounded-3xl border-white/10 bg-white/10 text-white backdrop-blur-md"><CardContent className="p-5 text-center"><div className="text-3xl font-black md:text-4xl">{String(item.value).padStart(2, '0')}</div><div className="mt-2 text-xs uppercase tracking-[0.25em] text-neutral-300">{item.label}</div></CardContent></Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-6 pb-20">
        <section className="-mt-10 grid gap-6 md:grid-cols-4">
          {travelers.map((person, index) => (
            <motion.div key={person.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * index }}>
              <Card className="rounded-3xl border-white/10 bg-white/5 text-white shadow-2xl backdrop-blur-sm"><CardContent className="p-6 text-center"><div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${person.color}`}><Heart className="h-8 w-8" /></div><h3 className="mt-4 text-xl font-bold">{person.name}</h3><p className="mt-1 text-sm text-neutral-300">{person.role}</p></CardContent></Card>
            </motion.div>
          ))}
        </section>

        <section className="mt-16">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><p className="text-sm uppercase tracking-[0.25em] text-emerald-300">Roteiro</p><h2 className="mt-2 text-3xl font-black md:text-4xl">Dias, cidades e experiências</h2></div><Badge className="w-fit rounded-full border border-amber-300/20 bg-amber-400/10 px-4 py-2 text-amber-200">22 de agosto a 07 de setembro</Badge></div>
          <div className="space-y-4">
            {itinerary.map((day, index) => {
              const Icon = day.icon;
              const isActive = activeDay === index;
              return (
                <motion.div key={day.date + day.title} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
                  <Card className={`overflow-hidden rounded-3xl border transition-all duration-300 ${isActive ? 'border-emerald-400/40 bg-emerald-500/10' : 'border-white/10 bg-white/5 hover:bg-white/[0.07]'}`}>
                    <CardContent className="p-0">
                      <button className="w-full p-5 text-left md:p-6" onClick={() => setActiveDay(isActive ? -1 : index)}>
                        <div className="flex items-start gap-4 md:gap-6"><div className="min-w-[76px] rounded-2xl bg-white/10 px-3 py-3 text-center"><div className="text-[10px] uppercase tracking-[0.2em] text-emerald-300">Dia {index + 1}</div><div className="mt-1 text-lg font-black">{day.date}</div></div><div className="flex-1"><div className="flex flex-wrap items-center gap-3"><h3 className="text-xl font-bold md:text-2xl">{day.title}</h3><Badge className="rounded-full bg-white/10 text-neutral-200">{day.city}</Badge></div><p className="mt-2 text-sm leading-6 text-neutral-300 md:text-base">{day.highlight}</p></div><div className="flex items-center gap-3"><div className={`flex h-11 w-11 items-center justify-center rounded-full ${isActive ? 'bg-emerald-300 text-emerald-950' : 'bg-white/10 text-neutral-200'}`}><Icon className="h-5 w-5" /></div><ChevronDown className={`hidden h-5 w-5 text-neutral-400 transition-transform md:block ${isActive ? 'rotate-180' : ''}`} /></div></div>
                      </button>
                      <AnimatePresence initial={false}>{isActive && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} className="overflow-hidden"><div className="border-t border-white/10 px-5 pb-6 pt-5 md:px-6"><p className="max-w-3xl leading-7 text-neutral-200">{day.desc}</p><div className="mt-4 flex flex-wrap gap-2">{day.tags.map((tag) => <Badge key={tag} className="rounded-full bg-white/10 text-neutral-200">{tag}</Badge>)}</div><div className="mt-6">{!dailyTips[index] && loadingTipDay !== index && <Button onClick={() => handleGenerateTip(index, day)} className="rounded-full bg-emerald-500 text-white hover:bg-emerald-400"><Sparkles className="mr-2 h-4 w-4" />Ver dica do dia</Button>}{loadingTipDay === index && <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-neutral-200"><Loader2 className="h-4 w-4 animate-spin" />Buscando uma dica especial...</div>}{dailyTips[index] && <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4 text-sm leading-7 text-emerald-50"><div className="mb-2 flex items-center gap-2 font-semibold text-amber-200"><Sparkles className="h-4 w-4" />Dica do dia</div><p>{dailyTips[index]}</p></div>}</div></div></motion.div>}</AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-3xl border-amber-300/20 bg-amber-400/10 text-white"><CardContent className="p-8"><p className="text-sm uppercase tracking-[0.25em] text-amber-200">Bagagem</p><h3 className="mt-3 text-3xl font-black">Lista inteligente para microclimas</h3><p className="mt-4 max-w-2xl leading-7 text-neutral-200">Da altitude de Cusco ao deserto de Huacachina, este roteiro passa por cenários muito diferentes. Gere uma sugestão rápida para montar a mala com mais segurança.</p>{!packingList ? <Button onClick={handleGeneratePackingList} disabled={isGeneratingPacking} className="mt-6 rounded-full bg-amber-500 text-neutral-950 hover:bg-amber-400">{isGeneratingPacking ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}{isGeneratingPacking ? 'Gerando lista...' : 'Gerar lista de bagagem'}</Button> : <div className="mt-6 whitespace-pre-wrap rounded-2xl bg-black/20 p-5 text-sm leading-7 text-neutral-100">{packingList}</div>}</CardContent></Card>

          <Card className="overflow-hidden rounded-3xl border-white/10 bg-white/5 text-white"><div className="h-full"><img src="https://images.unsplash.com/photo-1520613536365-9f32f18b7d44?auto=format&fit=crop&w=1200&q=80" alt="Paisagem andina do Peru" className="h-64 w-full object-cover" /><CardContent className="p-8"><p className="text-sm uppercase tracking-[0.25em] text-emerald-300">Essência da viagem</p><h3 className="mt-3 text-2xl font-black">Uma rota pensada para sentir o Peru</h3><p className="mt-4 leading-7 text-neutral-300">O roteiro combina o peso histórico de Cusco, a grandiosidade da Trilha Inca, a autenticidade do Vale Sagrado, a sofisticação de Arequipa, o mistério de Nazca, a aventura em Huacachina e o fechamento gastronômico em Lima.</p></CardContent></div></Card>
        </section>

        <section className="mt-16">
          <Card className="overflow-hidden rounded-[2rem] border-white/10 bg-gradient-to-br from-neutral-900 to-neutral-950 text-white"><div className="grid lg:grid-cols-[1.1fr_0.9fr]"><div className="p-8 md:p-10"><p className="text-sm uppercase tracking-[0.25em] text-amber-200">Fechamento</p><h2 className="mt-3 text-3xl font-black md:text-4xl">Uma viagem para lembrar por muitos anos</h2><p className="mt-5 max-w-2xl leading-8 text-neutral-300">Não é só um roteiro, é uma travessia entre cidades históricas, montanhas, desertos, sabores e encontros. Um site para guardar expectativas agora, e memórias depois.</p></div><div className="flex items-end justify-center bg-white/5 p-8"><div className="text-center"><Mountain className="mx-auto h-14 w-14 text-amber-300" /><p className="mt-4 text-lg font-semibold">Peru Trip 2026</p><p className="mt-2 text-sm text-neutral-400">Vitor, Carina, Julia e Kyle</p></div></div></div></Card>
        </section>
      </main>
    </div>
  );
}
