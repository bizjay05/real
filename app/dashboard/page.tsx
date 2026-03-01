"use client";

import React, { useState, useEffect } from 'react';
import { Building2, Users, CreditCard, AlertCircle, ArrowUpRight, ArrowDownRight, TrendingUp, RefreshCw, CheckCircle2 } from 'lucide-react';
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
    Pie,
    Sector
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

    const [isUpdatingAI, setIsUpdatingAI] = useState(false);
    const [lastAIUpdate, setLastAIUpdate] = useState('');
    const [manualUpdateCount, setManualUpdateCount] = useState(0);

    // 초기 마운트 시 마지막 업데이트 날짜 설정 (한 달 전으로 시뮬레이션)
    useEffect(() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        setLastAIUpdate(date.toLocaleDateString('ko-KR'));
    }, []);

    const handleAIUpdate = () => {
        if (manualUpdateCount >= 3) {
            alert('일일 수동 업데이트 횟수(3회)를 초과했습니다. 내일 다시 시도해주세요.');
            return;
        }

        setIsUpdatingAI(true);
        // 1.5초 후 업데이트 완료 시뮬레이션
        setTimeout(() => {
            setLastAIUpdate(new Date().toLocaleDateString('ko-KR'));
            setManualUpdateCount(prev => prev + 1);
            setIsUpdatingAI(false);
        }, 1500);
    };

    const COLORS = ['#3b82f6', 'rgba(59, 130, 246, 0.1)'];

    const [isChartHovered, setIsChartHovered] = useState(false);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col gap-1 relative">
                <h2 className="text-3xl font-bold tracking-tight">대시보드</h2>
                <p className="text-secondary text-sm">오늘의 부동산 관리 현황을 요약해 드립니다.</p>
                <span className="absolute top-0 right-0 px-2 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold rounded-lg border border-amber-500/20">
                    ⚠️ 시뮬레이션 데이터 (가상)
                </span>
            </div>

            {/* 상단 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="glass p-6 rounded-3xl border shadow-sm card-hover">
                        <div className="flex justify-between items-start">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full ${stat.isUp ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
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
                    <div className="p-6 border-b bg-secondary/5 flex items-center justify-between">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <TrendingUp className="text-primary" size={20} />
                            월별 매출 추이
                        </h3>
                        <select className="bg-card/30 border rounded-xl px-3 py-1.5 text-xs font-bold outline-none focus:ring-2 ring-primary/20">
                            <option>최근 6개월</option>
                            <option>최근 1년</option>
                        </select>
                    </div>
                    <div className="p-6 h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(59, 130, 246, 0.05)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(59, 130, 246, 0.05)', radius: 8 }}
                                    contentStyle={{ backgroundColor: '#0d1117', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '16px', color: '#fff', fontSize: '12px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.3)' }}
                                    animationDuration={200}
                                />
                                <Bar
                                    dataKey="value"
                                    fill="#3b82f6"
                                    radius={[6, 6, 0, 0]}
                                    barSize={32}
                                    animationDuration={500}
                                    animationEasing="ease-out"
                                    activeBar={{ fill: '#60a5fa', stroke: '#3b82f6', strokeWidth: 1 }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass rounded-3xl border shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b bg-secondary/5">
                        <h3 className="text-lg font-bold text-center">전체 점유율</h3>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-center">
                        <div
                            className="h-[200px] w-[200px] mx-auto relative cursor-default rounded-full"
                            onMouseEnter={() => setIsChartHovered(true)}
                            onMouseLeave={() => setIsChartHovered(false)}
                        >
                            <div className={`w-full h-full transition-transform duration-500 ease-out ${isChartHovered ? 'scale-110' : ''}`}>
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
                                            stroke="none"
                                            isAnimationActive={true}
                                        >
                                            {occupancyData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                    stroke="none"
                                                    style={{ outline: 'none' }}
                                                />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-transform duration-500 ease-out ${isChartHovered ? 'scale-110' : ''}`}>
                                <p className="text-3xl font-black text-primary">85%</p>
                                <p className="text-[10px] text-secondary font-black uppercase tracking-widest mt-1">입주 완료</p>
                            </div>
                        </div>
                        <div className="mt-8 space-y-3 bg-secondary/5 p-4 rounded-2xl border">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                    <span className="text-[11px] font-bold text-secondary">입주 (108실)</span>
                                </div>
                                <span className="text-[11px] font-black">85%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-primary/20" />
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
                    <div className="p-6 border-b bg-secondary/5 flex justify-between items-center">
                        <h3 className="text-lg font-bold">최근 수납 내역</h3>
                        <button className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-xl hover:bg-primary/20 transition-colors">전체 보기</button>
                    </div>
                    <div className="p-3 bg-card-secondary space-y-1">
                        {[
                            { name: '김철수', room: '강남빌딩 302호', amount: '120만원', status: '완료', date: '오늘' },
                            { name: '이미영', room: '서초타워 1501호', amount: '250만원', status: '대기', date: '어제' },
                            { name: '박지성', room: '강남빌딩 101호', amount: '80만원', status: '완료', date: '2일 전' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-secondary/10 transition-all border border-transparent group">
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
                    <div className="p-6 border-b bg-secondary/5 flex justify-between items-center">
                        <h3 className="text-lg font-bold">유지보수 요청</h3>
                        <button className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-xl hover:bg-primary/20 transition-colors">전체 보기</button>
                    </div>
                    <div className="p-4 space-y-3">
                        {[
                            { title: '엘리베이터 소음', building: '서초타워', priority: '높음', status: '접수' },
                            { title: '302호 세면대 누수', building: '강남빌딩', priority: '보통', status: '진행 중' },
                            { title: '옥상 방수 점검', building: '신사엠파이어', priority: '중요', status: '완료' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl border hover:border-primary/20 hover:bg-secondary/5 transition-all group">
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
            {/* AI 인사이트 리포트 섹션 */}
            <div className="glass p-8 rounded-[2rem] shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <TrendingUp size={120} />
                </div>

                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold italic tracking-tight">AI 인사이트 리포트</h3>
                                <p className="text-xs text-secondary font-medium">실시간 데이터 분석 기반 매니지먼트 제언</p>
                            </div>
                        </div>
                        <button
                            onClick={handleAIUpdate}
                            disabled={isUpdatingAI || manualUpdateCount >= 3}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${isUpdatingAI
                                ? 'bg-secondary/10 text-secondary cursor-not-allowed'
                                : manualUpdateCount >= 3
                                    ? 'bg-secondary/5 text-secondary/40 cursor-not-allowed border'
                                    : 'bg-primary/10 text-primary hover:bg-primary/20 hover:scale-105 active:scale-95'
                                }`}
                        >
                            <RefreshCw size={14} className={isUpdatingAI ? 'animate-spin' : ''} />
                            <span>
                                {isUpdatingAI ? '최신 데이터 분석 중...' :
                                    manualUpdateCount >= 3 ? '일일 갱신 한도 초과' :
                                        `수동 업데이트 (${3 - manualUpdateCount}/3회 남음)`}
                            </span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="glass p-6 rounded-3xl group/card relative overflow-hidden">
                            <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-lg uppercase tracking-widest">강남·역삼 분석</span>
                            <h4 className="mt-3 font-bold text-base italic">압구정 재건축 및 GBD 시장</h4>
                            <p className="mt-2 text-xs text-secondary leading-relaxed">
                                압구정 재건축 속도가 붙으며 인근 역삼·강남 상업용 빌딩에 대한 '낙수효과'가 기대됩니다. 2024년 GBD 명목 임대료는 8.8% 상승했으며, 대출 규제 속에서도 테헤란로 중심의 <span className="text-primary font-bold">임대인 우위 시장</span>은 2025년까지 견고할 전망입니다.
                            </p>
                        </div>
                        <div className="glass p-6 rounded-3xl group/card relative overflow-hidden">
                            <span className="px-2 py-1 bg-accent/10 text-accent text-[10px] font-black rounded-lg uppercase tracking-widest">서초 분석</span>
                            <h4 className="mt-3 font-bold text-base italic">서초 권역 초양극화 현상</h4>
                            <p className="mt-2 text-xs text-secondary leading-relaxed">
                                서초구는 매도자 우위의 '초양극화'가 심화되고 있습니다. 2025년 매매 지수 상승률 <span className="text-accent font-bold">17.6%</span>를 기록하며 신축 선호가 뚜렷합니다. 주택담보대출 한도 제한 등 정책 변동성이 크므로 장기 임차인 포트폴리오를 통한 리스크 분산이 필수적입니다.
                            </p>
                        </div>
                        <div className="glass p-6 rounded-3xl group/card relative overflow-hidden">
                            <span className="px-2 py-1 bg-success/10 text-success text-[10px] font-black rounded-lg uppercase tracking-widest">판교 분석</span>
                            <h4 className="mt-3 font-bold text-base italic">스타트업 플래닛 및 IT 벨트</h4>
                            <p className="mt-2 text-xs text-secondary leading-relaxed">
                                금토동 '판교 스타트업 플래닛' 착공(2025년 예정)으로 지식산업센터 가치가 재조명 중입니다. 판교역 인근 84㎡ 아파트 시세가 <span className="text-success font-bold">24억 원대</span>로 안착하며, 젊은 고소득 근로자 유입에 따른 배후 상권 수익률이 안정화 단계에 진입했습니다.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-success/5 rounded-lg border border-success/10">
                            <CheckCircle2 size={12} className="text-success" />
                            <span className="text-[10px] font-bold text-success">매월 자동 업데이트 활성화됨</span>
                        </div>
                        <p className="text-[10px] text-secondary/60 italic font-medium">최근 업데이트: {lastAIUpdate} | 데이터 소스: 국토부 실거래가 및 내부 자산 분석 시스템</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default DashboardPage;
