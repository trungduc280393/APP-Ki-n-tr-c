import React, { useState } from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}

interface NavItem {
  id?: AppView;
  label: string;
  icon: string;
  subItems?: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  // Define expansion state for menus with children
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Chỉnh Sửa Ảnh', 'Tiện ích', 'Tạo Video (Veo)', 'Trend Kiến trúc']);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems: NavItem[] = [
    { id: AppView.EXTERIOR, label: 'Render Ngoại Thất', icon: '🏰' },
    { id: AppView.INTERIOR, label: 'Render Nội Thất', icon: '🛋️' },
    { id: AppView.PLANNING, label: 'Render Quy hoạch 3D', icon: '🗺️' },
    { 
      label: 'Chỉnh Sửa Ảnh', 
      icon: '✨',
      subItems: [
        { id: AppView.EDIT_MASK, label: 'Sửa vùng chọn', icon: '🖌️' },
        { id: AppView.EDIT_MATERIAL, label: 'Thay vật liệu', icon: '🧱' },
        { id: AppView.EDIT_FURNITURE, label: 'Thay đồ nội thất', icon: '🪑' },
      ]
    },
    { 
      label: 'Tạo Video (Veo)', 
      icon: '🎥',
      subItems: [
        { id: AppView.VIDEO, label: 'Tạo video từ hình ảnh', icon: '🖼️' },
      ]
    },
    { 
      label: 'Tiện ích', 
      icon: '🧩',
      subItems: [
        { id: AppView.UTILITIES_TECH_DRAWING, label: 'Tạo bản vẽ kỹ thuật', icon: '📐' },
        { id: AppView.UTILITIES_PRESENTATION_BOARD, label: 'Bảng trình bày kiến trúc', icon: '📑' },
        { id: AppView.UTILITIES_FLOOR_PLAN_TO_3D, label: 'Render 3D từ Mặt bằng', icon: '🏗️' },
        { id: AppView.UTILITIES_INSERT_BUILDING, label: 'Chèn công trình', icon: '🏢' },
        { id: AppView.UTILITIES_ADD_PEOPLE, label: 'Thêm người vào ảnh', icon: '👥' },
        { id: AppView.UTILITIES_2D_ELEVATION, label: 'Tạo mặt đứng 2D (Đơn)', icon: '📝' },
        { id: AppView.UTILITIES_CHANGE_LIGHTING, label: 'Thay đổi ánh sáng', icon: '💡' },
        { id: AppView.UTILITIES_CAMERA_ANGLE, label: 'Góc Camera', icon: '📷' },
        { id: AppView.UTILITIES_MOODBOARD, label: 'Tạo Moodboard', icon: '📋' },
        { id: AppView.UTILITIES_EXPAND_VIEW, label: 'Mở rộng View', icon: '🖼️' },
        { id: AppView.UTILITIES_UPSCALE, label: 'Nâng cấp ảnh (Upscale)', icon: '🔍' },
        { id: AppView.UTILITIES_ANALYSIS, label: 'Phân tích kiến trúc', icon: '📋' },
        { id: AppView.UTILITIES_VIRTUAL_TOUR, label: 'Thăm quan ảo', icon: '🕶️' },
        { id: AppView.UTILITIES_FENGSHUI, label: 'Phong thuỷ', icon: '☯️' },
      ]
    },
    { 
      label: 'Trend Kiến trúc', 
      icon: '🔥',
      subItems: [
        { id: AppView.TREND_REAL_ESTATE_POSTER, label: 'Tạo poster bất động sản', icon: '📢' },
        { id: AppView.UTILITIES_MOODBOARD, label: 'Tạo mood board nội thất', icon: '🎨' },
        { id: AppView.TREND_ANNOTATED_RENDER, label: 'Tạo Annotated Render', icon: '📝' },
        { id: AppView.TREND_3D_SECTION_PERSPECTIVE, label: 'Tạo 3D Section Perspective', icon: '🏗️' },
      ]
    },
  ];

  const toggleMenu = (label: string) => {
    if (isCollapsed) {
      setIsCollapsed(false);
      if (!expandedMenus.includes(label)) {
        setExpandedMenus(prev => [...prev, label]);
      }
    } else {
      setExpandedMenus(prev => 
        prev.includes(label) 
          ? prev.filter(item => item !== label) 
          : [...prev, label]
      );
    }
  };

  const renderNavItem = (item: NavItem) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isSelected = item.id === currentView;
    const isExpanded = expandedMenus.includes(item.label);
    
    // Check if any child is active to highlight parent potentially
    const isChildActive = item.subItems?.some(sub => sub.id === currentView);

    return (
      <div key={item.label} className="mb-1">
        <button
          onClick={() => {
            if (hasSubItems) {
              toggleMenu(item.label);
            } else if (item.id) {
              onChangeView(item.id);
            }
          }}
          title={isCollapsed ? item.label : ''}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'justify-between px-4'} py-3 rounded-lg transition-all duration-200 font-medium relative group ${
            isSelected
              ? 'bg-[#C15F3C] text-white shadow-md'
              : isChildActive 
                ? 'bg-[#EAE8E0] text-[#C15F3C]'
                : 'text-gray-600 hover:bg-[#EAE8E0] hover:text-[#C15F3C]'
          }`}
        >
          <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : 'space-x-3'}`}>
            <span className="text-xl">{item.icon}</span>
            <span className={`whitespace-nowrap transition-all duration-300 overflow-hidden ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
              {item.label}
            </span>
          </div>
          
          {hasSubItems && !isCollapsed && (
            <svg 
              className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          )}

          {/* Tooltip for Collapsed Mode */}
          {isCollapsed && (
             <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg">
               {item.label}
             </div>
          )}
        </button>

        {/* Sub Menu */}
        {hasSubItems && isExpanded && !isCollapsed && (
          <div className="pl-10 space-y-1 mb-2 animate-fadeIn">
            {item.subItems!.map((subItem) => (
              <button
                key={subItem.id || subItem.label} 
                onClick={() => subItem.id && onChangeView(subItem.id)}
                className={`w-full text-left flex items-center space-x-2 px-4 py-2 rounded-md text-sm transition-all duration-200 font-medium ${
                  currentView === subItem.id
                    ? 'bg-[#C15F3C]/10 text-[#C15F3C]'
                    : 'text-gray-500 hover:bg-[#EAE8E0] hover:text-[#C15F3C]'
                }`}
              >
                <span className="text-left">{subItem.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      className={`bg-[#F4F3EE] border-r border-[#B1ADA1] h-screen flex flex-col shrink-0 sticky top-0 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className={`p-6 border-b border-[#B1ADA1] flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && (
          <div className="overflow-hidden whitespace-nowrap">
            <h1 className="text-2xl font-bold text-[#C15F3C]">Nguyễn Đức</h1>
            <p className="text-xs text-[#B1ADA1] mt-1">Architectural AI</p>
          </div>
        )}
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1.5 rounded-lg hover:bg-[#EAE8E0] text-[#B1ADA1] transition-colors ${isCollapsed ? '' : 'ml-2'}`}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
          )}
        </button>
      </div>

      <nav className="flex-1 p-2 overflow-y-auto overflow-x-hidden scrollbar-thin flex flex-col">
        <div className="flex-1">
            {navItems.map(renderNavItem)}
        </div>
        
        {/* History Button at Bottom */}
        <div className="mt-4 pt-4 border-t border-[#B1ADA1]/20">
            <button
              onClick={() => onChangeView(AppView.HISTORY)}
              title={isCollapsed ? "Lịch sử" : ''}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'space-x-3 px-4'} py-3 rounded-lg transition-all duration-200 font-medium ${
                currentView === AppView.HISTORY
                  ? 'bg-gray-800 text-white shadow-md'
                  : 'text-gray-600 hover:bg-[#EAE8E0] hover:text-gray-800'
              }`}
            >
                <span className="text-xl">📜</span>
                <span className={`whitespace-nowrap transition-all duration-300 overflow-hidden ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                   Lịch sử
                </span>
            </button>
        </div>
      </nav>

      <div className={`p-6 border-t border-[#B1ADA1] transition-all duration-300 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <div className="flex items-center space-x-2 text-[#B1ADA1] text-sm">
          <span className="w-2 h-2 bg-green-500 rounded-full shrink-0" title="System Operational"></span>
          {!isCollapsed && <span className="whitespace-nowrap">System Operational</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;