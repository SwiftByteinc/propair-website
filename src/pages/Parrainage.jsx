import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Gift, Users, Briefcase, Award, ArrowRight,
  Share2, CheckCircle, Sparkles
} from 'lucide-react';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';

export default function Parrainage() {
  const { user } = useAuth();

  const steps = [
    {
      icon: Share2,
      title: "Partagez votre code",
      description: "Depuis votre tableau de bord, copiez votre lien de parrainage unique et envoyez-le à vos collègues entrepreneurs ou contacts."
    },
    {
      icon: Users,
      title: "Votre filleul s'inscrit",
      description: "Quand quelqu'un s'inscrit via votre lien, le parrainage est automatiquement enregistré dans votre compte."
    },
    {
      icon: Award,
      title: "Gagnez des mois Pro",
      description: "Dès que les conditions sont remplies, vos mois gratuits sont crédités automatiquement sur votre abonnement."
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans selection:bg-teal-50 selection:text-teal-700">
      <SEO
        title="Parrainage"
        canonical="/parrainage"
        description="Invitez vos amis sur ProPair et gagnez des mois Pro gratuits. Programme de parrainage pour entrepreneurs au Québec."
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HERO BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-2xl p-8 md:p-10 flex items-center gap-6 mb-10 border border-pink-100"
        >
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Parrainez, gagnez des mois Pro gratuits
            </h1>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Invitez vos collègues entrepreneurs et vos contacts à rejoindre ProPair. Chaque parrainage validé vous rapporte des mois d'abonnement offerts — pour vous et votre filleul.
            </p>
          </div>
          <div className="hidden sm:flex w-20 h-20 items-center justify-center flex-shrink-0">
            <Gift size={56} className="text-pink-500" />
          </div>
        </motion.div>

        {/* COMMENT ÇA MARCHE — 3 étapes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-6">Comment ça marche</h2>

          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <div className="flex items-center justify-center gap-3 shrink-0">
                  <span className="w-7 h-7 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center">
                    <step.icon size={20} className="text-pink-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RÉCOMPENSES — deux voies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-6">Ce que vous gagnez</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Voie entrepreneur */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Briefcase size={20} className="text-amber-600" />
                </div>
                <h3 className="font-bold text-slate-900">Parrainez un entrepreneur</h3>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="text-teal-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-600">Il s'inscrit via votre code</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="text-teal-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-600">Il reste actif pendant 3 mois</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <Sparkles size={16} className="text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-900 font-semibold">Vous gagnez tous les deux 2 mois Pro</p>
                </div>
              </div>

              {/* Flow visuel */}
              <div className="flex items-center justify-center gap-2 bg-amber-50 rounded-xl p-3 text-xs font-semibold text-slate-600">
                <span>Inscription</span>
                <ArrowRight size={14} className="text-slate-400" />
                <span>3 mois actif</span>
                <ArrowRight size={14} className="text-slate-400" />
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">+2 mois</span>
              </div>
            </div>

            {/* Voie client */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center">
                  <Users size={20} className="text-pink-600" />
                </div>
                <h3 className="font-bold text-slate-900">Développez votre réseau</h3>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="text-teal-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-600">Invitez vos contacts clients</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="text-teal-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-600">6 clients s'inscrivent via votre code</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <Sparkles size={16} className="text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-900 font-semibold">Vous gagnez 2 mois Pro</p>
                </div>
              </div>

              {/* Flow visuel */}
              <div className="flex items-center justify-center gap-2 bg-pink-50 rounded-xl p-3 text-xs font-semibold text-slate-600">
                <span>6 clients inscrits</span>
                <ArrowRight size={14} className="text-slate-400" />
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">+2 mois</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* INFO FOOTER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-slate-50 rounded-2xl p-5 border border-slate-100 mb-10"
        >
          <p className="text-xs text-slate-500 leading-relaxed">
            Les mois Pro gagnés sont cumulables et s'appliquent automatiquement à votre prochain renouvellement. Le parrainage entrepreneur est validé une fois que le filleul a complété 3 mois d'activité sur la plateforme. Le parrainage client est validé automatiquement à l'inscription.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900 rounded-2xl p-8 md:p-10 text-center"
        >
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            {user ? 'Commencez à parrainer' : 'Prêt à gagner des mois gratuits ?'}
          </h2>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            {user
              ? 'Accédez à votre tableau de bord pour copier votre lien de parrainage et suivre vos récompenses.'
              : 'Créez votre compte gratuitement et accédez à votre code de parrainage personnel.'
            }
          </p>
          <Link
            to={user ? '/portal/referral' : '/login'}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 font-bold py-3.5 px-8 rounded-xl transition-all active:scale-[0.98]"
          >
            {user ? 'Mon tableau de bord' : 'Créer mon compte'}
            <ArrowRight size={16} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
