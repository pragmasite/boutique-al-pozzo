import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Gallery = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentSlide, setCurrentSlide] = useState(0);

  // Gallery images with descriptions - using placeholder approach since no images provided
  const images = [
    { src: "/api/placeholder/400/300", alt: "Collezione Elegante" },
    { src: "/api/placeholder/400/300", alt: "Stehmann Pantaloni" },
    { src: "/api/placeholder/400/300", alt: "Accessori Raffinati" },
    { src: "/api/placeholder/400/300", alt: "Look Completo" },
    { src: "/api/placeholder/400/300", alt: "Dettagli Curati" },
    { src: "/api/placeholder/400/300", alt: "Moda Consapevole" },
  ];

  const isSmallGallery = images.length <= 6;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="galerie" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2 }}
          className="mb-16 text-center"
        >
          <span className="text-sm uppercase tracking-widest text-primary font-semibold">
            {t.gallery.label}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4">
            {t.gallery.title}
          </h2>
          <p className="mt-4 text-lg text-foreground/60 max-w-2xl mx-auto">
            {t.gallery.description}
          </p>
        </motion.div>

        {/* Gallery */}
        {isSmallGallery ? (
          // Grid layout for 6 or fewer images
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-sm font-medium text-white">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Slider layout for more than 6 images
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-lg bg-muted aspect-video md:aspect-[16/9]">
              <motion.img
                key={currentSlide}
                src={images[currentSlide].src}
                alt={images[currentSlide].alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-lg font-medium text-white">
                  {images[currentSlide].alt}
                </p>
                <p className="text-sm text-white/70 mt-1">
                  {currentSlide + 1} / {images.length}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full border hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto px-4 flex-1 mx-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentSlide
                        ? "border-accent"
                        : "border-transparent opacity-50 hover:opacity-75"
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="p-2 rounded-full border hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
