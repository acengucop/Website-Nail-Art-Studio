import React, { useEffect, useState } from "react";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/products/")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-primary text-center">Semua Produk</h1>
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading produk...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-gray-400">Tidak ada produk tersedia.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-md p-4 flex flex-col"
              >
                <img
                  src={product.image?.startsWith("http") ? product.image : `http://localhost:8000${product.image}`}
                  alt={product.name}
                  className="aspect-square object-cover object-top mb-4"
                />
                <h2 className="text-xl font-bold mb-1">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <span className="text-primary font-bold mb-2">{Number(product.price).toLocaleString("id-ID", {style: "currency", currency: "IDR"})}</span>
                <span className="text-xs text-gray-500">Stok: {product.stock}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
