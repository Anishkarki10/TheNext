import { useState } from 'react'
import { Link } from 'react-router-dom'

const categories = ['All', 'Plant-Based Nutrition', 'Seitan Education', 'Nepalese Food', 'Sustainability', 'Product Updates', 'Restaurant & Food Service', 'Recipes & Serving Ideas']

const articles = [
  {
    title: 'What Is Seitan? Everything You Need to Know',
    category: 'Seitan Education',
    excerpt: 'Seitan has been a cornerstone of plant-based cooking for centuries. Discover how vital wheat gluten becomes a satisfying, protein-rich meat alternative with a firm, chewy texture.',
    author: 'Content Required',
    date: '2024',
    readTime: '5 min read',
    featured: true,
    img: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&h=500&fit=crop&auto=format',
  },
  {
    title: 'Why Plant-Based Protein Is the Future of Food',
    category: 'Plant-Based Nutrition',
    excerpt: 'Consumer choices around protein are changing rapidly. Here is why plant-based options are becoming a mainstream food category worldwide — and what it means for Nepal.',
    author: 'Content Required',
    date: '2024',
    readTime: '6 min read',
    featured: false,
    img: 'https://images.unsplash.com/photo-1490477688-16073dfa7b39?w=600&h=400&fit=crop&auto=format',
  },
  {
    title: 'Delicious Nepalese Meals Using Plant-Based Meat',
    category: 'Nepalese Food',
    excerpt: 'From momo fillings to sekuwa-style skewers, discover how Protein Loaf fits naturally into the heart of Nepalese cuisine and everyday cooking.',
    author: 'Content Required',
    date: '2024',
    readTime: '4 min read',
    featured: false,
    img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop&auto=format',
  },
  {
    title: 'How to Cook Protein Loaf: A Beginner\'s Guide',
    category: 'Recipes & Serving Ideas',
    excerpt: 'New to plant-based meat? This step-by-step guide walks you through thawing, marinating and cooking Protein Loaf for the best possible texture and flavour.',
    author: 'Content Required',
    date: '2024',
    readTime: '7 min read',
    featured: false,
    img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop&auto=format',
  },
  {
    title: 'Why Restaurants Are Adding Plant-Based Protein to Their Menus',
    category: 'Restaurant & Food Service',
    excerpt: 'Hospitality businesses across South Asia are responding to growing customer demand. Here is how plant-based proteins are being integrated into professional kitchen operations.',
    author: 'Content Required',
    date: '2024',
    readTime: '5 min read',
    featured: false,
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&auto=format',
  },
  {
    title: 'Nepal\'s First Plant-Based Protein Loaf — Introducing The Next Protein',
    category: 'Product Updates',
    excerpt: 'We are excited to introduce Protein Loaf — a Nepalese-made, high-protein plant-based meat alternative crafted for the meals you already love.',
    author: 'Content Required',
    date: '2024',
    readTime: '3 min read',
    featured: false,
    img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop&auto=format',
  },
]

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const featured = articles[0]
  const rest = articles.slice(1)

  const filtered = rest.filter((a) => {
    const matchCat = activeCategory === 'All' || a.category === activeCategory
    const matchSearch = search === '' || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-[#F5EDE1] py-20">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <p className="font-display font-bold text-xs tracking-[0.2em] uppercase text-[#557A35] mb-3">From the Blog</p>
          <h1 className="font-display font-black text-5xl lg:text-7xl text-[#22231F] uppercase leading-none mb-8">
            The Protein Journal
          </h1>

          {/* Search */}
          <div className="relative max-w-md">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#676A61]">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-[#E8DDCD] rounded-full font-body text-sm text-[#22231F] placeholder:text-[#676A61] focus:outline-none focus:ring-2 focus:ring-[#264F24]/30 focus:border-[#264F24]"
            />
          </div>
        </div>
      </section>

      {/* Category filters */}
      <section className="bg-[#FCFAF6] border-b border-[#E8DDCD] sticky top-16 z-30">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-4 flex gap-3 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-body text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#264F24] text-[#F5EDE1]'
                  : 'bg-[#F5EDE1] text-[#676A61] hover:bg-[#E8DDCD]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured article */}
      <section className="bg-[#FCFAF6] py-12">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden border border-[#E8DDCD] hover:shadow-lg transition-shadow">
            <div className="aspect-[4/3] lg:aspect-auto overflow-hidden bg-[#E8DDCD]">
              <img
                src={featured.img}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2.5 py-1 rounded-full bg-[#264F24]/10 text-[#264F24] font-body text-xs font-semibold">
                  {featured.category}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#F5EDE1] text-[#676A61] font-body text-xs font-semibold">
                  Featured
                </span>
                <span className="font-body text-xs text-[#676A61]">{featured.readTime}</span>
              </div>
              <h2 className="font-display font-black text-3xl lg:text-4xl text-[#22231F] leading-snug mb-4">
                {featured.title}
              </h2>
              <p className="font-body text-[#676A61] leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 font-body font-bold text-sm text-[#264F24] hover:text-[#173A22]"
                >
                  Read Article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <span className="font-body text-xs text-[#676A61]">{featured.date}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article grid */}
      <section className="bg-[#FCFAF6] pb-24">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-display font-black text-2xl text-[#22231F] uppercase mb-2">No articles found</p>
              <p className="font-body text-[#676A61]">Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article) => (
                <article key={article.title} className="group bg-white rounded-2xl overflow-hidden border border-[#E8DDCD] hover:shadow-lg transition-shadow">
                  <div className="aspect-[3/2] overflow-hidden bg-[#E8DDCD]">
                    <img
                      src={article.img}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-1 rounded-full bg-[#264F24]/10 text-[#264F24] font-body text-xs font-semibold">
                        {article.category}
                      </span>
                      <span className="font-body text-xs text-[#676A61]">{article.readTime}</span>
                    </div>
                    <h3 className="font-display font-black text-lg text-[#22231F] leading-snug mb-3">{article.title}</h3>
                    <p className="font-body text-sm text-[#676A61] leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
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
          )}
        </div>
      </section>
    </div>
  )
}
