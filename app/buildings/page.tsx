"use client";

import React, { useState } from 'react';
import {
    Building2,
    MapPin,
    Layers,
    Users,
    MoreVertical,
    Plus,
    Search,
    Filter,
    ArrowRight
} from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BuildingsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const buildings = [
        {
            id: 1,
            name: '강남 프라임 빌딩',
            address: '서울특별시 강남구 테헤란로 123',
            floors: '지상 15층 / 지하 3층',
            units: 45,
            occupancy: 95,
            type: '상업용',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
        },
        {
            id: 2,
            name: '서초 타워 메이플',
            address: '서울특별시 서초구 서초동 456',
            floors: '지상 10층 / 지하 2층',
            units: 24,
            occupancy: 88,
            type: '오피스텔',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
        },
        {
            id: 3,
            name: '판교 넥스트 밸리',
            address: '경기도 성남시 분당구 판교역로 789',
            floors: '지상 8층 / 지하 4층',
            units: 32,
            occupancy: 100,
            type: '지식산업센터',
            image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1974&auto=format&fit=crop',
        }
    ];

    const chartData = [
        { name: '10월', revenue: 4200 },
        { name: '11월', revenue: 4500 },
        { name: '12월', revenue: 4300 },
        { name: '1월', revenue: 4800 },
        { name: '2월', revenue: 5100 },
        { name: '3월', revenue: 5400 },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">건물 관리</h2>
                    <p className="text-secondary mt-1">소유하신 건물의 수입 및 점유 현황입니다.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                >
                    <Plus size={20} />
                    <span>새 건물 등록</span>
                </button>
            </div>

            {/* 수익 통계 그래프 */}
            <div className="glass p-6 rounded-3xl border">
                <h3 className="text-xl font-bold mb-6">최근 6개월 수익 추이 (만원)</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                                itemStyle={{ color: '#3b82f6' }}
                            />
                            <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 필터 및 검색 바 */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 glass flex items-center gap-3 px-4 py-3 rounded-2xl border">
                    <Search size={20} className="text-secondary" />
                    <input
                        type="text"
                        placeholder="건물명으로 검색..."
                        className="bg-transparent border-none outline-none text-sm w-full"
                    />
                </div>
            </div>

            {/* 건물 카드 리스트 */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Previous cards implementation remains same */}
                {buildings.map((building) => (
                    <div key={building.id} className="glass rounded-3xl border overflow-hidden card-hover flex flex-col md:flex-row">
                        <div className="md:w-48 h-48 md:h-auto relative overflow-hidden">
                            <img src={building.image} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="flex-1 p-6">
                            <h3 className="text-xl font-bold">{building.name}</h3>
                            <p className="text-sm text-secondary flex items-center gap-1 mt-1"><MapPin size={14} /> {building.address}</p>
                            <div className="mt-4 flex gap-4">
                                <div className="text-center bg-secondary/5 p-2 rounded-xl flex-1">
                                    <p className="text-xs text-secondary">점유율</p>
                                    <p className="text-sm font-bold text-primary">{building.occupancy}%</p>
                                </div>
                                <div className="text-center bg-secondary/5 p-2 rounded-xl flex-1">
                                    <p className="text-xs text-secondary">호수</p>
                                    <p className="text-sm font-bold">{building.units}개</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 등록 모달 */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="새 건물 등록"
            >
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label className="block text-sm font-medium mb-1">건물 이름</label>
                        <input type="text" className="w-full bg-secondary/5 border rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/20" placeholder="예: 강남 프라임 타워" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">건물 유형</label>
                            <select className="w-full bg-secondary/5 border rounded-xl px-4 py-3 outline-none">
                                <option>상업용</option>
                                <option>주거용</option>
                                <option>오피스텔</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">총 층수</label>
                            <input type="number" className="w-full bg-secondary/5 border rounded-xl px-4 py-3 outline-none" placeholder="15" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">상세 주소</label>
                        <textarea className="w-full bg-secondary/5 border rounded-xl px-4 py-3 outline-none h-24" placeholder="지번 또는 도로명 주소 입력"></textarea>
                    </div>
                    <button className="w-full bg-primary text-white py-4 rounded-xl font-bold mt-4 shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
                        등록하기
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default BuildingsPage;
