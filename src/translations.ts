export type LanguageCode = 'en' | 'hi' | 'es' | 'pa' | 'te';

export interface TranslationStrings {
  brandName: string;
  tagline: string;
  mentorBarTitle: string;
  updateLinksBtn: string;
  kanbanWorkspace: string;
  demoLink: string;
  githubLink: string;
  progress: string;
  epics: string;
  tasks: string;
  mentor: string;
  tabs: {
    dashboard: string;
    farms: string;
    crops: string;
    soil: string;
    weather: string;
    aiDoctor: string;
    marketplace: string;
    community: string;
    admin: string;
  };
  roles: {
    farmer: string;
    expert: string;
    admin: string;
    switchRole: string;
  };
  metrics: {
    totalFarms: string;
    totalAcres: string;
    activeCrops: string;
    weatherIndex: string;
    soilHealth: string;
    sprayWindow: string;
  };
  actions: {
    addFarm: string;
    addCrop: string;
    newSoilTest: string;
    askQuestion: string;
    addToCart: string;
    checkout: string;
    viewDetails: string;
    refresh: string;
    submit: string;
    cancel: string;
    copyLink: string;
  };
}

export const translations: Record<LanguageCode, TranslationStrings> = {
  en: {
    brandName: 'AgriTech',
    tagline: 'Empowering Farmers through Digital Technology',
    mentorBarTitle: 'Mentor Review & Project Submission Hub',
    updateLinksBtn: 'Add / Update Demo & GitHub Links',
    kanbanWorkspace: 'Workspace & Kanban (19 Tasks)',
    demoLink: 'Live Demo URL',
    githubLink: 'GitHub Repository',
    progress: 'Project Progress',
    epics: 'Epics',
    tasks: 'Stories & Tasks',
    mentor: 'Assigned Mentor',
    tabs: {
      dashboard: 'Overview',
      farms: 'Farm Profiles',
      crops: 'Crop Lifecycle',
      soil: 'Soil Health',
      weather: 'Weather & Pests',
      aiDoctor: 'AI Crop Doctor',
      marketplace: 'Agri-Store',
      community: 'Expert Forum',
      admin: 'Admin Console'
    },
    roles: {
      farmer: 'Farmer (Ramesh)',
      expert: 'Agronomist (Dr. Sharma)',
      admin: 'System Admin',
      switchRole: 'Role'
    },
    metrics: {
      totalFarms: 'Registered Land Parcels',
      totalAcres: 'Total Cultivated Acres',
      activeCrops: 'Active Crop Cycles',
      weatherIndex: 'Agro-Climate Temp',
      soilHealth: 'Average Soil Quality',
      sprayWindow: 'Safe Spraying Window'
    },
    actions: {
      addFarm: 'Register New Farm Parcel',
      addCrop: 'Add Crop Cycle',
      newSoilTest: 'Calculate Soil Dosage',
      askQuestion: 'Ask an Agronomist',
      addToCart: 'Add to Cart',
      checkout: 'Complete Order',
      viewDetails: 'View Details',
      refresh: 'Refresh Live Data',
      submit: 'Submit',
      cancel: 'Cancel',
      copyLink: 'Copy Link'
    }
  },
  hi: {
    brandName: 'एग्रीटेक (AgriTech)',
    tagline: 'डिजिटल तकनीक से किसान सशक्तिकरण',
    mentorBarTitle: 'मेंटर समीक्षा और प्रोजेक्ट सबमिशन हब',
    updateLinksBtn: 'डेमो और गिटहब लिंक अपडेट करें',
    kanbanWorkspace: 'वर्कस्पेस और कानबन (19 कार्य)',
    demoLink: 'लाइव डेमो लिंक',
    githubLink: 'गिटहब रिपॉजिटरी',
    progress: 'परियोजना प्रगति',
    epics: 'एपिक्स (6)',
    tasks: 'कहानियां और कार्य (19)',
    mentor: 'असाइन किया गया मेंटर',
    tabs: {
      dashboard: 'डैशबोर्ड अवलोकन',
      farms: 'खेत प्रोफाइल',
      crops: 'फसल चक्र',
      soil: 'मृदा स्वास्थ्य (Soil)',
      weather: 'मौसम और कीट चेतावनी',
      aiDoctor: 'एआई फसल डॉक्टर',
      marketplace: 'कृषि बाज़ार',
      community: 'विशेषज्ञ मंच',
      admin: 'प्रशासन डैशबोर्ड'
    },
    roles: {
      farmer: 'किसान (रमेश)',
      expert: 'कृषि विशेषज्ञ (डॉ. शर्मा)',
      admin: 'सिस्टम व्यवस्थापक',
      switchRole: 'भूमिका'
    },
    metrics: {
      totalFarms: 'पंजीकृत खेत',
      totalAcres: 'कुल खेती योग्य एकड़',
      activeCrops: 'सक्रिय फसल चक्र',
      weatherIndex: 'जलवायु तापमान',
      soilHealth: 'मृदा स्वास्थ्य स्तर',
      sprayWindow: 'छिड़काव के लिए उपयुक्त समय'
    },
    actions: {
      addFarm: 'नया खेत जोड़ें',
      addCrop: 'फसल जोड़ें',
      newSoilTest: 'उर्वरक गणना करें',
      askQuestion: 'विशेषज्ञ से प्रश्न पूछें',
      addToCart: 'कार्ट में जोड़ें',
      checkout: 'ऑर्डर पूरा करें',
      viewDetails: 'विवरण देखें',
      refresh: 'ताज़ा करें',
      submit: 'जमा करें',
      cancel: 'रद्द करें',
      copyLink: 'लिंक कॉपी करें'
    }
  },
  es: {
    brandName: 'AgriTech',
    tagline: 'Empoderando a los agricultores con tecnología digital',
    mentorBarTitle: 'Centro de revisión y entrega de proyecto',
    updateLinksBtn: 'Actualizar enlaces Demo y GitHub',
    kanbanWorkspace: 'Espacio de trabajo y Kanban (19 tareas)',
    demoLink: 'Enlace Demo en Vivo',
    githubLink: 'Repositorio GitHub',
    progress: 'Progreso del proyecto',
    epics: 'Épicas (6)',
    tasks: 'Tareas y subtareas (19)',
    mentor: 'Mentor asignado',
    tabs: {
      dashboard: 'Resumen',
      farms: 'Parcelas',
      crops: 'Ciclo de cultivos',
      soil: 'Salud del suelo',
      weather: 'Clima y plagas',
      aiDoctor: 'Doctor de cultivos IA',
      marketplace: 'Mercado agrícola',
      community: 'Foro de expertos',
      admin: 'Administración'
    },
    roles: {
      farmer: 'Agricultor (Ramesh)',
      expert: 'Agrónomo (Dra. Sharma)',
      admin: 'Administrador',
      switchRole: 'Rol'
    },
    metrics: {
      totalFarms: 'Parcelas registradas',
      totalAcres: 'Hectáreas cultivadas',
      activeCrops: 'Cultivos activos',
      weatherIndex: 'Temperatura agroclimática',
      soilHealth: 'Calidad del suelo',
      sprayWindow: 'Ventana de fumigación'
    },
    actions: {
      addFarm: 'Registrar nueva parcela',
      addCrop: 'Añadir cultivo',
      newSoilTest: 'Calcular dosis de abono',
      askQuestion: 'Preguntar al agrónomo',
      addToCart: 'Añadir al carrito',
      checkout: 'Finalizar compra',
      viewDetails: 'Ver detalles',
      refresh: 'Actualizar datos',
      submit: 'Enviar',
      cancel: 'Cancelar',
      copyLink: 'Copiar enlace'
    }
  },
  pa: {
    brandName: 'ਐਗਰੀਟੈਕ (AgriTech)',
    tagline: 'ਡਿਜੀਟਲ ਤਕਨੀਕ ਰਾਹੀਂ ਕਿਸਾਨਾਂ ਦਾ ਸਸ਼ਕਤੀਕਰਨ',
    mentorBarTitle: 'ਮੈਂਟਰ ਸਮੀਖਿਆ ਅਤੇ ਪ੍ਰੋਜੈਕਟ ਜਮ੍ਹਾਂ ਹੱਬ',
    updateLinksBtn: 'ਡੈਮੋ ਅਤੇ ਗਿੱਟਹੱਬ ਲਿੰਕ ਅੱਪਡੇਟ ਕਰੋ',
    kanbanWorkspace: 'ਵਰਕਸਪੇਸ ਅਤੇ ਕਾਨਬਨ (19 ਕਾਰਜ)',
    demoLink: 'ਲਾਈਵ ਡੈਮੋ ਲਿੰਕ',
    githubLink: 'ਗਿੱਟਹੱਬ ਰਿਪੋਜ਼ਟਰੀ',
    progress: 'ਪ੍ਰੋਜੈਕਟ ਦੀ ਪ੍ਰਗਤੀ',
    epics: 'ਐਪਿਕਸ (6)',
    tasks: 'ਕੰਮ ਅਤੇ ਟਾਸਕ (19)',
    mentor: 'ਸੌਂਪਿਆ ਗਿਆ ਮੈਂਟਰ',
    tabs: {
      dashboard: 'ਸੰਖੇਪ',
      farms: 'ਖੇਤ ਪ੍ਰੋਫਾਈਲ',
      crops: 'ਫਸਲ ਚੱਕਰ',
      soil: 'ਮਿੱਟੀ ਦੀ ਸਿਹਤ',
      weather: 'ਮੌਸਮ ਅਤੇ ਕੀੜੇ ਚੇਤਾਵਨੀ',
      aiDoctor: 'ਏਆਈ ਫਸਲ ਡਾਕਟਰ',
      marketplace: 'ਖੇਤੀਬਾੜੀ ਸਟੋਰ',
      community: 'ਮਾਹਿਰ ਫੋਰਮ',
      admin: 'ਐਡਮਿਨ ਡੈਸ਼ਬੋਰਡ'
    },
    roles: {
      farmer: 'ਕਿਸਾਨ (ਰਮੇਸ਼)',
      expert: 'ਖੇਤੀ ਮਾਹਿਰ (ਡਾ. ਸ਼ਰਮਾ)',
      admin: 'ਸਿਸਟਮ ਐਡਮਿਨ',
      switchRole: 'ਰੋਲ'
    },
    metrics: {
      totalFarms: 'ਰਜਿਸਟਰਡ ਖੇਤ',
      totalAcres: 'ਕੁੱਲ ਰਕਬਾ (ਏਕੜ)',
      activeCrops: 'ਸਰਗਰਮ ਫਸਲਾਂ',
      weatherIndex: 'ਮੌਸਮ ਤਾਪਮਾਨ',
      soilHealth: 'ਮਿੱਟੀ ਦੀ ਗੁਣਵੱਤਾ',
      sprayWindow: 'ਛਿੜਕਾਅ ਦਾ ਸਮਾਂ'
    },
    actions: {
      addFarm: 'ਨਵਾਂ ਖੇਤ ਦਰਜ ਕਰੋ',
      addCrop: 'ਫਸਲ ਸ਼ਾਮਲ ਕਰੋ',
      newSoilTest: 'ਖਾਦ ਦੀ ਮਾਤਰਾ ਕੱਢੋ',
      askQuestion: 'ਮਾਹਿਰ ਨੂੰ ਪੁੱਛੋ',
      addToCart: 'ਕਾਰਟ ਵਿਚ ਪਾਓ',
      checkout: 'ਆਰਡਰ ਪੂਰਾ ਕਰੋ',
      viewDetails: 'ਵੇਰਵੇ ਦੇਖੋ',
      refresh: 'ਤਾਜ਼ਾ ਕਰੋ',
      submit: 'ਜਮ੍ਹਾਂ ਕਰੋ',
      cancel: 'ਰੱਦ ਕਰੋ',
      copyLink: 'ਲਿੰਕ ਕਾਪੀ ਕਰੋ'
    }
  },
  te: {
    brandName: 'అగ్రిటెక్ (AgriTech)',
    tagline: 'డిజిటల్ సాంకేతికతతో రైతులకు సాధికారత',
    mentorBarTitle: 'మెంటార్ సమీక్ష & ప్రాజెక్ట్ సమర్పణ హబ్',
    updateLinksBtn: 'డెమో మరియు గిట్‌హబ్ లింక్‌లను నవీకరించండి',
    kanbanWorkspace: 'వర్క్‌స్పేస్ & కాన్బన్ (19 టాస్క్‌లు)',
    demoLink: 'లైవ్ డెమో లింక్',
    githubLink: 'గిట్‌హబ్ రిపోజిటరీ',
    progress: 'ప్రాజెక్ట్ పురోగతి',
    epics: 'ఎపిక్స్ (6)',
    tasks: 'టాస్క్‌లు (19)',
    mentor: 'కేటాయించిన మెంటార్',
    tabs: {
      dashboard: 'సమీక్ష',
      farms: 'పొలం ప్రొఫైల్స్',
      crops: 'పంటల కాలక్రమం',
      soil: 'నేల ఆరోగ్యం',
      weather: 'వాతావరణం & తెగుళ్లు',
      aiDoctor: 'AI పంట డాక్టర్',
      marketplace: 'వ్యవసాయ మార్కెట్',
      community: 'నిపుణుల ఫోరమ్',
      admin: 'అడ్మిన్ డ్యాష్‌బోర్డ్'
    },
    roles: {
      farmer: 'రైతు (రమేష్)',
      expert: 'వ్యవసాయ నిపుణుడు (డా. శర్మ)',
      admin: 'సిస్టమ్ అడ్మిన్',
      switchRole: 'పాత్ర'
    },
    metrics: {
      totalFarms: 'నమోదైన పొలాలు',
      totalAcres: 'సాగు విస్తీర్ణం (ఎకరాలు)',
      activeCrops: 'క్రియాశీల పంటలు',
      weatherIndex: 'ఉష్ణోగ్రత',
      soilHealth: 'నేల నాణ్యత',
      sprayWindow: 'మందులు పిచికారీ సమయం'
    },
    actions: {
      addFarm: 'కొత్త పొలాన్ని నమోదు చేయండి',
      addCrop: 'పంటను జోడించండి',
      newSoilTest: 'ఎరువుల లెక్కించడం',
      askQuestion: 'నిపుణుడిని అడగండి',
      addToCart: 'కార్ట్‌కు జోడించండి',
      checkout: 'ఆర్డర్ పూర్తి చేయండి',
      viewDetails: 'వివరాలు చూడండి',
      refresh: 'రిఫ్రెష్ చేయండి',
      submit: 'సమర్పించండి',
      cancel: 'రద్దు చేయండి',
      copyLink: 'లింక్ కాపీ చేయండి'
    }
  }
};
