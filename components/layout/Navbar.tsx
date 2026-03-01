import { Bell, Search, User } from 'lucide-react';

const Navbar = () => {
    return (
        <header className="h-16 glass border-b sticky top-0 z-40 px-8 flex items-center justify-between">
            <div className="flex items-center gap-4 bg-background/50 border px-4 py-2 rounded-full w-96">
                <Search size={18} className="text-secondary" />
                <input
                    type="text"
                    placeholder="건물, 세입자 검색..."
                    className="bg-transparent border-none outline-none text-sm w-full"
                />
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-2 rounded-full hover:bg-secondary/10 transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
                </button>

                <div className="flex items-center gap-3 pl-4 border-l">
                    <div className="text-right">
                        <p className="text-sm font-semibold">이건물 건물주</p>
                        <p className="text-xs text-secondary">Premium Plan</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
