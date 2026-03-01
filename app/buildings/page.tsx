import React from 'react';
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

const BuildingsPage = () => {
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

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">건물 관리</h2>
                    <p className="text-secondary mt-1">소유하신 {buildings.length}개의 건물을 관리하고 있습니다.</p>
                </div>
                <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                    <Plus size={20} />
                    <span>새 건물 등록</span>
                </button>
            </div>

            {/* 필터 및 검색 바 */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 glass flex items-center gap-3 px-4 py-3 rounded-2xl border">
                    <Search size={20} className="text-secondary" />
                    <input
                        type="text"
                        placeholder="건물명, 주소 또는 유형으로 검색..."
                        className="bg-transparent border-none outline-none text-sm w-full"
                    />
                </div>
                <button className="glass flex items-center gap-2 px-6 py-3 rounded-2xl border font-medium hover:bg-secondary/5 transition-colors">
                    <Filter size={20} />
                    <span>필터</span>
                </button>
            </div>

            {/* 건물 카드 리스트 */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {buildings.map((building) => (
                    <div key={building.id} className="glass rounded-3xl border overflow-hidden card-hover flex flex-col md:flex-row h-full">
                        <div className="md:w-48 h-48 md:h-auto relative overflow-hidden">
                            <img
                                src={building.image}
                                alt={building.name}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                            <div className="absolute top-3 left-3 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                                {building.type}
                            </div>
                        </div>

                        <div className="flex-1 p-6 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold">{building.name}</h3>
                                    <button className="p-1 rounded-full hover:bg-secondary/10 transition-colors text-secondary">
                                        <MoreVertical size={20} />
                                    </button>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-secondary mb-4">
                                    <MapPin size={14} />
                                    <span>{building.address}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                                            <Layers size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-secondary">층수</p>
                                            <p className="text-sm font-semibold">{building.floors.split('/')[0]}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                            <Users size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-secondary">총 호수</p>
                                            <p className="text-sm font-semibold">{building.units}개 호실</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-medium">점유율</span>
                                    <span className={`font-bold ${building.occupancy === 100 ? 'text-success' : 'text-primary'}`}>
                                        {building.occupancy}%
                                    </span>
                                </div>
                                <div className="w-full bg-secondary/10 h-2 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${building.occupancy === 100 ? 'bg-success' : 'bg-primary'
                                            }`}
                                        style={{ width: `${building.occupancy}%` }}
                                    />
                                </div>
                                <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border border-primary/20 text-primary font-bold hover:bg-primary/5 transition-colors text-sm">
                                    상세 세부정보 보기
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BuildingsPage;
