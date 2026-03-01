"use client";

import React, { useState, useEffect } from 'react';
import { Bell, Search, User, Moon, Sun, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    // 다크 모드 초기화 및 동기화
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        const isDark = storedTheme === 'dark' || (!storedTheme && document.documentElement.classList.contains('dark'));

        setIsDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const notifications = [
        { id: 1, title: '수납 확인 필요', desc: '강남 프라임 302호 월세 미납', time: '10분 전', type: 'urgent' },
        { id: 2, title: '계약 만료 임박', desc: '서초 메이플 타워 501호 계약 만료 (D-30)', time: '2시간 전', type: 'info' },
        { id: 3, title: '세무 일정 알림', desc: '5월 종합소득세 신고 기간입니다.', time: '1일 전', type: 'success' },
    ];

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
                {/* 다크 모드 토글 */}
                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-xl hover:bg-secondary/10 transition-all active:scale-95 text-secondary"
                    title={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
                >
                    {isDarkMode ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} />}
                </button>

                {/* 알림 센터 */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`relative p-2 rounded-xl hover:bg-secondary/10 transition-all active:scale-95 ${showNotifications ? 'bg-secondary/10' : ''}`}
                    >
                        <Bell size={20} className={showNotifications ? 'text-primary' : 'text-secondary'} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full border-2 border-background" />
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-4 w-80 glass border rounded-3xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            <div className="p-4 border-b bg-secondary/5 flex justify-between items-center">
                                <h3 className="font-bold text-sm">알림 센터</h3>
                                <button className="text-[10px] font-black text-primary hover:underline">모두 읽음</button>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto">
                                {notifications.map((n) => (
                                    <div key={n.id} className="p-4 border-b hover:bg-secondary/5 cursor-pointer transition-colors group">
                                        <div className="flex gap-3">
                                            <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${n.type === 'urgent' ? 'bg-danger/10 text-danger' :
                                                n.type === 'info' ? 'bg-primary/10 text-primary' : 'bg-success/10 text-success'
                                                }`}>
                                                {n.type === 'urgent' ? <AlertCircle size={16} /> :
                                                    n.type === 'info' ? <Clock size={16} /> : <CheckCircle2 size={16} />}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold tracking-tight group-hover:text-primary transition-colors">{n.title}</p>
                                                <p className="text-xs text-secondary mt-1 leading-relaxed">{n.desc}</p>
                                                <p className="text-[10px] text-secondary/50 mt-2 font-medium">{n.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full py-3 bg-secondary/5 text-[11px] font-black text-secondary hover:bg-secondary/10 transition-all uppercase tracking-widest">
                                전체 알림 보기
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3 pl-4 border-l">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold">이건물 건물주</p>
                        <p className="text-xs text-secondary">Premium Plan</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20 cursor-pointer hover:scale-105 transition-transform">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
