
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Truck } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: '📊' },
  { title: 'Transportation Orders', url: '/orders', icon: '📦' },
  { title: 'Fleet Management', url: '/trucks', icon: '🚛' },
  { title: 'Urgent', url: '/urgent', icon: '🚨' },
  { title: 'Shipments', url: '/shipments', icon: '🚚' },
  { title: 'Drivers', url: '/drivers', icon: '👨‍💼' },
  { title: 'Expenses', url: '/expenses', icon: '💷' },
  { title: 'Payments', url: '/payments', icon: '💳' },
  { title: 'Vehicle Fleet', url: '/vehicle-fleet', icon: '🗺️' },
  { title: 'Transit Incidents', url: '/incidents', icon: '⚠️' },
  { title: 'Customer Claims', url: '/claims', icon: '📋' },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isCollapsed = state === 'collapsed';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-blue-100 text-blue-900 font-medium" : "hover:bg-gray-100";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={handleLogoClick}>
          <Truck className="h-6 w-6 text-blue-600" />
          {!isCollapsed && (
            <div className="text-2xl font-bold text-blue-900">
              Deliveroo
            </div>
          )}
        </div>
      </div>

      <SidebarContent>
        {/* User Profile Section */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-blue-600 text-white">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-sm text-gray-500 truncate">{user?.company}</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavClass}>
                      <span className="text-lg mr-3">{item.icon}</span>
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Mobile Logout Button */}
        <div className="p-4 border-t mt-auto md:hidden">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full"
            size={isCollapsed ? "sm" : "default"}
          >
            {isCollapsed ? '🚪' : '🚪 Logout'}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
