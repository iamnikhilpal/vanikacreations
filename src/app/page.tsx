"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Mail, Phone, Download, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Product type definition
interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  priceRange: string;
  articleId: string;
}

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      else if (e.key === 'ArrowLeft') handlePrevImage();
      else if (e.key === 'ArrowRight') handleNextImage();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;
  const images = [product.image];
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => { onClose(); setIsClosing(false); }, 300);
  };
  const handlePrevImage = () => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
  const handleNextImage = () => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
  return (
    <>
      <Toaster position="top-center" />
      <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
        <div className={`absolute inset-0 bg-[#2C2C2C]/80 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`} onClick={handleClose}></div>
        <div className={`relative bg-white rounded-2xl w-full max-w-full sm:max-w-3xl mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto overflow-x-hidden transform transition-all duration-300 shadow-xl border border-[#E1B07E]/20 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
          <button onClick={handleClose} className="absolute right-4 top-4 p-2 rounded-full hover:bg-[#B08BBB]/10 text-[#2C2C2C] transition-colors z-10"><X className="w-6 h-6" /></button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6">
            <div className="relative h-48 sm:h-72 md:h-96 group">
              <div className="relative w-full h-full bg-[#F5EFE6] rounded-lg">
                <Image src={images[currentImageIndex]} alt={product.title} fill className="object-contain transition-opacity duration-300" sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-2 gap-y-2 gap-x-4 pr-0 sm:pr-12 flex-wrap min-w-0">
                <h2 className="text-2xl font-bold text-[#B08BBB] truncate min-w-0 flex-1" title={product.title}>{product.title}</h2>
              </div>

              <span className="block text-xs text-[#2C2C2C]/70 mb-4">ArticleId: {product.articleId}</span>
              <div className="flex flex-row items-center gap-x-4 mb-2">
                <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Share link to family and friends!'); }} className="rounded-full hover:bg-[#B08BBB]/10 text-[#2C2C2C] transition-colors flex-shrink-0" title="Copy Link">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                </button>
                <a href="https://www.instagram.com/vanika_creations_/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#B08BBB] font-semibold">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0z" /></svg>
                </a>
              </div>
              <pre className="text-[#2C2C2C] mb-6 whitespace-pre-line break-words text-base font-sans leading-relaxed bg-transparent border-0 p-0">
                {product.description}
              </pre>
              <div className="mt-auto space-y-4">
                <div className="grid grid-rows-1 gap-4">
                  <button className="bg-[#B08BBB] hover:bg-[#9A3324] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md flex items-center justify-center gap-2" disabled>
                    <p className="text-2xl font-bold text-[#9A3324]">{product.priceRange}</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const products: Product[] = [
  {
    id: 1,
    title: 'SNEHA & SAMRUDDHI HAMPER',
    description: `Add sweetness and prosperity to your celebrations with our Sneha & Samruddhi Hamper — a festive delight carefully crafted by Vanika Creations.

        This hamper combines indulgence with tradition, featuring:

        * Rasgulla & Gulab Jamun (classic Indian sweets)
        * Luxurious Ferrero Rocher chocolate
        * Flavorful Khatta Meetha Mixture
        * Crispy Sev Bhujia snack
        * Ganesh & Laxmi idols for divine blessings
        * Decorative festive diyas
        * Traditional toran for your home décor

        💫 A perfect blend of taste, culture, and festivity — ideal for gifting family, friends, and loved ones this Diwali.`,
    image: '/SNEHA_&_SAMRUDDHI_HAMPER.png',
    priceRange: '₹849 – ₹1049',
    articleId: 'BB1020251',
  },
  {
    id: 2,
    title: 'UTSAV HAMPER',
    description: `Celebrate the true spirit of festivity with our Utsav Hamper — a wholesome blend of health, taste, and tradition by *Vanika Creations*.

        This thoughtfully curated hamper includes:

        * Premium Almonds & Cashews 
        * Raisins & Apricots 
        * Pistachios 
        * Auspicious Shubh-Labh stickers
        * Decorative festive diyas
        * Traditional toran for home décor

        🌟 A perfect choice for sharing love, prosperity, and good health with your dear ones during this festive season.`,
    image: '/UTSAV_HAMPER.png',
    priceRange: '₹649 – ₹849',
    articleId: 'BB1020252',
  },
  {
    id: 3,
    title: 'GOLDEN GLOW LAKSHMI HAMPER',
    description: `Bring home prosperity and brightness this festive season with the Golden Glow Lakshmi Hamper. Thoughtfully curated with a mix of sweet, savory, and festive delights, it makes for the perfect Diwali gift for friends, family, and colleagues.

        This joyful hamper includes:

        * Indian Cookies
        * Refreshing Indian soft drinks/juices
        * Savory Snacks (Sev Bhujia, Kurkure)
        * Healthy Roasted Chana (cracker)
        * Crunchy Wafers
        * Fresh Fruit Cake
        * Decorative Festive Diyas
        * Traditional Toran

        ✨ A vibrant hamper that combines taste, tradition, and festivity — spreading happiness with every gift.`,
    image: '/GOLDEN_GLOW_LAKSHMI_HAMPER.png',
    priceRange: '₹499 – ₹799',
    articleId: 'BB1020253',
  },
  {
    id: 4,
    title: 'BANDHAN-E-KHUSHIYAN PACK',
    description: `Celebrate the bond of togetherness with the Bandhan-e-Khushiyan Pack. A perfect blend of premium dry fruits and festive essentials, this hamper is crafted to bring health, joy, and prosperity to your loved ones this Diwali.

        This elegant hamper includes:

        * Almonds and Cashews
        * Raisins and Apricot
        * Pistachio
        * Decorative Festive Diyas
        * Traditional Toran

        ✨ A premium choice for gifting that reflects love, tradition, and happiness in every detail.`,
    image: '/BANDHAN-E-KHUSHIYAN_PACK.png',
    priceRange: '₹849 – ₹1049',
    articleId: 'T1020251',
  },
  {
    id: 5,
    title: 'FAMILY FIESTA HAMPER',
    description: `Add warmth and delight to your family celebrations with the Family Fiesta Hamper. Thoughtfully curated with a mix of traditional treats and festive essentials, this hamper is perfect for sharing love and joy this Diwali.

        This festive hamper includes:

        * Almonds and Cashews
        * Crunchy Sev Bhujia
        * Traditional Indian Sweets
        * Lord Ganesh & Laxmi Idols
        * Shubh-Labh Stickers
        * Decorative Festive Diyas
        * Beautiful Toran

        ✨ An affordable yet meaningful gift that makes every family celebration more special.`,
    image: '/FAMILY_FIESTA_HAMPER.png',
    priceRange: '₹279 – ₹549',
    articleId: 'B1020252',
  },
  {
    id: 6,
    title: 'DIL SE DIWALI HAMPER',
    description: `Celebrate this Diwali with heartfelt gifting through our Dil Se Diwali Hamper — a thoughtfully curated festive box by Vanika Creations.

        This hamper brings together the perfect blend of tradition and indulgence:

        * Aauthentic Indian sweets
        * Premium almonds & cashews
        * A luxurious Ferrero Rocher chocolate
        * Classic Khatta Meetha Mixture
        * Beautiful Ganesh & Laxmi idols for blessings
        * Decorative festive diya
        * Traditional toran for your home

        💫 A wholesome gifting choice that combines taste, tradition, and festive charm — perfect for sharing joy with family, friends, and colleagues.`,
    image: '/DIL_SE_DIWALI_HAMPER.png',
    priceRange: '₹699 – ₹999',
    articleId: 'B1020251',
  }
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    document.body.style.overflow = 'unset';
  };
  return (
    <div className="min-h-screen bg-[#F5EFE6]">
      {/* Navigation Bar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? 'bg-[#F5EFE6]/90 backdrop-blur-xl border-b border-[#E1B07E]/20'
        : 'bg-transparent'
        }`}>
        <div className="max-w-6xl mx-auto px-3 sm:px-6 w-full flex items-center justify-between py-3 sm:py-4">
          <div className="flex items-center space-x-4">
            <Link href="/products" className="flex items-center">
              <div className="w-16 h-8 sm:w-24 sm:h-10 md:w-32 md:h-12 relative flex items-center justify-center">
                <Image
                  src="/vanika.png"
                  alt="Vanika Logo"
                  fill
                  className="object-contain max-w-full max-h-full"
                  priority
                />
              </div>
            </Link>
            <div className="border-l-2 border-[#E1B07E] pl-3 sm:pl-4">
              <h1 className="text-lg sm:text-2xl font-bold text-[#B08BBB] leading-tight">
                Vanika
                <span className="font-light text-[#9A3324] ml-1 sm:ml-2">Creations</span>
              </h1>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#2C2C2C]/70">Crafting Memories</p>
            </div>
          </div>
          <div className="hidden md:flex space-x-8">
            {/* {['home', 'products', 'contact'].map((section) => ( */}
            <button
              onClick={() => {
                const homeSection = document.querySelector('#home-banner');
                homeSection?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className="capitalize transition-colors duration-200 text-[#2C2C2C] hover:text-[#B08BBB]"
            >
              Home
            </button>
            <button
              onClick={() => {
                const productSection = document.querySelector('#product-grid');
                productSection?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className="capitalize transition-colors duration-200 text-[#2C2C2C] hover:text-[#B08BBB]"
            >
              Products
            </button>
            <button
              onClick={() => {
                const contactSection = document.querySelector('#contact-section');
                contactSection?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className="capitalize transition-colors duration-200 text-[#2C2C2C] hover:text-[#B08BBB]"
            >
              Contact
            </button>

          </div>
        </div>
      </nav >

      {/* Banner Section */}
      <section className="pt-32 pb-20 relative min-h-[80vh] flex items-center" >
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full">
          <Image
            src="/banner.png"
            alt="Banner Background"
            fill
            sizes="100vw"
            quality={100}
            priority
            className="object-cover w-full h-full"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5EFE6]/90 to-[#F5EFE6]/70"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <div className="text-center">
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 text-[#9A3324] drop-shadow-sm">
              Celebrate Diwali in Style
            </h1>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold mb-6 text-[#B08BBB]">
              Exquisite Gift Hampers for the Festival of Lights
            </h2>
            <div className="bg-[#F5EFE6]/50 p-6 rounded-lg backdrop-blur-sm max-w-3xl mx-auto border border-[#E1B07E]/30">
              <p className="text-lg md:text-xl text-[#2C2C2C] leading-relaxed mb-4">
                Discover our carefully curated collection of luxury Diwali hampers,
                featuring artisanal sweets, premium dry fruits, and handcrafted decoratives.
              </p>
              <p className="text-base md:text-lg text-[#2C2C2C]/90 leading-relaxed">
                Each hamper is thoughtfully designed to bring joy and celebration to your loved ones.
                Pre-order now for special early bird discounts!
              </p>
            </div>
            <button
              onClick={() => {
                const productSection = document.querySelector('#product-grid');
                productSection?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className="mt-8 bg-[#B08BBB] hover:bg-[#9A3324] text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 group mx-auto"
            >
              <span>Explore Hampers</span>
              <svg
                className="w-5 h-5 transform transition-transform group-hover:translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        </div>
      </section >

      {/* Product Grid Section */}
      <section id="product-grid" className="py-20 relative scroll-mt-24" >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {products.map((product) => {
              const shortDesc = product.description.split('\n')[0];
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#E1B07E]/30 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full group min-h-[400px] sm:min-h-[500px]"
                >
                  <div className="relative h-72 overflow-hidden bg-[#F5EFE6]/50">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-grow space-y-4 justify-between">
                    <h3 className="text-lg sm:text-xl font-bold text-[#B08BBB] group-hover:text-[#9A3324] transition-colors duration-300 leading-tight min-h-[2.5rem] sm:min-h-[3.5rem]">
                      {product.title}
                      <span className="block text-xs text-[#2C2C2C]/70 mt-1">ArticleId: {product.articleId}</span>
                    </h3>
                    <p className="text-[#2C2C2C] leading-relaxed text-base min-h-[4.5rem] line-clamp-3">
                      {shortDesc}
                    </p>
                    <div className="pt-4 space-y-4 mt-auto">
                      <p className="text-xl font-semibold text-[#9A3324] border-t border-[#E1B07E]/30 pt-4">
                        {product.priceRange}
                      </p>
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="w-full bg-[#B08BBB] hover:bg-[#9A3324] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-102 hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        <span>View Details</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section >

      {/* Contact Section */}
      <section id="contact-section" className="py-8 sm:py-12 bg-[#F5EFE6] border-t border-[#E1B07E]/20">
        <div className="max-w-6xl mx-auto px-3 sm:px-6">
          <div className="bg-white rounded-2xl p-4 sm:p-8 border border-[#E1B07E]/30 shadow-lg">
            <h2 className="text-3xl font-bold text-[#B08BBB] mb-8 text-center">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="flex items-center gap-3 justify-center w-full">
                <div className="w-12 h-12 rounded-full bg-[#B08BBB]/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#9A3324]" />
                </div>
                <div>
                  <p className="text-[#2C2C2C] font-medium">Email</p>
                  <a href="mailto:vanikacreations2025@gmail.com" className="text-[#2C2C2C]/80 hover:text-[#B08BBB] transition-colors break-all">
                    vanikacreations2025@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 justify-center w-full -ml-11">
                <div className="w-12 h-12 rounded-full bg-[#B08BBB]/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#9A3324]" />
                </div>
                <div>
                  <p className="text-[#2C2C2C] font-medium">Phone</p>
                  <a href="tel:+917116299557" className="text-[#2C2C2C]/80 hover:text-[#B08BBB] transition-colors">
                    +91 (7116) 299-557
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 justify-center w-full">
                <a
                  href="https://www.instagram.com/vanika_creations_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#B08BBB] hover:bg-[#9A3324] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-md w-full sm:w-auto"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0z" /></svg>
                  <span>@vanika_creations_</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={handleCloseModal} />
      )}

      {/* Download Resume Section */}
      <div className="text-center p-8 bg-[#F5EFE6] border-t border-[#E1B07E]/20">
        <a
          href={`${process.env.BUCKET_URL}/vanika-diwali-hampers.pdf`}
          download
          className="inline-flex items-center space-x-2 bg-[#B08BBB] hover:bg-[#9A3324] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          <Download className="w-5 h-5" />
          <span>Download Catalogue</span>
        </a>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-base text-[#525252] p-4 sm:p-8">
        <p>© {new Date().getFullYear()} VanikaCreations. All rights reserved.</p>
      </div>
    </div >
  );
}
