import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  Wrench,
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: '대시보드', href: '/dashboard' },
    { icon: Building2, label: '건물 관리', href: '/buildings' },
    { icon: Users, label: '세입자 관리', href: '/tenants' },
    { icon: CreditCard, label: '수납 현황', href: '/payments' },
    { icon: Wrench, label: '유지보수', href: '/maintenance' },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 glass border-r flex flex-col z-50">
      <Link href="/dashboard" className="p-6 block hover:opacity-80 transition-opacity">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          BuildingWorks
        </h1>
      </Link>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-primary/10 hover:text-primary group text-secondary"
          >
            <item.icon size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-danger hover:bg-danger/10 transition-colors">
          <LogOut size={20} />
          <span className="font-medium">로그아웃</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
