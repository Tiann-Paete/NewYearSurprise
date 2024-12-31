import { createContext, useContext, useState } from 'react';

const WishContext = createContext();

export function WishProvider({ children }) {
  const [wishData, setWishData] = useState({
    receiverName: '',
    wish: '',
    message: '',
    yearMessage: ''
  });

  const defaultMessages = [
    "May 2025 bring you endless joy, success, and beautiful moments! Your dreams are valid and achievable! ✨",
    "2025 is your year to sparkle! Whatever you're dreaming of, the stars are aligning just for you! 🌠💫",
    "Here comes 2025, ready to sprinkle magic dust on all your wishes! Time to watch miracles unfold! 🪄✨"
  ];

  const personalGrowthMessages = [
    "May 2025 be your year of incredible transformation! Let every challenge become a stepping stone to your dreams. Keep pushing your boundaries and growing into your best self! 🌱✨",
    "Here's to unlocking your full potential in 2025! May you find the strength to overcome your fears and embrace beautiful new chapters in your life journey. 🚀",
    "In 2025, may you bloom into the person you've always dreamed of becoming. Your journey of self-discovery will lead to amazing achievements! 🌸"
  ];

  const healthMessages = [
    "Wishing you abundant health and vitality in 2025! May each day bring you closer to your wellness goals, filling your life with energy and strength. 💪❤️",
    "Let 2025 be your healthiest year yet! Here's to nurturing your body, mind, and soul with love and care. Remember, your health is your greatest wealth! 🌿",
    "May 2025 bless you with perfect balance - physical strength, mental clarity, and emotional wellness. Your well-being matters! 🧘‍♀️"
  ];

  const loveMessages = [
    "May 2025 fill your heart with endless love and meaningful connections! Let your relationships flourish and bring joy to every moment.💖",
    "Here's to deeper bonds and beautiful memories in 2025! May love surround you in all its wonderful forms - family, friends, and romance. 💝",
    "In 2025, may your heart find the love it deserves, and your relationships grow stronger with each passing day. Love is life's greatest gift! 💕"
  ];

  const successMessages = [
    "May 2025 open doors to amazing opportunities! Your hard work will shine bright, bringing success and prosperity in your career journey. 📈✨",
    "Here's to achieving new heights in 2025! May your professional path be filled with growth, recognition, and fulfilling achievements. 🎯",
    "Let 2025 be your year of breakthrough success! Your dedication will lead to remarkable milestones and career excellence. 🌟"
  ];

  const peaceMessages = [
    "May 2025 bring you profound peace and serene joy! Let tranquility fill your days and happiness overflow in your heart.",
    "Here's to finding perfect harmony in 2025! May each moment bring you closer to inner peace and lasting contentment.",
    "In 2025, may peace embrace your soul and joy light up your world. Your happiness matters!"
  ];

  const adventureMessages = [
    "May 2025 be filled with exciting adventures and wonderful discoveries! Let your spirit soar as you explore new horizons. 🌎✈️",
    "Here's to breaking boundaries in 2025! May you find the courage to step out of your comfort zone and embrace amazing new experiences. 🚀",
    "Let 2025 be your year of bold adventures! May each new day bring thrilling opportunities and unforgettable moments. 🗺️"
  ];

  const preventiveMessages = [
    "Life holds so much beauty and promise! As we enter 2025, remember you're precious and loved. Let's focus on hope and new beginnings together. 🌅💖",
    "Your presence makes this world better! May 2025 show you all the wonderful reasons to smile and keep moving forward. You matter! 🌟",
    "Every new day is a fresh start! In 2025, let's embrace positivity and hope. Remember, you're stronger than you know, and you're never alone. 💕"
  ];

  const materialWishMessages = [
    "May 2025 bless you with the wisdom to save and the joy of achieving your material goals! Keep saving, your dream purchase is getting closer each day! 💰✨",
    "Here's to smart financial decisions in 2025! May your patience and dedication lead you to afford everything your heart desires. Remember, great things come to those who save! 🎯💖",
    "Let 2025 be your year of abundance! May your savings grow and your wishes for that special something come true. Your dedication will make it happen! 🌟"
  ];

  const crushMessages = [
    "Could 2025 be the year when that special someone finally notices you? Keep shining bright - sometimes the best love stories take time to unfold! 💫❤️",
    "May 2025 reveal the hidden feelings between you and that special person! Who knows? Maybe they're secretly wishing for you too! 🥰✨",
    "Here's hoping 2025 brings courage to both hearts! Sometimes the person you've been dreaming of has been dreaming of you too - they just need a little time! 💝",
    "May 2025 turn those subtle glances into beautiful conversations! Your special someone might just be waiting for the perfect moment to show their true feelings! 💖"
  ];

  const yearMessages = [
    "Time to release the weight of 2024's challenges...",
    "Let's leave behind what no longer serves us in 2024...",
    "Closing the chapter of 2024 with grace...",
    "Embracing fresh beginnings as we welcome 2025...",
    "Ready to write a new story in 2025...",
    "Letting go of 2024's burdens and opening our hearts to 2025..."
  ];

  const twoPersonMessages = [
    "Who knows? 2025 might be the perfect time for these two souls to find their way to each other. Let destiny work its magic! 💫",
    "Sometimes the best relationships start with a simple wish. May 2025 bring these two hearts closer if it's meant to be! 💕",
    "Life has a beautiful way of bringing people together. Let's see what 2025 has in store for these two! ✨",
    "The universe works in mysterious ways - maybe 2025 will write a beautiful story for these two hearts! 🌟"
  ];

  const hopelessMessages = [
    "Hey there! Even if you feel nothing matters right now, 2025 might surprise you with unexpected joy and possibilities! Keep your heart open! 🌅",
    "Sometimes when we feel lost, that's exactly when amazing changes are about to happen. Let 2025 show you new reasons to smile! ✨",
    "Your feelings are valid, but don't close your heart to 2025's possibilities. Beautiful things happen when we least expect them! 🌟",
    "Even if you can't see it now, 2025 holds countless opportunities for joy and meaning. Give it a chance! 💫"
  ];

  const harmfulWishMessages = [
    "Let's transform those negative thoughts into wishes for peace and healing. May 2025 bring light to your heart! 🕊️",
    "Instead of wishing harm, let's focus on personal growth and healing in 2025. Every soul deserves kindness! 💖",
    "Life is precious - let's make 2025 a year of spreading love and understanding, not hurt. Your heart is capable of so much good! 🌟",
    "May 2025 help release these heavy feelings and fill your heart with peace instead. Choose love over hatred! 🙏"
  ];

  const setReceiverName = (name) => {
    const randomMessage = yearMessages[Math.floor(Math.random() * yearMessages.length)];
    setWishData(prev => ({ ...prev, receiverName: name, yearMessage: randomMessage }));
  };

  const setWishMessage = (wish) => {
    const wishLower = wish.toLowerCase();
    
    const getRandomMessage = (messages) => {
      return messages[Math.floor(Math.random() * messages.length)];
    };

    const patterns = [
      {
        regex: /(?:(?:si|ni)\s+)?([a-zA-Z]+)\s+(?:ug|and)\s+([a-zA-Z]+)|([a-zA-Z]+)\s*,\s*([a-zA-Z]+)/i,
        messages: twoPersonMessages
      },
      {
        regex: /\b(?:nothing|wala|pake\s+mo)\b/i,
        messages: hopelessMessages
      },
      {
        regex: /\b(?:mamatay|magabaan|maligsan|muburot|muhubag|mupangit|pangit|mopangit|death|dead|magpakamatay)\b/i,
        messages: harmfulWishMessages
      },
      {
        regex: /mamatay|death|dead|magpakamatay|magabaan|maga-baan/,
        messages: preventiveMessages
      },
      {
        regex: /love|relationship|family|friends|happiness/,
        messages: loveMessages
      },
      {
        regex: /peace|joy|contentment|harmony/,
        messages: peaceMessages
      },
      {
        regex: /money|financial|rich|wealth|buy|invest|makapalit|makagunit|makadula|makalaro|makatigom/,
        messages: materialWishMessages
      },
      {
        regex: /magkadayon|crush|notice|love\s+ba\s+ni|know\s+each\s+other/,
        messages: crushMessages
      },
      {
        regex: /grow|better|achieve|goals|dreams|overcome/,
        messages: personalGrowthMessages
      },
      {
        regex: /health|care|physically|mentally|balance|strong|healthy/,
        messages: healthMessages
      },
      {
        regex: /adventure|experience|travel|new/,
        messages: adventureMessages
      },
      {
        regex: /career|success|growth|fulfillment|professional/,
        messages: successMessages
      }
    ];

    const cleanWish = wishLower
      .replace(/^\d+\.\s*/gm, '')
      .replace(/^[*-]\s*/gm, '') 
      .trim();

    let firstMatch = null;
    let firstMatchIndex = Infinity;

    patterns.forEach(({ regex, messages }) => {
      const match = cleanWish.match(regex);
      if (match && match.index < firstMatchIndex) {
        firstMatch = { regex, messages };
        firstMatchIndex = match.index;
      }
    });

    let message;
    if (firstMatch) {
      message = getRandomMessage(firstMatch.messages);
    } else {
      message = getRandomMessage(defaultMessages);
    }

    setWishData(prev => ({ ...prev, wish: wish, message: message }));
  };

  return (
    <WishContext.Provider value={{ wishData, setReceiverName, setWishMessage }}>
      {children}
    </WishContext.Provider>
  );
}

export function useWish() {
  const context = useContext(WishContext);
  if (!context) {
    throw new Error('useWish must be used within a WishProvider');
  }
  return context;
}