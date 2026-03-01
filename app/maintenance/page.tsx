import React from 'react';
import {
    Wrench,
    Plus,
    Search,
    Filter,
    Clock,
    CheckCircle2,
    AlertTriangle,
    Building2,
    User,
    MoreVertical,
    ArrowRight,
    MessageSquare
} from 'lucide-react';

const MaintenancePage = () => {
    const requests = [
        {
            id: 1,
            title: '3층 복도 전등 교체 요청',
            building: '강남 프라임 빌딩',
            room: '공용부',
            requester: '김철수 (302호)',
            date: '2024.03.01',
            priority: '낮음',
            status: '접수됨',
            description: '3층 엘리베이터 앞 전등이 깜빡거립니다. 교체 부탁드립니다.',
        },
        {
            id: 2,
            title: '메인 엘리베이터 소음 발생',
            building: '서초 타워 메이플',
            room: '승강기 1호기',
            requester: '관리인',
            date: '2023.02.28',
            priority: '높음',
            status: '진행 중',
            description: '운행 시 긁히는 소리가 납니다. 안전 점검이 시급합니다.',
        },
        {
            id: 3,
            title: '501호 화장실 누수',
            building: '판교 넥스트 밸리',
            room: '501호',
            requester: '박지성',
            date: '2023.03.02',
            priority: '긴급',
            status: '대기 중',
            description: '천장에서 물이 조금씩 샙니다. 신속한 확인 바랍니다.',
        },
        {
            id: 4,
            title: '옥상 방수 공사 완료',
            building: '강남 프라임 빌딩',
            room: '옥상',
            requester: '시스템',
            date: '2023.02.20',
            priority: '보통',
            status: '완료됨',
            description: '정기 점검 결과에 따른 보수 완료.',
        }
    ];

    const getStatusStyle = (status: string) => {
        switch (status) {
            case '접수됨': return 'bg-primary/10 text-primary border-primary/20';
            case '진행 중': return 'bg-warning/10 text-warning border-warning/20';
            case '대기 중': return 'bg-danger/10 text-danger border-danger/20';
            case '완료됨': return 'bg-success/10 text-success border-success/20';
            default: return 'bg-secondary/10 text-secondary border-secondary/20';
        }
    };

    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case '긴급': return <AlertTriangle size={14} className="text-danger" />;
            case '높음': return <Clock size={14} className="text-warning" />;
            default: return <CheckCircle2 size={14} className="text-success" />;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">유지보수 관리</h2>
                    <p className="text-secondary mt-1">건물의 시설 및 수리 요청 현황을 관리합니다.</p>
                </div>
                <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                    <Plus size={20} />
                    <span>수리 요청 등록</span>
                </button>
            </div>

            {/* 필터 탭 */}
            <div className="flex border-b gap-8 overflow-x-auto pb-1">
                {['전체', '대기 중', '진행 중', '완료됨'].map((tab) => (
                    <button
                        key={tab}
                        className={`pb-4 px-2 text-sm font-bold transition-all relative ${tab === '전체' ? 'text-primary' : 'text-secondary hover:text-foreground'
                            }`}
                    >
                        {tab}
                        {tab === '전체' && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full" />}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {requests.map((request) => (
                    <div key={request.id} className="glass border rounded-3xl p-6 flex flex-col justify-between card-hover">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(request.status)}`}>
                                    {request.status}
                                </div>
                                <button className="p-1 rounded-full hover:bg-secondary/10 transition-colors">
                                    <MoreVertical size={20} className="text-secondary" />
                                </button>
                            </div>

                            <h3 className="text-xl font-bold mb-2">{request.title}</h3>
                            <p className="text-sm text-secondary line-clamp-2 mb-6">{request.description}</p>

                            <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                                <div className="flex items-center gap-2">
                                    <Building2 size={16} className="text-secondary" />
                                    <span className="text-xs font-medium">{request.building}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User size={16} className="text-secondary" />
                                    <span className="text-xs font-medium">{request.requester}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="p-1 rounded bg-secondary/10 uppercase tracking-tighter">
                                        {getPriorityIcon(request.priority)}
                                    </div>
                                    <span className="text-xs font-bold">우선순위: {request.priority}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-secondary" />
                                    <span className="text-xs font-medium">{request.date}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t flex items-center justify-between">
                            <div className="flex items-center gap-2 text-primary">
                                <MessageSquare size={16} />
                                <span className="text-xs font-bold">댓글 2개</span>
                            </div>
                            <button className="flex items-center gap-2 text-sm font-bold hover:translate-x-1 transition-transform">
                                상세 보기
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MaintenancePage;
