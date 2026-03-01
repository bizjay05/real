"use client";

import React from 'react';
import { Building2, Users, CreditCard, AlertCircle, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie
} from 'recharts';

const DashboardPage = () => {
    const stats = [
        { label: '전체 보유 건물', value: '4개', icon: Building2, color: 'text-primary', bg: 'bg-primary/10', trend: '+12%', isUp: true },
        { label: '총 세입자', value: '128명', icon: Users, color: 'text-accent', bg: 'bg-accent/10', trend: '+5%', isUp: true },
        { label: '이번 달 매출', value: '4,520만원', icon: CreditCard, color: 'text-success', bg: 'bg-success/10', trend: '+2.4%', isUp: true },
        { label: '미납 및 연체', value: '3건', icon: AlertCircle, color: 'text-danger', bg: 'bg-danger/10', trend: '-1건', isUp: false },
    ];

    const revenueData = [
        { name: '1월', value: 3800 },
        { name: '2월', value: 4100 },
        { name: '3월', value: 4520 },
        { name: '4월', value: 4200 },
        { name: '5월', value: 4900 },
        { name: '6월', value: 5200 },
    ];

    const occupancyData = [
        { name: '입주', value: 85 },
        { name: '공실', value: 15 },
    ];

    const COLORS = ['#3b82f6', '#e2e8f0'];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold tracking-tight">대시보드</h2>
                <p className="text-secondary text-sm">오늘의 부동산 관리 현황을 요약해 드립니다.</p>
            </div>

            {/* 상단 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="glass p-6 rounded-3xl border shadow-sm card-hover">
                        <div className="flex justify-between items-start">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full ${stat.isUp ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {stat.trend}
                            </div>
                        </div>
                        <div className="mt-5">
                            <p className="text-xs font-bold text-secondary uppercase tracking-tight">{stat.label}</p>
                            <h3 className="text-2xl font-black mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* 차트 섹션 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass rounded-3xl border shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-white/5 bg-secondary/5 flex items-center justify-between">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <TrendingUp className="text-primary" size={20} />
                            월별 매출 추이
                        </h3>
                        <select className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-bold outline-none focus:ring-2 ring-primary/20">
                            <option>최근 6개월</option>
                            <option>최근 1년</option>
                        </select>
                    </div>
                    <div className="p-6 h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
                                <Tooltip
                                    cursor={{ fill: '#3b82f610' }}
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '16px', color: '#fff', fontSize: '12px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.3)' }}
                                />
                                <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass rounded-3xl border shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-white/5 bg-secondary/5">
                        <h3 className="text-lg font-bold text-center">전체 점유율</h3>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-center">
                        <div className="h-[200px] w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={occupancyData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={65}
                                        outerRadius={85}
                                        paddingAngle={8}
                                        dataKey="value"
                                    >
                                        {occupancyData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <p className="text-3xl font-black text-primary">85%</p>
                                <p className="text-[10px] text-secondary font-black uppercase tracking-widest mt-1">입주 완료</p>
                            </div>
                        </div>
                        <div className="mt-8 space-y-3 bg-secondary/5 p-4 rounded-2xl border border-white/5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                    <span className="text-[11px] font-bold text-secondary">입주 (108실)</span>
                                </div>
                                <span className="text-[11px] font-black">85%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                                    <span className="text-[11px] font-bold text-secondary">공실 (20실)</span>
                                </div>
                                <span className="text-[11px] font-black">15%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 최근 목록 섹션 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass rounded-3xl border shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-white/5 bg-secondary/5 flex justify-between items-center">
                        <h3 className="text-lg font-bold">최근 수납 내역</h3>
                        <button className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-xl hover:bg-primary/20 transition-colors">전체 보기</button>
                    </div>
                    <div className="p-3 bg-card-secondary space-y-1">
                        {[
                            { name: '김철수', room: '강남빌딩 302호', amount: '120만원', status: '완료', date: '오늘' },
                            { name: '이미영', room: '서초타워 1501호', amount: '250만원', status: '대기', date: '어제' },
                            { name: '박지성', room: '강남빌딩 101호', amount: '80만원', status: '완료', date: '2일 전' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-secondary/10 transition-all border border-transparent hover:border-white/5 group">
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center font-black text-primary text-lg shadow-inner">
                                        {item.name[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm tracking-tight">{item.name}</p>
                                        <p className="text-[11px] text-secondary font-medium mt-0.5">{item.room}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-sm">{item.amount}</p>
                                    <div className="flex items-center justify-end gap-1.5 mt-1">
                                        <span className={`w-1.5 h-1.5 rounded-full ${item.status === '완료' ? 'bg-success' : 'bg-warning animate-pulse'}`} />
                                        <p className={`text-[11px] font-bold ${item.status === '완료' ? 'text-success' : 'text-warning'}`}>
                                            {item.status} · {item.date}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass rounded-3xl border shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-white/5 bg-secondary/5 flex justify-between items-center">
                        <h3 className="text-lg font-bold">유지보수 요청</h3>
                        <button className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-xl hover:bg-primary/20 transition-colors">전체 보기</button>
                    </div>
                    <div className="p-4 space-y-3">
                        {[
                            { title: '엘리베이터 소음', building: '서초타워', priority: '높음', status: '접수' },
                            { title: '302호 세면대 누수', building: '강남빌딩', priority: '보통', status: '진행 중' },
                            { title: '옥상 방수 점검', building: '신사엠파이어', priority: '중요', status: '완료' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-white/5 hover:border-primary/20 hover:bg-secondary/5 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className={`w-1.5 h-10 rounded-full ${item.priority === '높음' ? 'bg-danger shadow-[0_0_10px_rgba(239,68,68,0.4)]' : item.priority === '보통' ? 'bg-warning' : 'bg-primary'
                                        }`} />
                                    <div>
                                        <p className="font-bold text-sm tracking-tight group-hover:text-primary transition-colors">{item.title}</p>
                                        <p className="text-[11px] text-secondary font-medium mt-0.5">{item.building}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${item.status === '접수' ? 'bg-danger/10 text-danger' :
                                        item.status === '진행 중' ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                                    }`}>
                                    {item.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
