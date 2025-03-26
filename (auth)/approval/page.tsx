'use client'
import { CircleSlash2, Clock, Hourglass } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

function page() {

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      signOut({ redirect: false }); 
      router.push("/");
    }, 5000); 

    return () => clearTimeout(timer);
  }, [router]);


  return (
    <section className="min-h-screen  flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="relative mx-auto w-20 h-20 bg-light-default rounded-full flex items-center justify-center mb-4">
              <Hourglass className="w-10 h-10 text-primary-default animate-pulse" />
              <div className="absolute -right-1 -top-1">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-default opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-primary-default"></span>
                </span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-content-default">
              En attente d'approbation...
            </h1>
            <p className="text-content-secondary">
              {" "}
              Votre demande est en cours d'examen par notre équipe.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-light-default rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary-default" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-content-default">
                  Demande soumise.
                </p>
                <p className="text-sm text-content-secondary">
                  {" "}
                  Votre demande a été reçue.
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-light-default text-primary-default">
                  Complété
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-light-tertiary rounded-full flex items-center justify-center animate-pulse">
                <CircleSlash2 className="w-4 h-4 text-primary-tertiary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-content-default">
                  En cours d'examen.
                </p>
                <p className="text-sm text-content-secondary">
                  Notre équipe examine votre soumission.
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  En cours
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-content-default">
                  {" "}
                  Temps estimé
                </p>
                <p className="text-sm text-content-secondary">24-48 heures</p>
              </div>
              <div className="w-16 h-16">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeDasharray="50, 100"
                    className="animate-[dash_1.5s_ease-in-out_infinite]"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-content-default">
              Nous vous informerons dès que votre demande aura été approuvée.
            </p>
            <p className="text-sm pt-2 border-t-2 text-primary-tertiary">
             Vous serrez redirigé vers la page d'accueil dans quelques secondes. 
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
