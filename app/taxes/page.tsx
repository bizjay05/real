"use client";

import React, { useState } from 'react';
import {
    Receipt,
    TrendingDown,
    Calendar,
    Download,
    AlertCircle,
    CheckCircle2,
    FileText,
    Search,
    Filter,
    Info,
    RefreshCw
} from 'lucide-react';

const TaxesPage = () => {
    // 세법 자동 업데이트 로직 (3개월 주기)
    const getUpdateDatesInitial = () => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth(); // 0-11

        // 업데이트 주기: 1월, 4월, 7월, 10월 (3개월 단위)
        const updateMonths = [0, 3, 6, 9];
        let lastUpdateMonth = updateMonths[0];

        for (let i = updateMonths.length - 1; i >= 0; i--) {
            if (currentMonth >= updateMonths[i]) {
                lastUpdateMonth = updateMonths[i];
                break;
            }
        }

        const lastUpdate = new Date(currentYear, lastUpdateMonth, 1);
        const nextUpdate = new Date(currentYear, lastUpdateMonth + 3, 1);

        const formatDate = (date: Date) => {
            return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.01`;
        };

        return {
            last: formatDate(lastUpdate),
            next: formatDate(nextUpdate)
        };
    };

    const [isUpdating, setIsUpdating] = useState(false);
    const [updateDates, setUpdateDates] = useState(getUpdateDatesInitial());
    const [updateCount, setUpdateCount] = useState(0);

    const handleManualUpdate = () => {
        if (updateCount >= 3) {
            alert("⚠️ 일일 업데이트 한도(3회)를 모두 사용했습니다. 내일부터 다시 업데이트 가능합니다.");
            return;
        }

        setIsUpdating(true);
        // 실제 서버 업데이트 및 최신 세법 API 호출 시뮬레이션
        setTimeout(() => {
            const now = new Date();
            const today = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;

            setUpdateDates(prev => ({
                ...prev,
                last: today + ` (수동 업데이트 완료 - 오늘 ${updateCount + 1}/3회)`
            }));
            setUpdateCount(prev => prev + 1);
            setIsUpdating(false);
        }, 1500);
    };

    // 실제 한국 세법 기준 통계 데이터 (예시 수치)
    const taxSummary = [
        { label: '5월 종합소득세 추계', value: '2,840만원', icon: TrendingDown, color: 'text-primary', bg: 'bg-primary/10', info: '작년 임대소득 기준 예상치' },
        { label: '7월 재산세(건물) 예정', value: '420만원', icon: AlertCircle, color: 'text-warning', bg: 'bg-warning/10', info: '6월 1일 소유자 기준' },
        { label: '누적 납부 세액 (2024)', value: '1,520만원', icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', info: '올해 현재까지 납부 총액' },
        { label: '미발행 세금계산서', value: '3건', icon: FileText, color: 'text-danger', bg: 'bg-danger/10', info: '상가 임대료 미발행 내역' },
    ];

    // 실제 한국 세법상 세목 및 납기 기준 데이터
    const taxItems = [
        { id: 1, name: '부가가치세 (2023년 2기 확정)', type: '국세', building: '강남 프라임 (상가)', period: '23.07.01 ~ 23.12.31', amount: '1,250만원', status: '납부완료', date: '2024.01.25' },
        { id: 2, name: '면세사업장 현황보고', type: '보고', building: '서초 메이플 (주택)', period: '2023년 귀속', amount: '-', status: '신고완료', date: '2024.02.10' },
        { id: 3, name: '지방소득세 (특별징수)', type: '지방세', building: '관리직원 급여분', period: '2024.02', amount: '12.4만원', status: '납부완료', date: '2024.03.10' },
        { id: 4, name: '종합소득세 (정기신고)', type: '국세', building: '전체 임대소득', period: '2023년 귀속', amount: '3,200만원', status: '납부대기', date: '2024.05.31' },
        { id: 5, name: '재산세 (건물분)', type: '지방세', building: '전체 건물', period: '2024년 1기분', amount: '예정됨', status: '공지전', date: '2024.07.31' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">세금 관리</h2>
                        <p className="text-secondary mt-1">대한민국 세법에 따른 부동산 임대사업자 맞춤형 세무 관리입니다.</p>
                        <span className="inline-block mt-2 px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[9px] font-bold rounded border border-amber-500/10">
                            ⚠️ 실거래 기반 가상 시뮬레이션
                        </span>
                    </div>        </div>
                <div className="flex gap-2">
                    <div className="glass flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold text-primary bg-primary/5">
                        <Info size={16} />
                        <span>사업자등록번호: 123-45-67890</span>
                    </div>
                    <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                        <Download size={20} />
                        <span>세무 신고 자료 내려받기</span>
                    </button>
                </div>
            </div>

            {/* 세금 요약 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {taxSummary.map((item, idx) => (
                    <div key={idx} className="glass p-6 rounded-3xl border shadow-sm card-hover relative group">
                        <div className="flex justify-between items-start">
                            <div className={`p-3 rounded-2xl ${item.bg} ${item.color}`}>
                                <item.icon size={24} />
                            </div>
                        </div>
                        <div className="mt-5">
                            <p className="text-xs font-bold text-secondary uppercase tracking-tight">{item.label}</p>
                            <h3 className="text-2xl font-black mt-1">{item.value}</h3>
                            <p className="text-[10px] text-secondary/60 mt-2 flex items-center gap-1">
                                <Info size={10} /> {item.info}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* 세금 상세 목록 */}
                <div className="xl:col-span-2 space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 glass flex items-center gap-3 px-4 py-3 rounded-2xl border">
                            <Search size={20} className="text-secondary" />
                            <input
                                type="text"
                                placeholder="세목명, 건물, 세구분(국세/지방세) 검색..."
                                className="bg-transparent border-none outline-none text-sm w-full font-medium"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button className="glass flex items-center gap-2 px-4 py-3 rounded-2xl border font-bold text-xs hover:bg-secondary/5 transition-colors">
                                <Filter size={16} />
                                <span>국세</span>
                            </button>
                            <button className="glass flex items-center gap-2 px-4 py-3 rounded-2xl border font-bold text-xs hover:bg-secondary/5 transition-colors">
                                <Filter size={16} />
                                <span>지방세</span>
                            </button>
                        </div>
                    </div>

                    <div className="glass rounded-3xl border shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-white/5 bg-secondary/5 flex justify-between items-center">
                            <h3 className="text-lg font-bold">2024년 세무 이력 및 예정 내역</h3>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handleManualUpdate}
                                    disabled={isUpdating}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${isUpdating
                                        ? 'bg-primary/20 text-primary cursor-not-allowed'
                                        : 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20'
                                        }`}
                                >
                                    <RefreshCw size={14} className={isUpdating ? 'animate-spin' : ''} />
                                    <span>{isUpdating ? '업데이트 중...' : '법률 최신 업데이트'}</span>
                                </button>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-[10px] font-black text-primary bg-primary/5 px-2 py-1 rounded-lg border border-primary/10">
                                        최근 법률 업데이트: {updateDates.last}
                                    </span>
                                    <span className="text-[9px] font-bold text-secondary animate-pulse">
                                        다음 정기 업데이트 예정: {updateDates.next}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5 bg-card/50">
                                        <th className="px-6 py-4 text-[10px] font-black text-secondary uppercase tracking-widest">분류</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-secondary uppercase tracking-widest">세목 / 명칭</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-secondary uppercase tracking-widest">대상 / 귀속기간</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-secondary uppercase tracking-widest text-center">금액</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-secondary uppercase tracking-widest text-center">납부기한</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-secondary uppercase tracking-widest text-center">상태</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {taxItems.map((item) => (
                                        <tr key={item.id} className="hover:bg-secondary/5 transition-colors group">
                                            <td className="px-6 py-5">
                                                <span className={`px-2 py-1 rounded-lg text-[9px] font-black border ${item.type === '국세' ? 'border-primary/20 text-primary bg-primary/5' :
                                                    item.type === '지방세' ? 'border-accent/20 text-accent bg-accent/5' : 'border-secondary/20 text-secondary bg-secondary/5'
                                                    }`}>
                                                    {item.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <p className="font-bold text-sm tracking-tight">{item.name}</p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <p className="text-[11px] font-bold text-secondary uppercase">{item.building}</p>
                                                <p className="text-[10px] font-medium text-secondary/60 mt-0.5">{item.period}</p>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="font-black text-sm">{item.amount}</span>
                                            </td>
                                            <td className="px-6 py-5 text-center text-[11px] font-bold text-secondary">
                                                {item.date}
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${item.status === '납부완료' || item.status === '신고완료' ? 'bg-success/10 text-success' :
                                                    item.status === '납부대기' ? 'bg-warning/10 text-warning animate-pulse' : 'bg-secondary/10 text-secondary'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* 세금 안내 및 가이드 */}
                <div className="space-y-6">
                    <div className="glass p-6 rounded-3xl border shadow-sm h-fit">
                        <h3 className="text-xl font-bold mb-6 pb-4 border-b border-white/5 flex items-center justify-between">
                            사업자 세무 캘린더
                            <Calendar size={18} className="text-primary" />
                        </h3>
                        <div className="space-y-6">
                            {[
                                { month: '01.25', title: '부가세 2기 확정신고', desc: '상가 임대료 부가가치세 납부' },
                                { month: '02.10', title: '면세사업장 현황신고', desc: '주택 임대사업자 수입내역 신고' },
                                { month: '05.31', title: '종합소득세 확정신고', desc: '개인 임대소득 합산 신고 및 납부' },
                                { month: '07.31', title: '재산세(건물) 납부', desc: '7.16~7.31 건물분 재산세 납기' },
                                { month: '09.30', title: '재산세(토지) 납부', desc: '9.16~9.30 토지분 재산세 납기' },
                                { month: '12.15', title: '종합부동산세 납부', desc: '12.01~12.15 고액 부동산 보유세' },
                            ].map((schedule, i) => (
                                <div key={i} className="flex gap-4 items-start border-l-2 border-primary/30 hover:border-primary pl-4 py-1 transition-colors group">
                                    <div className="flex-shrink-0">
                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">{schedule.month}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold tracking-tight group-hover:text-primary transition-colors">{schedule.title}</p>
                                        <p className="text-[10px] text-secondary mt-0.5">{schedule.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass p-6 rounded-3xl border shadow-sm bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
                        <h4 className="font-black flex items-center gap-2 mb-3 text-sm tracking-tight text-primary">
                            <Receipt size={18} />
                            임대사업자 세무 팁
                        </h4>
                        <div className="space-y-3">
                            <div className="bg-white/50 dark:bg-black/20 p-3 rounded-2xl border border-white/10">
                                <p className="text-[11px] font-bold text-foreground">주택임대 소득세 비과세 확인</p>
                                <p className="text-[10px] text-secondary mt-1">1주택 소유자의 경우 (기준시가 12억 이하) 임대소득이 비과세될 수 있습니다. 본인의 주택수를 확인하세요.</p>
                            </div>
                            <div className="bg-white/50 dark:bg-black/20 p-3 rounded-2xl border border-white/10">
                                <p className="text-[11px] font-bold text-foreground">상가 부가세 환급</p>
                                <p className="text-[10px] text-secondary mt-1">건물 취득 시 납부한 부가가치세는 사업자 등록 후 20일 이내 신청 시 환급 가능합니다.</p>
                            </div>
                        </div>
                        <button className="w-full mt-5 py-4 rounded-2xl bg-primary text-white text-xs font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all uppercase tracking-widest">
                            2024 절세 리포트 신청
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaxesPage;
