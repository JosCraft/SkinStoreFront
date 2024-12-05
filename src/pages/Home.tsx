import React from 'react';
import MainLayout from '../templates/MainLayout';

const Home = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12 bg-gradient-to-r from-brown-100 via-brown-200 to-brown-300">
        <h1 className="text-5xl font-extrabold text-center text-brown-800 mt-8">
          Bienvenido a <span className="text-indigo-600">Skinstore</span>
        </h1>
        <p className="text-center text-xl text-brown-600 mt-4">
          Donde la calidad, el estilo y la durabilidad se encuentran. Descubre nuestra exclusiva colección de artículos de cuero, diseñados para durar toda la vida.
        </p>

        <div className="mt-8 text-center">
          <p className="text-lg text-gray-700 mx-auto max-w-3xl">
            En <span className="text-indigo-600">Skinstore</span> nos especializamos en ofrecer productos de cuero hechos a mano con pasión y precisión. 
            Cada pieza es única, creada por expertos artesanos que utilizan solo los mejores materiales para garantizar la durabilidad y un estilo atemporal. 
            ¿Listo para llevar tu estilo al siguiente nivel?
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <h3 className="text-2xl font-semibold text-brown-700 mb-4">Carteras y Billeteras</h3>
            <p className="text-gray-600">
              Nuestras carteras y billeteras están elaboradas con cuero de alta calidad, perfectas para quienes buscan estilo y funcionalidad en un solo producto.
              Con opciones para todos los gustos, desde elegantes hasta prácticas, todas diseñadas para resistir el paso del tiempo.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <h3 className="text-2xl font-semibold text-brown-700 mb-4">Chaquetas y Abrigos</h3>
            <p className="text-gray-600">
              Descubre nuestra colección de chaquetas y abrigos de cuero premium, diseñados para brindarte la mejor protección contra el frío sin sacrificar el estilo.
              Cada prenda está hecha a mano con detalles finos, combinando tradición y modernidad en un solo diseño.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <h3 className="text-2xl font-semibold text-brown-700 mb-4">Accesorios Personalizados</h3>
            <p className="text-gray-600">
              Da un toque único a tu estilo con nuestros accesorios de cuero personalizados. Desde cinturones hasta mochilas, puedes grabar tu iniciales o un mensaje especial en cada pieza.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-3xl font-semibold text-brown-700">¿Por qué elegir <span className="text-indigo-600">Skinstore</span>?</h2>
          <p className="text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
            En <span className="text-indigo-600">Skinstore</span> ofrecemos mucho más que simples productos de cuero. Ofrecemos una experiencia única, basada en la pasión por el trabajo artesanal y el compromiso con la sostenibilidad. 
            Nos enorgullece brindar artículos que no solo son elegantes y funcionales, sino que también respetan el medio ambiente.
          </p>
          <ul className="list-disc text-gray-600 mt-4 pl-6 space-y-2 text-lg mx-auto max-w-3xl">
            <li>Materiales de cuero éticos y sostenibles, libres de productos químicos dañinos.</li>
            <li>Artesanía hecha a mano por expertos con más de 20 años de experiencia.</li>
            <li>Personalización de productos para crear piezas únicas.</li>
            <li>Envío gratuito y rápido en compras superiores a $100, con empaques ecológicos.</li>
            <li>Garantía de satisfacción, con devoluciones fáciles y sin complicaciones.</li>
          </ul>
        </div>

        <div className="mt-12 text-center">
          <button className="px-8 py-4 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300">
            ¡Explora nuestra exclusiva colección ahora!
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
