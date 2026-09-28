import { AppProvider, useApp } from '@/context/AppContext';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Dashboard } from '@/pages/Dashboard';
import { Directory } from '@/pages/Directory';
import { TimeLeave } from '@/pages/TimeLeave';
import { Recruitment } from '@/pages/Recruitment';
import { Onboarding } from '@/pages/Onboarding';
import { PlaceholderPage } from '@/pages/PlaceholderPage';
import { Payroll } from '@/pages/Payroll';
import { Performance } from '@/pages/Performance';
import { Resources } from '@/pages/Resources';

function AppShell() {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'directory':
        return <Directory />;
      case 'time-leave':
        return <TimeLeave />;
      case 'recruitment':
        return <Recruitment />;
      case 'onboarding':
        return <Onboarding />;
      case 'payroll':
        return <Payroll />;
      case 'performance':
        return <Performance />;
      case 'resource-hub':
        return <Resources />;
      default:
        return <PlaceholderPage view={currentView} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto scrollbar-thin">{renderView()}</main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
