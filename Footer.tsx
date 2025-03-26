import { Facebook, Twitter, Linkedin, Mail, Ticket } from "lucide-react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";


export default function Footer() {
  return (
    <footer className="bg-light-default text-content-default py-3 mt-5 w-full bottom-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold">NkoDon</h2>
            <p className="text-sm text-content-tertiary mt-1">
              Plateforme de traduction et préservation linguistique.
            </p>
          </div>
          <div className="flex space-x-6 text-xs md:text-sm">
            <Link href="/about" className="hover:text-primary-default">
              À propos
            </Link>
            <Link href="/guide" className="hover:text-primary-default">
              Guide
            </Link>
            <Link href="/contact" className="hover:text-primary-default">
              Contact
            </Link>
            <Link href="/legal" className="hover:text-primary-default">
              Mentions légales
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              href="https://www.facebook.com/share/16GCoWgLxS/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-5 h-5 text-content-secondary hover:text-primary-default" />
            </Link>
            <Link
              href="https://www.tiktok.com/@nkodon?is_from_webapp=1&sender_device=pc"
              target="_blank"
            >
               <FontAwesomeIcon icon={faTiktok} className="w-5 h-5 text-content-secondary hover:text-primary-default" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-5 h-5 text-content-secondary hover:text-primary-default" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-5 h-5 text-content-secondary hover:text-primary-default" />
            </Link>
            <Link href="mailto:support@nko-don.com">
              <Mail className="w-5 h-5 text-content-secondary hover:text-primary-default" />
            </Link>
          </div>
        </div>

        <div className="border-t border-solid-50 mt-6 pt-6 text-center text-sm text-content-tertiary">
          &copy; {new Date().getFullYear()} NkoDon. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
