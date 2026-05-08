import { useState, useEffect, useRef } from "react";

// ─── Types ───
interface Official {
  id: number;
  role: string;
  roleEn: string;
  name: string;
  phone: string;
  address: string;
  photo: string;
  bio: string;
  color: string;
  icon: string;
}

interface Member {
  id: number;
  name: string;
  mobile: string;
  occupation: string;
  joinDate: string;
}

// ─── Default Data ───
const defaultOfficials: Official[] = [
  {
    id: 1, role: "সভাপতি", roleEn: "President",
    name: "মোহাম্মদ আবদুল করিম",
    phone: "০১৭১১-২৩৪৫৬৭",
    address: "মৌজা মালি বাড়ি সরদারপাড়া, গাইবান্ধা সদর, লক্ষীপুর",
    photo: "👤", bio: "দেমনা জামে মসজিদের প্রতিষ্ঠাতা সভাপতি। ১৯৮৫ সাল থেকে মসজিদ পরিচালনা পর্ষদের সভাপতির দায়িত্ব পালন করছেন।",
    color: "from-emerald-600 to-green-700", icon: "🏛️",
  },
  {
    id: 2, role: "সেক্রেটারি", roleEn: "Secretary",
    name: "মোহাম্মদ শাহজাহান মিয়া",
    phone: "০১৮১২-৩৪৫৬৭৮",
    address: "মৌজা মালি বাড়ি সরদারপাড়া, গাইবান্ধা সদর, লক্ষীপুর",
    photo: "👤", bio: "মসজিদ পরিচালনা পর্ষদের সেক্রেটারি হিসেবে দায়িত্বরত। শিক্ষা ও সমাজসেবায় সক্রিয় ভূমিকা রাখছেন।",
    color: "from-teal-600 to-cyan-700", icon: "📋",
  },
  {
    id: 3, role: "ইমাম সাহেব", roleEn: "Imam",
    name: "মাওলানা আবদুল হালিম",
    phone: "০১৯১৩-৪৫৬৭৮৯",
    address: "মৌজা মালি বাড়ি সরদারপাড়া, গাইবান্ধা সদর, লক্ষীপুর",
    photo: "👤", bio: "ইসলামী শিক্ষায় স্নাতক। দীর্ঘ ২০ বছর ধরে মসজিদে ইমামতি ও খুতবা দান করছেন।",
    color: "from-amber-600 to-yellow-700", icon: "📖",
  },
  {
    id: 4, role: "মুয়াজ্জিন", roleEn: "Muezzin",
    name: "হাফেজ মোহাম্মদ ইউসুফ",
    phone: "০১৬১৪-৫৬৭৮৯০",
    address: "মৌজা মালি বাড়ি সরদারপাড়া, গাইবান্ধা সদর, লক্ষীপুর",
    photo: "👤", bio: "কুরআন হাফেজ ও মসজিদের সম্মানিত মুয়াজ্জিন। সুমধুর কণ্ঠে আযান ও কামাত দিয়ে মুসল্লিদের হৃদয় স্পর্শ করেন।",
    color: "from-purple-600 to-violet-700", icon: "🕌",
  },
];

const defaultMembers: Member[] = [
  { id: 1, name: "আবদুর রহমান", mobile: "০১৭১১-১১১১১১", occupation: "কৃষক", joinDate: "২০২৩-০১-১৫" },
  { id: 2, name: "মোস্তফা কামাল", mobile: "০১৮২২-২২২২২২", occupation: "ব্যবসায়ী", joinDate: "২০২৩-০৩-২০" },
  { id: 3, name: "রফিকুল ইসলাম", mobile: "০১৯৩৩-৩৩৩৩৩৩", occupation: "শিক্ষক", joinDate: "২০২৩-০৬-১০" },
];

const ADMIN_PASSWORD = "Admin@Masjid2025";

// ─── Main App ───
export function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [officials, setOfficials] = useState<Official[]>(defaultOfficials);
  const [members, setMembers] = useState<Member[]>(defaultMembers);
  const [selectedOfficial, setSelectedOfficial] = useState<Official | null>(null);
  const [editingOfficial, setEditingOfficial] = useState<Official | null>(null);
  const [showAddMember, setShowAddMember] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotification, setShowNotification] = useState(true);

  const [newName, setNewName] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [newOccupation, setNewOccupation] = useState("");

  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editPhoto, setEditPhoto] = useState("");

  const photoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatBengaliDate = (date: Date) => {
    const bengaliMonths = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
    const bengaliDays = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
    return `${bengaliDays[date.getDay()]}, ${date.getDate()} ${bengaliMonths[date.getMonth()]} ${date.getFullYear()}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowLogin(false);
      setLoginError("");
      setPassword("");
    } else {
      setLoginError("ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিন।");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setShowLogin(true);
    setPassword("");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (photo: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { callback(reader.result as string); };
      reader.readAsDataURL(file);
    }
  };

  const openEdit = (official: Official) => {
    setEditingOfficial(official);
    setEditName(official.name);
    setEditPhone(official.phone);
    setEditBio(official.bio);
    setEditPhoto(official.photo);
  };

  const handleSaveEdit = () => {
    if (!editingOfficial) return;
    setOfficials(officials.map(o =>
      o.id === editingOfficial.id
        ? { ...o, name: editName, phone: editPhone, bio: editBio, photo: editPhoto }
        : o
    ));
    setEditingOfficial(null);
    setSelectedOfficial(null);
  };

  const handleAddMember = () => {
    if (!newName.trim() || !newMobile.trim() || !newOccupation.trim()) {
      alert("সকল তথ্য পূরণ করুন!");
      return;
    }
    const member: Member = {
      id: Date.now(),
      name: newName.trim(),
      mobile: newMobile.trim(),
      occupation: newOccupation.trim(),
      joinDate: new Date().toISOString().split("T")[0],
    };
    setMembers([member, ...members]);
    setNewName("");
    setNewMobile("");
    setNewOccupation("");
    setShowAddMember(false);
  };

  const handleDeleteMember = (id: number) => {
    if (confirm("এই সদস্যকে মুছে ফেলতে চান?")) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  // ═══════════════════════════════════════
  // ─── LOGIN SCREEN ───
  // ═══════════════════════════════════════
  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a2e0a] via-[#0d3d0d] to-[#0a1f0a] font-['Noto_Sans_Bengali',sans-serif] flex items-center justify-center p-4" style={{ maxWidth: "480px", margin: "0 auto" }}>
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <div className="w-full h-full bg-gradient-to-br from-[#1a5c1a] to-[#0d3d0d] rounded-full flex items-center justify-center text-6xl shadow-2xl shadow-[#d4af37]/20 border-2 border-[#d4af37]/40 glow-gold">
                🕌
              </div>
              <div className="absolute inset-[-8px] border-2 border-dashed border-[#d4af37]/20 rounded-full animate-spin" style={{ animationDuration: "20s" }}></div>
            </div>
            <h1 className="text-3xl font-bold islamic-shimmer mb-2">মালি বাড়ি সরদারপাড়া</h1>
            <h2 className="text-xl font-bold text-[#d4af37] mb-1">জামে মসজিদ</h2>
            <p className="text-[#4a7c4a] text-sm">গাইবান্ধা সদর, ১ নং লক্ষীপুর</p>
          </div>

          <div className="bg-[#0d3d0d]/80 backdrop-blur-xl border border-[#d4af37]/20 rounded-3xl p-6 shadow-2xl shadow-[#d4af37]/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#d4af37]/30 rounded-tl-3xl"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#d4af37]/30 rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#d4af37]/30 rounded-bl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#d4af37]/30 rounded-br-3xl"></div>

            <div className="relative z-10 text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#b8860b] rounded-2xl mx-auto flex items-center justify-center text-3xl shadow-lg mb-3 glow-gold">
                🔐
              </div>
              <h3 className="text-white text-xl font-bold mb-1">অ্যাডমিন লগইন</h3>
              <p className="text-[#4a7c4a] text-xs">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
              <p className="text-[#4a7c4a] text-xs mt-1">শুধুমাত্র অনুমোদিত ব্যবহারকারী</p>
            </div>

            <div className="space-y-4 relative z-10">
              <div>
                <label className="text-[#8fbc8f] text-sm font-semibold mb-2 block">🔑 গোপন পাসওয়ার্ড</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setLoginError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="পাসওয়ার্ড লিখুন"
                  className="w-full bg-[#0a2e0a]/80 border border-[#d4af37]/30 rounded-xl px-4 py-3 text-[#d4af37] placeholder-[#3a6b3a]/60 focus:outline-none focus:border-[#d4af37]/70 focus:ring-2 focus:ring-[#d4af37]/20 transition-all text-sm"
                />
              </div>

              {loginError && (
                <div className="bg-red-900/30 border border-red-500/40 rounded-xl p-3 text-center">
                  <p className="text-red-400 text-sm">⚠️ {loginError}</p>
                </div>
              )}

              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] rounded-xl p-4 text-center text-[#0a2e0a] font-bold text-base shadow-lg shadow-[#d4af37]/30 active:scale-95 transition-transform"
              >
                🔓 লগইন করুন
              </button>
            </div>

            <div className="mt-4 bg-[#0a2e0a]/60 rounded-xl p-3 text-center relative z-10">
              <p className="text-[#4a7c4a] text-xs">🔒 ডিফল্ট পাসওয়ার্ড: <span className="text-[#d4af37] font-bold">Admin@Masjid2025</span></p>
            </div>
          </div>

          <p className="text-center text-[#3a6b3a] text-xs mt-6">© ২০২৫ মালি বাড়ি সরদারপাড়া জামে মসজিদ</p>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════
  // ─── MAIN APP ───
  // ═══════════════════════════════════════
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a2e0a] via-[#0d3d0d] to-[#081a08] font-['Noto_Sans_Bengali',sans-serif]" style={{ maxWidth: "480px", margin: "0 auto" }}>
      
      {/* ─── Header ─── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a2e0a] via-[#1a4a1a] to-[#0a2e0a]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08),transparent_70%)]"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
        
        <div className="relative z-10 bg-gradient-to-r from-[#0d3d0d] via-[#1a5c1a] to-[#0d3d0d] px-4 pt-3 pb-4">
          <div className="flex justify-between items-center text-[#8fbc8f]/70 text-xs mb-3">
            <span>{formatTime(currentTime)}</span>
            <div className="flex items-center gap-2">
              <span className="bg-[#d4af37]/20 text-[#d4af37] text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-pulse"></span>
                অ্যাডমিন
              </span>
              <button onClick={handleLogout} className="bg-red-900/30 text-red-400/70 text-xs px-3 py-1 rounded-full hover:bg-red-900/40 transition-colors font-semibold">
                লগআউট
              </button>
            </div>
          </div>
          
          <div className="text-center relative">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 text-[#d4af37]/40 text-2xl">✦</div>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-[#d4af37]/40 text-2xl">✦</div>
            
            <div className="text-5xl mb-3 drop-shadow-lg" style={{ filter: "drop-shadow(0 0 10px rgba(212,175,55,0.3))" }}>🕌</div>
            <h1 className="text-2xl font-bold islamic-shimmer mb-1">মালি বাড়ি সরদারপাড়া জামে মসজিদ</h1>
            <p className="text-[#8fbc8f] text-sm mt-1 font-medium">মৌজা মালি বাড়ি সরদারপাড়া</p>
            <p className="text-[#4a7c4a] text-xs mt-1">গাইবান্ধা সদর, ১ নং লক্ষীপুর</p>
            <p className="text-[#3a6b3a] text-xs mt-1">{formatBengaliDate(currentTime)}</p>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent"></div>
      </div>

      {/* ─── Notification Banner ─── */}
      {showNotification && (
        <div className="mx-4 mt-4 bg-gradient-to-r from-[#1a3a1a]/80 to-[#0d2e0d]/80 border border-[#d4af37]/20 rounded-2xl p-3 flex items-center gap-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="text-2xl flex-shrink-0">📢</div>
          <div className="flex-1">
            <p className="text-[#8fbc8f] text-sm font-semibold">আজকের ঘোষণা</p>
            <p className="text-[#6a9a6a]/70 text-xs mt-1">শুক্রবারের জুমার নামাজ জামাতে আদায় করুন। চাঁদা প্রদানে সহযোগিতা করুন।</p>
          </div>
          <button onClick={() => setShowNotification(false)} className="text-[#4a7c4a] hover:text-[#8fbc8f] text-lg flex-shrink-0">✕</button>
        </div>
      )}

      {/* ─── Bkash Donation Card ─── */}
      <div className="mx-4 mt-4 bg-gradient-to-br from-[#1a2e1a]/80 via-[#2a4a2a]/60 to-[#1a3a1a]/80 border border-[#d4af37]/30 rounded-2xl p-4 relative overflow-hidden glow-gold">
        <div className="absolute top-0 left-0 w-40 h-40 bg-[#d4af37]/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">💰</span>
            <h2 className="text-[#d4af37] font-bold text-base">মসজিদ চাঁদা প্রদান</h2>
          </div>
          <div className="bg-[#0a2e0a]/60 backdrop-blur-sm rounded-2xl p-4 border border-[#d4af37]/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#b8860b] rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-[#d4af37]/20">
                💳
              </div>
              <div>
                <p className="text-[#8fbc8f] text-xs font-semibold">বিকাশ (মার্চেন্ট)</p>
                <p className="text-white text-lg font-bold tracking-wider">০১৭১৩-৯২৮০২৪</p>
              </div>
            </div>
            <a
              href="https://play.google.com/store/apps/details?id=com.bkash.android"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] rounded-xl p-3 text-center text-[#0a2e0a] font-bold text-sm shadow-lg shadow-[#d4af37]/30 active:scale-95 transition-transform block"
            >
              📱 বিকাশে চাঁদা দিন
            </a>
          </div>
        </div>
      </div>

      {/* ─── Prayer Times ─── */}
      <div className="mx-4 mt-4 bg-[#0d3d0d]/60 backdrop-blur-sm border border-[#d4af37]/20 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🕋</span>
          <h2 className="text-[#d4af37] font-bold text-base">আজকের নামাজের সময়সূচি</h2>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {[
            { name: "ফজর", time: "০৪:৩৫", icon: "🌅" },
            { name: "যোহর", time: "১২:১৫", icon: "☀️" },
            { name: "আসর", time: "০৩:৪৫", icon: "🌤️" },
            { name: "মাগরিব", time: "০৬:২০", icon: "🌇" },
            { name: "ইশা", time: "০৭:৪৫", icon: "🌙" },
          ].map((prayer) => (
            <div key={prayer.name} className="text-center bg-[#0a2e0a]/60 rounded-xl p-2 border border-[#d4af37]/15 hover:border-[#d4af37]/40 hover:bg-[#1a4a1a]/60 transition-all duration-300">
              <div className="text-lg mb-1">{prayer.icon}</div>
              <p className="text-white text-xs font-semibold">{prayer.name}</p>
              <p className="text-[#d4af37] text-sm font-bold mt-1">{prayer.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Officials Section ─── */}
      <div className="mx-4 mt-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">👥</span>
            <h2 className="text-[#d4af37] font-bold text-lg">পরিচালনা পর্ষদ</h2>
          </div>
          <span className="bg-[#d4af37]/20 text-[#d4af37] text-xs font-bold px-2 py-1 rounded-full">
            {officials.length} জন
          </span>
        </div>

        <div className="space-y-3">
          {officials.map((official) => (
            <div key={official.id} className="bg-[#0d3d0d]/70 backdrop-blur-sm border border-[#d4af37]/20 rounded-2xl overflow-hidden hover:border-[#d4af37]/40 transition-all duration-300">
              <div className="flex items-center gap-4 p-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${official.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden flex-shrink-0`}>
                  {official.photo.startsWith("data:") ? (
                    <img src={official.photo} alt={official.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{official.icon}</span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-base truncate">{official.name}</h3>
                  <p className={`text-sm font-semibold bg-gradient-to-r ${official.color} bg-clip-text text-transparent mt-0.5`}>
                    {official.role}
                  </p>
                  <p className="text-[#4a7c4a] text-xs mt-1 flex items-center gap-1">
                    <span>📞</span> {official.phone}
                  </p>
                </div>

                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button
                    onClick={() => setSelectedOfficial(official)}
                    className="w-9 h-9 bg-[#d4af37]/20 rounded-xl flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37]/40 transition-colors text-sm"
                    title="বিস্তারিত দেখুন"
                  >
                    👁️
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => openEdit(official)}
                      className="w-9 h-9 bg-[#d4af37]/30 rounded-xl flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37]/50 transition-colors text-sm"
                      title="এডিট করুন"
                    >
                      ✏️
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Quick Contact ─── */}
      <div className="mx-4 mt-4 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">📞</span>
          <h2 className="text-[#d4af37] font-bold text-lg">দ্রুত যোগাযোগ</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {officials.map((official) => (
            <a
              key={`call-${official.id}`}
              href={`tel:${official.phone.replace(/[০-৯]/g, (d) => String("০১২৩৪৫৬৭৮৯".indexOf(d)))}`}
              className={`bg-gradient-to-br ${official.color} rounded-2xl p-4 text-center text-white shadow-lg shadow-[#d4af37]/10 hover:shadow-xl hover:shadow-[#d4af37]/20 transition-all duration-300 active:scale-95`}
            >
              <div className="text-3xl mb-2">{official.icon}</div>
              <p className="font-bold text-sm">{official.role}</p>
              <p className="text-white/80 text-xs mt-1">{official.name}</p>
              <div className="mt-2 bg-white/20 rounded-full px-3 py-1 text-xs font-semibold inline-block">
                📞 কল করুন
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ─── Members Section ─── */}
      <div className="mx-4 mt-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">👥</span>
            <h2 className="text-[#d4af37] font-bold text-lg">মসজিদ সদস্য</h2>
            <span className="bg-[#d4af37]/20 text-[#d4af37] text-xs font-bold px-2 py-1 rounded-full">
              {members.length} জন
            </span>
          </div>
          {isAdmin && (
            <button
              onClick={() => setShowAddMember(true)}
              className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0a2e0a] text-sm font-bold px-4 py-2 rounded-xl shadow-lg shadow-[#d4af37]/20 active:scale-95 transition-transform flex items-center gap-1"
            >
              <span className="text-lg leading-none">+</span> সদস্য যোগ করুন
            </button>
          )}
        </div>

        <div className="space-y-2">
          {members.map((member, index) => (
            <div key={member.id} className="bg-[#0d3d0d]/60 backdrop-blur-sm border border-[#d4af37]/15 rounded-2xl p-4 hover:border-[#d4af37]/35 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1a5c1a] to-[#0d3d0d] rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-sm truncate">{member.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-[#4a7c4a] text-xs flex items-center gap-1">
                      <span>📱</span> {member.mobile}
                    </p>
                    <span className="bg-[#0a2e0a] text-[#8fbc8f] text-xs px-2 py-0.5 rounded-full">
                      💼 {member.occupation}
                    </span>
                  </div>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => handleDeleteMember(member.id)}
                    className="text-red-400/60 hover:text-red-400 hover:bg-red-400/10 p-2 rounded-xl transition-all duration-300 flex-shrink-0"
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Mosque Info ─── */}
      <div className="mx-4 mt-4 mb-8">
        <div className="bg-[#0d3d0d]/60 backdrop-blur-sm border border-[#d4af37]/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🏗️</span>
            <h2 className="text-[#d4af37] font-bold text-base">মসজিদের তথ্য</h2>
          </div>
          <div className="space-y-2">
            {[
              { icon: "📍", title: "মালি বাড়ি সরদারপাড়া জামে মসজিদ", desc: "মৌজা মালি বাড়ি সরদারপাড়া, গাইবান্ধা সদর, ১ নং লক্ষীপুর" },
              { icon: "📅", title: "প্রতিষ্ঠাকাল", desc: "১৯৮৫ সাল" },
              { icon: "📐", title: "ধারণক্ষমতা", desc: "৫০০+ মুসল্লি" },
              { icon: "🏫", title: "মাদ্রাসা/কিতাবখানা", desc: "নারী-পুরুষ আলাদা মকতব চালু আছে" },
            ].map((info, i) => (
              <div key={i} className="flex items-start gap-3 bg-[#0a2e0a]/40 rounded-xl p-3">
                <span className="text-lg flex-shrink-0">{info.icon}</span>
                <div>
                  <p className="text-[#8fbc8f] text-sm font-semibold">{info.title}</p>
                  <p className="text-[#4a7c4a] text-xs">{info.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Footer ─── */}
      <div className="bg-[#081a08]/80 border-t border-[#d4af37]/20 px-4 py-4 text-center">
        <div className="flex justify-center gap-2 mb-2">
          <span className="text-[#d4af37]/40 text-lg">✦</span>
          <span className="text-[#d4af37]/40 text-lg">🕌</span>
          <span className="text-[#d4af37]/40 text-lg">✦</span>
        </div>
        <p className="text-[#4a7c4a] text-xs">🕌 মালি বাড়ি সরদারপাড়া জামে মসজিদ পরিচালনা পর্ষদ</p>
        <p className="text-[#3a6b3a] text-xs mt-1">গাইবান্ধা সদর, লক্ষীপুর</p>
        <p className="text-[#2a5a2a] text-xs mt-1">© ২০২৫ সর্বস্বত্ব সংরক্ষিত</p>
      </div>

      {/* ═══════════════════════════════════════ */}
      {/* ─── OFFICIAL DETAIL MODAL ─── */}
      {/* ═══════════════════════════════════════ */}
      {selectedOfficial && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center" onClick={() => setSelectedOfficial(null)}>
          <div className="bg-gradient-to-b from-[#0d3d0d] to-[#081a08] w-full max-w-[480px] rounded-t-3xl p-6 animate-slide-up" onClick={(e) => e.stopPropagation()} style={{ animation: "slideUp 0.3s ease-out" }}>
            <div className="w-12 h-1.5 bg-[#d4af37]/40 rounded-full mx-auto mb-4"></div>
            
            <div className="flex justify-between items-start mb-4">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedOfficial.color} flex items-center justify-center text-4xl shadow-xl overflow-hidden`}>
                {selectedOfficial.photo.startsWith("data:") ? (
                  <img src={selectedOfficial.photo} alt={selectedOfficial.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{selectedOfficial.icon}</span>
                )}
              </div>
              <button onClick={() => setSelectedOfficial(null)} className="w-10 h-10 bg-[#d4af37]/20 rounded-full flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37]/40 transition-colors">✕</button>
            </div>

            <h2 className="text-white text-2xl font-bold">{selectedOfficial.name}</h2>
            <p className={`text-sm font-semibold bg-gradient-to-r ${selectedOfficial.color} bg-clip-text text-transparent mt-1`}>
              {selectedOfficial.role} • {selectedOfficial.roleEn}
            </p>

            <div className="mt-4 bg-[#0a2e0a]/60 rounded-2xl p-4">
              <p className="text-[#8fbc8f] text-sm leading-relaxed">{selectedOfficial.bio}</p>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 bg-[#0a2e0a]/40 rounded-xl p-3">
                <span className="text-xl">📞</span>
                <div>
                  <p className="text-[#4a7c4a] text-xs">মোবাইল নম্বর</p>
                  <p className="text-white font-semibold text-sm">{selectedOfficial.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-[#0a2e0a]/40 rounded-xl p-3">
                <span className="text-xl">📍</span>
                <div>
                  <p className="text-[#4a7c4a] text-xs">ঠিকানা</p>
                  <p className="text-white font-semibold text-sm">{selectedOfficial.address}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <a href={`tel:${selectedOfficial.phone.replace(/[০-৯]/g, (d) => String("০১২৩৪৫৬৭৮৯".indexOf(d)))}`} className={`bg-gradient-to-r ${selectedOfficial.color} rounded-2xl p-4 text-center text-white font-bold text-sm shadow-lg active:scale-95 transition-transform`}>
                📞 ফোন করুন
              </a>
              <a href={`https://wa.me/88${selectedOfficial.phone.replace(/[০-৯]/g, (d) => String("০১২৩৪৫৬৭৮৯".indexOf(d)))}`} className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] rounded-2xl p-4 text-center text-[#0a2e0a] font-bold text-sm shadow-lg active:scale-95 transition-transform">
                💬 হোয়াটসঅ্যাপ
              </a>
            </div>

            <div className="h-4"></div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════ */}
      {/* ─── EDIT OFFICIAL MODAL ─── */}
      {/* ═══════════════════════════════════════ */}
      {editingOfficial && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center" onClick={() => setEditingOfficial(null)}>
          <div className="bg-gradient-to-b from-[#0d3d0d] to-[#081a08] w-full max-w-[480px] rounded-t-3xl p-6 animate-slide-up" onClick={(e) => e.stopPropagation()} style={{ animation: "slideUp 0.3s ease-out" }}>
            <div className="w-12 h-1.5 bg-[#d4af37]/40 rounded-full mx-auto mb-4"></div>
            
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#b8860b] rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                  ✏️
                </div>
                <div>
                  <h2 className="text-white text-xl font-bold">তথ্য এডিট করুন</h2>
                  <p className="text-[#8fbc8f] text-xs mt-0.5">{editingOfficial.role} - {editingOfficial.name}</p>
                </div>
              </div>
              <button onClick={() => setEditingOfficial(null)} className="w-10 h-10 bg-[#d4af37]/20 rounded-full flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37]/40 transition-colors">✕</button>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div 
                  onClick={() => photoInputRef.current?.click()}
                  className="w-24 h-24 rounded-2xl bg-[#0a2e0a]/60 border-2 border-dashed border-[#d4af37]/30 mx-auto flex items-center justify-center cursor-pointer hover:border-[#d4af37]/60 transition-colors overflow-hidden mb-2"
                >
                  {editPhoto && editPhoto.startsWith("data:") ? (
                    <img src={editPhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <div className="text-3xl mb-1">📷</div>
                      <p className="text-[#4a7c4a] text-xs">ছবি আপলোড</p>
                    </div>
                  )}
                </div>
                <input ref={photoInputRef} type="file" accept="image/*" onChange={(e) => handlePhotoUpload(e, setEditPhoto)} className="hidden" />
                <p className="text-[#4a7c4a] text-xs">ছবি পরিবর্তন করতে ক্লিক করুন</p>
                {editPhoto && (
                  <button onClick={() => setEditPhoto("")} className="text-red-400 text-xs mt-1 hover:text-red-300">❌ ছবি মুছুন</button>
                )}
              </div>

              <div>
                <label className="text-[#8fbc8f] text-sm font-semibold mb-2 block">👤 নাম</label>
                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full bg-[#0a2e0a]/60 border border-[#d4af37]/30 rounded-xl px-4 py-3 text-white placeholder-[#3a6b3a]/40 focus:outline-none focus:border-[#d4af37]/70 focus:ring-2 focus:ring-[#d4af37]/20 transition-all text-sm" />
              </div>

              <div>
                <label className="text-[#8fbc8f] text-sm font-semibold mb-2 block">📞 মোবাইল নম্বর</label>
                <input type="tel" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="w-full bg-[#0a2e0a]/60 border border-[#d4af37]/30 rounded-xl px-4 py-3 text-white placeholder-[#3a6b3a]/40 focus:outline-none focus:border-[#d4af37]/70 focus:ring-2 focus:ring-[#d4af37]/20 transition-all text-sm" />
              </div>

              <div>
                <label className="text-[#8fbc8f] text-sm font-semibold mb-2 block">📝 জীবনী</label>
                <textarea value={editBio} onChange={(e) => setEditBio(e.target.value)} rows={3} className="w-full bg-[#0a2e0a]/60 border border-[#d4af37]/30 rounded-xl px-4 py-3 text-white placeholder-[#3a6b3a]/40 focus:outline-none focus:border-[#d4af37]/70 focus:ring-2 focus:ring-[#d4af37]/20 transition-all text-sm resize-none" />
              </div>

              <button onClick={handleSaveEdit} className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] rounded-2xl p-4 text-center text-[#0a2e0a] font-bold text-base shadow-lg shadow-[#d4af37]/30 active:scale-95 transition-transform">
                💾 সংরক্ষণ করুন
              </button>
            </div>

            <div className="h-4"></div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════ */}
      {/* ─── ADD MEMBER MODAL ─── */}
      {/* ═══════════════════════════════════════ */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center" onClick={() => setShowAddMember(false)}>
          <div className="bg-gradient-to-b from-[#0d3d0d] to-[#081a08] w-full max-w-[480px] rounded-t-3xl p-6 animate-slide-up" onClick={(e) => e.stopPropagation()} style={{ animation: "slideUp 0.3s ease-out" }}>
            <div className="w-12 h-1.5 bg-[#d4af37]/40 rounded-full mx-auto mb-4"></div>
            
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#b8860b] rounded-2xl flex items-center justify-center text-2xl shadow-lg">➕</div>
                <div>
                  <h2 className="text-white text-xl font-bold">নতুন সদস্য যোগ করুন</h2>
                  <p className="text-[#8fbc8f] text-xs mt-0.5">সকল তথ্য পূরণ করুন</p>
                </div>
              </div>
              <button onClick={() => setShowAddMember(false)} className="w-10 h-10 bg-[#d4af37]/20 rounded-full flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37]/40 transition-colors">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[#8fbc8f] text-sm font-semibold mb-2 block">👤 নাম</label>
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="আপনার পুরো নাম লিখুন" className="w-full bg-[#0a2e0a]/60 border border-[#d4af37]/30 rounded-xl px-4 py-3 text-white placeholder-[#3a6b3a]/40 focus:outline-none focus:border-[#d4af37]/70 focus:ring-2 focus:ring-[#d4af37]/20 transition-all text-sm" />
              </div>
              <div>
                <label className="text-[#8fbc8f] text-sm font-semibold mb-2 block">📱 মোবাইল নম্বর</label>
                <input type="tel" value={newMobile} onChange={(e) => setNewMobile(e.target.value)} placeholder="০১৭XXXXXXXX" className="w-full bg-[#0a2e0a]/60 border border-[#d4af37]/30 rounded-xl px-4 py-3 text-white placeholder-[#3a6b3a]/40 focus:outline-none focus:border-[#d4af37]/70 focus:ring-2 focus:ring-[#d4af37]/20 transition-all text-sm" />
              </div>
              <div>
                <label className="text-[#8fbc8f] text-sm font-semibold mb-2 block">💼 পেশা</label>
                <input type="text" value={newOccupation} onChange={(e) => setNewOccupation(e.target.value)} placeholder="আপনার পেশা লিখুন" className="w-full bg-[#0a2e0a]/60 border border-[#d4af37]/30 rounded-xl px-4 py-3 text-white placeholder-[#3a6b3a]/40 focus:outline-none focus:border-[#d4af37]/70 focus:ring-2 focus:ring-[#d4af37]/20 transition-all text-sm" />
              </div>
              <button onClick={handleAddMember} className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] rounded-2xl p-4 text-center text-[#0a2e0a] font-bold text-base shadow-lg shadow-[#d4af37]/30 active:scale-95 transition-transform">
                ✅ সদস্য হিসেবে যোগ করুন
              </button>
            </div>
            <div className="h-4"></div>
          </div>
        </div>
      )}

      {/* CSS Animation */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
        * {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
}
