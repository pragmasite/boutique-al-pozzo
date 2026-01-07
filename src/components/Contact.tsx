import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Contact = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: Phone,
      label: t.contact.phone,
      value: "+41 91 791 41 55",
      href: "tel:+41917914155",
    },
    {
      icon: Mail,
      label: t.contact.email,
      value: "stoeckliclaudia@icloud.com",
      href: "mailto:stoeckliclaudia@icloud.com",
    },
    {
      icon: MapPin,
      label: t.contact.address,
      value: "Via Moscia 4, 6612 Ascona, CH",
      href: "https://maps.google.com/?q=46.154711,8.766013",
    },
  ];

  return (
    <section id="contatti" className="py-24 bg-background">
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
            {t.contact.label}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4">
            {t.contact.title1}
            <br />
            <span className="text-accent">{t.contact.title2}</span>
          </h2>
          <p className="mt-4 text-lg text-foreground/60 max-w-2xl mx-auto">
            {t.contact.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={index}
                  href={info.href}
                  target={info.label === t.contact.address ? "_blank" : undefined}
                  rel={info.label === t.contact.address ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex gap-4 p-6 rounded-lg border bg-card hover:shadow-soft hover:border-accent transition-all group"
                >
                  <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Icon className="h-6 w-6 text-accent group-hover:text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground/60">
                      {info.label}
                    </p>
                    <p className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ delay: 0.3 }}
            className="relative rounded-lg overflow-hidden shadow-soft border h-96"
          >
            <iframe
              title="Boutique Al Pozzo Location"
              width="100%"
              height="100%"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2754.1234567890123!2d8.766013!3d46.154711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4785b8d8d8d8d8d9%3A0x1234567890abcdef!2sVia%20Moscia%204%2C%206612%20Ascona!5e0!3m2!1sen!2sch!4v1234567890"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
