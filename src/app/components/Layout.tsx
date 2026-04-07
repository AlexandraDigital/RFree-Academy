import { Link, Outlet, useLocation } from "react-router";
import { Home, Compass, Users, Briefcase, Video, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/explore", label: "Explore", icon: Compass },
    { path: "/community", label: "Community", icon: Users },
    { path: "/projects", label: "Projects", icon: Briefcase },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <Sparkles className="w-6 h-6" />
              RFree Academy
            </Link>
            <div className="flex items-center gap-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                      active
                        ? "bg-white/20 backdrop-blur-sm"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden md:inline">{item.label}</span>
                  </Link>
                );
              })}
              <Button asChild variant="secondary" size="sm" className="bg-white text-purple-600 hover:bg-purple-50">
                <Link to="/teach">
                  <Video className="w-4 h-4 mr-2" />
                  Teach
                </Link>
              </Button>
              <Button asChild variant="secondary" size="sm" className="bg-yellow-400 text-purple-900 hover:bg-yellow-300 font-semibold">
                <Link to="/funding">
                  💰 Fund
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <main className="min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>
      <footer className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Impact Academy
              </h3>
              <p className="text-purple-200 text-sm">
                Free education for real-world skills. Learn what matters, make an impact.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Learn</h4>
              <ul className="space-y-2 text-sm text-purple-200">
                <li><Link to="/explore" className="hover:text-white">All Courses</Link></li>
                <li><Link to="/" className="hover:text-white">Life Skills</Link></li>
                <li><Link to="/" className="hover:text-white">Career Paths</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-purple-200">
                <li><Link to="/community" className="hover:text-white">Community</Link></li>
                <li><Link to="/projects" className="hover:text-white">Projects</Link></li>
                <li><Link to="/teach" className="hover:text-white">Become a Teacher</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Mission</h4>
              <p className="text-sm text-purple-200">
                Education that prepares you for life, not just tests. Skills that matter, careers with purpose.
              </p>
            </div>
          </div>
          <div className="border-t border-purple-800 pt-8 text-center text-purple-200 text-sm">
            <p>© 2026 Impact Academy. Free education for everyone, everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}