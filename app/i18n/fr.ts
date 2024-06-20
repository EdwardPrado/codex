import { Translations } from "./en"

const fr: Translations = {
  common: {
    ok: "OK !",
    cancel: "Annuler",
    back: "Retour",
    logOut: "Déconnexion",
  },
  errorScreen: {
    title: "Quelque chose s'est mal passé !",
    friendlySubtitle:
      "C'est l'écran que vos utilisateurs verront en production lorsqu'une erreur sera lancée. Vous voudrez personnaliser ce message (situé dans `app/i18n/fr.ts`) et probablement aussi la mise en page (`app/screens/ErrorScreen`). Si vous voulez le supprimer complètement, vérifiez `app/app.tsx` pour le composant <ErrorBoundary>.",
    reset: "RÉINITIALISER L'APPLICATION",
    traceTitle: "Erreur depuis %{name}",
  },
  emptyStateComponent: {
    generic: {
      heading: "Si vide... si triste",
      content:
        "Aucune donnée trouvée pour le moment. Essayez de cliquer sur le bouton pour rafraîchir ou recharger l'application.",
      button: "Essayons à nouveau",
    },
  },

  errors: {
    invalidEmail: "Adresse e-mail invalide.",
  },
  loginScreen: {
    signIn: "Se connecter",
    enterDetails:
      "Entrez vos informations ci-dessous pour débloquer des informations top secrètes. Vous ne devinerez jamais ce que nous avons en attente. Ou peut-être que vous le ferez ; ce n'est pas de la science spatiale ici.",
    emailFieldLabel: "E-mail",
    passwordFieldLabel: "Mot de passe",
    emailFieldPlaceholder: "Entrez votre adresse e-mail",
    passwordFieldPlaceholder: "Mot de passe super secret ici",
    tapToSignIn: "Appuyez pour vous connecter !",
    hint: "Astuce : vous pouvez utiliser n'importe quelle adresse e-mail et votre mot de passe préféré :)",
  },
  navigator: {
    componentsTab: "Composants",
    debugTab: "Débogage",
    healthTrackerTab: "Health Tracker",
  },
  demoShowroomScreen: {
    jumpStart: "Composants pour démarrer votre projet !",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "Via la propriété `tx`",
    demoViaSpecifiedTxProp: "Via la propriété `{{prop}}Tx` spécifiée",
  },
  demoDebugScreen: {
    howTo: "COMMENT FAIRE",
    title: "Débugage",
    tagLine:
      "Félicitations, vous avez un modèle d'application React Native très avancé ici. Profitez de cette base de code !",
    reactotron: "Envoyer à Reactotron",
    demoList: "Liste de démonstration",
    demoPodcastList: "Liste de podcasts de démonstration",
    androidReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, exécutez adb reverse tcp:9090 tcp:9090 à partir de votre terminal, puis rechargez l'application.",
    iosReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, puis rechargez l'application.",
    macosReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, puis rechargez l'application.",
    webReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, puis rechargez l'application.",
    windowsReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, puis rechargez l'application.",
  },
}

export default fr
