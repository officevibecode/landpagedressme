
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Camera, 
  Zap, 
  Image as ImageIcon, 
  TrendingUp, 
  Clock, 
  ChevronDown, 
  ShieldCheck, 
  Play,
  Layers,
  Sparkles,
  Users,
  Target,
  Sun,
  Moon,
  Globe,
  Loader2
} from 'lucide-react';
import { useCart } from './context/CartContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell
} from 'recharts';

// --- Translations ---

const translations = {
  pt: {
    nav: {
      problem: "O Problema",
      how: "Como Funciona",
      pricing: "Investimento",
      faq: "FAQ",
      cta: "Quero o DressMe"
    },
    hero: {
      badge: "A Revolução da Fotografia para E-commerce",
      title1: "Crie looks originais e exclusivos",
      title2: "sem sessões fotográficas",
      subtitle: "Mostre as suas peças com imagens realistas e profissionais, criadas com o estilo da sua marca. Diferencie o seu e-commerce com conteúdos que não aparecem noutros sites.",
      cta: "Quero o DressMe agora",
      caption: "Setup rápido e suporte por 10 anos",
      video: "Veja como criamos um look em segundos"
    },
    problem: {
      title: "O problema que está a travar as suas vendas",
      desc1: "Quando usa fotos do fornecedor (as mesmas que outras lojas também usam), a sua loja fica igual a dezenas de outras.",
      quote: "\"O cliente compara apenas por preço, confia menos e adia a compra.\"",
      desc2: "Com o DressMe, cria imagens exclusivas com as suas próprias peças, com um estilo visual consistente e premium — feito para converter.",
      item1: "Dependência de fornecedores e fotos genéricas.",
      item2: "Autonomia total para criar conteúdo exclusivo e editorial.",
      badge: "Convertemos olhares em clientes reais."
    },
    features: {
      title: "O que o DressMe faz por si",
      subtitle: "Não é um provador para o cliente final. É a sua fábrica de conteúdo editorial de alto nível.",
      items: [
        { title: "Looks Originais", desc: "Combine peças de cima, baixo e acessórios para criar composições editoriais perfeitas." },
        { title: "Estilo da Marca", desc: "Escolha entre elegante, casual, street, premium ou minimalista. Identidade visual consistente." },
        { title: "Imagens Exclusivas", desc: "Gere imagens que só a sua loja possui, fugindo da guerra de preços por semelhança." },
        { title: "Alta Conversão", desc: "Visuais profissionais aumentam a percepção de valor e a confiança na compra." },
        { title: "Velocidade Real", desc: "Produza conteúdo para campanhas e coleções inteiras em minutos, não em semanas." },
        { title: "Estúdio Virtual", desc: "Diga adeus ao aluguer de estúdios, contratação de fotógrafos e tratamento de imagem caro." }
      ],
      cta: "Quero criar looks exclusivos"
    },
    how: {
      title: "Como funciona em 5 passos",
      steps: [
        { title: "Envio", desc: "Envia as imagens das peças (cima, baixo, acessórios)." },
        { title: "Estilo", desc: "Escolha o estilo visual da marca (ex: Minimalista)." },
        { title: "Geração", desc: "Clica em “Gerar Look” e a IA faz a magia." },
        { title: "Ajuste", desc: "Ajusta ambiente/fundo para alinhar com a loja." },
        { title: "Opcional", desc: "Gera vídeo com áudio para anúncios e redes." }
      ]
    },
    audience: {
      title: "Para quem é",
      items: [
        "Lojas online de moda que querem diferenciar-se",
        "Marcas que precisam de conteúdo constante sem custos recorrentes",
        "Equipas que querem acelerar lançamentos e coleções",
        "Negócios que vendem com tráfego pago e precisam de criativos novos"
      ],
      includedTitle: "O que está incluído:",
      inc1: "Licença completa",
      inc2: "Setup Pronto a Usar",
      inc3: "Alojamento e Suporte",
      inc4: "Configuração API Google",
      statusInc: "Incluído",
      status10: "10 Anos",
      important: "Importante",
      importantDesc: "Não inclui integração de \"provador\" para o cliente final usar no seu e-commerce."
    },
    costs: {
      title: "Comparativo de Custos",
      subtitle: "Estimativa conservadora para produção de conteúdo",
      tradTitle: "Método Tradicional",
      trad1: "Produção mensal (Modelo + Foto + Edição)",
      trad2: "Suporte e Alojamento ferramentas",
      tradTotal: "Total Mensal",
      trad10: "Em 10 Anos",
      dmTitle: "Com o DressMe",
      dmDesc: "Sem mensalidades recorrentes do sistema. Alojamento garantido por 10 anos.",
      dmTotal: "Custo Mensal Sistema",
      dmFoot: "\"Paga apenas por utilização direta ao Google (cêntimos por geração).\"",
      chart1: "Tradicional (Mensal)",
      chart2: "DressMe (Uso)"
    },
    pricing: {
      title: "Investimento Único",
      subtitle: "Transforme a imagem do seu negócio de uma vez por todas.",
      regular: "Preço Regular",
      offer: "Oferta de Lançamento",
      offerTitle: "Oferta de Lançamento 155€",
      offerDesc: "Desconto exclusivo de lançamento aplicado automaticamente.",
      finalLabel: "Seu investimento final:",
      iva: "(IVA já incluído • Pagamento único)",
      cta: "Quero garantir a oferta",
      safe: "Pagamento Seguro",
      installments: "Possibilidade de pagamento em 3 prestações no cartão de crédito"
    },
    trust: {
      title: "Porque confiar",
      items: [
        { title: "Produto TGOO", desc: "Desenvolvido pela TGOO Worldwide S.A., empresa portuguesa com 10 anos de mercado e capital social de 500.000€." },
        { title: "Sem Intermediários", desc: "Configuramos a API oficial do Google para si. Paga diretamente ao Google por geração, sem comissões extras." },
        { title: "10 Anos de Garantia", desc: "O sistema fica alojado durante 10 anos, sem custos adicionais de servidor, com suporte incluído." }
      ]
    },
    faq: {
      title: "Perguntas Frequentes",
      data: [
        { q: "O DressMe é um provador no site para o cliente usar a sua foto?", a: "Não. Essa funcionalidade exigiria integração com o e-commerce do cliente e não está incluída neste valor. O DressMe é uma ferramenta para VOCÊ criar o conteúdo profissional da sua marca." },
        { q: "Então o que eu faço com o DressMe para a loja online?", a: "Cria looks originais com as suas peças, escolhe o estilo (casual, premium, minimalista, etc) e gera imagens exclusivas para o seu site e redes sociais sem precisar de sessões fotográficas." },
        { q: "Quanto custa cada imagem gerada?", a: "É cobrado por utilização, em cêntimos por geração, pago diretamente ao Google através da API oficial. O valor varia conforme o volume e o tipo de geração." },
        { q: "Em quanto tempo fica pronto?", a: "Após a configuração da sua conta e da API do Google, o sistema fica pronto a usar com o fluxo de criação de looks e geração de conteúdo imediato." }
      ]
    },
    footer: {
      title: "Diferencie a sua loja online com o DressMe.",
      desc: "Se quer diferenciar a sua loja online, criar conteúdo exclusivo e aumentar conversões sem depender de sessões fotográficas constantes, o DressMe é o passo mais rápido e sólido.",
      cta: "Quero comprar o DressMe agora",
      rights: "© 2024 DressMe by TGOO Worldwide S.A. Todos os direitos reservados.",
      terms: "Termos de Uso",
      privacy: "Privacidade",
      support: "Suporte"
    }
  },
  en: {
    nav: {
      problem: "The Problem",
      how: "How it Works",
      pricing: "Investment",
      faq: "FAQ",
      cta: "Get DressMe"
    },
    hero: {
      badge: "The E-commerce Photography Revolution",
      title1: "Create original and exclusive looks",
      title2: "without photo shoots",
      subtitle: "Showcase your pieces with realistic and professional images, created in your brand's style. Differentiate your e-commerce with content that doesn't appear on other sites.",
      cta: "Get DressMe now",
      caption: "Quick setup and 10-year support",
      video: "See how we create a look in seconds"
    },
    problem: {
      title: "The problem holding back your sales",
      desc1: "When you use supplier photos (the same ones other stores use), your store looks like dozens of others.",
      quote: "\"The customer compares only by price, trusts less, and delays the purchase.\"",
      desc2: "With DressMe, you create exclusive images with your own pieces, with a consistent and premium visual style — built to convert.",
      item1: "Dependency on suppliers and generic photos.",
      item2: "Total autonomy to create exclusive and editorial content.",
      badge: "We convert views into real customers."
    },
    features: {
      title: "What DressMe does for you",
      subtitle: "It's not a virtual fitting room for the end customer. It's your high-level editorial content factory.",
      items: [
        { title: "Original Looks", desc: "Combine tops, bottoms, and accessories to create perfect editorial compositions." },
        { title: "Brand Style", desc: "Choose between elegant, casual, street, premium, or minimalist. Consistent visual identity." },
        { title: "Exclusive Images", desc: "Generate images that only your store owns, escaping the price war of similarity." },
        { title: "High Conversion", desc: "Professional visuals increase value perception and purchasing confidence." },
        { title: "Real Speed", desc: "Produce content for entire campaigns and collections in minutes, not weeks." },
        { title: "Virtual Studio", desc: "Say goodbye to studio rentals, hiring photographers, and expensive image editing." }
      ],
      cta: "I want to create exclusive looks"
    },
    how: {
      title: "How it works in 5 steps",
      steps: [
        { title: "Upload", desc: "Send images of the pieces (top, bottom, accessories)." },
        { title: "Style", desc: "Choose the visual style of your brand (e.g., Minimalist)." },
        { title: "Generate", desc: "Click “Generate Look” and the AI does the magic." },
        { title: "Adjust", desc: "Adjust environment/background to align with your store." },
        { title: "Optional", desc: "Generate video with audio for ads and social media." }
      ]
    },
    audience: {
      title: "Who it is for",
      items: [
        "Fashion online stores looking to stand out",
        "Brands needing constant content without recurring costs",
        "Teams wanting to accelerate launches and collections",
        "Businesses selling with paid traffic needing new creatives"
      ],
      includedTitle: "What is included:",
      inc1: "Full license",
      inc2: "Ready-to-use setup",
      inc3: "Hosting and Support",
      inc4: "Google API Config",
      statusInc: "Included",
      status10: "10 Years",
      important: "Important",
      importantDesc: "Does not include \"fitting room\" integration for the end customer to use on their e-commerce."
    },
    costs: {
      title: "Cost Comparison",
      subtitle: "Conservative estimate for content production",
      tradTitle: "Traditional Method",
      trad1: "Monthly production (Model + Photo + Editing)",
      trad2: "Tools support and hosting",
      tradTotal: "Monthly Total",
      trad10: "In 10 Years",
      dmTitle: "With DressMe",
      dmDesc: "No recurring system monthly fees. Guaranteed hosting for 10 years.",
      dmTotal: "System Monthly Cost",
      dmFoot: "\"Pay only for usage directly to Google (cents per generation).\"",
      chart1: "Traditional (Monthly)",
      chart2: "DressMe (Usage)"
    },
    pricing: {
      title: "Single Investment",
      subtitle: "Transform your business image once and for all.",
      regular: "Regular Price",
      offer: "Launch Offer",
      offerTitle: "Launch Offer €155",
      offerDesc: "Exclusive launch discount applied automatically.",
      finalLabel: "Your final investment:",
      iva: "(VAT included • One-time payment)",
      cta: "Secure the offer now",
      safe: "Secure Payment",
      installments: "Possibility of 3-installment credit card payment"
    },
    trust: {
      title: "Why trust us",
      items: [
        { title: "TGOO Product", desc: "Developed by TGOO Worldwide S.A., a Portuguese company with 10 years in the market and €500k capital." },
        { title: "No Intermediaries", desc: "We set up the official Google API for you. Pay directly to Google per generation, no extra commissions." },
        { title: "10-Year Warranty", desc: "The system is hosted for 10 years with no additional server costs, including support." }
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      data: [
        { q: "Is DressMe a fitting room for the customer to use their photo?", a: "No. That functionality would require integration with the customer's e-commerce and is not included. DressMe is a tool for YOU to create professional brand content." },
        { q: "What do I do with DressMe for the online store?", a: "Create original looks with your pieces, choose the style, and generate exclusive images for your site and social media without photo shoots." },
        { q: "How much does each generated image cost?", a: "Usage is charged in cents per generation, paid directly to Google. Value varies by volume and generation type." },
        { q: "How long until it's ready?", a: "After setting up your account and Google API, the system is ready for immediate look creation and content generation." }
      ]
    },
    footer: {
      title: "Differentiate your online store with DressMe.",
      desc: "If you want to differentiate your online store, create exclusive content, and increase conversions without relying on constant photo shoots, DressMe is the fastest step.",
      cta: "Buy DressMe now",
      rights: "© 2024 DressMe by TGOO Worldwide S.A. All rights reserved.",
      terms: "Terms of Use",
      privacy: "Privacy",
      support: "Support"
    }
  }
};

// --- Context / Props Interfaces ---

interface AppProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  lang: 'pt' | 'en';
  toggleLang: () => void;
}

// --- Components ---

const Navbar: React.FC<AppProps> = ({ theme, toggleTheme, lang, toggleLang }) => {
  const t = translations[lang].nav;
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${theme === 'dark' ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/10'} backdrop-blur-md border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <img src="/logo-dressme.svg" alt="DressMe by TGOO" className="h-16 w-auto" />
          </div>
          
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#problema" className={`transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>{t.problem}</a>
            <a href="#como-funciona" className={`transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>{t.how}</a>
            <a href="#investimento" className={`transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>{t.pricing}</a>
            <a href="#faq" className={`transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>{t.faq}</a>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleLang}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${theme === 'dark' ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              <Globe size={14} />
              {lang}
            </button>
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-zinc-800 text-yellow-400 hover:bg-zinc-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a 
              href="https://wa.me/351938754488" 
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-green-500/20"
            >
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC<{ theme: 'light' | 'dark', lang: 'pt' | 'en' }> = ({ theme, lang }) => {
  const t = translations[lang].hero;
  return (
    <section className={`relative pt-32 pb-20 overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-black' : 'bg-slate-50'}`}>
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] transition-opacity duration-700 ${theme === 'dark' ? 'opacity-20' : 'opacity-10'} hero-bg`}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className={`inline-flex items-center px-4 py-2 rounded-full border transition-colors ${theme === 'dark' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600'} text-sm font-medium mb-8`}>
            <Sparkles className="w-4 h-4 mr-2" />
            {t.badge}
          </div>
          <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight mb-8 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {t.title1} <br />
            <span className="text-blue-600">{t.title2}</span>
          </h1>
          <p className={`max-w-2xl mx-auto text-xl mb-10 leading-relaxed transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#investimento" 
              className={`w-full sm:w-auto px-8 py-4 font-bold rounded-xl text-lg transition-all flex items-center justify-center group ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-200'}`}
            >
              {t.cta}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className={`text-sm sm:ml-4 italic ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>{t.caption}</p>
          </div>
        </div>

        <div className="mt-20 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-25"></div>
          <div className={`relative border rounded-3xl overflow-hidden shadow-2xl transition-colors ${theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-slate-200'}`}>
            <video 
              src="/dressMe-web.mp4" 
              className="w-full h-auto"
              controls
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Problem: React.FC<{ theme: 'light' | 'dark', lang: 'pt' | 'en' }> = ({ theme, lang }) => {
  const t = translations[lang].problem;
  return (
    <section id="problema" className={`py-24 transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-red-500">
              {t.title}
            </h2>
            <div className={`space-y-6 text-lg transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
              <p>{t.desc1}</p>
              <p className={`border-l-4 border-red-500/50 pl-6 italic transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                {t.quote}
              </p>
              <p>
                {t.desc2.split('DressMe')[0]}<span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>DressMe</span>{t.desc2.split('DressMe')[1]}
              </p>
            </div>
            <div className="mt-10 flex flex-col space-y-4">
               <div className={`flex items-start gap-4 p-4 rounded-xl border ${theme === 'dark' ? 'bg-red-500/5 border-red-500/10' : 'bg-red-50 border-red-100'}`}>
                  <XCircle className="w-6 h-6 text-red-500 mt-1 shrink-0" />
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>{t.item1}</p>
               </div>
               <div className={`flex items-start gap-4 p-4 rounded-xl border ${theme === 'dark' ? 'bg-green-500/5 border-green-500/10' : 'bg-green-50 border-green-100'}`}>
                  <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 shrink-0" />
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>{t.item2}</p>
               </div>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <img src="/vest-site.jpg" className="rounded-2xl" alt="Generic Model" />
                <div className="absolute top-4 left-4 bg-gray-900/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-white/20">
                  Antes
                </div>
              </div>
              <div className="relative mt-8 group overflow-hidden rounded-2xl">
                  <img src="/vest-dressme.jpg" className="rounded-2xl group-hover:scale-105 transition-transform duration-700" alt="DressMe Model" />
                  <div className="absolute inset-0 bg-blue-600/10"></div>
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg shadow-blue-600/30">
                    DressMe
                  </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-blue-600 p-6 rounded-2xl shadow-2xl max-w-[200px]">
              <p className="text-white font-bold text-sm">{t.badge}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features: React.FC<{ theme: 'light' | 'dark', lang: 'pt' | 'en' }> = ({ theme, lang }) => {
  const t = translations[lang].features;
  return (
    <section className={`py-24 transition-colors duration-300 ${theme === 'dark' ? 'bg-black border-y border-white/5' : 'bg-slate-50 border-y border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.title}</h2>
          <p className={`max-w-xl mx-auto transition-colors ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>{t.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {t.items.map((f, i) => (
            <div key={i} className={`p-8 rounded-2xl border transition-all ${theme === 'dark' ? 'bg-zinc-900 border-white/5 hover:border-blue-500/50' : 'bg-white border-slate-100 hover:border-blue-300 shadow-sm hover:shadow-xl'}`}>
              <ImageIcon className="w-10 h-10 text-blue-600 mb-6" />
              <h3 className={`text-xl font-bold mb-4 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{f.title}</h3>
              <p className={`leading-relaxed transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks: React.FC<{ theme: 'light' | 'dark', lang: 'pt' | 'en' }> = ({ theme, lang }) => {
  const t = translations[lang].how;
  return (
    <section id="como-funciona" className={`py-24 transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className={`text-3xl md:text-5xl font-bold mb-6 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.title}</h2>
        </div>
        <div className="relative">
          <div className={`hidden md:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 z-0 ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'}`}></div>
          <div className="grid md:grid-cols-5 gap-8 relative z-10">
            {t.steps.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-blue-500/30">
                  {i + 1}
                </div>
                <h3 className={`font-bold text-lg mb-2 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{s.title}</h3>
                <p className={`text-sm transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Comparison: React.FC<{ theme: 'light' | 'dark', lang: 'pt' | 'en' }> = ({ theme, lang }) => {
  const t = translations[lang].costs;
  const chartData = [
    { name: t.chart1, value: 440, fill: '#ef4444' },
    { name: t.chart2, value: 45, fill: '#3b82f6' }
  ];

  return (
    <section id="custos" className={`py-24 transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.title}</h2>
          <p className={`italic transition-colors ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>{t.subtitle}</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`h-[400px] p-6 rounded-3xl border transition-colors ${theme === 'dark' ? 'bg-zinc-900/50 border-white/5' : 'bg-white border-slate-200 shadow-xl'}`}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#333' : '#eee'} />
                <XAxis dataKey="name" stroke={theme === 'dark' ? '#999' : '#64748b'} fontSize={12} />
                <YAxis stroke={theme === 'dark' ? '#999' : '#64748b'} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: theme === 'dark' ? '#18181b' : '#fff', 
                    border: theme === 'dark' ? '1px solid #3f3f46' : '1px solid #e2e8f0', 
                    color: theme === 'dark' ? '#fff' : '#000',
                    borderRadius: '12px'
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={60}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-8">
            <div className={`p-8 rounded-2xl border transition-colors ${theme === 'dark' ? 'bg-zinc-900 border-white/5' : 'bg-white border-slate-200'}`}>
              <h3 className="text-xl font-bold mb-6 text-red-500">{t.tradTitle}</h3>
              <div className={`space-y-4 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                <div className="flex justify-between">
                  <span className="max-w-[200px]">{t.trad1}</span>
                  <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>400€+</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.trad2}</span>
                  <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>40€+</span>
                </div>
                <div className={`pt-4 border-t flex justify-between ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'}`}>
                  <span className="font-bold">{t.tradTotal}</span>
                  <span className="text-red-500 font-bold">440€/mês</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>{t.trad10}</span>
                  <span className="text-red-600">52.800€</span>
                </div>
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-blue-600 text-white shadow-2xl shadow-blue-500/30">
              <h3 className="text-xl font-bold mb-4">{t.dmTitle}</h3>
              <p className="text-blue-100 mb-6">{t.dmDesc}</p>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-blue-400 pb-2">
                  <span>{t.dmTotal}</span>
                  <span className="font-bold">0€</span>
                </div>
                <p className="text-sm italic opacity-80">{t.dmFoot}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Pricing: React.FC<{ theme: 'light' | 'dark', lang: 'pt' | 'en' }> = ({ theme, lang }) => {
  const [isOfferApplied, setIsOfferApplied] = useState<boolean>(true);
  const { checkout, isLoading, error } = useCart();
  const t = translations[lang].pricing;
  const basePrice = 1670;
  const discount = isOfferApplied ? 155 : 0;
  const finalPrice = basePrice - discount;

  const handleCheckout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await checkout();
  };

  return (
    <section id="investimento" className={`py-24 transition-colors duration-300 relative overflow-hidden ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[150px] transition-opacity ${theme === 'dark' ? 'bg-blue-600/5 opacity-100' : 'bg-blue-600/10 opacity-60'}`}></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-extrabold mb-6 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.title}</h2>
          <p className={`transition-colors ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>{t.subtitle}</p>
        </div>

        <div className={`border-2 transition-all rounded-[3rem] p-8 md:p-12 shadow-2xl ${theme === 'dark' ? 'bg-zinc-900 border-blue-500/50' : 'bg-white border-blue-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
            <div className="text-center md:text-left">
              <p className={`text-sm uppercase tracking-widest font-bold mb-2 transition-colors ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>{t.regular}</p>
              <p className={`text-3xl line-through font-bold transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-slate-300'}`}>1.670 €</p>
            </div>
            <div className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold animate-pulse shadow-lg shadow-blue-500/30">
              {t.offer}
            </div>
          </div>

          <div className="mb-12">
            <button 
              onClick={() => setIsOfferApplied(!isOfferApplied)}
              className={`w-full p-8 rounded-2xl border-2 transition-all text-left flex flex-col md:flex-row items-center justify-between gap-4 ${isOfferApplied ? 'border-blue-500 bg-blue-500/10' : theme === 'dark' ? 'border-white/5 bg-black/40 hover:border-white/20' : 'border-slate-100 bg-slate-50 hover:border-blue-200'}`}
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`font-bold text-2xl transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.offerTitle}</span>
                  {isOfferApplied && <CheckCircle2 className="w-6 h-6 text-blue-500" />}
                </div>
                <p className={`italic transition-colors ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>{t.offerDesc}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">- 155 €</p>
              </div>
            </button>
          </div>

          <div className={`text-center py-10 rounded-3xl border transition-all ${theme === 'dark' ? 'bg-black/40 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
            <p className={`mb-2 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>{t.finalLabel}</p>
            <h3 className={`text-6xl md:text-7xl font-extrabold mb-6 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {finalPrice.toLocaleString('pt-PT')} €
            </h3>
            <p className={`text-sm mb-10 transition-colors ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>{t.iva}</p>
            
            <div className="flex flex-col space-y-4 items-center px-4">
              <a 
                href="#" 
                onClick={handleCheckout}
                className={`w-full max-w-md bg-blue-600 text-white text-xl font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/40 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    {lang === 'pt' ? 'Processando...' : 'Processing...'}
                  </>
                ) : (
                  <>
                    {t.cta}
                    <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </a>
              {error && (
                <div className="w-full max-w-md bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  <strong className="font-bold">Erro: </strong>
                  <span>{error}</span>
                </div>
              )}
              <div className={`flex flex-col md:flex-row items-center gap-6 text-xs transition-colors ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-green-500" /> {t.safe}
                </div>
                <div className="text-center max-w-[280px]">
                   {t.installments}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ: React.FC<{ theme: 'light' | 'dark', lang: 'pt' | 'en' }> = ({ theme, lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = translations[lang].faq;

  return (
    <section id="faq" className={`py-24 transition-colors duration-300 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl font-bold mb-12 text-center transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.title}</h2>
        <div className="space-y-4">
          {t.data.map((faq, i) => (
            <div key={i} className={`border rounded-2xl overflow-hidden transition-all ${theme === 'dark' ? 'border-white/5 bg-zinc-900/50' : 'border-slate-100 bg-slate-50'}`}>
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`w-full flex items-center justify-between p-6 text-left transition-colors ${theme === 'dark' ? 'hover:bg-zinc-900' : 'hover:bg-slate-100/50'}`}
              >
                <span className={`font-bold text-lg transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === i && (
                <div className={`p-6 pt-0 border-t transition-colors ${theme === 'dark' ? 'text-gray-400 border-white/5' : 'text-slate-600 border-slate-200'}`}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC<{ theme: 'light' | 'dark', lang: 'pt' | 'en' }> = ({ theme, lang }) => {
  const t = translations[lang].footer;
  return (
    <footer className={`py-20 transition-colors duration-300 border-t ${theme === 'dark' ? 'bg-black border-white/5' : 'bg-slate-900 border-white/10'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-8 max-w-2xl mx-auto text-white">
            {t.title}
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            {t.desc}
          </p>
          <a 
            href="#investimento" 
            className="inline-flex items-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/30"
          >
            {t.cta}
          </a>
          <div className={`mt-20 pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 ${theme === 'dark' ? 'border-white/5' : 'border-white/10'}`}>
            <p>{t.rights}</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">{t.terms}</a>
              <a href="#" className="hover:text-white transition-colors">{t.privacy}</a>
              <a href="#" className="hover:text-white transition-colors">{t.support}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Payment Success/Cancel Component ---

const PaymentNotification: React.FC<{ theme: 'light' | 'dark', lang: 'pt' | 'en' }> = ({ theme, lang }) => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState<'success' | 'cancel'>('success');
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get('payment');
    const session = params.get('session_id');

    if (payment === 'success' || payment === 'cancel') {
      setType(payment as 'success' | 'cancel');
      setSessionId(session || '');
      setShow(true);
    }
  }, []);

  if (!show) return null;

  const handleClose = () => {
    setShow(false);
    window.history.replaceState({}, '', '/');
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className={`max-w-lg w-full rounded-2xl p-8 shadow-2xl ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>
        {type === 'success' ? (
          <>
            <div className="flex justify-center mb-6">
              <CheckCircle2 className="w-20 h-20 text-green-500" />
            </div>
            <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'pt' ? '🎉 Pagamento Confirmado!' : '🎉 Payment Confirmed!'}
            </h2>
            <p className={`text-center mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
              {lang === 'pt' ? 'Obrigado pela sua compra do DressMe!' : 'Thank you for your DressMe purchase!'}
            </p>
            {sessionId && (
              <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-slate-100'}`}>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                  {lang === 'pt' ? 'ID da Sessão:' : 'Session ID:'}
                </p>
                <p className={`font-mono text-xs break-all ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {sessionId}
                </p>
              </div>
            )}
            <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
              <p className={`text-sm font-bold mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-900'}`}>
                {lang === 'pt' ? 'Próximos Passos:' : 'Next Steps:'}
              </p>
              <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>
                <li>{lang === 'pt' ? '• Receberá email de confirmação' : '• You will receive confirmation email'}</li>
                <li>{lang === 'pt' ? '• Suporte entrará em contato' : '• Support will contact you'}</li>
                <li>{lang === 'pt' ? '• Sistema pronto em 48h úteis' : '• System ready in 48h'}</li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <XCircle className="w-20 h-20 text-orange-500" />
            </div>
            <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'pt' ? 'Pagamento Cancelado' : 'Payment Canceled'}
            </h2>
            <p className={`text-center mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
              {lang === 'pt' ? 'Nenhuma cobrança foi realizada.' : 'No charges were made.'}
            </p>
          </>
        )}
        <button
          onClick={handleClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
        >
          {lang === 'pt' ? 'Fechar' : 'Close'}
        </button>
      </div>
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [lang, setLang] = useState<'pt' | 'en'>('pt');

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleLang = () => setLang(prev => prev === 'pt' ? 'en' : 'pt');

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'bg-black text-gray-100 overflow-x-hidden' : 'bg-slate-50 text-slate-900 overflow-x-hidden';
  }, [theme]);

  const appProps: AppProps = { theme, toggleTheme, lang, toggleLang };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'selection:bg-blue-500/30' : 'selection:bg-blue-200'}`}>
      <PaymentNotification theme={theme} lang={lang} />
      <Navbar {...appProps} />
      <Hero theme={theme} lang={lang} />
      <Problem theme={theme} lang={lang} />
      <Features theme={theme} lang={lang} />
      <HowItWorks theme={theme} lang={lang} />
      <Comparison theme={theme} lang={lang} />
      <Pricing theme={theme} lang={lang} />
      <FAQ theme={theme} lang={lang} />
      <Footer theme={theme} lang={lang} />

      {/* Persistent CTA on mobile */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
        <a 
          href="#investimento" 
          className="flex items-center justify-center w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-2xl active:scale-95 transition-transform"
        >
          {lang === 'pt' ? 'Comprar Agora' : 'Buy Now'}
        </a>
      </div>
    </div>
  );
};

export default App;
