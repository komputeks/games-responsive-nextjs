"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Gamepad2, Menu, Play, Search, ShoppingCart, Star, Trophy, X } from "lucide-react";
import { useState } from "react";

const games = [
  { title: "Cyber Horizon", genre: "Action / Adventure", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=85", accent: "#f34464" },
  { title: "Lost Kingdom", genre: "Fantasy / RPG", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=900&q=85", accent: "#8c65ff" },
  { title: "Night Velocity", genre: "Racing / Sports", image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=900&q=85", accent: "#26c6da" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [slide, setSlide] = useState(0);

  const nextSlide = () => setSlide((value) => (value + 1) % 3);
  const prevSlide = () => setSlide((value) => (value + 2) % 3);

  return (
    <main>
      <section className="hero" id="home">
        <Image className="hero-bg" src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=2000&q=90" alt="Gaming setup with neon lights" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <header className="header shell">
          <a className="brand" href="#home" aria-label="Games home"><Gamepad2 size={30} strokeWidth={2.5} /><span>GAMES</span></a>
          <nav className={menuOpen ? "nav open" : "nav"} aria-label="Main navigation">
            <a className="active" href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#games" onClick={() => setMenuOpen(false)}>Games</a>
            <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>
          <div className="header-actions">
            <button className="icon-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search"><Search size={19} /></button>
            <button className="icon-btn cart" aria-label="Shopping cart"><ShoppingCart size={20} /><i>2</i></button>
            <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
          </div>
          {searchOpen && <div className="search-box"><input autoFocus aria-label="Search games" placeholder="Search games..." /><button onClick={() => setSearchOpen(false)}><Search size={18} /></button></div>}
        </header>

        <div className="hero-content shell">
          <div className="eyebrow"><span /> Welcome to the next level</div>
          <h1>PLAY.<br /><em>EXPLORE.</em><br />CONQUER.</h1>
          <p>Step into worlds without limits. Discover epic adventures, challenge your skills, and become the hero of your own story.</p>
          <div className="hero-buttons">
            <a className="primary-btn" href="#games">Explore Games <ChevronRight size={18} /></a>
            <button className="play-btn" onClick={() => document.getElementById("games")?.scrollIntoView({ behavior: "smooth" })}><span><Play size={17} fill="currentColor" /></span> Watch trailer</button>
          </div>
        </div>
        <div className="slider-controls">
          <button onClick={prevSlide} aria-label="Previous slide"><ChevronLeft /></button>
          <div><b>0{slide + 1}</b><span /><small>03</small></div>
          <button onClick={nextSlide} aria-label="Next slide"><ChevronRight /></button>
        </div>
        <a className="scroll" href="#about"><span />SCROLL TO DISCOVER</a>
      </section>

      <section className="intro shell" id="about">
        <div className="section-tag">About us</div>
        <div className="intro-copy">
          <div><h2>WE CREATE<br /><em>LEGENDS.</em></h2></div>
          <div><p>We are a passionate community built around the games that move us. From pulse-pounding action to extraordinary worlds, every title is selected to give you an experience worth remembering.</p><a href="#contact">Discover our story <ChevronRight size={17} /></a></div>
        </div>
        <div className="stats">
          <div><Trophy /><strong>15+</strong><span>Years of experience</span></div>
          <div><Gamepad2 /><strong>240</strong><span>Games launched</span></div>
          <div><Star /><strong>8M+</strong><span>Active players</span></div>
        </div>
      </section>

      <section className="featured" id="games">
        <div className="shell">
          <div className="section-head"><div><div className="section-tag">Featured games</div><h2>CHOOSE YOUR<br /><em>ADVENTURE.</em></h2></div><a href="#gallery">View all games <ChevronRight size={17} /></a></div>
          <div className="game-grid" id="gallery">
            {games.map((game, index) => <article className="game-card" key={game.title} style={{ "--accent": game.accent } as React.CSSProperties}>
              <Image src={game.image} alt={game.title} fill sizes="(max-width: 760px) 100vw, 33vw" />
              <div className="game-overlay" />
              <span className="game-number">0{index + 1}</span>
              <div className="game-info"><span>{game.genre}</span><h3>{game.title}</h3><button aria-label={`Play ${game.title}`}><Play fill="currentColor" size={16} /></button></div>
            </article>)}
          </div>
        </div>
      </section>

      <footer id="contact"><div className="shell footer-inner"><a className="brand" href="#home"><Gamepad2 size={27} /><span>GAMES</span></a><p>Ready for your next great adventure?</p><a className="primary-btn" href="mailto:play@example.com">Join the community <ChevronRight size={18} /></a></div></footer>
    </main>
  );
}
