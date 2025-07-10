
export default function NARPAWebsite() {
  return (
    <main className="bg-[#fdfbf7] text-gray-900 font-serif">
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
      <section className="bg-[#f1efe9] text-center py-20 px-4">
        <h2 className="text-5xl font-semibold mb-4 text-green-800">Softness You Feel. Purity You Trust.</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-700">A premium tissue brand rooted in nature. Designed with care for families across Central Asia.</p>
        <a href="#partners">
          <button className="bg-green-700 text-white px-8 py-3 rounded-full shadow hover:bg-green-800">Become a Distributor</button>
        </a>
      </section>
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <img src="/纸2.png" alt="NARPA Product Showcase" className="w-full rounded shadow" />
        </div>
      </section>
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-6">About NARPA</h3>
          <p className="text-gray-700 leading-relaxed">NARPA is a nature-inspired tissue brand created for Central Asia. With clean formulas, elegant designs, and international manufacturing standards, we bring softness and safety to homes across Uzbekistan, Kazakhstan, and beyond.</p>
        </div>
      </section>
      <section id="products" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-green-800 mb-12">Our Product Range</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white rounded shadow p-4">
              <img src="/纸1.png" alt="Soft Pack & Carton" className="rounded mb-4" />
              <h4 className="font-semibold text-lg mb-2">Soft Pack Tissue + Carton</h4>
              <p className="text-sm text-gray-600">Perfect for households and retail distribution.</p>
            </div>
            <div className="bg-white rounded shadow p-4">
              <img src="/纸3.png" alt="Pocket & Wet Wipes" className="rounded mb-4" />
              <h4 className="font-semibold text-lg mb-2">Pocket, Wipes & Roll</h4>
              <p className="text-sm text-gray-600">Convenient formats for travel and restrooms.</p>
            </div>
            <div className="bg-white rounded shadow p-4">
              <img src="/纸4.png" alt="Sterile Feminine Tissues" className="rounded mb-4" />
              <h4 className="font-semibold text-lg mb-2">Sterile Feminine Soft Tissues</h4>
              <p className="text-sm text-gray-600">Hygienic softness for sensitive care.</p>
            </div>
          </div>
        </div>
      </section>
      <footer className="text-center text-sm py-6 text-gray-500 bg-white">
        © 2025 NARPA Tissue. All rights reserved.
      </footer>
    </main>
  );
}
