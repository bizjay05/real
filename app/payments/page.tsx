import React from 'react';
import {
    CreditCard,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Filter,
    Download,
    CheckCircle2,
    Clock,
    AlertCircle,
    Calendar
} from 'lucide-react';

const PaymentsPage = () => {
    const summary = [
        { label: '이번 달 총 예상 수입', value: '5,840만원', icon: CreditCard, trend: '+4.5%', isUp: true, color: 'text-primary' },
        { label: '입금 완료', value: '4,520만원', icon: CheckCircle2, trend: '77%', isUp: true, color: 'text-success' },
        { label: '미납 및 연체', value: '1,320만원', icon: AlertCircle, trend: '-2건', isUp: false, color: 'text-danger' },
        { label: '수납 대기', value: '0만원', icon: Clock, trend: '0%', isUp: true, color: 'text-warning' },
    ];

    const transactions = [
        { id: 1, name: '김철수', building: '강남 프라임 빌딩', room: '302호', amount: '120만원', date: '2024.03.01', method: '계좌이체', status: '입금완료' },
        { id: 2, name: '이민지', building: '서초 타워 메이플', room: '1505호', amount: '250만원', date: '2024.03.05', method: '카드결제', status: '미납' },
        { id: 3, name: '(주)텍솔루션', building: '판교 넥스트 밸리', room: '701호', amount: '1,200만원', date: '2024.03.01', method: '계좌이체', status: '입금완료' },
        { id: 4, name: '박지성', building: '강남 프라임 빌딩', room: '101호', amount: '80만원', date: '2024.02.28', method: '계좌이체', status: '입금완료' },
        { id: 5, name: '홍길동', building: '서초 타워 메이플', room: '201호', amount: '150만원', date: '2024.03.10', method: '미지정', status: '연체' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">수납 및 재무 관리</h2>
                    <p className="text-secondary mt-1">2024년 3월의 임대료 수납 현황입니다.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 glass border px-4 py-2 rounded-xl font-medium hover:bg-secondary/5 transition-all">
                        <Calendar size={18} />
                        <span>2024년 3월</span>
                    </button>
                    <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                        <Download size={20} />
                        <span>보고서 다운로드</span>
                    </button>
                </div>
            </div>

            {/* 재무 요약 핀 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {summary.map((item, idx) => (
                    <div key={idx} className="glass p-6 rounded-2xl border card-hover">
                        <div className="flex justify-between items-start">
                            <div className={`p-3 rounded-xl bg-background/50 border ${item.color}`}>
                                <item.icon size={24} />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${item.isUp ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                                {item.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {item.trend}
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm font-medium text-secondary">{item.label}</p>
                            <h3 className="text-2xl font-bold mt-1">{item.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* 수납 목록 테이블 */}
                <div className="xl:col-span-2 space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 glass flex items-center gap-3 px-4 py-3 rounded-2xl border">
                            <Search size={20} className="text-secondary" />
                            <input
                                type="text"
                                placeholder="세입자, 호수 검색..."
                                className="bg-transparent border-none outline-none text-sm w-full"
                            />
                        </div>
                        <button className="glass flex items-center gap-2 px-6 py-3 rounded-2xl border font-medium hover:bg-secondary/5 transition-colors">
                            <Filter size={20} />
                            <span>정렬</span>
                        </button>
                    </div>

                    <div className="glass rounded-3xl border overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b bg-secondary/5">
                                        <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-wider">세입자 / 건물</th>
                                        <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-wider">납부 금액</th>
                                        <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-wider">결제일 / 방법</th>
                                        <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-wider">상태</th>
                                        <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-wider"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {transactions.map((tx) => (
                                        <tr key={tx.id} className="hover:bg-secondary/5 transition-colors">
                                            <td className="px-6 py-5">
                                                <p className="font-bold">{tx.name}</p>
                                                <p className="text-xs text-secondary">{tx.building} {tx.room}</p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="font-bold text-foreground">{tx.amount}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <p className="text-sm">{tx.date}</p>
                                                <p className="text-xs text-secondary">{tx.method}</p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${tx.status === '입금완료' ? 'bg-success/10 text-success' :
                                                    tx.status === '미납' ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger'
                                                    }`}>
                                                    {tx.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <button className="text-sm font-medium text-primary hover:underline">상세</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* 수납 통계 및 인사이트 */}
                <div className="space-y-6">
                    <div className="glass p-6 rounded-3xl border">
                        <h3 className="text-xl font-bold mb-6">수납 통계</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-secondary font-medium">전체 수납율</span>
                                    <span className="font-bold text-primary">77%</span>
                                </div>
                                <div className="w-full bg-secondary/10 h-3 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full w-[77%] rounded-full" />
                                </div>
                            </div>

                            <div className="pt-4 border-t space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-success" />
                                        <span className="text-sm text-secondary">정기 납부</span>
                                    </div>
                                    <span className="text-sm font-bold">42건</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-warning" />
                                        <span className="text-sm text-secondary">미납</span>
                                    </div>
                                    <span className="text-sm font-bold text-warning">8건</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-danger" />
                                        <span className="text-sm text-secondary">연체 (15일 이상)</span>
                                    </div>
                                    <span className="text-sm font-bold text-danger">3건</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass p-6 rounded-3xl border bg-gradient-to-br from-primary/5 to-accent/5">
                        <h4 className="font-bold flex items-center gap-2 mb-2">
                            <TrendingUp size={18} className="text-primary" />
                            수익 분석 리포트
                        </h4>
                        <p className="text-xs text-secondary leading-relaxed">
                            지난달 대비 공실률이 2% 감소하며 총 수입이 4.5% 증가했습니다. 미납금이 높은 호실에 대해 자동 알림 전송을 권장합니다.
                        </p>
                        <button className="w-full mt-4 py-2 rounded-xl bg-card/10 border text-xs font-bold hover:bg-card/20 transition-colors">
                            AI 통계 보기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentsPage;
