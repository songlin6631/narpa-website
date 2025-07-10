import React from 'react';

export default function NARPAWebsite() {
  return (
    <main className="bg-white text-gray-900 font-serif">
      <div className="text-right p-2 text-sm pr-6">
        <select className="border rounded p-1 bg-white shadow">
          <option>English</option>
          <option>Русский</option>
          <option>O‘zbekcha</option>
        </select>
      </div>
      <header className="p-6 shadow flex justify-between items-center bg-white">
        <h1 className="text-3xl font-bold tracking-wide text-green-700">NARPA</h1>
        <nav className="space-x-6 text-sm font-medium text-gray-700">
          <a href="#about">About</a>
          <a href="#products">Products</a>
          <a href="#quality">Quality</a>
          <a href="#sustainability">Sustainability</a>
          <a href="#faq">FAQ</a>
          <a href="#blog">Blog</a>
          <a href="#partners">Partners</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <section className="bg-gray-100 text-center py-20 px-4">
        <h2 className="text-5xl font-semibold mb-4 text-green-800">Softness You Feel. Purity You Trust.</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-700">A premium tissue brand rooted in nature. Designed with care for families across Central Asia.</p>
        <a href="#partners">
          <button className="bg-green-700 text-white px-8 py-3 rounded-full shadow hover:bg-green-800">Become a Distributor</button>
        </a>
      </section>
      <section id="quality" className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-6">Our Commitment to Quality</h3>
          <p className="text-gray-700 mb-4">Every NARPA product is crafted with precision, from pulp to packaging. Our tissues meet international hygiene standards and undergo strict quality inspections at every stage.</p>
          <p className="text-gray-700">From the softness of each sheet to the elegance of our visual design, we believe daily essentials deserve premium treatment.</p>
        </div>
      </section>
      <section id="sustainability" className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-6">Sustainability</h3>
          <p className="text-gray-700 mb-4">We care about the planet. NARPA uses responsibly sourced paper pulp and minimal packaging designs to reduce waste and carbon impact. Our inks are soy-based and all packaging is recyclable.</p>
          <p className="text-gray-700">By choosing NARPA, you're supporting a cleaner future for Central Asia.</p>
        </div>
      </section>
    </main>
  );
}
