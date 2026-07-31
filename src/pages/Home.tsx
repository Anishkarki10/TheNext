import { useState } from 'react'
import { Link } from 'react-router-dom'

import loaf from './../../assets/Protein-Loaf.png'
import chef from './../../assets/Chef.png'
import noodles from './../../assets/02_seitan_noodles.png'
import burger from './../../assets/03_seitan_burger.png'
import curry from './../../assets/04_seitan_curry.png'
import stirFry from './../../assets/04_seitan_stir_fry.png'
import wrap from './../../assets/05_seitan_wrap.png'
import bbq from './../../assets/06_seitan_bbq.png'
import home from './../../assets/home.png'
import chowMein from './../../assets/chowmin.jpeg'
import nuggets from './../../assets/nuggets.jpeg'
import chilly from './../../assets/chilly.jpeg'
import choila from './../../assets/Choila.png'
import biryani from './../../assets/briyana.jpeg'
import momo from './../../assets/momo.jpeg'

const benefits = [
  '100% Plant-Based',
  '21.37 g Protein per 100 g',
  'Cholesterol Free',
  'Meat-Like Texture',
  'Easy to Cook',
  'Made in Nepal',
]

const cookingMethods = [
  {
    label: 'Momo',
    emoji: '🥟',
    image: momo,
    desc: 'Juicy plant-based momo filled with seasoned seitan, vegetables and traditional Nepali spices.',
  },
  {
    label: 'Chow Mein',
    emoji: '🍜',
    image: chowMein,
    desc: 'Seitan tossed with stir-fried noodles, crunchy vegetables and a savoury Nepali-style sauce.',
  },
  {
    label: 'Nuggets',
    emoji: '🍗',
    image: nuggets,
    desc: 'Crispy plant-based nuggets with a golden coating and a tender, protein-rich seitan centre.',
  },
  {
    label: 'Chilli',
    emoji: '🌶️',
    image: chilly,
    desc: 'Crispy seitan pieces tossed with peppers, onions and a spicy, tangy chilli sauce.',
  },
  {
    label: 'Choila',
    emoji: '🔥',
    image: choila,
    desc: 'Smoky seitan mixed with mustard oil, herbs and bold traditional Nepali choila spices.',
  },
  {
    label: 'Biryani',
    emoji: '🍚',
    image: biryani,
    desc: 'Fragrant basmati rice layered with spiced seitan, aromatic herbs and warming spices.',
  },
  {
    label: 'Noodles',
    emoji: '🍜',
    image: noodles,
    desc: 'Seitan stir-fried with noodles and fresh veggies in a bold, flavorful Nepali-style sauce.',
  },
  {
    label: 'Burger',
    emoji: '🍔',
    image: burger,
    desc: 'Juicy seitan patty with fresh veggies and smoky sauce in a soft, toasted bun.',
  },
  {
    label: 'Curry',
    emoji: '🍛',
    image: curry,
    desc: 'Hearty seitan pieces simmered in a traditional Nepali curry with aromatic spices.',
  },
  {
    label: 'Stir Fry',
    emoji: '🥘',
    image: stirFry,
    desc: 'Seitan and fresh vegetables stir-fried in a savory blend of Nepali spices and sauces.',
  },
  {
    label: 'Wrap',
    emoji: '🌯',
    image: wrap,
    desc: 'Spiced seitan with crunchy veggies and tangy sauce wrapped to perfection.',
  },
  {
    label: 'BBQ',
    emoji: '🔥',
    image: bbq,
    desc: 'Marinated seitan grilled to perfection with authentic Nepali spices and smoky flavor.',
  },
]
const audienceCards = [
  {
    title: 'Home Kitchens',
    desc: 'A protein-rich alternative for everyday meals. Cook it exactly the way your family already loves eating.',
    img: home,
    cta: 'Explore Recipes',
    to: '/blog',
  },
  {
    title: 'Fitness Lifestyles',
    desc: 'High-protein, low-fat nutrition to support active bodies and ambitious training goals.',
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop&auto=format',
    cta: 'Protein Guide',
    to: '/protein-guide',
  },
  {
    title: 'Restaurants & Cafés',
    desc: 'Versatile food-service packs for menus that are ready to meet the growing demand for plant-based options.',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&auto=format',
    cta: 'Wholesale Enquiry',
    to: '/wholesale',
  },
  {
    title: 'Retail & Distribution',
    desc: 'Partner with us to stock a Nepalese innovation that your customers are increasingly looking for.',
    img: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&h=400&fit=crop&auto=format',
    cta: 'Become a Partner',
    to: '/wholesale',
  },
]

const blogPosts = [
  {
    title: "What Is Seitan? Everything You Need to Know",
    category: 'Seitan Education',
    excerpt: 'Seitan has been a cornerstone of plant-based cooking for centuries. Discover how wheat protein becomes a satisfying meat alternative.',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&h=400&fit=crop&auto=format',
  },
  {
    title: "Why Plant-Based Protein Is the Future of Food",
    category: 'Plant-Based Nutrition',
    excerpt: 'Consumer choices around protein are changing rapidly. Here is why plant-based options are becoming a mainstream food category worldwide.',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1490477688-16073dfa7b39?w=600&h=400&fit=crop&auto=format',
  },
  {
    title: "Delicious Nepalese Meals Using Plant-Based Meat",
    category: 'Nepalese Food',
    excerpt: 'From momo fillings to sekuwa-style skewers, discover how Protein Loaf fits naturally into the heart of Nepalese cuisine.',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop&auto=format',
  },
]

const whyPanels = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Nutrition',
    desc: 'Plant proteins deliver complete amino acids with minimal saturated fat and zero cholesterol — making every meal work harder for your health.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v1m0 16v1M4.22 4.22l.707.707M18.364 18.364l.707.707M1 12h1M21 12h1M4.22 19.78l.707-.707M18.364 5.636l.707-.707" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    title: 'Versatility',
    desc: "Protein Loaf adapts to every cuisine — from Nepalese curries and momos to burgers and stir-fries. One product, countless possibilities.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Animal Welfare',
    desc: 'Choosing plant-based is a practical act of care. Enjoy the meals you love without contributing to industrial animal agriculture.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Responsible Food Innovation',
    desc: "Nepalese-made and locally driven — The Next Protein Nepal is committed to building a food future that makes sense for our country and communities.",
  },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)
  const activeMethod = cookingMethods[activeTab]

  return (
    <div className="overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-[#173A22] overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1512621776951-a57ef244e500?w=1600&h=900&fit=crop&auto=format')`,
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#173A22]/75" aria-hidden="true" />

        {/* Subtle grain */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[1240px] mx-auto px-6 lg:px-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#A8C879]/40 text-[#A8C879] text-xs font-body font-semibold tracking-widest uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8C879]" />
              Proudly Made in Nepal
            </p>

            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-8xl leading-none tracking-tight text-[#F5EDE1] uppercase mb-6">
              The Future<br />
              <span className="text-[#A8C879]">of Protein</span><br />
              Starts Here.
            </h1>

            <p className="font-display font-bold text-lg text-[#A8C879] tracking-wider uppercase mb-4">
              100% Plant-Based. 100% Delicious.
            </p>

            <p className="font-body text-base text-[#F5EDE1]/80 leading-relaxed max-w-xl mb-10">
              Discover a healthier and more sustainable way to enjoy meat. The Next Protein Nepal creates premium plant-based meat with satisfying texture, versatile flavour and protein-powered nutrition.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#A8C879] text-[#173A22] font-body font-bold text-sm tracking-wide hover:bg-[#FCFAF6] transition-colors duration-200"
              >
                Explore Our Products
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/protein-guide"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border-2 border-[#F5EDE1]/40 text-[#F5EDE1] font-body font-bold text-sm tracking-wide hover:border-[#A8C879] hover:text-[#A8C879] transition-colors duration-200"
              >
                Discover Plant-Based Living
              </Link>
            </div>

            <p className="mt-12 font-display font-black text-xs tracking-[0.3em] uppercase text-[#F5EDE1]/30">
              Feeding the Future
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#F5EDE1]/40">
          <span className="font-body text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#F5EDE1]/40 to-transparent" />
        </div>
      </section>

      {/* BENEFIT STRIP */}
      <section className="bg-[#264F24] py-4 overflow-hidden">
        <div className="flex items-center">
          {[...benefits, ...benefits, ...benefits].map((b, i) => (
            <div key={i} className="flex items-center gap-6 px-6 flex-shrink-0">
              <span className="font-display font-black text-sm text-[#F5EDE1] uppercase tracking-wider whitespace-nowrap">
                {b}
              </span>
              <span className="text-[#A8C879] text-lg leading-none">·</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCT */}
      <section className="bg-[#FCFAF6] py-24 lg:py-32">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image side */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8DDCD]">
                <img
                  src={loaf}
                  alt="Protein Loaf — high-protein plant-based meat alternative"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating nutrition badge */}
              <div className="absolute -bottom-4 -right-4 sm:bottom-6 sm:right-6 bg-[#264F24] text-[#F5EDE1] rounded-2xl p-5 shadow-xl">
                <div className="font-display font-black text-3xl leading-none text-[#A8C879]">21.37g</div>
                <div className="font-body text-xs text-[#F5EDE1]/80 mt-1">Protein per 100 g</div>
              </div>
            </div>

            {/* Content side */}
            <div>
              <p className="font-display font-bold text-xs tracking-[0.2em] uppercase text-[#557A35] mb-3">
                Signature Product
              </p>
              <h2 className="font-display font-black text-4xl lg:text-5xl xl:text-6xl text-[#22231F] uppercase leading-none mb-6">
                Meet Protein Loaf
              </h2>
              <p className="font-body text-[#676A61] leading-relaxed mb-8">
                Our signature Protein Loaf is a versatile vegan meat alternative crafted primarily from wheat protein, soybeans and mixed beans. Slice it, dice it, marinate it, grill it or add it to your favourite meal.
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: '21.37g', label: 'Protein' },
                  { value: '0.52g', label: 'Total Fat' },
                  { value: '0', label: 'Cholesterol' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#F5EDE1] rounded-xl p-4">
                    <div className="font-display font-black text-xl text-[#264F24]">{stat.value}</div>
                    <div className="font-body text-xs text-[#676A61] mt-0.5">per 100 g</div>
                    <div className="font-body text-xs font-semibold text-[#22231F] mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Product meta */}
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-3 py-1.5 rounded-full bg-[#E8DDCD] font-body text-xs font-semibold text-[#22231F]">500 g Pack</span>
                <span className="px-3 py-1.5 rounded-full bg-[#E8DDCD] font-body text-xs font-semibold text-[#22231F]">NPR 350</span>
                <span className="px-3 py-1.5 rounded-full bg-[#264F24]/10 text-[#264F24] font-body text-xs font-semibold">● Available</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/products/protein-loaf"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#264F24] text-[#F5EDE1] font-body font-bold text-sm hover:bg-[#173A22] transition-colors"
                >
                  View Product Details
                </Link>
                <a
                  href="https://wa.me/9779714504317?text=Hi%2C%20I%27m%20interested%20in%20Protein%20Loaf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-2 border-[#264F24] text-[#264F24] font-body font-bold text-sm hover:bg-[#264F24] hover:text-[#F5EDE1] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Enquire on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VERSATILITY */}
      <section className="bg-[#F5EDE1] py-24 lg:py-32">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mb-12">
            <h2 className="font-display font-black text-4xl lg:text-6xl text-[#22231F] uppercase leading-none mb-4">
              One Loaf.<br />
              <span className="text-[#264F24]">Countless</span> Possibilities.
            </h2>
            <p className="font-body text-[#676A61] leading-relaxed">
              Cook it your way and bring plant-powered protein to the meals you already love.
            </p>
          </div>

          {/* Tab selector */}
          <div className="flex flex-wrap gap-2 mb-10">
  {cookingMethods.map((method, index) => (
    <button
      key={method.label}
      type="button"
      onClick={() => setActiveTab(index)}
      className={`px-4 py-2 rounded-full font-body text-sm font-semibold transition-all duration-200 ${
        activeTab === index
          ? 'bg-[#264F24] text-[#F5EDE1]'
          : 'bg-[#E8DDCD] text-[#22231F] hover:bg-[#264F24]/10'
      }`}
    >
      {method.emoji} {method.label}
    </button>
  ))}
</div>

{/* Active cooking method */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8DDCD]">
    <img
      key={activeMethod.image}
      src={activeMethod.image}
      alt={`Protein Loaf prepared as ${activeMethod.label}`}
      className="w-full h-full object-cover animate-fade-in"
    />
  </div>

  <div className="flex flex-col justify-center">
    <div className="text-5xl mb-4">
      {activeMethod.emoji}
    </div>

    <h3 className="font-display font-black text-3xl lg:text-4xl text-[#22231F] uppercase mb-4">
      {activeMethod.label}
    </h3>

    <p className="font-body text-[#676A61] text-lg leading-relaxed">
      {activeMethod.desc}
    </p>
  </div>
</div>
         
        </div>
      </section>

      {/* NUTRITION HIGHLIGHT */}
      <section className="bg-[#22231F] py-24 lg:py-32">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-display font-bold text-xs tracking-[0.2em] uppercase text-[#A8C879] mb-3">
                Lab-Verified Nutrition
              </p>
              <h2 className="font-display font-black text-4xl lg:text-6xl text-[#F5EDE1] uppercase leading-none mb-6">
                Powered by Plants.<br />
                <span className="text-[#A8C879]">Built for</span><br />
                Real Meals.
              </h2>
              <p className="font-body text-[#F5EDE1]/60 leading-relaxed mb-8 text-sm">
                Laboratory analysed by Miron Laboratory and Research Centre. All values per 100 g.
              </p>
              <Link
                to="/products/protein-loaf"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#A8C879] text-[#173A22] font-body font-bold text-sm hover:bg-[#F5EDE1] transition-colors"
              >
                View Full Nutrition Information
              </Link>
            </div>

            {/* Nutrition stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '21.37', unit: 'g', label: 'Protein' },
                { value: '19.19', unit: 'g', label: 'Carbohydrate' },
                { value: '0.52', unit: 'g', label: 'Total Fat' },
                { value: '0', unit: '', label: 'Cholesterol' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#2D2E29] rounded-2xl p-6 border border-[#F5EDE1]/5"
                >
                  <div className="font-display font-black text-4xl lg:text-5xl text-[#A8C879] leading-none">
                    {stat.value}
                    <span className="text-2xl">{stat.unit}</span>
                  </div>
                  <div className="font-body text-[#F5EDE1]/60 text-xs mt-2">per 100 g</div>
                  <div className="font-display font-bold text-[#F5EDE1] text-sm uppercase tracking-wide mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="bg-[#FCFAF6] py-24 lg:py-32">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#E8DDCD]">
                  <img
                    src={chef}
                    alt="Food preparation and kitchen innovation"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#E8DDCD] mt-8">
                  <img
                    src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=533&fit=crop&auto=format"
                    alt="Fresh plant-based ingredients and spices"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-[#264F24] text-[#F5EDE1] rounded-xl px-5 py-4 shadow-lg">
                <p className="font-display font-black text-xs tracking-[0.15em] uppercase text-[#A8C879]">Made in</p>
                <p className="font-display font-black text-lg text-[#F5EDE1]">Nepal 🇳🇵</p>
              </div>
            </div>

            <div>
              <p className="font-display font-bold text-xs tracking-[0.2em] uppercase text-[#557A35] mb-3">
                Our Story
              </p>
              <h2 className="font-display font-black text-4xl lg:text-5xl text-[#22231F] uppercase leading-none mb-6">
                Proudly Nepalese.<br />
                <span className="text-[#264F24]">Made for the Future.</span>
              </h2>
              <p className="font-body text-[#676A61] leading-relaxed mb-8 text-base">
                The Next Protein Nepal was founded with a bold vision: to make delicious, nutritious and sustainable plant-based meat accessible to everyone. By combining food innovation with carefully selected ingredients, we create products with satisfying taste and texture for the meals Nepal already loves.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#264F24] text-[#F5EDE1] font-body font-bold text-sm hover:bg-[#173A22] transition-colors"
              >
                Our Story
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY PLANT-BASED */}
      <section className="bg-[#F5EDE1] py-24 lg:py-32">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display font-black text-4xl lg:text-6xl text-[#22231F] uppercase leading-none mb-4">
              Better Choices Start<br />
              <span className="text-[#264F24]">on Your Plate.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyPanels.map((panel) => (
              <div
                key={panel.title}
                className="bg-[#FCFAF6] rounded-2xl p-7 border border-[#E8DDCD] hover:border-[#A8C879] hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#264F24]/10 flex items-center justify-center text-[#264F24] mb-5 group-hover:bg-[#264F24] group-hover:text-[#A8C879] transition-colors">
                  {panel.icon}
                </div>
                <h3 className="font-display font-black text-lg uppercase text-[#22231F] mb-3">{panel.title}</h3>
                <p className="font-body text-sm text-[#676A61] leading-relaxed">{panel.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="bg-[#FCFAF6] py-24 lg:py-32">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mb-12">
            <h2 className="font-display font-black text-4xl lg:text-6xl text-[#22231F] uppercase leading-none mb-4">
              Protein for<br />
              <span className="text-[#264F24]">Every Table</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audienceCards.map((card) => (
              <div key={card.title} className="group rounded-2xl overflow-hidden border border-[#E8DDCD] bg-white hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-[4/3] overflow-hidden bg-[#E8DDCD]">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-black text-base uppercase text-[#22231F] mb-2">{card.title}</h3>
                  <p className="font-body text-sm text-[#676A61] leading-relaxed mb-4">{card.desc}</p>
                  <Link
                    to={card.to}
                    className="font-body text-sm font-semibold text-[#264F24] hover:text-[#173A22] inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    {card.cta}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP CTA */}
      <section className="bg-[#264F24] py-24 lg:py-32">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 text-center">
          <p className="font-display font-bold text-xs tracking-[0.2em] uppercase text-[#A8C879] mb-4">
            Grow With Us
          </p>
          <h2 className="font-display font-black text-4xl lg:text-6xl text-[#F5EDE1] uppercase leading-none mb-6 max-w-3xl mx-auto">
            Let's Grow the Future<br />
            <span className="text-[#A8C879]">of Food Together.</span>
          </h2>
          <p className="font-body text-[#F5EDE1]/70 max-w-xl mx-auto mb-10 text-base leading-relaxed">
            We work with restaurants, cafés, hotels, retailers, distributors and fitness businesses looking to offer innovative plant-based protein.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/wholesale"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#A8C879] text-[#173A22] font-body font-bold text-sm hover:bg-[#FCFAF6] transition-colors"
            >
              Become a Partner
            </Link>
            <Link
              to="/wholesale"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border-2 border-[#F5EDE1]/40 text-[#F5EDE1] font-body font-bold text-sm hover:border-[#A8C879] hover:text-[#A8C879] transition-colors"
            >
              Wholesale Enquiry
            </Link>
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="bg-[#FCFAF6] py-24 lg:py-32">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="font-display font-bold text-xs tracking-[0.2em] uppercase text-[#557A35] mb-2">
                From the Blog
              </p>
              <h2 className="font-display font-black text-4xl lg:text-5xl text-[#22231F] uppercase leading-none">
                The Protein Journal
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 font-body font-semibold text-sm text-[#264F24] hover:text-[#173A22] whitespace-nowrap"
            >
              All Articles
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <article key={post.title} className="group rounded-2xl overflow-hidden bg-white border border-[#E8DDCD] hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-[3/2] overflow-hidden bg-[#E8DDCD]">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#264F24]/10 text-[#264F24] font-body text-xs font-semibold">
                      {post.category}
                    </span>
                    <span className="font-body text-xs text-[#676A61]">{post.readTime}</span>
                  </div>
                  <h3 className="font-display font-black text-lg text-[#22231F] leading-snug mb-3">
                    {post.title}
                  </h3>
                  <p className="font-body text-sm text-[#676A61] leading-relaxed mb-4">{post.excerpt}</p>
                  <Link
                    to="/blog"
                    className="font-body text-sm font-semibold text-[#264F24] hover:text-[#173A22] inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    Read Article
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section className="bg-[#30251D] py-16">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-display font-black text-3xl lg:text-4xl text-[#F5EDE1] uppercase leading-none mb-2">
                Curious About The<br />
                <span className="text-[#A8C879]">Next Protein?</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
              <a
                href="tel:+9779714504317"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#F5EDE1]/10 text-[#F5EDE1] font-body font-semibold text-sm hover:bg-[#F5EDE1]/20 transition-colors border border-[#F5EDE1]/20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.28-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call Us
              </a>
              <a
                href="https://wa.me/9779714504317"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white font-body font-semibold text-sm hover:bg-[#20BA5A] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <a
                href="mailto:thenextproteinnepal@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#F5EDE1]/10 text-[#F5EDE1] font-body font-semibold text-sm hover:bg-[#F5EDE1]/20 transition-colors border border-[#F5EDE1]/20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Email Us
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#F5EDE1]/10 text-[#F5EDE1] font-body font-semibold text-sm hover:bg-[#F5EDE1]/20 transition-colors border border-[#F5EDE1]/20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Find Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}