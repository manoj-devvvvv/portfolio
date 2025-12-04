import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { 
  LayoutGrid, User, Briefcase, Trophy, Mail, 
  Github, Edit2, Trash2, Loader2, Lock, LogOut
} from 'lucide-react';

// --- CONFIGURATION FROM ENV ---
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Initialize Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// --- ANIMATION CONFIG ---
const spring = { type: "spring", stiffness: 300, damping: 30 };

// --- COMPONENTS ---

const Particles = () => {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const newDots = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
    }));
    setDots(newDots);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute bg-white rounded-full opacity-10"
          initial={{ x: `${dot.x}vw`, y: `${dot.y}vh`, opacity: 0 }}
          animate={{ 
            y: [null, `${dot.y - 20}vh`],
            opacity: [0, 0.4, 0] 
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ width: dot.size, height: dot.size }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
    </div>
  );
};

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', icon: LayoutGrid, label: 'Home' },
    { id: 'projects', icon: Briefcase, label: 'Work' },
    { id: 'about', icon: User, label: 'Profile' },
    { id: 'achievements', icon: Trophy, label: 'Achieved' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed left-0 top-0 h-screen w-20 lg:w-64 flex-col justify-between p-6 border-r border-white/5 bg-black/50 backdrop-blur-xl z-50">
        <div>
          <div className="mb-12 flex items-center justify-center lg:justify-start gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              <span className="font-black text-black text-xl">M</span>
            </div>
            <span className="hidden lg:block font-bold text-xl tracking-tight text-white">MANOJ DOPPA</span>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-center lg:justify-start gap-4 p-3 rounded-xl transition-all duration-300 relative group ${
                  activeTab === item.id ? 'text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {activeTab === item.id && (
                  <motion.div 
                    layoutId="active-pill" 
                    className="absolute inset-0 bg-white rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
                    transition={spring} 
                  />
                )}
                <item.icon size={20} className="relative z-10" />
                <span className="hidden lg:block font-medium relative z-10">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 p-2 rounded-2xl flex justify-between items-center z-50 shadow-2xl">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`p-3 rounded-xl transition-all relative ${activeTab === item.id ? 'text-black' : 'text-gray-500'}`}
          >
             {activeTab === item.id && (
                  <motion.div layoutId="active-pill-mobile" className="absolute inset-0 bg-white rounded-xl" transition={spring} />
            )}
            <item.icon size={20} className="relative z-10" />
          </button>
        ))}
      </div>
    </>
  );
};

// --- CONTENT SECTIONS ---

const Home = ({ setActiveTab }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className="bg-[#0f0f0f]/80 backdrop-blur-md border border-white/5 p-8 rounded-3xl flex flex-col justify-center relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs font-bold mb-6 animate-pulse">
          ● AVAILABLE FOR HIRE
        </div>
        <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tighter text-white">
          Code.<br/>Create.<br/><span className="text-gray-600">Conquer.</span>
        </h1>
        <p className="text-gray-400 max-w-sm mb-8">
          Full Stack Engineer. Transforming complex problems into elegant, scalable solutions.
        </p>
        <button onClick={() => setActiveTab('projects')} className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform w-max">
          View Projects
        </button>
      </div>
    </motion.div>

    <div className="grid gap-6 content-start">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#0f0f0f]/80 backdrop-blur-md border border-white/5 p-8 rounded-3xl flex items-center justify-between">
        <div>
          <div className="text-4xl font-bold mb-1 text-white">2+</div>
          <div className="text-gray-500 text-xs font-bold uppercase">Years Experience</div>
        </div>
        <Github size={40} className="text-white/20" />
      </motion.div>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#0f0f0f]/80 backdrop-blur-md border border-white/5 p-8 rounded-3xl">
        <h3 className="text-gray-500 text-xs font-bold uppercase mb-4">Tech Arsenal</h3>
        <div className="flex flex-wrap gap-2">
          {['React', 'Next.js', 'Node.js', 'Python', 'Supabase', 'SQL', 'Tailwind', 'AI', '#C', 'C++', 'Java', 'Prompting', 'AWS', 'Azure', 'Git'].map(t => (
            <span key={t} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-sm text-gray-300">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if(data) setProjects(data);
    };
    fetch();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project, i) => (
        <motion.a
          key={project.id}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
          href={project.project_link}
          target="_blank"
          className="group block bg-[#0f0f0f]/80 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all hover:scale-[1.02]"
        >
          <div className="h-56 bg-[#151515] relative">
            {project.image_url ? (
              <img src={project.image_url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={project.title} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-800 text-6xl font-black">DEV</div>
            )}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
              {project.category || 'APP'}
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mt-2 mb-2 text-white">{project.title}</h3>
            <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>
          </div>
        </motion.a>
      ))}
    </div>
  );
};

const About = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
    <div className="bg-[#0f0f0f]/80 backdrop-blur-md border border-white/5 rounded-3xl p-8 md:p-12">
      <h2 className="text-3xl font-bold mb-8 text-white">About Me</h2>
      <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-light">
        <p>
          I am a 18-year-old Full Stack Developer and Entrepreneur based in India. 
          My journey started with a curiosity for how things work, which quickly evolved into a passion for building software.
        </p>
        <p>
          I spend my free time exploring Machine Learning, Cryptography, and scalable architecture.
        </p>
      </div>

      <div className="mt-12 pt-12 border-t border-white/5">
        <h3 className="text-white font-bold mb-6 text-xl">Timeline</h3>
        <div className="space-y-8">
          <div className="flex gap-4 group">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-white rounded-full group-hover:scale-150 transition-transform" />
              <div className="w-0.5 h-full bg-white/10 mt-2" />
            </div>
            <div>
              <h4 className="font-bold text-white">Faceless Content Creator</h4>
              <p className="text-gray-500 text-sm">2019 - Present</p>
            </div>
          </div>
          <div className="flex gap-4 group">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-gray-600 rounded-full group-hover:bg-white transition-colors" />
            </div>
            <div>
              <h4 className="font-bold text-white">Tech Journey</h4>
              <p className="text-gray-500 text-sm">2023 - Present</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const Achievements = () => {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('achievements').select('*'); 
      if(data) setItems(data);
    };
    fetch();
  }, []);

  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Achievements</h2>
      {items.map((item, i) => (
        <motion.div 
          key={item.id} 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
          className="bg-[#0f0f0f]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex items-center gap-6 group hover:border-white/20 transition-all"
        >
          <div className="w-12 h-12 bg-yellow-500/10 text-yellow-500 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Trophy size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-white">{item.title}</h3>
            <p className="text-gray-400 text-sm mt-1">{item.description}</p>
          </div>
          <div className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5">
            {item.date}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    // 1. COOLDOWN RATE LIMIT CHECK (5 MINUTES)
    const COOLDOWN_TIME = 5 * 60 * 1000;
    const lastSent = localStorage.getItem('last_email_sent');
    const now = Date.now();

    if (lastSent && now - parseInt(lastSent) < COOLDOWN_TIME) {
      const remaining = Math.ceil((COOLDOWN_TIME - (now - parseInt(lastSent))) / 60000);
      alert(`Rate Limit Exceeded: Please wait ${remaining} minutes before sending another message.`);
      return;
    }

    setStatus('sending');

    emailjs.sendForm(emailServiceId, emailTemplateId, form.current, emailPublicKey)
      .then(() => { 
        setStatus('success'); 
        form.current.reset();
        // 2. SET TIMESTAMP
        localStorage.setItem('last_email_sent', Date.now().toString());
      }, 
      (error) => { 
        console.error(error); 
        setStatus('error');
        alert("Failed to send message.");
      });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 h-full items-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-5xl font-bold mb-6 text-white">Let's talk.</h2>
        <p className="text-gray-400 text-lg mb-8">
          Have a project in mind? Let's create something extraordinary together.
          Web Application Developer | Open for paid projects | Also offering tech tutoring & guidance.
        </p>
        <div className="space-y-4">
          <a href="mailto:manoj.devvvvvv@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors p-4 rounded-xl border border-white/0 hover:border-white/10 hover:bg-white/5">
            <Mail size={20} /> manojdevvvvvv@gmail.com
          </a>
        </div>
      </motion.div>

      <motion.form 
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        ref={form} onSubmit={sendEmail} className="bg-[#0f0f0f]/80 backdrop-blur-md border border-white/5 p-8 rounded-3xl space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <input name="user_name" placeholder="Name" className="bg-[#151515] border border-white/5 p-4 rounded-xl text-white focus:outline-none focus:border-white/20 transition-colors" required />
          <input name="user_email" type="email" placeholder="Email" className="bg-[#151515] border border-white/5 p-4 rounded-xl text-white focus:outline-none focus:border-white/20 transition-colors" required />
        </div>
        <textarea name="message" rows="4" placeholder="Message" className="w-full bg-[#151515] border border-white/5 p-4 rounded-xl text-white focus:outline-none focus:border-white/20 transition-colors resize-none" required />
        
        <button type="submit" disabled={status === 'sending'} className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex justify-center gap-2 items-center">
          {status === 'sending' ? <Loader2 className="animate-spin" /> : 'Send Message'}
        </button>
        {status === 'success' && <p className="text-green-500 text-center text-sm">✓ Message sent!</p>}
        {status === 'error' && <p className="text-red-500 text-center text-sm">✕ Failed to send. Try again.</p>}
      </motion.form>
    </div>
  );
};

// --- ADMIN PANEL (SECURE) ---

const Admin = ({ setIsAdminMode }) => {
  const [view, setView] = useState('projects');
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({});
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
  }, []);

  const loadItems = async () => {
    const table = view === 'projects' ? 'projects' : 'achievements';
    let query = supabase.from(table).select('*');
    if (view === 'projects') query = query.order('created_at', { ascending: false });
    
    const { data } = await query;
    if (data) setItems(data);
  };

  useEffect(() => { if(session) loadItems(); }, [session, view]);

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if(error) alert(error.message);
    else setSession(data.session);
  };

  const handleClose = async () => {
    await supabase.auth.signOut();
    setIsAdminMode(false);
  };

  const handleSave = async () => {
    const table = view === 'projects' ? 'projects' : 'achievements';
    const { error } = form.id 
      ? await supabase.from(table).update(form).eq('id', form.id)
      : await supabase.from(table).insert([form]);
      
    if(error) alert("Error: " + error.message);
    else {
      setForm({});
      await loadItems();
    }
  };

  const handleDelete = async (id) => {
    if(!confirm('Delete?')) return;
    const table = view === 'projects' ? 'projects' : 'achievements';
    const { error } = await supabase.from(table).delete().eq('id', id);
    if(error) alert("Error: " + error.message);
    else await loadItems();
  };

  if(!session) return (
    <div className="h-screen flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl z-50">
      <div className="bg-[#111] p-8 rounded-2xl w-full max-w-sm border border-white/10">
        <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2"><Lock size={20}/> Secure Access</h2>
        <input className="w-full mb-3 bg-black border border-white/10 p-3 text-white rounded-lg" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full mb-6 bg-black border border-white/10 p-3 text-white rounded-lg" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button onClick={handleLogin} className="w-full bg-white text-black font-bold py-3 rounded-lg">Login</button>
        <button onClick={() => setIsAdminMode(false)} className="w-full mt-4 text-gray-500 text-sm">Cancel</button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/95 text-white p-6 overflow-y-auto z-50">
      <div className="max-w-4xl mx-auto mt-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold flex items-center gap-2"><Lock size={18} className="text-green-500" /> Admin Console</h1>
          <button onClick={handleClose} className="text-red-500 text-sm flex items-center gap-2 border border-red-500/20 px-3 py-1 rounded-lg hover:bg-red-500/10">
            <LogOut size={14} /> SECURE LOGOUT [ESC]
          </button>
        </div>

        <div className="flex gap-2 mb-8">
          <button onClick={() => setView('projects')} className={`px-4 py-2 rounded-lg ${view === 'projects' ? 'bg-white text-black' : 'bg-[#111] border border-white/10'}`}>Projects</button>
          <button onClick={() => setView('achievements')} className={`px-4 py-2 rounded-lg ${view === 'achievements' ? 'bg-white text-black' : 'bg-[#111] border border-white/10'}`}>Achievements</button>
        </div>

        <div className="bg-[#111] p-6 rounded-2xl border border-white/10 mb-8 grid gap-4">
          <input placeholder="Title" value={form.title || ''} onChange={e => setForm({...form, title: e.target.value})} className="bg-black border border-white/10 p-3 rounded-lg text-white" />
          <textarea placeholder="Description" value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} className="bg-black border border-white/10 p-3 rounded-lg text-white" />
          
          {view === 'projects' && (
            <>
              <input placeholder="Image URL" value={form.image_url || ''} onChange={e => setForm({...form, image_url: e.target.value})} className="bg-black border border-white/10 p-3 rounded-lg text-white" />
              <input placeholder="Link" value={form.project_link || ''} onChange={e => setForm({...form, project_link: e.target.value})} className="bg-black border border-white/10 p-3 rounded-lg text-white" />
              <input placeholder="Category" value={form.category || ''} onChange={e => setForm({...form, category: e.target.value})} className="bg-black border border-white/10 p-3 rounded-lg text-white" />
            </>
          )}
          {view === 'achievements' && <input placeholder="Date" value={form.date || ''} onChange={e => setForm({...form, date: e.target.value})} className="bg-black border border-white/10 p-3 rounded-lg text-white" />}
          
          <button onClick={handleSave} className="bg-white text-black px-6 py-2 rounded-lg font-bold">{form.id ? 'Update' : 'Add'}</button>
        </div>

        <div className="space-y-2">
          {items.map(item => (
            <div key={item.id} className="bg-[#111] p-4 rounded-xl border border-white/10 flex justify-between items-center">
              <span className="font-bold">{item.title}</span>
              <div className="flex gap-2">
                <button onClick={() => setForm(item)}><Edit2 size={18} className="text-blue-500" /></button>
                <button onClick={() => handleDelete(item.id)}><Trash2 size={18} className="text-red-500" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.altKey) {
        setIsAdminMode(prev => !prev);
      }
      if (e.key === 'Escape' && isAdminMode) {
        setIsAdminMode(false); 
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminMode]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20 flex flex-col md:flex-row relative">
      <Particles />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 md:ml-20 lg:ml-64 p-6 md:p-12 pb-24 relative z-10 h-screen overflow-y-auto">
        <LayoutGroup>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto"
            >
              {isAdminMode ? <Admin setIsAdminMode={setIsAdminMode} /> : (
                <>
                  {activeTab === 'home' && <Home setActiveTab={setActiveTab} />}
                  {activeTab === 'projects' && <Projects />}
                  {activeTab === 'about' && <About />}
                  {activeTab === 'achievements' && <Achievements /> }
                  {activeTab === 'contact' && <Contact />}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </LayoutGroup>
      </main>
    </div>
  );
}