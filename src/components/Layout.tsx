
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Package, 
  ShoppingCart, 
  DollarSign, 
  ChartBar, 
  Settings, 
  Menu, 
  X 
} from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem = ({ to, icon, title, isActive, onClick }: NavItemProps) => (
  <Link 
    to={to} 
    className={cn(
      "flex items-center space-x-2 px-4 py-3 rounded-md transition-colors",
      isActive 
        ? "bg-primary text-primary-foreground" 
        : "hover:bg-secondary text-foreground"
    )}
    onClick={onClick}
  >
    <span>{icon}</span>
    <span>{title}</span>
  </Link>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const pathname = window.location.pathname;
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  return (
    <div className="layout flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-card">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-primary">Estoque Plus</h1>
        </div>
        <nav className="flex flex-col gap-1 p-2">
          <NavItem 
            to="/" 
            icon={<ChartBar size={20} />} 
            title="Dashboard" 
            isActive={pathname === '/'}
          />
          <NavItem 
            to="/produtos" 
            icon={<Package size={20} />} 
            title="Produtos" 
            isActive={pathname.includes('/produtos')}
          />
          <NavItem 
            to="/vendas" 
            icon={<ShoppingCart size={20} />} 
            title="Vendas" 
            isActive={pathname.includes('/vendas')}
          />
          <NavItem 
            to="/financeiro" 
            icon={<DollarSign size={20} />} 
            title="Financeiro" 
            isActive={pathname.includes('/financeiro')}
          />
          <NavItem 
            to="/configuracoes" 
            icon={<Settings size={20} />} 
            title="Configurações" 
            isActive={pathname.includes('/configuracoes')}
          />
        </nav>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-card border-b p-4 flex items-center justify-between">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden mr-2" 
              onClick={toggleMobileMenu}
              aria-label="Menu"
            >
              <Menu size={24} />
            </Button>
            <h1 className="text-xl font-bold md:hidden">Estoque Plus</h1>
          </div>
        </header>
        
        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-background z-50 md:hidden">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h1 className="text-xl font-bold text-primary">Estoque Plus</h1>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleMobileMenu}
                  aria-label="Fechar"
                >
                  <X size={24} />
                </Button>
              </div>
              <nav className="flex flex-col gap-1 p-4">
                <NavItem 
                  to="/" 
                  icon={<ChartBar size={20} />} 
                  title="Dashboard" 
                  isActive={pathname === '/'}
                  onClick={closeMobileMenu}
                />
                <NavItem 
                  to="/produtos" 
                  icon={<Package size={20} />} 
                  title="Produtos" 
                  isActive={pathname.includes('/produtos')}
                  onClick={closeMobileMenu}
                />
                <NavItem 
                  to="/vendas" 
                  icon={<ShoppingCart size={20} />} 
                  title="Vendas" 
                  isActive={pathname.includes('/vendas')}
                  onClick={closeMobileMenu}
                />
                <NavItem 
                  to="/financeiro" 
                  icon={<DollarSign size={20} />} 
                  title="Financeiro" 
                  isActive={pathname.includes('/financeiro')}
                  onClick={closeMobileMenu}
                />
                <NavItem 
                  to="/configuracoes" 
                  icon={<Settings size={20} />} 
                  title="Configurações" 
                  isActive={pathname.includes('/configuracoes')}
                  onClick={closeMobileMenu}
                />
              </nav>
            </div>
          </div>
        )}
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
