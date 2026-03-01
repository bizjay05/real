"use client";

import React, { useState } from 'react';
import {
    TrendingUp,
    MapPin,
    Search,
    ArrowUpRight,
    ArrowDownRight,
    Building2,
    Calendar,
    Layers,
    Info,
    ChevronRight,
    Filter
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const MarketPricesPage = () => {
    const [selectedBuilding, setSelectedBuilding] = useState('강남 프라임 빌딩');

    // 내 건물 리스트
    const myBuildings = [
        { name: '강남 프라임 빌딩', area: '강남구 역삼동', type: '상업용' },
        { name: '서초 메이플 타워', area: '서초구 서초동', type: '주거용' },
        { name: '신사 엠파이어', area: '강남구 신사동', type: '오피스텔' },
    ];

    // 실제 시세 데이터 예시 (국토교통부 실거래가 기반 가공 데이터 컨셉)
    const priceTrendData = [
        { month: '23.09', myPrice: 5200, neighborhood: 4800 },
        { month: '23.10', myPrice: 5350, neighborhood: 4900 },
        { month: '23.11', myPrice: 5300, neighborhood: 4850 },
        { month: '23.12', myPrice: 5500, neighborhood: 5000 },
        { month: '24.01', myPrice: 5750, neighborhood: 5150 },
        { month: '24.02', myPrice: 6000, neighborhood: 5300 },
    ];

    const nearbyComparables = [
        { name: '역삼 테헤란 빌딩', dist: '150m', price: '6,200만원/평', trend: '+2.5%', isUp: true },
        { name: '강남 루첸 타워', dist: '320m', price: '5,850만원/평', trend: '-1.2%', isUp: false },
        { name: 'GFC 인근 빌딩', dist: '450m', price: '6,050만원/평', trend: '+0.8%', isUp: true },
        { name: '대치 프라이어', dist: '800m', price: '5,400만원/평', trend: '+1.5%', isUp: true },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">시세 관리</h2>
                        <p className="text-secondary mt-1">소유하신 건물과 주변 단지의 최근 실거래가 및 시세 추이입니다.</p>
                        <span className="inline-block mt-2 px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[9px] font-bold rounded border border-amber-500/10">
                            ⚠️ 국토부 실거래 데이터 기반 가상 데이터
                        </span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 glass border px-4 py-2 rounded-xl font-bold text-xs hover:bg-secondary/5 transition-all">
                        <Layers size={16} />
                        <span>실거래가 알림 설정</span>
                    </button>
                    <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                        <Search size={18} />
                        <span>상권 분석 리포트</span>
                    </button>
                </div>
            </div>

            {/* 건물 선택 바 */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {myBuildings.map((b) => (
                    <button
                        key={b.name}
                        onClick={() => setSelectedBuilding(b.name)}
                        className={`flex-shrink-0 px-6 py-4 rounded-3xl border transition-all ${selectedBuilding === b.name
                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]'
                            : 'glass hover:bg-secondary/5'
                            }`}
                    >
                        <p className={`text-[10px] font-black uppercase tracking-widest ${selectedBuilding === b.name ? 'text-white/70' : 'text-secondary'}`}>{b.area}</p>
                        <p className="font-black text-sm mt-1">{b.name}</p>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 추이 차트 */}
                <div className="lg:col-span-2 glass rounded-3xl border shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-white/5 bg-secondary/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                                <TrendingUp size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">시세 추이 (만원/3.3㎡)</h3>
                                <p className="text-[11px] text-secondary font-medium">최근 6개월 실거래 데이터 기준</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                <span className="text-[10px] font-bold text-secondary">내 건물</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                                <span className="text-[10px] font-bold text-secondary">주변 평균</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={priceTrendData}>
                                <defs>
                                    <linearGradient id="colorMy" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '16px', color: '#fff', fontSize: '12px' }}
                                />
                                <Area type="monotone" dataKey="myPrice" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorMy)" />
                                <Line type="monotone" dataKey="neighborhood" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 주변 시세 리스트 */}
                <div className="space-y-6">
                    <div className="glass p-6 rounded-3xl border shadow-sm flex flex-col">
                        <h3 className="text-xl font-bold mb-6 pb-4 border-b border-white/5 flex items-center justify-between">
                            주변 실거래 사례
                            <MapPin size={18} className="text-primary" />
                        </h3>
                        <div className="space-y-5">
                            {nearbyComparables.map((item, i) => (
                                <div key={i} className="flex items-center justify-between hover:translate-x-1 transition-transform cursor-pointer group">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-bold tracking-tight group-hover:text-primary transition-colors">{item.name}</p>
                                        <p className="text-[10px] text-secondary font-medium uppercase tracking-widest">{item.dist}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-foreground">{item.price}</p>
                                        <div className={`flex items-center justify-end gap-1 mt-0.5 ${item.isUp ? 'text-success' : 'text-danger'}`}>
                                            {item.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                            <span className="text-[10px] font-black">{item.trend}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-4 rounded-2xl bg-secondary/5 border border-white/10 text-xs font-black hover:bg-secondary/10 transition-all uppercase tracking-widest flex items-center justify-center gap-2">
                            실거래가 더보기
                            <ChevronRight size={14} />
                        </button>
                    </div>

                    <div className="glass p-6 rounded-3xl border shadow-sm bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
                        <h4 className="font-black flex items-center gap-2 mb-3 text-sm tracking-tight text-primary">
                            <Info size={18} />
                            AI 예상 감정가
                        </h4>
                        <div className="mt-4">
                            <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mb-1">예상 가액 (2024.03 기준)</p>
                            <h3 className="text-3xl font-black text-foreground tracking-tighter">약 245억원</h3>
                            <p className="text-[11px] text-success font-bold mt-2 flex items-center gap-1">
                                <ArrowUpRight size={14} />
                                전월 대비 1.5% 상승 예상
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 하단 상세 분석 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass p-6 rounded-3xl border shadow-sm flex items-start gap-6">
                    <div className="p-4 rounded-2xl bg-accent/10 text-accent">
                        <Building2 size={32} />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-1">인벨류 분석 리포트</h4>
                        <p className="text-xs text-secondary leading-relaxed font-medium">
                            현재 역삼동 상권의 공실률은 3.2%로 전 분기 대비 하락하고 있습니다. 특히 강남 프라임 빌딩이 위치한 테헤란로 인근은 IT 기업의 수요가 꾸준하여 장기적으로 시세 상승이 기대됩니다.
                        </p>
                    </div>
                </div>
                <div className="glass p-6 rounded-3xl border shadow-sm flex items-start gap-6">
                    <div className="p-4 rounded-2xl bg-success/10 text-success">
                        <Calendar size={32} />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-1">향후 6개월 전망</h4>
                        <p className="text-xs text-secondary leading-relaxed font-medium">
                            금무부동산 연구소에 따르면 하반기 금리 안정화 시점에 맞추어 상업용 부동산 거래량이 15% 이상 증가할 것으로 예상됩니다. 매각 또는 리모델링을 계획 중이라면 3분기 시점을 권장합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketPricesPage;
