import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: t.nav.about, href: "#chi-siamo" },
    { label: t.nav.services, href: "#specialita" },
    { label: t.nav.gallery, href: "#galerie" },
    { label: t.nav.hours, href: "#orari" },
    { label: t.nav.contact, href: "#contatti" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <img
              src="/images/logo.png"
              alt="Boutique Al Pozzo"
              className="h-8 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-sm opacity-90">
              {t.footer.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm opacity-75 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">
              {t.contact.label}
            </h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li>
                <a
                  href="tel:+41917914155"
                  className="hover:opacity-100 transition-opacity"
                >
                  +41 91 791 41 55
                </a>
              </li>
              <li>
                <a
                  href="mailto:stoeckliclaudia@icloud.com"
                  className="hover:opacity-100 transition-opacity break-all"
                >
                  stoeckliclaudia@icloud.com
                </a>
              </li>
              <li>Ascona, Switzerland</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-75">
            © {currentYear} Boutique Al Pozzo. {t.footer.copyright}
          </p>
          <p className="text-sm opacity-75">
            {t.footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
