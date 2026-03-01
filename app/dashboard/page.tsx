import { Building2, Users, CreditCard, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const DashboardPage = () => {
    const stats = [
        { label: '전체 보유 건물', value: '4개', icon: Building2, color: 'text-primary', bg: 'bg-primary/10', trend: '+12%', isUp: true },
        { label: '총 세입자', value: '128명', icon: Users, color: 'text-accent', bg: 'bg-accent/10', trend: '+5%', isUp: true },
        { label: '이번 달 매출', value: '4,520만원', icon: CreditCard, color: 'text-success', bg: 'bg-success/10', trend: '+2.4%', isUp: true },
        { label: '미납 및 연체', value: '3건', icon: AlertCircle, color: 'text-danger', bg: 'bg-danger/10', trend: '-1건', isUp: false },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">대시보드</h2>
                <p className="text-secondary mt-1">오늘의 부동산 관리 현황을 요약해 드립니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="glass p-6 rounded-2xl border card-hover">
                        <div className="flex justify-between items-start">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${stat.isUp ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {stat.trend}
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm font-medium text-secondary">{stat.label}</p>
                            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 최근 수납 내역 */}
                <div className="glass rounded-2xl border p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">최근 수납 내력</h3>
                        <button className="text-sm text-primary font-medium hover:underline">전체 보기</button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: '김철수', room: '강남빌딩 302호', amount: '120만원', status: '완료', date: '오늘' },
                            { name: '이미영', room: '서초타워 1501호', amount: '250만원', status: '대기', date: '어제' },
                            { name: '박지성', room: '강남빌딩 101호', amount: '80만원', status: '완료', date: '2일 전' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/5 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center font-bold text-secondary">
                                        {item.name[0]}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-xs text-secondary">{item.room}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">{item.amount}</p>
                                    <p className={`text-xs ${item.status === '완료' ? 'text-success' : 'text-warning'}`}>
                                        {item.status} · {item.date}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 유지보수 요청 */}
                <div className="glass rounded-2xl border p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">유지보수 요청</h3>
                        <button className="text-sm text-primary font-medium hover:underline">전체 보기</button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { title: '엘리베이터 소음', building: '서초타워', priority: '높음', status: '접수' },
                            { title: '302호 세면대 누수', building: '강남빌딩', priority: '보통', status: '진행 중' },
                            { title: '옥상 방수 점검', building: '신사엠파이어', priority: '중요', status: '완료' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-white/10 hover:bg-secondary/5 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-12 rounded-full ${item.priority === '높음' ? 'bg-danger' : item.priority === '보통' ? 'bg-warning' : 'bg-primary'
                                        }`} />
                                    <div>
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-xs text-secondary">{item.building}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === '접수' ? 'bg-danger/10 text-danger' :
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
