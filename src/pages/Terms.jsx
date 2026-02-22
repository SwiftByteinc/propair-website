import SEO from '../components/SEO';

export default function Terms() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-8">
      <SEO
        title="Conditions d'utilisation — ProPair"
        canonical="/terms"
        description="Conditions générales d'utilisation de la plateforme ProPair. Règles, droits et obligations des utilisateurs."
      />
      <article className="max-w-3xl mx-auto text-sm text-gray-800 leading-relaxed font-serif">
        <h1 className="text-xl font-bold text-center mb-1 uppercase tracking-wide">Conditions d'utilisation</h1>
        <p className="text-center text-xs text-gray-500 mb-8">Version 1.0 — Dernière mise à jour : février 2026</p>

        <section className="mb-6">
          <h2 className="font-bold mb-1">1. Nature du service et admissibilité</h2>
          <p className="mb-2">
            ProPair™ est une plateforme technologique d'intermédiation gérée par SwiftByte inc., mettant en relation des clients recherchant des services professionnels (rénovation, construction, entretien) et des entrepreneurs qualifiés. ProPair n'est pas partie aux ententes conclues entre clients et entrepreneurs. Nous agissons uniquement en tant qu'intermédiaire technologique.
          </p>
          <p className="mb-2">Pour utiliser l'Application, vous devez :</p>
          <ul className="list-disc pl-6 mb-2 space-y-0.5">
            <li>Être âgé d'au moins 18 ans</li>
            <li>Avoir la capacité juridique de contracter au Québec</li>
            <li>Résider au Canada ou dans un territoire où l'Application est disponible</li>
            <li>Fournir des renseignements exacts et complets lors de l'inscription</li>
            <li>Accepter les présentes Conditions et notre Politique de confidentialité</li>
          </ul>
          <p className="text-xs italic">ProPair™ est une marque de commerce de SwiftByte inc.</p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">2. Comptes utilisateur</h2>
          <p className="mb-1"><strong>2.1 Création de compte</strong> — Vous pouvez créer un compte en tant que client ou entrepreneur. Chaque utilisateur ne peut détenir qu'un seul compte actif.</p>
          <p className="mb-1"><strong>2.2 Sécurité du compte</strong> — Vous êtes responsable de la confidentialité de vos identifiants de connexion. Toute activité effectuée sous votre compte est votre responsabilité.</p>
          <p className="mb-1"><strong>2.3 Vérification</strong> — Les entrepreneurs peuvent soumettre leur numéro RBQ (Régie du bâtiment du Québec) à des fins de vérification. Le badge « Vérifié » ne constitue pas une garantie de qualité des travaux.</p>
          <p><strong>2.4 Suppression de compte</strong> — Vous pouvez demander la suppression de votre compte à tout moment via Paramètres → Supprimer mon compte, ou par courriel à privacy@propairapp.com. Un délai de grâce de 30 jours s'applique. Passé ce délai, la suppression est irréversible.</p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">3. Obligations professionnelles des entrepreneurs</h2>
          <p className="mb-2">En créant un profil entrepreneur, vous déclarez et garantissez que :</p>
          <ul className="list-disc pl-6 mb-2 space-y-0.5">
            <li>Vous détenez les licences requises pour vos activités (notamment la licence RBQ pour les travaux assujettis à la Loi sur le bâtiment du Québec)</li>
            <li>Vous détenez les assurances responsabilité civile requises par la loi</li>
            <li>Vous détenez les cautionnements requis, le cas échéant</li>
            <li>Vos renseignements professionnels sont véridiques et à jour</li>
          </ul>
          <p className="mb-2">
            ProPair se réserve le droit de suspendre tout profil ne pouvant justifier de ses titres professionnels. Le non-respect de ces obligations engage votre seule responsabilité.
          </p>
          <p className="text-xs italic">
            Note : Certains métiers au Québec ne requièrent pas de licence RBQ. La soumission du numéro RBQ est requise uniquement pour les activités assujetties à la Loi sur le bâtiment.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">4. Accès aux fonctionnalités</h2>
          <p className="mb-1">
            <strong>4.1 Fonctionnalités professionnelles (Pro)</strong> — L'utilisation de certaines fonctionnalités de l'Application (le statut Pro, les outils de mise en relation avancés et l'utilisation sans restrictions) nécessite un compte en règle. ProPair se réserve le droit de restreindre, suspendre ou modifier l'accès à ces fonctionnalités si les conditions associées au compte de l'utilisateur ne sont plus respectées.
          </p>
          <p className="mb-1">
            <strong>4.2 Indépendance des contrats</strong> — ProPair n'est pas partie aux contrats de travaux. Les ententes sont conclues directement entre les utilisateurs. ProPair facilite la mise en relation entre utilisateurs, et non la conclusion d'un contrat de service entre eux.
          </p>
          <p>
            <strong>4.3 Assistance</strong> — Pour toute question relative à votre compte ou à l'accès aux fonctionnalités, contactez-nous à support@propairapp.com. Nous nous engageons à répondre dans un délai de 15 jours ouvrables.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">5. Utilisation acceptable</h2>
          <p className="mb-2">En utilisant l'Application, vous vous engagez à :</p>
          <ul className="list-disc pl-6 mb-2 space-y-0.5">
            <li>Fournir des renseignements véridiques et à jour</li>
            <li>Utiliser l'Application uniquement aux fins prévues</li>
            <li>Respecter les autres utilisateurs dans toutes vos communications</li>
            <li>Ne pas publier de contenu illicite, diffamatoire, harcelant ou discriminatoire</li>
            <li>Ne pas usurper l'identité d'une autre personne ou entité</li>
            <li>Ne pas utiliser l'Application à des fins commerciales non autorisées</li>
            <li>Ne pas tenter de contourner les mesures de sécurité</li>
            <li>Ne pas extraire de données de manière automatisée (scraping)</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">6. Contenu utilisateur</h2>
          <p className="mb-1">
            <strong>6.1 Propriété</strong> — Vous conservez la propriété du contenu que vous publiez. En publiant du contenu, vous nous accordez une licence non exclusive, mondiale, libre de redevances pour afficher et distribuer ce contenu dans le cadre de l'Application.
          </p>
          <p className="mb-1">
            <strong>6.2 Modération</strong> — Nous nous réservons le droit de retirer tout contenu qui enfreint les présentes Conditions, sans préavis.
          </p>
          <p className="mb-1">
            <strong>6.3 Avis et évaluations</strong> — Les avis doivent refléter une expérience réelle. Les faux avis ou les avis destinés à nuire à un concurrent sont interdits et entraîneront la suspension du compte.
          </p>
          <p>
            <strong>6.4 Assistance par Intelligence Artificielle (IA)</strong> — L'Application peut proposer des fonctionnalités assistées par l'intelligence artificielle (ex: aide à la rédaction de descriptions). Le contenu généré par l'IA est fourni à titre indicatif et de suggestion uniquement. Vous demeurez l'unique responsable de la révision, de l'exactitude et de la publication finale de tout contenu généré à l'aide de ces outils. ProPair ne garantit pas l'exactitude, la pertinence ou la légalité du contenu généré par l'IA et décline toute responsabilité quant à son utilisation.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">7. Messagerie</h2>
          <p className="mb-2">La messagerie intégrée est destinée aux communications liées aux projets. Il est interdit d'utiliser la messagerie pour :</p>
          <ul className="list-disc pl-6 mb-2 space-y-0.5">
            <li>Envoyer du contenu indésirable ou publicitaire</li>
            <li>Partager des renseignements personnels sensibles de tiers</li>
            <li>Harceler ou menacer d'autres utilisateurs</li>
            <li>Distribuer des logiciels malveillants ou des liens frauduleux</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">8. Documentation des échanges</h2>
          <p className="mb-2">Le Service permet de documenter les échanges et modifications de projet via la messagerie intégrée.</p>
          <p className="mb-1">
            <strong>Accès aux données :</strong> En cas de litige, ProPair peut fournir une extraction des conversations et fichiers partagés sur demande à support@propairapp.com.
          </p>
          <p>
            <strong>Limitation :</strong> Ce service est fourni « tel quel ». ProPair ne garantit pas l'admissibilité de ces échanges devant un tribunal et n'est pas responsable des données supprimées par les utilisateurs.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">9. Propriété intellectuelle</h2>
          <p>
            L'Application, son design, son code source, ses marques de commerce et son contenu (hors contenu utilisateur) sont la propriété exclusive de SwiftByte inc. et sont protégés par les lois applicables en matière de propriété intellectuelle.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">10. Limitation de responsabilité</h2>
          <p className="mb-1">
            10.1 L'Application est fournie « telle quelle » et « selon la disponibilité ». Nous ne garantissons pas que l'Application sera exempte d'erreurs ou ininterrompue.
          </p>
          <p className="mb-1">
            10.2 ProPair ne garantit pas la qualité, la sécurité, la légalité ou la complétion des services offerts par les entrepreneurs. Nous ne sommes pas responsables des litiges entre clients et entrepreneurs.
          </p>
          <p className="mb-1">
            10.3 ProPair n'est pas responsable des malfaçons, des retards, des abandons de chantier ou des dommages corporels ou matériels survenant lors des travaux.
          </p>
          <p className="mb-1">
            10.4 Dans toute la mesure permise par la loi, nous déclinons toute garantie, expresse ou implicite. Nous ne sommes pas responsables des pertes de profits ou de données.
          </p>
          <p>
            10.5 Notre responsabilité totale à votre égard pour toute réclamation ne pourra excéder 100 $ CAD.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">11. Indemnisation</h2>
          <p>
            Vous acceptez de nous indemniser et de nous dégager de toute responsabilité à l'égard de toute réclamation, perte ou dépense (y compris les honoraires d'avocat raisonnables) découlant de votre utilisation de l'Application ou de votre violation des présentes Conditions.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">12. Suspension et résiliation</h2>
          <p className="mb-2">Nous nous réservons le droit de suspendre ou de résilier votre compte si :</p>
          <ul className="list-disc pl-6 mb-2 space-y-0.5">
            <li>Vous enfreignez les présentes Conditions</li>
            <li>Votre compte fait l'objet de plaintes répétées</li>
            <li>Nous soupçonnons une activité frauduleuse</li>
            <li>L'exige la loi applicable</li>
          </ul>
          <p>
            Sauf en cas de fraude avérée ou d'urgence, nous vous aviserons par courriel et vous accorderons un délai raisonnable pour répondre avant la suspension.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">13. Notifications push</h2>
          <p>
            En activant les notifications push, vous consentez à recevoir des alertes relatives à vos conversations, vos demandes et les mises à jour importantes. Vous pouvez désactiver les notifications à tout moment dans les réglages de votre appareil.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">14. Force majeure</h2>
          <p>
            ProPair ne saurait être tenu responsable de tout retard ou de toute défaillance dans l'exécution de ses obligations résultant d'événements échappant à son contrôle raisonnable, notamment les catastrophes naturelles, les pannes d'infrastructure, les cyberattaques, les grèves ou les décisions gouvernementales.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">15. Modifications</h2>
          <p>
            Nous pouvons modifier les présentes Conditions à tout moment. Les modifications substantielles vous seront communiquées par notification dans l'Application au moins 15 jours avant leur entrée en vigueur. L'utilisation continue de l'Application après ce délai constitue votre acceptation des Conditions modifiées.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">16. Droit applicable et règlement des litiges</h2>
          <p className="mb-2">
            Les présentes Conditions sont régies par les lois de la province de Québec et les lois fédérales du Canada.
          </p>
          <p className="mb-2">
            En cas de litige, les parties conviennent de tenter de bonne foi une résolution à l'amiable en contactant support@propairapp.com. Si le litige n'est pas résolu dans un délai de 30 jours, les parties pourront recourir à la médiation avant de soumettre le différend aux tribunaux.
          </p>
          <p>
            Tout litige non résolu par médiation sera soumis à la compétence exclusive des tribunaux du district judiciaire de Saint-François (Sherbrooke), Québec.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">17. Divisibilité</h2>
          <p>
            Si une disposition des présentes Conditions est jugée invalide ou inapplicable, les autres dispositions demeurent pleinement en vigueur.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold mb-1">Contact</h2>
          <address className="not-italic pl-4">
            SwiftByte inc. (exploitant de ProPair)<br />
            528 Rue Castle, Magog, QC<br />
            support@propairapp.com<br />
            propairapp.com
          </address>
        </section>
      </article>
    </div>
  );
}
