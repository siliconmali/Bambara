"use client";
const bg = "/mali.jpg";
import { AudioLines, Languages, Lightbulb, OctagonAlert, Pencil, TriangleAlert } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div className="">
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="w-full h-[8rem] lg:h-[15rem] bg-center bg-cover"
      ></div>
      <div className="transform -translate-y-20 lg:-translate-y-36 text-white">
      <h1 className="text-3xl font-bold text-center mb-6">📜 Conditions Générales d'Utilisation</h1>
      <p className="text-lg text-white text-center ">
        Dernière mise à jour : Février 2025
      </p>
      </div>
      <div className="space-y-8 max-w-7xl -mt-20 px-3 mx-auto text-content-default">
        <section>
          <h2 className="text-2xl font-semibold">1️⃣ Accès et Utilisation</h2>
          <p className="text-content-secondary">
            Les utilisateurs peuvent <b>enregistrer des fichiers audio, transcrire, traduire et valider</b> des données linguistiques.  
            Toute personne de plus de <b>18 ans</b> peut contribuer. <b>Les mineurs doivent avoir le consentement d'un tuteur légal</b>.  
          </p>
          <p className="mt-4 font-semibold flex gap-2 items-center"><OctagonAlert /> Inactivité et données frauduleuses :</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Les comptes <b>inactifs</b> pendant une longue période peuvent être <b>suspendus</b>.</li>
            <li>Les utilisateurs partageant des <b>fausses données</b> seront immédiatement <b>bannis</b>.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">2️⃣ Contribution et Droits d'Auteur</h2>
          <p>
            Les utilisateurs qui partagent des <b>enregistrements audio, des transcriptions et des traductions</b>
            acceptent de les rendre utilisable par la team Nko.  
          </p>
          <p className="mt-4 font-semibold flex gap-3 items-center"><Lightbulb className="text-primary-tertiary" /> Ce que vous pouvez partager :</p>
          <ul className="list-disc list-inside space-y-2">
            <li className="flex gap-3 items-center"><AudioLines /> Enregistrements de votre voix lisant un texte affiché à l'écran.</li>
            <li className="flex gap-3 items-center"><Pencil /> Transcriptions des audios entendus en textes.</li>
            <li className="flex gap-3 items-center"><Languages /> Traductionsentre le Bambara, le N'Ko, le Français et l'Anglais.</li>
          </ul>

          <p className="mt-4 font-semibold flex gap-3 items-center"><TriangleAlert /> Ce qui est interdit :</p>
          <ul className="list-disc list-inside text-primary-tertiary space-y-2">
            <li>Contenus offensants, haineux ou inappropriés.</li>
            <li>Données personnelles ou informations sensibles.</li>
            <li>Contributions hors sujet ou ne respectant pas la mission du projet.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">3️⃣ Protection des Données et Sécurité</h2>
          <p>Nous respectons votre vie privée et protégeons vos données.</p>
          <p className="mt-4 font-semibold">🔒 Données collectées :</p>
          <ul className="list-disc list-inside">
            <li><b>Aucune donnée personnelle obligatoire</b> pour contribuer.</li>
            <li><b>Données démographiques facultatives</b> (âge, sexe, langue maternelle).</li>
          </ul>
          <p className="mt-4">
            📩 <strong>Demande de suppression de données :</strong>  
            Vous pouvez demander la suppression de vos contributions en nous contactant à
            <a href="mailto:nkodonteam@gmail.com" className="text-primary-default"> nkodonteam@gmail.com</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">4️⃣ Responsabilités et Modifications</h2>
          <p>
            <b>N'KO DON</b> ne garantit pas la disponibilité du service à tout moment.  
            Les utilisateurs sont responsables de leurs <b>contributions</b> et doivent respecter les lois en vigueur.
          </p>
          <p className="mt-4">
            ✍️ <strong>Modification des conditions :</strong>  
            Nous pouvons modifier ces termes à tout moment. La dernière mise à jour sera toujours affichée en haut de cette page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">5️⃣ Sanctions et Résiliation</h2>
          <p className="mt-4 font-semibold">🚨 En cas de non-respect des conditions :</p>
          <ul className="list-disc list-inside text-red-600 space-y-2">
            <li>⛔ <b>Suspension temporaire</b> en cas de violation mineure.</li>
            <li>⛔ <b>Bannissement définitif</b> en cas de partage de fausses données.</li>
            <li>⛔ <b>Suppression des contributions frauduleuses</b> sans préavis.</li>
          </ul>
          <p className="mt-4">
            📩 Pour signaler un abus, contactez-nous :  
            <a href="mailto:nkodonteam@gmail.com" className="text-blue-500"> nkodonteam@gmail.com</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">6️⃣ Loi Applicable et Juridiction</h2>
          <p>
            Ce site est basé au <b>Mali</b>, et est soumis aux <b>lois maliennes et internationales </b>
            en matière de <b>propriété intellectuelle et protection des données</b>.
          </p>
          <p className="mt-4">
            📍 <strong>Toute violation pourra être portée devant les tribunaux compétents au Mali.</strong>
          </p>
        </section>

        <section className="text-center bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">🌍 Rejoignez-nous dans cette mission !</h2>
          <p>
            Votre contribution aide à préserver les langues du Mali à travers <b>N'KO DON</b>.  
            Ensemble, construisons des <b>outils technologiques en Bambara et N'Ko</b> pour les générations futures !
          </p>
        </section>
      </div>
    </div>
  );
}
