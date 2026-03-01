"use client";

import React, { useState } from 'react';
import {
    Bell,
    Megaphone,
    ExternalLink,
    Search,
    Filter,
    Plus,
    Clock,
    Pin,
    ChevronRight,
    TrendingUp,
    Image as ImageIcon
} from 'lucide-react';
import Modal from '@/components/ui/Modal';

const NoticePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'notice', 'promotion'

    const notices = [
        {
            id: 1,
            type: 'notice',
            isPinned: true,
            title: 'BuildingWorks 임대관리 시스템 정기 업데이트 안내 (v1.5)',
            content: '수납 관리 기능 고도화 및 세금 계산서 자동 발행 기능이 추가되었습니다.',
            date: '2024.03.01',
            author: '운영팀'
        },
        {
            id: 2,
            type: 'promotion',
            isPinned: false,
            title: '[광고] 전문 세무사와 함께하는 부동산 절세 세미나',
            content: '건물 소유주분들을 위한 2024년 상반기 절세 전략 세미나에 초대합니다.',
            date: '2024.02.28',
            author: '파트너십팀',
            hasLink: true
        },
        {
            id: 3,
            type: 'notice',
            isPinned: false,
            title: '강남 프라임 빌딩 주차장 바닥 도색 작업 공지',
            content: '3월 5일(화)부터 3월 7일(목)까지 지하 2층 주차장 도색 작업이 진행됩니다.',
            date: '2024.02.15',
            author: '시설관리부'
        },
        {
            id: 4,
            type: 'promotion',
            isPinned: false,
            title: '[이벤트] 빌딩웍스 앱 런칭 기념 구독료 50% 할인 서비스',
            content: '지금 바로 빌딩웍스 모바일 앱을 다운로드하고 첫 3개월 할인 혜택을 받으세요.',
            date: '2024.02.10',
            author: '마케팅팀'
        },
    ];

    const filteredNotices = activeTab === 'all'
        ? notices
        : notices.filter(n => n.type === activeTab);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">공지 및 광고</h2>
                    <p className="text-secondary mt-1">BuildingWorks의 새로운 소식과 유용한 광고 정보를 제안합니다.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                >
                    <Plus size={20} />
                    <span>새 글 작성 (관리자)</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* 왼쪽 사이드 필터 및 광고 배너 */}
                <div className="space-y-6">
                    <div className="glass p-4 rounded-3xl border shadow-sm">
                        <h3 className="text-xs font-black text-secondary uppercase tracking-widest mb-4 px-2">카테고리</h3>
                        <div className="space-y-1">
                            {[
                                { id: 'all', label: '전체 보기', icon: Bell },
                                { id: 'notice', label: '공지사항', icon: Megaphone },
                                { id: 'promotion', label: '광고 및 혜택', icon: TrendingUp },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all font-bold text-sm ${activeTab === tab.id
                                            ? 'bg-primary text-white shadow-md'
                                            : 'text-secondary hover:bg-secondary/10'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <tab.icon size={18} />
                                        <span>{tab.label}</span>
                                    </div>
                                    {activeTab !== tab.id && <ChevronRight size={14} className="opacity-50" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="glass p-6 rounded-3xl border shadow-sm bg-gradient-to-br from-indigo-500/10 to-purple-500/10 relative overflow-hidden group border-indigo-500/20">
                        <div className="relative z-10">
                            <span className="text-[10px] font-black bg-indigo-500 text-white px-2 py-0.5 rounded uppercase tracking-tighter">AD</span>
                            <h4 className="mt-3 font-black text-base tracking-tight leading-tight">건물 관리 전용 화재보험 상품 출시</h4>
                            <p className="mt-2 text-[11px] text-secondary font-medium leading-relaxed">단체 가입 시 최대 20% 할인 혜택을 드립니다. 지금 바로 상담받으세요.</p>
                            <button className="mt-4 flex items-center gap-2 text-indigo-500 font-black text-xs group-hover:gap-3 transition-all">
                                자세히 보기 <ChevronRight size={14} />
                            </button>
                        </div>
                        <ImageIcon className="absolute -bottom-4 -right-4 w-24 h-24 text-indigo-500/5 rotate-12" />
                    </div>
                </div>

                {/* 메인 리스트 영역 */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1 glass flex items-center gap-3 px-4 py-3 rounded-2xl border">
                            <Search size={20} className="text-secondary" />
                            <input
                                type="text"
                                placeholder="공지사항 제목, 내용 검색..."
                                className="bg-transparent border-none outline-none text-sm w-full font-medium"
                            />
                        </div>
                        <button className="glass flex items-center gap-2 px-6 py-3 rounded-2xl border font-bold text-xs hover:bg-secondary/5 transition-colors">
                            <Filter size={16} />
                            <span>정렬</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        {filteredNotices.map((notice) => (
                            <div key={notice.id} className="glass p-6 rounded-3xl border shadow-sm card-hover flex gap-6 relative group overflow-hidden">
                                {notice.isPinned && (
                                    <div className="absolute top-0 right-0 p-2">
                                        <Pin size={16} className="text-primary fill-primary/20 -rotate-45" />
                                    </div>
                                )}
                                <div className={`hidden md:flex flex-shrink-0 w-14 h-14 rounded-2xl items-center justify-center ${notice.type === 'notice' ? 'bg-primary/10 text-primary' : 'bg-amber-500/10 text-amber-500'
                                    }`}>
                                    {notice.type === 'notice' ? <Megaphone size={24} /> : <TrendingUp size={24} />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${notice.type === 'notice' ? 'bg-primary/20 text-primary' : 'bg-amber-500/20 text-amber-600'
                                            }`}>
                                            {notice.type === 'notice' ? 'NOTICE' : 'PROMOTION'}
                                        </span>
                                        <div className="flex items-center gap-1 text-[11px] text-secondary font-bold">
                                            <Clock size={12} />
                                            {notice.date}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">{notice.title}</h3>
                                    <p className="mt-2 text-sm text-secondary font-medium leading-relaxed">{notice.content}</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-[11px] font-bold text-secondary/60">작성자: {notice.author}</span>
                                        {notice.hasLink && (
                                            <button className="flex items-center gap-1.5 text-[11px] font-black text-primary hover:underline">
                                                링크 연결 <ExternalLink size={12} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 더보기 버튼 */}
                    <button className="w-full py-4 glass rounded-3xl border border-dashed border-white/20 text-xs font-black text-secondary hover:bg-white/5 transition-all uppercase tracking-widest">
                        이전 게시글 불러오기
                    </button>
                </div>
            </div>

            {/* 새 글 작성 모달 */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="공지 및 광고 게시물 작성"
            >
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[11px] font-black text-secondary uppercase tracking-widest mb-2">카테고리</label>
                            <select className="w-full bg-secondary/5 border rounded-2xl px-4 py-3 outline-none font-bold text-sm focus:ring-2 ring-primary/20 transition-all">
                                <option value="notice">공지사항</option>
                                <option value="promotion">광고 및 혜택</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[11px] font-black text-secondary uppercase tracking-widest mb-2">고정 여부</label>
                            <div className="flex items-center gap-4 py-3">
                                <label className="flex items-center gap-2 cursor-pointer font-bold text-sm">
                                    <input type="checkbox" className="w-4 h-4 rounded border-white/10" />
                                    최상단 고정
                                </label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-black text-secondary uppercase tracking-widest mb-2">제목</label>
                        <input
                            type="text"
                            className="w-full bg-secondary/5 border rounded-2xl px-4 py-3 outline-none font-bold text-sm focus:ring-2 ring-primary/20 transition-all"
                            placeholder="게시글 제목을 입력하세요."
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-black text-secondary uppercase tracking-widest mb-2">내용</label>
                        <textarea
                            rows={6}
                            className="w-full bg-secondary/5 border rounded-2xl px-4 py-3 outline-none font-medium text-sm focus:ring-2 ring-primary/20 transition-all resize-none"
                            placeholder="공지할 내용을 상세히 작성하세요."
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 py-4 rounded-2xl bg-secondary/5 border font-black text-xs uppercase tracking-widest hover:bg-secondary/10 transition-all"
                        >
                            취소
                        </button>
                        <button
                            className="flex-1 py-4 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all"
                        >
                            게시하기
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default NoticePage;
