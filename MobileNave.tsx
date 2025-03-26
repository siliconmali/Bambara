import { Button } from "antd";
import Link from "next/link";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: any;
}

export default function MobileNav({ isOpen, setIsOpen, user }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50 bg-light-default">
      <div className="pt-16 pb-3 px-4 space-y-3">
        <Link
          href="/how-it-works"
          className="block py-2 text-base font-medium text-gray-700 hover:text-primary-default"
          onClick={() => setIsOpen(false)}
        >
          Comment ça marche
        </Link>
        <Link
          href="/explore"
          className="block py-2 text-base font-medium text-gray-700 hover:text-primary-default"
          onClick={() => setIsOpen(false)}
        >
          Explorer
        </Link>
        <Link
          href="/translators"
          className="block py-2 text-base font-medium text-gray-700 hover:text-primary-default"
          onClick={() => setIsOpen(false)}
        >
          Pour les traducteurs
        </Link>
        <Link
          href="/developers"
          className="block py-2 text-base font-medium text-gray-700 hover:text-primary-default"
          onClick={() => setIsOpen(false)}
        >
          Pour les développeurs
        </Link>
        <div className="pt-4 space-y-3">
          {!user ? (
            <>
              <Button className="w-full">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  Se connecter
                </Link>
              </Button>
              <Link href="/signup" onClick={() => setIsOpen(false)}>
              <Button className="w-full" type="primary">
                  S&apos;inscrire
              </Button>
              </Link>
            </>
          ) : (
            <Button className="w-full">Se déconnecter</Button>
          )}
        </div>
      </div>
    </div>
  );
}
