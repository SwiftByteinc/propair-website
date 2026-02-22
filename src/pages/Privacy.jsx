import SEO from '../components/SEO';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-8">
      <SEO
        title="Politique de confidentialité — ProPair"
        canonical="/privacy"
        description="Politique de confidentialité de ProPair. Gestion des renseignements personnels conformément à la Loi 25, LPRPDE et RGPD."
      />
      <article className="max-w-3xl mx-auto text-sm text-gray-800 leading-relaxed font-serif">
        <h1 className="text-xl font-bold text-center mb-1 uppercase tracking-wide">Politique de confidentialité</h1>
        <p className="text-center text-xs text-gray-500 mb-8">Version 1.0 — Dernière mise à jour : février 2026</p>

        <section className="mb-6">
          <h2 className="font-bold mb-1">1. Introduction</h2>
          <p className="mb-2">
            ProPair™, exploitée par SwiftByte inc. (« nous », « notre »), est une plateforme de mise en relation entre des clients recherchant des services professionnels (rénovation, construction, entretien) et des entrepreneurs qualifiés.
          </p>
          <p className="mb-2">
            La présente Politique de confidentialité détaille nos pratiques de gestion des renseignements personnels conformément à la Loi 25 (Québec), à la LPRPDE (Canada) et au Règlement général sur la protection des données (RGPD), le cas échéant.
          </p>
          <p className="mb-2">
            En utilisant l'Application, vous offrez un consentement manifeste, libre et éclairé à la collecte et au traitement de vos renseignements personnels aux fins décrites ci-dessous. Vous pouvez retirer votre consentement en tout temps via les paramètres de l'Application ou en nous contactant à privacy@propairapp.com.
          </p>
          <p className="text-xs italic">ProPair™ est une marque de commerce de SwiftByte inc.</p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">2. Responsable de la protection des renseignements personnels</h2>
          <p className="mb-2">
            Conformément à la Loi 25, SwiftByte inc. a désigné un Responsable de la protection des renseignements personnels :
          </p>
          <ul className="list-none mb-2 pl-4">
            <li><strong>Titre :</strong> Responsable de la protection des données / Direction des opérations</li>
            <li><strong>Courriel :</strong> privacy@propairapp.com</li>
            <li><strong>Adresse :</strong> 528 Rue Castle, Magog, Québec, Canada</li>
          </ul>
          <p>
            Nous nous engageons à répondre à toute demande d'accès, de rectification ou de plainte dans un délai maximal de 30 jours suivant sa réception, conformément à la Loi 25.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">3. Renseignements que nous recueillons</h2>

          <h3 className="font-semibold mt-3 mb-1">3.1 Renseignements fournis par vous</h3>
          <ul className="list-disc pl-6 mb-2 space-y-0.5">
            <li>Adresse courriel (inscription et connexion)</li>
            <li>Nom complet (profil utilisateur)</li>
            <li>Numéro de téléphone (profil, optionnel)</li>
            <li>Date de naissance (vérification 18+)</li>
            <li>Nom d'entreprise et numéro RBQ (profil entrepreneur, optionnel)</li>
            <li>Certifications et assurances professionnelles</li>
            <li>Localisation — ville/région (profil et recherche de proximité)</li>
            <li>Description, biographie, spécialités et services</li>
            <li>Photos de portfolio et pièces jointes (profil et messagerie)</li>
            <li>Évaluations et avis (système entre utilisateurs)</li>
            <li>Messages texte et fichiers (messagerie intégrée)</li>
          </ul>

          <h3 className="font-semibold mt-3 mb-1">3.2 Renseignements recueillis automatiquement</h3>
          <ul className="list-disc pl-6 mb-2 space-y-0.5">
            <li>Données d'utilisation : pages consultées, actions effectuées, durée des sessions (PostHog)</li>
            <li>Données de diagnostic : rapports d'erreurs anonymisés, échantillonnage de 20 % (Sentry)</li>
            <li>Données de localisation : position approximative, uniquement avec votre autorisation explicite</li>
            <li>Identifiant d'appareil : jeton de notification push (Expo Push Notifications)</li>
            <li>Adresse IP et journaux d'accès</li>
            <li>Suivi publicitaire (iOS) : soumis au cadre App Tracking Transparency (ATT) d'Apple</li>
          </ul>

          <h3 className="font-semibold mt-3 mb-1">3.3 Renseignements collectés via des tiers</h3>
          <ul className="list-disc pl-6 mb-2 space-y-0.5">
            <li>Authentification Google/Apple : nom et courriel associés à votre compte</li>
            <li>Vérification de licences professionnelles (RBQ)</li>
          </ul>

          <h3 className="font-semibold mt-3 mb-1">3.4 Données stockées localement sur votre appareil</h3>
          <ul className="list-disc pl-6 mb-2 space-y-0.5">
            <li>AsyncStorage : préférences de langue, drapeaux d'état</li>
            <li>SecureStore : jetons d'authentification chiffrés (ne quittent jamais votre appareil)</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">4. Finalités du traitement</h2>
          <p className="mb-2">Nous utilisons vos renseignements aux fins suivantes :</p>
          <ul className="list-disc pl-6 mb-2 space-y-0.5">
            <li>Créer et gérer votre compte utilisateur</li>
            <li>Permettre la mise en relation entre clients et entrepreneurs</li>
            <li>Afficher les résultats de recherche pertinents selon votre localisation et vos préférences</li>
            <li>Calculer des scores de compatibilité (algorithme de mise en relation automatisé)</li>
            <li>Faciliter la messagerie et le partage de fichiers entre utilisateurs</li>
            <li>Envoyer des notifications push relatives à vos conversations et demandes</li>
            <li>Améliorer la performance, la stabilité et l'expérience utilisateur</li>
            <li>Détecter et prévenir les abus et les comportements frauduleux</li>
            <li>Respecter nos obligations légales</li>
          </ul>
          <p>
            <strong>Décisions automatisées :</strong> L'Application utilise un algorithme de mise en relation pour classer les résultats de recherche. Ce classement est basé sur vos spécialisations, votre localisation et vos préférences. Aucune décision automatisée n'a d'effet juridique ou significatif sur vous. Vous pouvez consulter tous les résultats indépendamment du classement.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">5. Partage de vos renseignements</h2>
          <p className="mb-2">Nous ne vendons jamais vos renseignements personnels.</p>
          <p className="mb-2">Nous les partageons uniquement avec les tiers suivants, strictement nécessaires au fonctionnement du Service :</p>
          <ul className="list-disc pl-6 mb-2 space-y-0.5">
            <li><strong>Supabase</strong> — Hébergement, base de données, authentification. Toutes les données de compte et de contenu. AWS (États-Unis).</li>
            <li><strong>Sentry</strong> — Suivi d'erreurs. Données de diagnostic anonymisées (20 % des sessions). États-Unis.</li>
            <li><strong>PostHog</strong> — Analytique. Événements d'utilisation anonymisés. Union européenne.</li>
            <li><strong>Expo (EAS)</strong> — Mises à jour OTA, notifications push. Jeton de notification, métadonnées d'appareil. États-Unis.</li>
            <li><strong>Google (Gemini AI)</strong> — Assistance à la rédaction. Texte des descriptions de projets soumis par l'utilisateur ; aucune donnée identifiante n'est transmise. États-Unis.</li>
          </ul>
          <p className="mb-2">
            Les données transmises à Google Gemini sont traitées conformément aux conditions d'utilisation de l'API Google Cloud et ne sont pas utilisées par Google pour entraîner ses modèles d'intelligence artificielle.
          </p>
          <p>
            Nous pouvons également divulguer vos renseignements si la loi l'exige ou sur ordonnance d'un tribunal compétent.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">6. Conservation des données</h2>
          <ul className="list-disc pl-6 mb-2 space-y-0.5">
            <li><strong>Compte actif :</strong> vos données sont conservées tant que votre compte est actif.</li>
            <li><strong>Compte inactif :</strong> après 3 ans d'inactivité, nous vous aviserons avant de procéder à la suppression.</li>
            <li><strong>Suppression de compte :</strong> lorsque vous demandez la suppression via l'Application (Paramètres → Supprimer mon compte) ou par courriel à privacy@propairapp.com, un délai de grâce de 30 jours s'applique. Passé ce délai, toutes vos données personnelles sont supprimées de façon permanente.</li>
            <li><strong>Données analytiques :</strong> les données d'utilisation anonymisées peuvent être conservées jusqu'à 12 mois.</li>
            <li><strong>Messages :</strong> les conversations sont supprimées avec le compte. Les messages reçus par d'autres utilisateurs restent visibles dans leur propre compte.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">7. Sécurité et incidents</h2>

          <h3 className="font-semibold mt-3 mb-1">7.1 Mesures de sécurité</h3>
          <ul className="list-disc pl-6 mb-2 space-y-0.5">
            <li>Chiffrement des données en transit (TLS 1.3) et au repos (AES-256)</li>
            <li>Authentification sécurisée via Supabase Auth avec jetons JWT</li>
            <li>Stockage chiffré des jetons d'authentification sur l'appareil (iOS Keychain / Android Keystore)</li>
            <li>Contrôle d'accès par lignes (Row Level Security) dans la base de données</li>
            <li>Aucun mot de passe stocké en clair</li>
          </ul>

          <h3 className="font-semibold mt-3 mb-1">7.2 Incident de confidentialité</h3>
          <p>
            En cas d'incident présentant un risque de préjudice sérieux, nous aviserons la Commission d'accès à l'information du Québec (CAI) et les personnes concernées dans les plus brefs délais, conformément à la Loi 25. Nous tiendrons également un registre de tout incident de confidentialité.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">8. Vos droits</h2>
          <p className="mb-2">
            Conformément à la Loi 25 du Québec, à la LPRPDE et au RGPD, vous disposez des droits suivants :
          </p>
          <ul className="list-disc pl-6 mb-2 space-y-0.5">
            <li><strong>Accès :</strong> obtenir une copie de vos renseignements personnels</li>
            <li><strong>Rectification :</strong> corriger des renseignements inexacts ou incomplets</li>
            <li><strong>Suppression :</strong> demander la suppression de votre compte et de vos données</li>
            <li><strong>Portabilité :</strong> recevoir vos données dans un format structuré et lisible (JSON)</li>
            <li><strong>Retrait du consentement :</strong> retirer votre consentement à tout moment</li>
            <li><strong>Opposition :</strong> vous opposer au traitement de vos données</li>
            <li><strong>Désindexation :</strong> demander la cessation de la diffusion de vos renseignements</li>
          </ul>
          <p className="mb-2">
            <strong>Suppression de compte :</strong> Vous pouvez supprimer votre compte directement dans les paramètres de l'Application ou sur simple demande à privacy@propairapp.com. Vos données seront supprimées dans un délai de 30 jours.
          </p>
          <p>
            Pour exercer tout autre droit, contactez-nous à privacy@propairapp.com. Nous répondrons dans un délai maximal de 30 jours.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">9. Mineurs</h2>
          <p>
            L'Application est destinée aux personnes âgées de 18 ans et plus. Nous vérifions l'âge lors de l'inscription. Si nous apprenons qu'un mineur a créé un compte, nous le supprimerons dans les plus brefs délais.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">10. Autorisations de l'appareil</h2>
          <p className="mb-2">L'Application peut demander les autorisations suivantes, toutes optionnelles :</p>
          <ul className="list-disc pl-6 mb-2 space-y-0.5">
            <li><strong>Appareil photo :</strong> prendre des photos pour votre profil ou la messagerie</li>
            <li><strong>Photothèque :</strong> sélectionner des images existantes</li>
            <li><strong>Localisation (en cours d'utilisation) :</strong> recherche de proximité</li>
            <li><strong>Notifications push :</strong> recevoir des alertes sur vos conversations</li>
            <li><strong>Suivi (iOS ATT) :</strong> analytique d'utilisation (refusable sans conséquence sur le Service)</li>
          </ul>
          <p className="mb-2">
            Chaque autorisation est demandée au moment de l'utilisation et peut être révoquée dans les réglages de votre appareil à tout moment.
          </p>
          <p>
            <strong>Désactivation de l'analytique :</strong> Vous pouvez désactiver le suivi ATT (iOS) ou révoquer les autorisations dans les réglages de votre appareil. Cela n'affecte pas le fonctionnement de l'Application.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">11. Transferts internationaux</h2>
          <p className="mb-2">
            Certains de nos fournisseurs de services (Supabase, Sentry, Expo, Google) sont situés aux États-Unis. Ces transferts sont encadrés par des clauses contractuelles types et les certifications de conformité des fournisseurs concernés. Nous nous assurons que ces tiers respectent des standards de protection équivalents à ceux de la Loi 25.
          </p>
          <p>PostHog (analytique) est hébergé dans l'Union européenne.</p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">12. Modifications</h2>
          <p>
            Nous pouvons mettre à jour la présente politique. En cas de modification substantielle, nous vous en informerons par notification dans l'Application au moins 15 jours avant l'entrée en vigueur des changements. L'utilisation continue de l'Application après ce délai constitue votre acceptation de la politique modifiée.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">13. Contact et recours</h2>
          <p className="mb-2">Pour toute question, demande d'accès ou plainte relative à vos renseignements personnels :</p>
          <address className="not-italic pl-4 mb-2">
            Responsable de la protection des données<br />
            SwiftByte inc. (exploitant de ProPair)<br />
            528 Rue Castle, Magog, QC<br />
            privacy@propairapp.com
          </address>
          <p>
            Si vous n'êtes pas satisfait de notre réponse, vous pouvez déposer une plainte auprès de la Commission d'accès à l'information du Québec (CAI) : www.cai.gouv.qc.ca
          </p>
        </section>
      </article>
    </div>
  );
}
