'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export function DevMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activity, setActivity] = useState('Testing Developer Mode');
  const [type, setType] = useState('PLAYING');
  const [status, setStatus] = useState<string | null>(null);

  const CORRECT_PASSWORD = 'D112A3S4azz';

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      setStatus('Incorrect password');
      setTimeout(() => setStatus(null), 2000);
      setPassword('');
    }
  };

  const handlePresenceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('/api/discord/presence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activity, type }),
      });
      const json = await res.json();
      if (res.ok) setStatus('✓ Presence updated');
      else setStatus(json?.error || '✗ Failed');
    } catch (err) {
      setStatus('✗ Network error');
    }
    setTimeout(() => setStatus(null), 3000);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setIsAuthenticated(false);
    setPassword('');
  };

  return (
    <>
      {/* Dev Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1 text-xs font-mono bg-amber-500/20 border border-amber-500/50 text-amber-400 rounded hover:bg-amber-500/30 transition-colors"
        title="Developer Menu"
      >
        DEV
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="glass border border-cyberpunk-primary/50 rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-cyberpunk-primary">Developer Menu</h3>
              <button
                onClick={closeMenu}
                className="text-cyberpunk-text/50 hover:text-cyberpunk-text transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {!isAuthenticated ? (
              // Password Form
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="text-cyberpunk-text/70 text-sm block mb-2">
                    Enter Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="●●●●●●●●●●"
                    className="w-full bg-cyberpunk-bg/50 rounded border border-cyberpunk-primary/30 px-4 py-2 text-cyberpunk-text placeholder-cyberpunk-text/30 focus:outline-none focus:border-cyberpunk-primary"
                    autoFocus
                  />
                </div>

                {status && (
                  <div className={`text-sm px-3 py-2 rounded ${
                    status.includes('Incorrect') 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {status}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-cyberpunk-primary text-black font-semibold rounded hover:bg-cyberpunk-primary/80 transition-colors"
                >
                  Unlock
                </button>
              </form>
            ) : (
              // Dev Tools
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4 p-2 bg-green-500/10 border border-green-500/30 rounded">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-green-400">Authenticated</span>
                </div>

                <form onSubmit={handlePresenceSubmit} className="space-y-3">
                  <div>
                    <label className="text-cyberpunk-text/70 text-xs block mb-1">
                      Activity Text
                    </label>
                    <input
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                      className="w-full bg-cyberpunk-bg/50 rounded border border-cyberpunk-primary/30 px-3 py-2 text-sm text-cyberpunk-text focus:outline-none focus:border-cyberpunk-primary"
                      placeholder="e.g., Playing Zellix..."
                    />
                  </div>

                  <div>
                    <label className="text-cyberpunk-text/70 text-xs block mb-1">
                      Activity Type
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full bg-cyberpunk-bg/50 rounded border border-cyberpunk-primary/30 px-3 py-2 text-sm text-cyberpunk-text focus:outline-none focus:border-cyberpunk-primary"
                    >
                      <option>PLAYING</option>
                      <option>STREAMING</option>
                      <option>LISTENING</option>
                      <option>WATCHING</option>
                      <option>COMPETING</option>
                    </select>
                  </div>

                  {status && (
                    <div className={`text-xs px-3 py-2 rounded ${
                      status.includes('✓') 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {status}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full px-3 py-2 bg-cyberpunk-primary text-black font-semibold text-sm rounded hover:bg-cyberpunk-primary/80 transition-colors"
                  >
                    Set Presence
                  </button>
                </form>

                <button
                  onClick={closeMenu}
                  className="w-full px-3 py-2 bg-cyberpunk-primary/20 border border-cyberpunk-primary/30 text-cyberpunk-text/70 hover:text-cyberpunk-text text-sm rounded transition-colors"
                >
                  Close Menu
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

