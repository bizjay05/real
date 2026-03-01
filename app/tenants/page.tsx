import React from 'react';
import {
    Users,
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    Phone,
    Calendar,
    CreditCard,
    Building,
    CheckCircle2,
    Clock,
    AlertCircle
} from 'lucide-react';

const TenantsPage = () => {
    const tenants = [
        {
            id: 1,
            name: '김철수',
            building: '강남 프라임 빌딩',
            room: '302호',
            contact: '010-1234-5678',
            startDate: '2023.03.01',
            endDate: '2025.02.28',
            deposit: '5,000만원',
            monthlyRent: '120만원',
            status: '정상',
            paymentStatus: '완료',
        },
        {
            id: 2,
            name: '이민지',
            building: '서초 타워 메이플',
            room: '1505호',
            contact: '010-9876-5432',
            startDate: '2024.01.15',
            endDate: '2026.01.14',
            deposit: '1억원',
            monthlyRent: '250만원',
            status: '정상',
            paymentStatus: '미납',
        },
        {
            id: 3,
            name: '박지성',
            building: '강남 프라임 빌딩',
            room: '101호',
            contact: '010-5555-4444',
            startDate: '2022.05.01',
            endDate: '2024.04.30',
            deposit: '2,000만원',
            monthlyRent: '80만원',
            status: '만료 임박',
            paymentStatus: '완료',
        },
        {
            id: 4,
            name: '(주)텍솔루션',
            building: '판교 넥스트 밸리',
            room: '701호',
            contact: '02-123-4567',
            startDate: '2023.10.01',
            endDate: '2025.09.30',
            deposit: '2억원',
            monthlyRent: '1,200만원',
            status: '정상',
            paymentStatus: '완료',
        }
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case '정상':
                return <span className="px-3 py-1 bg-success/10 text-success text-xs font-bold rounded-full flex items-center gap-1"><CheckCircle2 size={12} />계약 중</span>;
            case '만료 임박':
                return <span className="px-3 py-1 bg-warning/10 text-warning text-xs font-bold rounded-full flex items-center gap-1"><Clock size={12} />만료 임박</span>;
            default:
                return <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full">{status}</span>;
        }
    };

    const getPaymentBadge = (status: string) => {
        if (status === '미납') {
            return <span className="text-danger flex items-center gap-1 font-bold text-sm"><AlertCircle size={14} />미납</span>;
        }
        return <span className="text-success font-bold text-sm">결제 완료</span>;
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">세입자 관리</h2>
                    <p className="text-secondary mt-1">총 {tenants.length}명의 세입자 및 임대차 계약을 관리하고 있습니다.</p>
                </div>
                <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                    <Plus size={20} />
                    <span>세입자 추가</span>
                </button>
            </div>

            {/* 필터 및 검색 바 */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 glass flex items-center gap-3 px-4 py-3 rounded-2xl border">
                    <Search size={20} className="text-secondary" />
                    <input
                        type="text"
                        placeholder="세입자 이름, 건물명, 호수 검색..."
                        className="bg-transparent border-none outline-none text-sm w-full"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="glass flex items-center gap-2 px-6 py-3 rounded-2xl border font-medium hover:bg-secondary/5 transition-colors">
                        <Filter size={20} />
                        <span>필터</span>
                    </button>
                    <select className="glass px-4 py-3 rounded-2xl border font-medium outline-none bg-transparent">
                        <option>전체 건물</option>
                        <option>강남 프라임 빌딩</option>
                        <option>서초 타워 메이플</option>
                        <option>판교 넥스트 밸리</option>
                    </select>
                </div>
            </div>

            {/* 세입자 리스트 (표 형식) */}
            <div className="glass rounded-3xl border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b bg-secondary/5">
                                <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-wider">세입자 정보</th>
                                <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-wider">소속 호수</th>
                                <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-wider">계약 기간</th>
                                <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-wider">보증금 / 월세</th>
                                <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-wider">상태</th>
                                <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {tenants.map((tenant) => (
                                <tr key={tenant.id} className="hover:bg-secondary/5 transition-colors">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center font-bold text-primary">
                                                {tenant.name[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold">{tenant.name}</p>
                                                <p className="text-xs text-secondary flex items-center gap-1 mt-0.5">
                                                    <Phone size={12} /> {tenant.contact}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <Building size={16} className="text-secondary" />
                                            <div>
                                                <p className="text-sm font-semibold">{tenant.building}</p>
                                                <p className="text-xs text-secondary">{tenant.room}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar size={16} className="text-secondary" />
                                            <div>
                                                <p>{tenant.startDate} ~</p>
                                                <p>{tenant.endDate}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <CreditCard size={16} className="text-secondary" />
                                            <div>
                                                <p className="text-sm font-bold text-primary">{tenant.deposit}</p>
                                                <p className="text-xs text-secondary">월 {tenant.monthlyRent}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="space-y-2">
                                            {getStatusBadge(tenant.status)}
                                            {getPaymentBadge(tenant.paymentStatus)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="p-2 rounded-xl hover:bg-secondary/10 transition-colors text-secondary">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TenantsPage;
