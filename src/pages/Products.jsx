export default function Products() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-center mb-12">Our Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="bg-white rounded shadow p-4 text-center">
            <img src={`/纸${n}.png`} alt={`Product ${n}`} className="rounded mb-4 w-full h-56 object-cover" />
            <h4 className="font-semibold mb-2">Product {n}</h4>
            <p className="text-sm text-gray-600">Premium tissue for home, office, or travel.</p>
          </div>
        ))}
      </div>
    </section>
  );
}