export type Lang = 'en' | 'ml';

const translations = {
  en: {
    // Splash
    splash: {
      bismillahTranslation: 'In the Name of Allah, The Most Gracious, The Most Merciful',
      weddingInvitation: 'Wedding Invitation',
      openInvitation: 'Open Invitation',
    },
    // Nav
    nav: {
      home: 'Home',
      events: 'Events',
      couple: 'Couple',
      gallery: 'Gallery',
      rsvp: 'RSVP',
      wishes: 'Wishes',
      venue: 'Venue',
      timeline: 'Timeline',
      family: 'Family',
    },
    // Hero
    hero: {
      togetherWith: 'Together With Their Families',
      joinUs: 'You Are Cordially Invited to the Wedding Reception',
      viewInvitation: 'View Invitation',
    },
    // Quran
    quran: {
      label: 'A Divine Promise',
      verse: '"And We Created You In Pairs"',
      ref: '— Quran 78:8',
    },
    // Couple
    couple: {
      label: 'The Blessed Union',
      title: 'Bride & Groom',
    },
    // Events
    events: {
      label: 'Mark Your Calendar',
      title: 'Event Details',
    },
    // Countdown
    countdown: {
      label: 'Time Remaining',
      title: 'Counting Down To The Big Day',
      passed: 'The Wedding Has Begun!',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
    },
    // Timeline
    timeline: {
      label: 'Our Story',
      title: 'Journey to Forever',
    },
    // Venue
    venue: {
      label: 'Find Us Here',
      title: 'Venue',
      openMaps: 'Open in Google Maps',
      getDirections: 'Get Directions',
    },
    // Gallery
    gallery: {
      label: 'Memories',
      title: 'Our Gallery',
    },
    // Family
    family: {
      label: 'With Family Blessings',
      title: 'Family Invitation',
      quote: '"With the blessings of Allah, we request the honor of your presence on this joyous occasion."',
      brideFamily: "Bride's Family",
      groomFamily: "Groom's Family",
      father: 'Father',
      mother: 'Mother',
      siblings: 'Siblings',
    },
    // RSVP
    rsvp: {
      label: "We'd Love To See You",
      title: 'RSVP',
      deadline: 'Kindly respond by',
      nameLabel: 'Full Name *',
      namePlaceholder: 'Your name',
      phoneLabel: 'Phone Number *',
      phonePlaceholder: '+91 98765 43210',
      guestsLabel: 'Guests *',
      attendingLabel: 'Attending *',
      yes: '✓ Yes',
      no: '✗ No',
      messageLabel: 'Message (Optional)',
      messagePlaceholder: 'Share your blessings or any note...',
      submit: 'Send RSVP via WhatsApp',
      successTitle: 'JazakAllah Khair!',
      successMsg: 'Your RSVP is being sent via WhatsApp...',
      nameError: 'Name is required',
      phoneError: 'Phone is required',
      phoneInvalid: 'Enter a valid phone number',
      guestsError: 'At least 1 guest required',
      attendingError: 'Please select your attendance',
    },
    // Wishes
    wishes: {
      label: 'Spread Your Blessings',
      title: 'Leave a Wish',
      nameLabel: 'Your Name *',
      namePlaceholder: 'Enter your name',
      messageLabel: 'Your Blessing *',
      messagePlaceholder: 'May Allah bless this union with love, happiness, and barakah...',
      submit: 'Share Your Blessing',
      success: 'JazakAllah! Wish shared ♥',
      empty: 'Be the first to leave a blessing!',
      nameError: 'Please enter your name',
      messageError: 'Please write a wish',
      messageTooShort: 'Wish is too short',
    },
    // Gift
    gift: {
      subtext: 'However, if you wish to bless the couple with a gift, you may use the QR below.',
      upiLabel: 'UPI',
    },
    // Footer
    footer: {
      blessingTranslation: '"May Allah bless you both and shower His blessings upon you"',
      tagline: 'May Allah Bless This Union',
      whatsapp: 'WhatsApp Us',
      madeWith: 'Made with ❤️ for',
      year: '2026',
    },
  },

  ml: {
    // Splash
    splash: {
      bismillahTranslation: 'അള്ളാഹുവിന്റെ നാമത്തിൽ, പരമകാരുണ്യവാനും കരുണാനിധിയും',
      weddingInvitation: 'വിവാഹ ക്ഷണം',
      openInvitation: 'ക്ഷണം തുറക്കൂ',
    },
    // Nav
    nav: {
      home: 'ഹോം',
      events: 'ചടങ്ങുകൾ',
      couple: 'ദമ്പതികൾ',
      gallery: 'ഗ്യാലറി',
      rsvp: 'RSVP',
      wishes: 'ആശംസകൾ',
      venue: 'സ്ഥലം',
      timeline: 'ടൈംലൈൻ',
      family: 'കുടുംബം',
    },
    // Hero
    hero: {
      togetherWith: 'കുടുംബങ്ങളോടൊപ്പം',
      joinUs: 'വിവാഹ സ്വീകരണത്തിൽ പങ്കാളിയാകൂ',
      viewInvitation: 'ക്ഷണം കാണൂ',
    },
    // Quran
    quran: {
      label: 'ദൈവിക വാഗ്ദാനം',
      verse: '"നിങ്ങളെ ജോഡിയായി സൃഷ്ടിച്ചു"',
      ref: '— ഖുർആൻ 78:8',
    },
    // Couple
    couple: {
      label: 'അനുഗൃഹീത ബന്ധം',
      title: 'വധൂവരന്മാർ',
    },
    // Events
    events: {
      label: 'തീയതി കുറിക്കൂ',
      title: 'ചടങ്ങ് വിവരങ്ങൾ',
    },
    // Countdown
    countdown: {
      label: 'ബാക്കി സമയം',
      title: 'ആ ദിനത്തിലേക്ക് കാത്തിരിക്കുന്നു',
      passed: 'വിവാഹം ആരംഭിച്ചു!',
      days: 'ദിവസം',
      hours: 'മണിക്കൂർ',
      minutes: 'മിനിറ്റ്',
      seconds: 'സെക്കൻഡ്',
    },
    // Timeline
    timeline: {
      label: 'ഞങ്ങളുടെ കഥ',
      title: 'എന്നേക്കുമുള്ള യാത്ര',
    },
    // Venue
    venue: {
      label: 'ഇവിടെ ഞങ്ങളെ കണ്ടെത്തൂ',
      title: 'വേദി',
      openMaps: 'Google Maps-ൽ തുറക്കൂ',
      getDirections: 'വഴി കണ്ടെത്തൂ',
    },
    // Gallery
    gallery: {
      label: 'ഓർമ്മകൾ',
      title: 'ഞങ്ങളുടെ ഗ്യാലറി',
    },
    // Family
    family: {
      label: 'കുടുംബ അനുഗ്രഹത്തോടെ',
      title: 'കുടുംബ ക്ഷണം',
      quote: '"അള്ളാഹുവിന്റെ അനുഗ്രഹത്തോടെ, ഈ ആനന്ദകരമായ ചടങ്ങിൽ നിങ്ങളുടെ സാന്നിദ്ധ്യം അഭ്യർഥിക്കുന്നു."',
      brideFamily: 'വധുവിന്റെ കുടുംബം',
      groomFamily: 'വരന്റെ കുടുംബം',
      father: 'പിതാവ്',
      mother: 'മാതാവ്',
      siblings: 'സഹോദരങ്ങൾ',
    },
    // RSVP
    rsvp: {
      label: 'നിങ്ങളെ കാണാൻ ആഗ്രഹിക്കുന്നു',
      title: 'RSVP',
      deadline: 'ഇതിന് മുൻപ് അറിയിക്കുക',
      nameLabel: 'പൂർണ്ണ നാമം *',
      namePlaceholder: 'നിങ്ങളുടെ പേര്',
      phoneLabel: 'ഫോൺ നമ്പർ *',
      phonePlaceholder: '+91 98765 43210',
      guestsLabel: 'അതിഥികൾ *',
      attendingLabel: 'പങ്കെടുക്കുന്നോ *',
      yes: '✓ ഉണ്ട്',
      no: '✗ ഇല്ല',
      messageLabel: 'സന്ദേശം (ഐച്ഛികം)',
      messagePlaceholder: 'ആശംസകളോ കുറിപ്പോ ഇവിടെ രേഖപ്പെടുത്തൂ...',
      submit: 'WhatsApp വഴി RSVP അയക്കൂ',
      successTitle: 'ജസാകള്ളാഹ് ഖൈർ!',
      successMsg: 'നിങ്ങളുടെ RSVP WhatsApp വഴി അയക്കുന്നു...',
      nameError: 'പേര് ആവശ്യമാണ്',
      phoneError: 'ഫോൺ നമ്പർ ആവശ്യമാണ്',
      phoneInvalid: 'ശരിയായ ഫോൺ നമ്പർ നൽകൂ',
      guestsError: 'കുറഞ്ഞത് 1 അതിഥി വേണം',
      attendingError: 'പങ്കാളിത്തം തിരഞ്ഞെടുക്കൂ',
    },
    // Wishes
    wishes: {
      label: 'ആശീർവ്വാദം പങ്കുവെക്കൂ',
      title: 'ആശംസ അർപ്പിക്കൂ',
      nameLabel: 'നിങ്ങളുടെ പേര് *',
      namePlaceholder: 'പേര് നൽകൂ',
      messageLabel: 'നിങ്ങളുടെ ആശംസ *',
      messagePlaceholder: 'അള്ളാഹു ഈ ദാമ്പത്യം അനുഗ്രഹിക്കട്ടെ...',
      submit: 'ആശംസ പങ്കുവെക്കൂ',
      success: 'ജസാകള്ളാഹ്! ആശംസ പങ്കുവെച്ചു ♥',
      empty: 'ആദ്യം ആശംസ അർപ്പിക്കൂ!',
      nameError: 'ദയവായി നിങ്ങളുടെ പേര് നൽകൂ',
      messageError: 'ദയവായി ആശംസ എഴുതൂ',
      messageTooShort: 'ആശംസ വളരെ ചെറുതാണ്',
    },
    // Gift
    gift: {
      subtext: 'നിങ്ങൾ ദമ്പതികളെ സമ്മാനിക്കാൻ ആഗ്രഹിക്കുന്നുവെങ്കിൽ, ചുവടെയുള്ള QR ഉപയോഗിക്കാം.',
      upiLabel: 'UPI',
    },
    // Footer
    footer: {
      blessingTranslation: '"അള്ളാഹു നിങ്ങൾ ഇരുവർക്കും അനുഗ്രഹം ചൊരിയട്ടെ"',
      tagline: 'അള്ളാഹു ഈ ദാമ്പത്യം അനുഗ്രഹിക്കട്ടെ',
      whatsapp: 'WhatsApp-ൽ ബന്ധപ്പെടൂ',
      madeWith: '❤️ ഉള്ളിൽ നിർമ്മിച്ചത്',
      year: '2026',
    },
  },
} as const;

export type Translations = typeof translations.en;
export type TranslationMap = { en: Translations; ml: Translations };
const typedTranslations = translations as unknown as TranslationMap;
export default typedTranslations;
