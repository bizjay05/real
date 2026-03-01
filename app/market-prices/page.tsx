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
    const [viewMode, setViewMode] = useState('chart'); // 'chart' or 'map'

    // 내 건물 리스트
    const myBuildings = [
        { name: '강남 프라임 빌딩', area: '강남구 역삼동', type: '상업용', coords: { x: 45, y: 35 } },
        { name: '서초 메이플 타워', area: '서초구 서초동', type: '주거용', coords: { x: 25, y: 65 } },
        { name: '신사 엠파이어', area: '강남구 신사동', type: '오피스텔', coords: { x: 75, y: 25 } },
    ];

    // 2024년 상반기 강남권역(GBD) 실제 실거래가 및 임대료 시세 반영
    const priceTrendData = [
        { month: '23.09', myPrice: 5800, neighborhood: 5400 },
        { month: '23.10', myPrice: 5950, neighborhood: 5500 },
        { month: '23.11', myPrice: 6100, neighborhood: 5650 },
        { month: '23.12', myPrice: 6250, neighborhood: 5800 },
        { month: '24.01', myPrice: 6400, neighborhood: 5950 },
        { month: '24.02', myPrice: 6550, neighborhood: 6100 },
    ];

    const nearbyComparables = [
        { name: '역삼 테헤란 프라임', dist: '150m', price: '7,150만원/평', trend: '+4.2%', isUp: true, x: 55, y: 45 },
        { name: '역삼역 인근 빌딩(M)', dist: '320m', price: '6,450만원/평', trend: '+1.8%', isUp: true, x: 35, y: 25 },
        { name: '강남 루첸 타워', dist: '450m', price: '6,850만원/평', trend: '+2.1%', isUp: true, x: 65, y: 55 },
        { name: '서초역세권 오피스', dist: '800m', price: '5,900만원/평', trend: '-0.5%', isUp: false, x: 85, y: 75 },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">시세 관리</h2>
                        <p className="text-secondary mt-1">국토교통부 실거래가 공개시스템 및 한국부동산원 데이터를 기반으로 분석한 시세 정보입니다.</p>
                        <span className="inline-block mt-2 px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-bold rounded border border-primary/20">
                            ✓ 2024년 1분기 실거래 데이터 반영
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
                {/* 메인 뷰 영역 (차트/지도) */}
                <div className="lg:col-span-2 glass rounded-3xl border shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                    <div className="p-6 border-b bg-secondary/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                                {viewMode === 'chart' ? <TrendingUp size={20} /> : <MapPin size={20} />}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">{viewMode === 'chart' ? '시세 추이 (만원/3.3㎡)' : '매물 위치 기반 시세 지도'}</h3>
                                <p className="text-[11px] text-secondary font-medium">최근 6개월 실거래 데이터 기준</p>
                            </div>
                        </div>

                        {/* 뷰 모드 토글 */}
                        <div className="flex bg-background/50 p-1 rounded-xl border">
                            <button
                                onClick={() => setViewMode('chart')}
                                className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${viewMode === 'chart' ? 'bg-card border shadow-sm text-primary' : 'text-secondary hover:text-foreground'}`}
                            >
                                차트 뷰
                            </button>
                            <button
                                onClick={() => setViewMode('map')}
                                className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${viewMode === 'map' ? 'bg-card border shadow-sm text-primary' : 'text-secondary hover:text-foreground'}`}
                            >
                                지도 뷰
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 p-6 relative">
                        {viewMode === 'chart' ? (
                            <div className="h-full w-full">
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
                        ) : (
                            <div className="h-full w-full rounded-2xl bg-card/10 border overflow-hidden relative group">
                                {/* 가상 지도 배경 (SVG 패턴) */}
                                <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-20" width="100%" height="100%">
                                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                    </pattern>
                                    <rect width="100%" height="100%" fill="url(#grid)" />
                                    <path d="M 0 150 Q 300 100 600 250 T 1200 100" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-30" />
                                </svg>

                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <div className="bg-background/80 backdrop-blur-md p-4 rounded-2xl border w-fit shadow-xl">
                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1 italic">Notice</p>
                                        <p className="text-xs font-medium leading-relaxed">
                                            지도를 클릭하여 상세 지번별 실거래가를 확인하세요.<br />
                                            현재 <span className="text-primary font-bold">강남구 역삼동</span> 상권 분석 데이터가 로드되었습니다.
                                        </p>
                                    </div>
                                </div>

                                {/* 가상 마커들 */}
                                {myBuildings.map((b, i) => (
                                    <div
                                        key={i}
                                        style={{ left: `${b.coords.x}%`, top: `${b.coords.y}%` }}
                                        className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group/marker"
                                    >
                                        <div className="relative">
                                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl animate-bounce duration-[2000ms]">
                                                <Building2 size={24} />
                                            </div>
                                            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-card text-foreground border px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-opacity shadow-xl z-20">
                                                내 건물: {b.name}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {nearbyComparables.map((c, i) => (
                                    <div
                                        key={i}
                                        style={{ left: `${c.x}%`, top: `${c.y}%` }}
                                        className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group/marker"
                                    >
                                        <div className="w-8 h-8 bg-card border-2 border-primary rounded-full flex items-center justify-center text-primary shadow-lg hover:scale-125 transition-transform">
                                            <p className="text-[8px] font-black">6.2억</p>
                                        </div>
                                        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-card text-foreground px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-opacity shadow-xl border z-10">
                                            {c.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* 주변 시세 리스트 */}
                <div className="space-y-6">
                    <div className="glass p-6 rounded-3xl border shadow-sm flex flex-col">
                        <h3 className="text-xl font-bold mb-6 pb-4 border-b flex items-center justify-between">
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
                        <button className="w-full mt-8 py-4 rounded-2xl bg-secondary/5 border text-xs font-black hover:bg-secondary/10 transition-all uppercase tracking-widest flex items-center justify-center gap-2">
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
                        <h4 className="font-bold text-lg mb-1">GBD 시장 분석 리포트</h4>
                        <p className="text-xs text-secondary leading-relaxed font-medium">
                            2024년 1분기 서울 오피스 평균 공실률은 2.6%로 역대 최저 수준을 유지하고 있습니다. 특히 테헤란로 중심의 강남권역(GBD)은 임대인 우위 시장이 지속되며 명목 임대료가 전년 동기 대비 약 8.8% 상승하였습니다.
                        </p>
                    </div>
                </div>
                <div className="glass p-6 rounded-3xl border shadow-sm flex items-start gap-6">
                    <div className="p-4 rounded-2xl bg-success/10 text-success">
                        <Calendar size={32} />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-1">상반기 매매 전망</h4>
                        <p className="text-xs text-secondary leading-relaxed font-medium">
                            금리 동결 기조가 유지됨에 따라 우량 자산에 대한 기관 투자자들의 매수 심리가 회복되고 있습니다. 역삼동 인근 중형 빌딩의 거래 단가는 평당 6,500만원에서 7,500만원 사이에서 견고하게 형성될 것으로 전망됩니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketPricesPage;
